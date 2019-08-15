using System.Collections;
using System.Collections.Generic;
using UnityEngine;

// Some of The following code is adapted from the lecture slides from Jim Whitehead's UCSC Generative Design Class in winter 2018.

public class TerrainGen : MonoBehaviour
{
    // prefabs
    public GameObject birdPrefab;
    public Material[] featherMaterials;
    // Noise atributes
    private float noiseScale = 4;
    private readonly int octaves = 3;
    private readonly float persistance = 0.25f;
    private float xSeed = 0;
    private float ySeed = 0;
    // Terrain object
    private Terrain terrain = null;
    private float[,] heightField = null;
    private readonly int edgesize = 512;
    private readonly int heightScale = 30;
    private readonly int numTrees = 20000;
    private readonly int numBirds = 300;

    // Start is called before the first frame update
    void Start()
    {
        //ClearTrees();
        RandomSeed();
        terrain = this.gameObject.GetComponent<Terrain>();
        heightField = new float[edgesize,edgesize];
        PopulateHeightField();
        UpdateTerrainHeights();
        RandomSeed();
        PlaceTrees();
        PlaceBirds();
        noiseScale = 10;
        AssignSplatMap();
    }

    void PlaceBirds() {
        for (int i = 0; i < numBirds; i++) {
            int x = (int)Random.Range(0.0f, edgesize);
            int z = (int)Random.Range(0.0f, edgesize);
            float y = terrain.terrainData.GetHeight(x, z);
            GameObject bird = Instantiate(birdPrefab);
            bird.transform.position = new Vector3(x, y, z);
            float theta = Random.Range(0.0f, 360f);
            bird.transform.eulerAngles = new Vector3(0.0f, theta, 0.0f);
            float size = Random.Range(10f, 35f);
            bird.transform.localScale = new Vector3(size, size, size);
            GameObject body = bird.transform.Find("Body").gameObject;
            Material mat = featherMaterials[Random.Range(0, featherMaterials.Length)];
            body.GetComponent<MeshRenderer>().material = mat;

            GameObject head = body.transform.Find("Head").gameObject;
            mat = featherMaterials[Random.Range(0, featherMaterials.Length)];
            head.GetComponent<MeshRenderer>().material = mat;

            GameObject rWing = body.transform.Find("Rightwing").gameObject;
            GameObject lWing = body.transform.Find("Leftwing").gameObject;
            mat = featherMaterials[Random.Range(0, featherMaterials.Length)];
            rWing.GetComponent<MeshRenderer>().material = mat;
            lWing.GetComponent<MeshRenderer>().material = mat;


            Animator anim = bird.GetComponent<Animator>();
            anim.SetInteger("Anim",Mathf.FloorToInt(Random.Range(0,2)));
        }
    }

    void RandomSeed() {
        xSeed = Random.Range(0f, 500f);
        ySeed = Random.Range(0f, 500f);
    }

    void PlaceTrees() {
        int t = 0;
        for (int z = 0; z < edgesize; z++)
        {
            for (int x = 0; x < edgesize; x++)
            {
                if (Random.Range(0f, 1f) < Mathf.Pow(NoiseWithOctaves(x, z), 2) * 0.2f && t < numTrees)
                {
                    float treeX = (float)x / edgesize;
                    float treeZ = (float)z / edgesize;
                    PlaceTree(treeX, treeZ);
                    t++;
                }
            }
        }
    }

    void PlaceTree(float x, float z) {
        TreeInstance myTree = new TreeInstance();
        Vector3 position = new Vector3(x, -0.3f, z);
        int numPrototypes = terrain.terrainData.treePrototypes.Length;
        int selectedPrototype = Random.Range(0, numPrototypes);

        if (numPrototypes == 0) { return; }

        myTree.position = position;
        myTree.color = Color.white;
        myTree.lightmapColor = Color.white;
        myTree.prototypeIndex = selectedPrototype;
        myTree.heightScale = Random.Range(1f, 2f);
        myTree.widthScale = 1f;
        myTree.rotation = Random.Range(0.0f, 6.283185f);
        terrain.AddTreeInstance(myTree);

    }

    void AssignSplatMap() {
        float [,,] splatmapData = new float[terrain.terrainData.alphamapWidth,
            terrain.terrainData.alphamapHeight,
            terrain.terrainData.alphamapLayers];
        for (int z = 0; z < terrain.terrainData.alphamapHeight; z++)
        {
            for (int x = 0; x < terrain.terrainData.alphamapWidth; x++)
            {
                float val = NoiseWithOctaves(x, z);
                if (val >= 0.75)
                {
                    splatmapData[x, z, 0] = 1; // leaves
                    splatmapData[x, z, 1] = 0; // grass
                }
                else if (val <= 0.25)
                {
                    splatmapData[x, z, 0] = 0; // leaves
                    splatmapData[x, z, 1] = 1; // grass
                }
                else {
                    splatmapData[x, z, 0] = val; // leaves
                    splatmapData[x, z, 1] = 1.0f - val; // grass
                }
                
            }
        }
        terrain.terrainData.SetAlphamaps(0, 0, splatmapData);
    }

    void PopulateHeightField() {
        for (int z = 0; z < edgesize; z++) {
            for (int x = 0; x < edgesize; x++) {
                heightField[x, z] = NoiseWithOctaves(x, z);
            }
        }
    }

    void UpdateTerrainHeights() {
        terrain.terrainData.size = new Vector3(edgesize, heightScale, edgesize);
        terrain.terrainData.heightmapResolution = edgesize;
        terrain.terrainData.SetHeights(0,0,heightField);
    }

    float NoiseWithOctaves(int x, int y)
    {
        float amplitude = 1.0f;
        float frequencey = 1.0f;
        float noiseVal = 0.0f;
        float max = 0.0f;

        for (int i = 0; i < octaves; i++)
        {
            float perlinX = ( ((float)x + xSeed) / (float)edgesize) * noiseScale * frequencey;
            float perlinY = ( ((float)y + ySeed) / (float)edgesize) * noiseScale * frequencey;
            noiseVal += Mathf.PerlinNoise(perlinX, perlinY) * amplitude;

            max += amplitude;
            amplitude *= persistance;
            frequencey *= 2;
        }

        return noiseVal/max;
    }
}
