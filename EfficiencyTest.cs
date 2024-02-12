using System.Diagnostics;
using System.Runtime.InteropServices.JavaScript;
using Lab1;
using NUnit.Framework;

namespace UTest;

[TestFixture]
public class EfficiencyTest
{
    
    [Test]
    [TestCase(1, 0)]
    [TestCase(2, 0)]
    [TestCase(3, 0)]
    [TestCase(4, 0)]
    [TestCase(5, 0)]
    [TestCase(6, 0)]
    [TestCase(7, 0)]
    [TestCase(8, 0)]
    [TestCase(9, 0)]
    [TestCase(10, 0)]
    [TestCase(11, 1)] // Add a zero in the middle
    [TestCase(12, 1)]
    [TestCase(13, 2)] // Add another zero
    [TestCase(14, 2)]
    [TestCase(15, 3)] // Add another zero
    [TestCase(16, 3)]
    [TestCase(17, 4)] // Add another zero
    [TestCase(18, 4)]
    [TestCase(19, 5)] // Add another zero
    [TestCase(20, 5)]
    public void CountZeroInMatrixWithIncreasingElements(int numElements, int expectedZeroCount)
    {
        numElements *= 1000;
        int[][] matrix = GenerateRootMatrix(numElements, expectedZeroCount);
        
        Stopwatch stopwatch = Stopwatch.StartNew();
        int actualZeroCount = Functions.CountZeroInMatrix(matrix);
        stopwatch.Stop();
        long runtimeMilliseconds = stopwatch.ElapsedMilliseconds;
        Assert.AreEqual(expectedZeroCount, actualZeroCount);
        Console.WriteLine(numElements + "," + runtimeMilliseconds);
        WriteResult(numElements, runtimeMilliseconds);
    }


    private void Print2DArray(int[][] matrix)
    {
        foreach (int[] row in matrix)
        {
            foreach (int i in row)
            {
                Console.Write(i + " ");
            }

            Console.WriteLine();
        }
    }
    
    
    private int[][] GenerateRootMatrix(int n, int numZeros)
    {
        int[][] matrix = new int[n][];
        List<int> indices = new List<int>();

        for (int i = 0; i < n; i++)
        {
            matrix[i] = new int[n];
            for (int j = 0; j < n; j++)
            {
                matrix[i][j] = (int)Math.Round(Math.Sqrt(1 + n * i + j));
                indices.Add(i * n + j);
            }
        }

        // Shuffle the indices
        Random rand = new Random();
        for (int i = 0; i < indices.Count; i++)
        {
            int temp = indices[i];
            int randomIndex = rand.Next(i, indices.Count);
            indices[i] = indices[randomIndex];
            indices[randomIndex] = temp;
        }

        // Replace the first num_zeros indices with zeros
        for (int i = 0; i < numZeros; i++)
        {
            int row = indices[i] / n;
            int col = indices[i] % n;
            matrix[row][col] = 0;
        }

        return matrix;
    }

    private void WriteResult(int numElements, long runtime)
    {
        using StreamWriter sw = File.AppendText("G:\\OP code\\TA\\Lab1\\UTest\\Result.txt");
        
        sw.Write(numElements+','+runtime+';');
    }
}