using System.Net.Http.Headers;
using System.Text;
using AutoMapper;
using Lab1;
using Newtonsoft.Json;

namespace UTest;

public class Tests
{
    private readonly IMapper _mapper;
    private readonly HttpClient _client;
    public Tests()
    {
        _mapper = new MapperConfiguration(
            cfg => cfg.AddProfile(new MappingProfiles())).CreateMapper();
        _client = new HttpClient();
    }
    [SetUp]
    public void Setup()
    {
        
    }

    [Test]
    public async Task CountZeroTest()
    {
        string url = "http://localhost:5035/Main/CountZero/";
        
        Matrix matrix = _mapper.Map<List<List<int>>, Matrix>(GenerateMatrix());

        Console.WriteLine("GeneratedMatrix:");
        Console.WriteLine(matrix);
        
        string json = JsonConvert.SerializeObject(matrix);
        
        _client.DefaultRequestHeaders.Accept.Clear();
        _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        var response = await _client.PutAsync(url, new StringContent(json, Encoding.UTF8));

        if (response.Content.Headers.ContentType.MediaType is "text/plain" or "application/json")
        {
            string responseBody = await response.Content.ReadAsStringAsync();

            if (int.TryParse(responseBody, out int val))
            {
                Console.WriteLine(val);
                Assert.Pass();
            }
        }
        
        //Assert.Fail();
    }

    private List<List<int>> GenerateMatrix()
    {
        Random random = new Random();

        int m = random.Next(1, 12);
        int n = random.Next(1, 12);

        List<List<int>> matrix = new List<List<int>>();

        for (int i = 0; i < m; i++)
        {
            matrix.Add(new List<int>());
            for (int j = 0; j < n; j++)
            {
                matrix[i].Add(random.Next(-50, 50));
            }
        }

        return matrix;
    }
}