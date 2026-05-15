using Microsoft.EntityFrameworkCore;
using StoreManager.API.Data;
using StoreManager.API.Entities;

namespace StoreManager.API.Repositories;


public interface IProductRepository
{
    Task<(IEnumerable<Product> Items, int Total)> GetPagedAsync(int page, int pageSize);
    Task<Product?> GetByIdAsync(Guid id);
    Task<Product?> GetBySkuAsync(string sku);
    Task<bool> SkuExistsAsync(string sku, Guid? excludeId = null);
    Task AddAsync(Product product);
    Task UpdateAsync(Product product);
    Task DeleteAsync(Product product);
    Task SaveChangesAsync();
}

public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _context;

    public ProductRepository(AppDbContext context)
    {
        _context = context;
    }

    /// <inheritdoc />
    public async Task<(IEnumerable<Product> Items, int Total)> GetPagedAsync(int page, int pageSize)
    {
        var query = _context.Products.AsNoTracking().OrderBy(p => p.CreatedAt);

        var total = await query.CountAsync();

        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, total);
    }

    /// <inheritdoc />
    public async Task<Product?> GetByIdAsync(Guid id)
        => await _context.Products.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);

    /// <inheritdoc />
    public async Task<Product?> GetBySkuAsync(string sku)
        => await _context.Products.AsNoTracking().FirstOrDefaultAsync(p => p.SKU == sku);

    /// <inheritdoc />
    public async Task<bool> SkuExistsAsync(string sku, Guid? excludeId = null)
    {
        var query = _context.Products.AsNoTracking().Where(p => p.SKU == sku);

        if (excludeId.HasValue)
            query = query.Where(p => p.Id != excludeId.Value);

        return await query.AnyAsync();
    }

    /// <inheritdoc />
    public async Task AddAsync(Product product)
        => await _context.Products.AddAsync(product);

    /// <inheritdoc />
    public Task UpdateAsync(Product product)
    {
        _context.Products.Update(product);
        return Task.CompletedTask;
    }

    /// <inheritdoc />
    public Task DeleteAsync(Product product)
    {
        _context.Products.Remove(product);
        return Task.CompletedTask;
    }

    /// <inheritdoc />
    public async Task SaveChangesAsync()
        => await _context.SaveChangesAsync();
}
