using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using StoreManager.API.DTOs;
using StoreManager.API.Services;

namespace StoreManager.API.Controllers;

[ApiController]
[Route("api/products")]
[Produces("application/json")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _service;
    private readonly IValidator<CreateProductDto> _createValidator;
    private readonly IValidator<UpdateProductDto> _updateValidator;

    public ProductsController(
        IProductService service,
        IValidator<CreateProductDto> createValidator,
        IValidator<UpdateProductDto> updateValidator)
    {
        _service = service;
        _createValidator = createValidator;
        _updateValidator = updateValidator;
    }

    [HttpGet]
    [ProducesResponseType(typeof(ApiResponseDto<PaginatedResponseDto<ProductResponseDto>>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var result = await _service.GetPagedAsync(page, pageSize);
        return Ok(ApiResponseDto<PaginatedResponseDto<ProductResponseDto>>.Ok(result));
    }


    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(ApiResponseDto<ProductResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponseDto), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(Guid id)
    {
        var product = await _service.GetByIdAsync(id);
        return Ok(ApiResponseDto<ProductResponseDto>.Ok(product));
    }

  
    [HttpPost]
    [ProducesResponseType(typeof(ApiResponseDto<ProductResponseDto>), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ErrorResponseDto), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ErrorResponseDto), StatusCodes.Status409Conflict)]
    [ProducesResponseType(typeof(ErrorResponseDto), StatusCodes.Status422UnprocessableEntity)]
    public async Task<IActionResult> Create([FromBody] CreateProductDto dto)
    {
      
        var validation = await _createValidator.ValidateAsync(dto);
        if (!validation.IsValid)
        {
            var errors = string.Join(" | ", validation.Errors.Select(e => e.ErrorMessage));
            return BadRequest(ApiResponseDto<object>.Fail(errors));
        }

        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(
            nameof(GetById),
            new { id = created.Id },
            ApiResponseDto<ProductResponseDto>.Ok(created, "Produto criado com sucesso."));
    }

        [HttpPut("{id:guid}")]
    [ProducesResponseType(typeof(ApiResponseDto<ProductResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponseDto), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ErrorResponseDto), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ErrorResponseDto), StatusCodes.Status409Conflict)]
    [ProducesResponseType(typeof(ErrorResponseDto), StatusCodes.Status422UnprocessableEntity)]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateProductDto dto)
    {
        var validation = await _updateValidator.ValidateAsync(dto);
        if (!validation.IsValid)
        {
            var errors = string.Join(" | ", validation.Errors.Select(e => e.ErrorMessage));
            return BadRequest(ApiResponseDto<object>.Fail(errors));
        }

        var updated = await _service.UpdateAsync(id, dto);
        return Ok(ApiResponseDto<ProductResponseDto>.Ok(updated, "Produto atualizado com sucesso."));
    }

  
    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(ErrorResponseDto), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _service.DeleteAsync(id);
        return NoContent();
    }
}
