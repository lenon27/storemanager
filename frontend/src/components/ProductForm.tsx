import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { Product, ProductFormValues } from '../types';
import { CATEGORIES } from '../utils';

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (values: ProductFormValues) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}


export default function ProductForm({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
}: ProductFormProps) {
  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: {
      name: '',
      sku: '',
      category: '',
      price: '',
      stock: '',
    },
  });

  
  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        sku: initialData.sku,
        category: initialData.category,
        price: String(initialData.price),
        stock: String(initialData.stock),
      });
    }
  }, [initialData, reset]);

  const categoryValue = watch('category');

  const handleFormSubmit = handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <form onSubmit={handleFormSubmit} noValidate className="space-y-5">
 
      <div>
        <label htmlFor="name" className="label">
          Nome do produto <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Ex: Smartphone Galaxy S24"
          className="input-field"
          {...register('name', {
            required: 'O nome é obrigatório.',
            maxLength: { value: 200, message: 'Máximo de 200 caracteres.' },
          })}
        />
        {errors.name && (
          <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>
        )}
      </div>


      <div>
        <label htmlFor="sku" className="label">
          SKU <span className="text-red-500">*</span>
        </label>
        <input
          id="sku"
          type="text"
          placeholder="Ex: SAMS-S24-BLK"
          className="input-field font-mono"
          {...register('sku', {
            required: 'O SKU é obrigatório.',
            maxLength: { value: 100, message: 'Máximo de 100 caracteres.' },
            pattern: {
              value: /^[A-Za-z0-9\-_]+$/,
              message: 'SKU deve conter apenas letras, números, hífens e underscores.',
            },
          })}
        />
        {errors.sku && (
          <p className="mt-1.5 text-xs text-red-400">{errors.sku.message}</p>
        )}
      </div>


      <div>
        <label htmlFor="category" className="label">
          Categoria <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          className="input-field"
          {...register('category', {
            required: 'A categoria é obrigatória.',
          })}
        >
          <option value="">Selecione uma categoria</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1.5 text-xs text-red-400">{errors.category.message}</p>
        )}
        {categoryValue === 'Eletrônicos' && (
          <p className="mt-1.5 text-xs text-amber-400 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Eletrônicos exigem preço mínimo de R$ 50,00.
          </p>
        )}
      </div>


      <div className="grid grid-cols-2 gap-4">
 
        <div>
          <label htmlFor="price" className="label">
            Preço (R$) <span className="text-red-500">*</span>
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="0,00"
            className="input-field"
            {...register('price', {
              required: 'O preço é obrigatório.',
              min: { value: 0.01, message: 'O preço deve ser maior que zero.' },
            })}
          />
          {errors.price && (
            <p className="mt-1.5 text-xs text-red-400">{errors.price.message}</p>
          )}
        </div>


        <div>
          <label htmlFor="stock" className="label">
            Estoque <span className="text-red-500">*</span>
          </label>
          <input
            id="stock"
            type="number"
            step="1"
            min="0"
            placeholder="0"
            className="input-field"
            {...register('stock', {
              required: 'O estoque é obrigatório.',
              min: { value: 0, message: 'Estoque não pode ser negativo.' },
            })}
          />
          {errors.stock && (
            <p className="mt-1.5 text-xs text-red-400">{errors.stock.message}</p>
          )}
        </div>
      </div>

   
      <div className="flex gap-3 justify-end pt-2 border-t border-surface-border">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="btn-secondary"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          {isEditing ? 'Salvar alterações' : 'Criar produto'}
        </button>
      </div>
    </form>
  );
}
