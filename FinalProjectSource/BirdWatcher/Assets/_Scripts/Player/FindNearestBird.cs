using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FindNearestBird : MonoBehaviour
{
    List<GameObject> closeBirds = new List<GameObject>();

    private void FindClosestInList()
    {
        GameObject closestBird = null;
        if (closeBirds.Count > 0) {
            closestBird = closeBirds[0];
        }
        foreach (GameObject bird in closeBirds)
        {
            if (Vector3.Distance(closestBird.transform.position, transform.position) > Vector3.Distance(bird.transform.position, transform.position))
            {
                closestBird = bird;
            }
        }

        if (closestBird)
        {
            closestBird.GetComponent<BirdSing>().nearestBird = true;
        }
    }

    private void ClearNearnessData()
    {
        foreach (GameObject bird in closeBirds)
        {
            bird.GetComponent<BirdSing>().nearestBird = false;
        }
    }

    private void OnTriggerEnter(Collider other)
    {
        ClearNearnessData();
        if (!closeBirds.Contains(other.gameObject) && other.tag.Equals("Bird"))
        {
            closeBirds.Add(other.gameObject);
        }
    }

    private void OnTriggerExit(Collider other)
    {
        ClearNearnessData();
        if (closeBirds.Contains(other.gameObject))
        {
            closeBirds.Remove(other.gameObject);
        }
    }

    private void Update()
    {
        FindClosestInList();
    }
}
