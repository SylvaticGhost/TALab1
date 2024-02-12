namespace Lab1;

public static class Functions
{
    public static int CountZeroInMatrix(int[][] matrix)
    {
        int result = 0;
        
        foreach (int[] row in matrix)
        {
            foreach (int i in row)
            {
                if (i == 0)
                    result++;
            }
        }
        return result;
    }
}