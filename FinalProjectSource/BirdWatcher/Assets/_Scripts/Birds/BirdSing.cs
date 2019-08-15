using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using MidiPlayerTK;

public class BirdSing : MonoBehaviour
{
    private int[] song;
    private int songIndex = 0;
    private bool delay = false;
    private int delayframes = 0;
    private int delaycounter = 0;
    private SongGenerator generator;
    public MidiStreamPlayer midiPlayer;
    private MPTKEvent NotePlaying;
    private int curframe = 0;
    private int playframe = 30;
    public bool nearestBird = false;
    // Start is called before the first frame update
    void Start()
    {
        generator = GameObject.Find("SongGenerator").GetComponent<SongGenerator>();
        song = generator.StringToArray(generator.Sample());

        if (midiPlayer != null)
        {
            if (!midiPlayer.OnEventSynthStarted.HasEvent())
            {
                midiPlayer.OnEventSynthStarted.AddListener(EndLoadingSynth);
            }
        }
    }

    public void EndLoadingSynth(string name)
    {
        midiPlayer.MPTK_PlayEvent(new MPTKEvent() { Command = MPTKCommand.PatchChange, Value = 73, Channel = 0, });
    }

    // Update is called once per frame
    void Update()
    {
        if (nearestBird)
        {
            if (delay)
            {
                if (delaycounter >= delayframes)
                {
                    delay = false;
                    delaycounter = 0;
                }
                else
                {
                    delaycounter++;
                }
            }
            else
            {
                if (curframe == playframe)
                {
                    curframe = 0;
                    if (songIndex < song.Length)
                    {
                        PlayOneNote(song[songIndex]);
                        songIndex++;
                    }
                    else
                    {
                        StopOneNote();
                        songIndex = 0;
                        delay = true;
                        delayframes = Random.Range(120, 360);
                    }
                }
                else
                {
                    curframe++;
                }
            }
        }
    }

    // adapted from MidiToolKit website
    private void PlayOneNote(int note)
    {
        // Stop previous note playing
        StopOneNote();

        // Start playint a new note
        NotePlaying = new MPTKEvent()
        {
             
            Command = MPTKCommand.NoteOn,
            Value = note,
            Channel = 0,
            Duration = 9999999, // 9999 seconds but stop by the new note.
            Velocity = 1 // Sound can vary depending on the velocity
        };
        midiPlayer.MPTK_PlayEvent(NotePlaying);
    }

    // adapted from MidiToolKit website
    private void StopOneNote()
    {
        if (NotePlaying != null)
        {
            // Stop the note (method to simulate a real human on a keyboard : duration is not known when note is triggered)
            midiPlayer.MPTK_StopEvent(NotePlaying);
            NotePlaying = null;
        }
    }
}
