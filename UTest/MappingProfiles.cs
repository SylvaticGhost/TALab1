using AutoMapper;
using Lab1;

namespace UTest;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<List<List<int>>, Matrix>()
            .ForMember(dest => dest.Containing, opt => opt.MapFrom(src => src));;
    }
}