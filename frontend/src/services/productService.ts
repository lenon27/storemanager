import api from './api';
import type {
  ApiResponse,
  CreateProductPayload,
  PaginatedResponse,
  PaginationParams,
  Product,
  UpdateProductPayload,
} from '../types';


const productService = {
 
  async getAll(params: PaginationParams): Promise<ApiResponse<PaginatedResponse<Product>>> {
    const { data } = await api.get<ApiResponse<PaginatedResponse<Product>>>('/api/products', {
      params: { page: params.page, pageSize: params.pageSize },
    });
    return data;
  },


  async getById(id: string): Promise<ApiResponse<Product>> {
    const { data } = await api.get<ApiResponse<Product>>(`/api/products/${id}`);
    return data;
  },


  async create(payload: CreateProductPayload): Promise<ApiResponse<Product>> {
    const { data } = await api.post<ApiResponse<Product>>('/api/products', payload);
    return data;
  },

 
  async update(id: string, payload: UpdateProductPayload): Promise<ApiResponse<Product>> {
    const { data } = await api.put<ApiResponse<Product>>(`/api/products/${id}`, payload);
    return data;
  },

  
  async delete(id: string): Promise<void> {
    await api.delete(`/api/products/${id}`);
  },
};

export default productService;
