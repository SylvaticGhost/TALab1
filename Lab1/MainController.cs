using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Lab1;

[ApiController]
[Route("[controller]")]
public class MainController : ControllerBase
{
   [HttpPost("CountZero")]
   public int CountZeroInMatrix(Matrix? matrix)
   {
      if(matrix is not null)
         return Functions.CountZeroInMatrix(matrix.Containing);

      throw new BadHttpRequestException("Empty input");
   }
}