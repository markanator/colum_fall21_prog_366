using System;

namespace Algo
{
    public static class Randoms
    {
        private static Random randomNumber = new Random();

        public static int GetRandomIndex(int num)
        {
            return randomNumber.Next(num + 1);
        }
    }
}