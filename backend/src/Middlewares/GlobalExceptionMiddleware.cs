using System.Net;
using System.Text.Json;
using FluentValidation;
using StoreManager.API.DTOs;
using StoreManager.API.Utils;

namespace StoreManager.API.Middlewares;


public class GlobalExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionMiddleware> _logger;

    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };

    public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (ValidationException ex)
        {
           
            var messages = ex.Errors.Select(e => e.ErrorMessage);
            var message = string.Join(" | ", messages);

            _logger.LogWarning("Erro de validação: {Message}", message);
            await WriteErrorAsync(context, HttpStatusCode.BadRequest, message);
        }
        catch (NotFoundException ex)
        {
            _logger.LogWarning("Recurso não encontrado: {Message}", ex.Message);
            await WriteErrorAsync(context, HttpStatusCode.NotFound, ex.Message);
        }
        catch (ConflictException ex)
        {
            _logger.LogWarning("Conflito de dados: {Message}", ex.Message);
            await WriteErrorAsync(context, HttpStatusCode.Conflict, ex.Message);
        }
        catch (BusinessException ex)
        {
            _logger.LogWarning("Regra de negócio violada: {Message}", ex.Message);
            await WriteErrorAsync(context, HttpStatusCode.UnprocessableEntity, ex.Message);
        }
        catch (Exception ex)
        {
            
            _logger.LogError(ex, "Erro inesperado: {Message}", ex.Message);
            await WriteErrorAsync(
                context,
                HttpStatusCode.InternalServerError,
                "Ocorreu um erro interno inesperado. Tente novamente mais tarde.");
        }
    }

    private static async Task WriteErrorAsync(HttpContext context, HttpStatusCode statusCode, string message)
    {
        context.Response.StatusCode = (int)statusCode;
        context.Response.ContentType = "application/json";

        var response = new ErrorResponseDto
        {
            Success = false,
            Message = message
        };

        var json = JsonSerializer.Serialize(response, JsonOptions);
        await context.Response.WriteAsync(json);
    }
}
