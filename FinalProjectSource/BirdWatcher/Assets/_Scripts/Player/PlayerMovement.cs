using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    private float basespeed = 0.1f;
    private float cameraspeed = 0.01f;
    private float lookSpeed = 3;
    private bool bookShowing = false;
    public GameObject cameraOverlay;
    public GameObject bookOverlay;
    private float speed = 0f;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        float x;
        float y;
        Vector3 rotateValue;
        float side;
        float fwd;
        Vector3 moveValue;

        speed = basespeed;
        if (Input.GetKey(KeyCode.E))
        {
            Camera.main.fieldOfView = 30.0f;
            cameraOverlay.SetActive(true);
            speed = cameraspeed;
        }
        else
        {
            Camera.main.fieldOfView = 60.0f;
            cameraOverlay.SetActive(false);
        }

        if (Input.GetKeyDown(KeyCode.Escape)) {
            bookShowing = !bookShowing;
        }

        if (bookShowing)
        {
            //Screen.lockCursor = false;
            Cursor.lockState = CursorLockMode.None;
            bookOverlay.SetActive(true);
        }
        else
        {
            //Screen.lockCursor = true;
            Cursor.lockState = CursorLockMode.Locked;
            bookOverlay.SetActive(false);
            y = Input.GetAxis("Mouse X") * lookSpeed;
            x = Input.GetAxis("Mouse Y") * lookSpeed;

            rotateValue = new Vector3(x, y * -1.0f, 0.0f);
            transform.eulerAngles = transform.eulerAngles - rotateValue;

            side = Input.GetAxis("Horizontal") * speed;
            fwd = Input.GetAxis("Vertical") * speed;
            moveValue = new Vector3(side, 0, fwd);
            transform.Translate(moveValue);
        }
        
    }
}
