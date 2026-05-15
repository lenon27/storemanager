

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  createdAt: string;
}

export interface CreateProductPayload {
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
}

export type UpdateProductPayload = CreateProductPayload;



export interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}



export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
}



export interface ProductFormValues {
  name: string;
  sku: string;
  category: string;
  price: string;   
  stock: string;
}



export interface PaginationParams {
  page: number;
  pageSize: number;
}
