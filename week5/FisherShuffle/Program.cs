using System.IO;
using System;
using static System.Console;
using Algo;

namespace FisherShuffle
{
    class Program
    {
        static void Main(string[] args)
        {
            WriteLine("Press any key to read the text file.");
            ReadKey();
            // read file
            string[] textFileLines = File.ReadAllLines("./File.txt");

            WriteLine("\n\nPress any key to DoFisherYatesShuffle and print results.");
            ReadKey();
            // perform shuffle
            textFileLines.DoFisherYatesShuffle();
            // print each shuffled row
            foreach (string row in textFileLines)
            {
                WriteLine(row);
            }
            // exit
            WriteLine($"\n\nSuccessfully shuffled {textFileLines.Length} lines!");
            WriteLine("\n\nPress any key to exit...");
            ReadKey();
        }
    }
}
