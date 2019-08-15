using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BirdMovement : MonoBehaviour
{
    private readonly float speed = 0.5f;
    private readonly int STILL_MODE = 0;
    private readonly int MOVE_MODE = 1;
    private readonly int HOP_MODE = 2;
    private float dir = 1;
    private int mode;
    private Vector3 startPos;
    private int framesPerCycle;
    private int curFrame;

    private void Start()
    {
        mode = 0;
        startPos = transform.position;
        framesPerCycle = Random.Range(60, 120);
        curFrame = Random.Range(0, framesPerCycle);
    }

    void Update()
    {
        if (mode == STILL_MODE)
        {
            transform.position = startPos;
        }
        else if (mode == MOVE_MODE)
        {
            transform.position = startPos;
            transform.eulerAngles += new Vector3(0.0f, dir*speed, 0.0f);
        }
        else if (mode == HOP_MODE)
        {
            // dy = (1/h^2)(-(2x-h)^2 + h^2)
            float deltaY = (1f / Mathf.Pow(framesPerCycle, 2) ) * ( -(Mathf.Pow(2*curFrame - framesPerCycle, 2)) + Mathf.Pow(framesPerCycle, 2) );
            transform.position = startPos + new Vector3(0, deltaY, 0);
        }
        else
        {
            Debug.Log("Unreachable Base Case");
        }
        curFrame++;
        if (curFrame >= framesPerCycle)
        {
            curFrame = 0;
            mode = Mathf.FloorToInt(Random.Range(0f, 3f));
            if (Random.Range(0f, 1f) < 0.5f)
            {
                dir = -1f;
            }
            else
            {
                dir = 1f;
            }
        }
    }


}
