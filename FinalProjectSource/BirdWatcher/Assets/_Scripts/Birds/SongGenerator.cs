using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityTracery;

public class SongGenerator : MonoBehaviour
{
    private TraceryGrammar grammar;
    private Dictionary<string, int> NoteToNumber = new Dictionary<string, int>();
    // Start is called before the first frame update
    void Start()
    {
        grammar = new TraceryGrammar(@"{}");
        grammar.PushAction("Song", new string[] {
            "#Note# #Note# #Note# #Note# #Note#",
            "#LowNote# #LowNote# #LowNote# #LowNote# #LowNote#",
            "#MediumNote# #MediumNote# #MediumNote# #MediumNote# #MediumNote# #MediumNote# #MediumNote#",
            "#HighNote# #HighNote# #HighNote# #HighNote# #HighNote#",
            "#LowNote# #MediumNote# #HighNote# #MediumNote# #HighNote#",
            });
        grammar.PushAction("Note", new string[] { "#LowNote#", "#MediumNote#", "#HighNote#" });
        grammar.PushAction("LowNote", new string[] { "C5", "C$5", "D5", "D$5", "E5", "F5", "F$5", "G5", "G$5", "A5", "A$5", "B5" });
        grammar.PushAction("MediumNote", new string[] { "C6", "C$6", "D6", "D$6", "E6", "F6", "F$6", "G6", "G$6", "A6", "A$6", "B6" });
        grammar.PushAction("HighNote", new string[] { "C7", "C$7", "D7", "D$7", "E7", "F7", "F$7", "G7", "G$7", "A7", "A$7", "B7" });


        NoteToNumber.Add("C5", 72);
        NoteToNumber.Add("C$5", 73);
        NoteToNumber.Add("D5", 74);
        NoteToNumber.Add("D$5", 75);
        NoteToNumber.Add("E5", 76);
        NoteToNumber.Add("F5", 77);
        NoteToNumber.Add("F$5", 78);
        NoteToNumber.Add("G5", 79);
        NoteToNumber.Add("G$5", 80);
        NoteToNumber.Add("A5", 81);
        NoteToNumber.Add("A$5", 82);
        NoteToNumber.Add("B5", 83);
        NoteToNumber.Add("C6", 84);
        NoteToNumber.Add("C$6", 85);
        NoteToNumber.Add("D6", 86);
        NoteToNumber.Add("D$6", 87);
        NoteToNumber.Add("E6", 88);
        NoteToNumber.Add("F6", 89);
        NoteToNumber.Add("F$6", 90);
        NoteToNumber.Add("G6", 91);
        NoteToNumber.Add("G$6", 92);
        NoteToNumber.Add("A6", 93);
        NoteToNumber.Add("A$6", 94);
        NoteToNumber.Add("B6", 95);
        NoteToNumber.Add("C7", 96);
        NoteToNumber.Add("C$7", 97);
        NoteToNumber.Add("D7", 98);
        NoteToNumber.Add("D$7", 99);
        NoteToNumber.Add("E7", 100);
        NoteToNumber.Add("F7", 101);
        NoteToNumber.Add("F$7", 102);
        NoteToNumber.Add("G7", 103);
        NoteToNumber.Add("G$7", 104);
        NoteToNumber.Add("A7", 105);
        NoteToNumber.Add("A$7", 106);
        NoteToNumber.Add("B7", 107);

        grammar.ParseInner("#Song");
    }

    public int[] StringToArray(string song)
    {
        string[] notes = song.Split(' ');
        int[] songArray = new int[notes.Length];

        for (int i = 0; i < songArray.Length; i++)
        {
            songArray[i] = NoteToNumber[notes[i]];
        }

        return songArray;
    }

    public string Sample()
    {
        string song = grammar.ParseInner("#Song#");
        return song;
    }

    
}
