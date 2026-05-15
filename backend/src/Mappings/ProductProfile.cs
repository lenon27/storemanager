using AutoMapper;
using StoreManager.API.DTOs;
using StoreManager.API.Entities;

namespace StoreManager.API.Mappings;


public class ProductProfile : Profile
{
    public ProductProfile()
    {
       
        CreateMap<Product, ProductResponseDto>();


        CreateMap<CreateProductDto, Product>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.CreatedAt, opt => opt.Ignore());

       
        CreateMap<UpdateProductDto, Product>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.CreatedAt, opt => opt.Ignore());
    }
}
