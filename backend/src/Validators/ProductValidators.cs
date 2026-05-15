using FluentValidation;
using StoreManager.API.DTOs;

namespace StoreManager.API.Validators;


public class CreateProductValidator : AbstractValidator<CreateProductDto>
{
    public CreateProductValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("O nome do produto é obrigatório.")
            .MaximumLength(200).WithMessage("O nome pode ter no máximo 200 caracteres.");

        RuleFor(x => x.SKU)
            .NotEmpty().WithMessage("O SKU é obrigatório.")
            .MaximumLength(100).WithMessage("O SKU pode ter no máximo 100 caracteres.")
            .Matches(@"^[A-Za-z0-9\-_]+$").WithMessage("O SKU deve conter apenas letras, números, hífens e underscores.");

        RuleFor(x => x.Category)
            .NotEmpty().WithMessage("A categoria é obrigatória.")
            .MaximumLength(100).WithMessage("A categoria pode ter no máximo 100 caracteres.");

        RuleFor(x => x.Price)
            .GreaterThan(0).WithMessage("O preço deve ser maior que zero.");

        RuleFor(x => x.Stock)
            .GreaterThanOrEqualTo(0).WithMessage("O estoque não pode ser negativo.");
    }
}


public class UpdateProductValidator : AbstractValidator<UpdateProductDto>
{
    public UpdateProductValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("O nome do produto é obrigatório.")
            .MaximumLength(200).WithMessage("O nome pode ter no máximo 200 caracteres.");

        RuleFor(x => x.SKU)
            .NotEmpty().WithMessage("O SKU é obrigatório.")
            .MaximumLength(100).WithMessage("O SKU pode ter no máximo 100 caracteres.")
            .Matches(@"^[A-Za-z0-9\-_]+$").WithMessage("O SKU deve conter apenas letras, números, hífens e underscores.");

        RuleFor(x => x.Category)
            .NotEmpty().WithMessage("A categoria é obrigatória.")
            .MaximumLength(100).WithMessage("A categoria pode ter no máximo 100 caracteres.");

        RuleFor(x => x.Price)
            .GreaterThan(0).WithMessage("O preço deve ser maior que zero.");

        RuleFor(x => x.Stock)
            .GreaterThanOrEqualTo(0).WithMessage("O estoque não pode ser negativo.");
    }
}
