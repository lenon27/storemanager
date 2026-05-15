import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import productService from '../services/productService';
import type {
  CreateProductPayload,
  PaginatedResponse,
  Product,
  UpdateProductPayload,
} from '../types';

interface UseProductsReturn {
  products: PaginatedResponse<Product> | null;
  loading: boolean;
  fetchProducts: (page?: number, pageSize?: number) => Promise<void>;
  createProduct: (payload: CreateProductPayload) => Promise<boolean>;
  updateProduct: (id: string, payload: UpdateProductPayload) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
}


export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<PaginatedResponse<Product> | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await productService.getAll({ page, pageSize });
      setProducts(response.data);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Erro ao carregar produtos.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = useCallback(async (payload: CreateProductPayload): Promise<boolean> => {
    try {
      await productService.create(payload);
      toast.success('Produto criado com sucesso!');
      return true;
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Erro ao criar produto.';
      toast.error(msg);
      return false;
    }
  }, []);

  const updateProduct = useCallback(async (id: string, payload: UpdateProductPayload): Promise<boolean> => {
    try {
      await productService.update(id, payload);
      toast.success('Produto atualizado com sucesso!');
      return true;
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Erro ao atualizar produto.';
      toast.error(msg);
      return false;
    }
  }, []);

  const deleteProduct = useCallback(async (id: string): Promise<boolean> => {
    try {
      await productService.delete(id);
      toast.success('Produto removido com sucesso!');
      return true;
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Erro ao remover produto.';
      toast.error(msg);
      return false;
    }
  }, []);

  return {
    products,
    loading,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
