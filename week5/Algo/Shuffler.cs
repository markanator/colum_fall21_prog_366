using System;
using static Algo.Randoms;

namespace Algo
{
    /// <summary>
    /// Primary Shuffling class.
    /// </summary>
    public static class Shuffler
    {
        /// <summary>
        /// Generic method to shuffle an array of type T.
        /// </summary>
        /// <typeparam name="T">The type of array you'd like to shuffle</typeparam>
        /// <param name="array"></param>
        //  Modified to make into a generic shuffler
        public static void DoFisherYatesShuffle<T>(this T[] array)
        {
            // total machine length of objects
            // if i gte 0, keep looping
            // decrement i to move closer to zero
            // (end of array to the beginning)
            for (int i = array.Length - 1; i > 0; i--)
            {
                // get random num
                int j = GetRandomIndex(i);
                // swap, notice i,j => j,i
                (array[i], array[j]) = (array[j], array[i]);
            }
        }

        /// <summary>
        /// Alternative Shuffle starting from the beginning to the end of the array.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="array"></param>
        public static void DoAlternateYatesShuffle<T>(this T[] array)
        {
            // start from zero, up until the end of array, moving forward
            for (int i = 0; i < array.Length - 2; i++)
            {
                // get random num, nullify the addition of one in this method
                int j = GetRandomIndex((array.Length - i) - 1);
                // swap, notice i,i+j => i+j,i
                (array[i], array[i + j]) = (array[i + j], array[i]);
            }
        }

    }
}
