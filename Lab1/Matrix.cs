namespace Lab1;

// public class Matrix
// {
//     public int[][] Containing;
//     
//     public override string ToString()
//     {
//         string result = "";
//
//         foreach (int[] row in Containing)
//         {
//             foreach (int i in row)
//             {
//                 result += i + " ";
//             }
//
//             result += '\n';
//         }
//         
//         return result;
//     }
// }

public record Matrix(int[][] Containing);