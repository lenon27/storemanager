using AutoMapper;
using StoreManager.API.DTOs;
using StoreManager.API.Entities;
using StoreManager.API.Repositories;
using StoreManager.API.Utils;

namespace StoreManager.API.Services;


public interface IProductService
{
    Task<PaginatedResponseDto<ProductResponseDto>> GetPagedAsync(int page, int pageSize);
    Task<ProductResponseDto> GetByIdAsync(Guid id);
    Task<ProductResponseDto> CreateAsync(CreateProductDto dto);
    Task<ProductResponseDto> UpdateAsync(Guid id, UpdateProductDto dto);
    Task DeleteAsync(Guid id);
}


public class ProductService : IProductService
{
    private readonly IProductRepository _repository;
    private readonly IMapper _mapper;
    private readonly ILogger<ProductService> _logger;

    private const string CategoryEletronicos = "Eletrônicos";
    private const decimal MinPriceEletronicos = 50m;

    public ProductService(
        IProductRepository repository,
        IMapper mapper,
        ILogger<ProductService> logger)
    {
        _repository = repository;
        _mapper = mapper;
        _logger = logger;
    }

    /// <inheritdoc />
    public async Task<PaginatedResponseDto<ProductResponseDto>> GetPagedAsync(int page, int pageSize)
    {
    
        if (page < 1) page = 1;
        if (pageSize < 1) pageSize = 10;
        if (pageSize > 100) pageSize = 100;

        var (items, total) = await _repository.GetPagedAsync(page, pageSize);

        var totalPages = (int)Math.Ceiling((double)total / pageSize);

        return new PaginatedResponseDto<ProductResponseDto>
        {
            Items = _mapper.Map<IEnumerable<ProductResponseDto>>(items),
            TotalItems = total,
            TotalPages = totalPages,
            CurrentPage = page,
            PageSize = pageSize
        };
    }

    /// <inheritdoc />
    public async Task<ProductResponseDto> GetByIdAsync(Guid id)
    {
        var product = await _repository.GetByIdAsync(id)
            ?? throw new NotFoundException($"Produto com ID '{id}' não encontrado.");

        return _mapper.Map<ProductResponseDto>(product);
    }

    /// <inheritdoc />
    public async Task<ProductResponseDto> CreateAsync(CreateProductDto dto)
    {
       
        await EnsureSkuIsUniqueAsync(dto.SKU);

      
        ValidateBusinessRules(dto.Category, dto.Price, dto.Stock);

        var product = _mapper.Map<Product>(dto);
        product.Id = Guid.NewGuid();
        product.CreatedAt = DateTime.UtcNow;

        await _repository.AddAsync(product);
        await _repository.SaveChangesAsync();

        _logger.LogInformation(
            "Produto criado com sucesso. ID: {ProductId}, SKU: {SKU}, Nome: {Name}",
            product.Id, product.SKU, product.Name);

        return _mapper.Map<ProductResponseDto>(product);
    }

    /// <inheritdoc />
    public async Task<ProductResponseDto> UpdateAsync(Guid id, UpdateProductDto dto)
    {
        var product = await _repository.GetByIdAsync(id)
            ?? throw new NotFoundException($"Produto com ID '{id}' não encontrado.");


        await EnsureSkuIsUniqueAsync(dto.SKU, id);

       
        ValidateBusinessRules(dto.Category, dto.Price, dto.Stock);

      
        var updatedProduct = _mapper.Map<Product>(dto);
        updatedProduct.Id = product.Id;
        updatedProduct.CreatedAt = product.CreatedAt;

        await _repository.UpdateAsync(updatedProduct);
        await _repository.SaveChangesAsync();

        _logger.LogInformation(
            "Produto atualizado com sucesso. ID: {ProductId}, SKU: {SKU}",
            updatedProduct.Id, updatedProduct.SKU);

        return _mapper.Map<ProductResponseDto>(updatedProduct);
    }

    /// <inheritdoc />
    public async Task DeleteAsync(Guid id)
    {
        var product = await _repository.GetByIdAsync(id)
            ?? throw new NotFoundException($"Produto com ID '{id}' não encontrado.");

        await _repository.DeleteAsync(product);
        await _repository.SaveChangesAsync();

        _logger.LogInformation(
            "Produto removido. ID: {ProductId}, SKU: {SKU}, Nome: {Name}",
            product.Id, product.SKU, product.Name);
    }

    private async Task EnsureSkuIsUniqueAsync(string sku, Guid? excludeId = null)
    {
        var exists = await _repository.SkuExistsAsync(sku, excludeId);
        if (exists)
        {
            _logger.LogWarning("Tentativa de usar SKU duplicado: {SKU}", sku);
            throw new ConflictException($"Já existe um produto com o SKU '{sku}'.");
        }
    }


    private static void ValidateBusinessRules(string category, decimal price, int stock)
    {
   
        if (stock < 0)
            throw new BusinessException("O estoque não pode ser menor que zero.");

      
        if (string.Equals(category, CategoryEletronicos, StringComparison.OrdinalIgnoreCase)
            && price < MinPriceEletronicos)
        {
            throw new BusinessException(
                $"Produtos da categoria '{CategoryEletronicos}' devem ter preço mínimo de R$ {MinPriceEletronicos:F2}.");
        }
    }
}
