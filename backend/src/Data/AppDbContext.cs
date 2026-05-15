using Microsoft.EntityFrameworkCore;
using StoreManager.API.Entities;

namespace StoreManager.API.Data;


public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Product> Products => Set<Product>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>(entity =>
        {
            entity.ToTable("products");

            entity.HasKey(p => p.Id);

            entity.Property(p => p.Id)
                  .HasColumnName("id")
                  .IsRequired();

            entity.Property(p => p.Name)
                  .HasColumnName("name")
                  .HasMaxLength(200)
                  .IsRequired();

            entity.Property(p => p.SKU)
                  .HasColumnName("sku")
                  .HasMaxLength(100)
                  .IsRequired();

       
            entity.HasIndex(p => p.SKU)
                  .IsUnique()
                  .HasDatabaseName("IX_products_sku");

            entity.Property(p => p.Category)
                  .HasColumnName("category")
                  .HasMaxLength(100)
                  .IsRequired();

            entity.Property(p => p.Price)
                  .HasColumnName("price")
                  .HasPrecision(18, 2)
                  .IsRequired();

            entity.Property(p => p.Stock)
                  .HasColumnName("stock")
                  .IsRequired();

            entity.Property(p => p.CreatedAt)
                  .HasColumnName("created_at")
                  .IsRequired();
        });
    }
}
