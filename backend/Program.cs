using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Serilog;
using StoreManager.API.Data;
using StoreManager.API.DTOs;
using StoreManager.API.Mappings;
using StoreManager.API.Middlewares;
using StoreManager.API.Repositories;
using StoreManager.API.Services;
using StoreManager.API.Validators;


Log.Logger = new LoggerConfiguration()
    .WriteTo.Console(outputTemplate:
        "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj}{NewLine}{Exception}")
    .WriteTo.File(
        path: "src/Logs/log-.txt",
        rollingInterval: RollingInterval.Day,
        outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level:u3}] {Message:lj}{NewLine}{Exception}")
    .Enrich.FromLogContext()
    .MinimumLevel.Information()
    .CreateLogger();

try
{
    Log.Information("Iniciando StoreManager API...");

    var builder = WebApplication.CreateBuilder(args);

    
    builder.Host.UseSerilog();

    
    builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseNpgsql(
            builder.Configuration.GetConnectionString("DefaultConnection"),
            npgsql => npgsql.MigrationsAssembly("StoreManager.API")));

    
    builder.Services.AddScoped<IProductRepository, ProductRepository>();
    builder.Services.AddScoped<IProductService, ProductService>();

    
    builder.Services.AddAutoMapper(typeof(ProductProfile));

    builder.Services.AddScoped<IValidator<CreateProductDto>, CreateProductValidator>();
    builder.Services.AddScoped<IValidator<UpdateProductDto>, UpdateProductValidator>();

    builder.Services.AddControllers()
        .AddJsonOptions(opts =>
            opts.JsonSerializerOptions.PropertyNamingPolicy =
                System.Text.Json.JsonNamingPolicy.CamelCase);

    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo
        {
            Title = "StoreManager API",
            Version = "v1",
            Description = "API de gestão de produtos — CRUD completo com regras de negócio, paginação e logs.",
            Contact = new OpenApiContact
            {
                Name = "StoreManager",
                Email = "contato@storemanager.com"
            }
        });

        
        var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
        var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
        if (File.Exists(xmlPath))
            c.IncludeXmlComments(xmlPath);
    });

    
    builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

    
    var app = builder.Build();

    
    app.UseMiddleware<GlobalExceptionMiddleware>();

    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "StoreManager API v1");
            c.RoutePrefix = "swagger";
        });
    }

    app.UseCors("AllowFrontend");
    app.UseAuthorization();
    app.MapControllers();

    
    if (app.Environment.IsDevelopment())
    {
        using var scope = app.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        await db.Database.MigrateAsync();
        Log.Information("Migrations aplicadas com sucesso.");
    }

    Log.Information("API iniciada com sucesso.");
    await app.RunAsync();
}
catch (Exception ex)
{
    Log.Fatal(ex, "A aplicação falhou ao iniciar.");
}
finally
{
    Log.CloseAndFlush();
}
