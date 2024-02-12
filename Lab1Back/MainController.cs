using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Lab1;

[ApiController]
[Route("[controller]")]
public class MainController : ControllerBase
{
   [HttpPost("CountZero")]
   public IActionResult CountZeroInMatrix(Matrix? matrix)
   {
      if(matrix is not null)
         return Ok(Functions.CountZeroInMatrix(matrix.Containing));

      throw new BadHttpRequestException("Empty input");
   }
}