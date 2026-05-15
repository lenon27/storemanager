import { useEffect, useState } from 'react';
import type { Product, ProductFormValues } from '../types';
import { useProducts } from '../hooks/useProducts';
import ProductTable from '../components/ProductTable';
import ProductModal from '../components/ProductModal';
import ConfirmDialog from '../components/ConfirmDialog';
import Pagination from '../components/Pagination';

const PAGE_SIZE = 10;

export default function ProductsPage() {
  
  const [currentPage, setCurrentPage] = useState(1);

  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [formLoading, setFormLoading] = useState(false);


  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | undefined>();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { products, loading, fetchProducts, createProduct, updateProduct, deleteProduct } = useProducts();

 
  useEffect(() => {
    fetchProducts(currentPage, PAGE_SIZE);
  }, [currentPage, fetchProducts]);



  function handleOpenCreate() {
    setSelectedProduct(undefined);
    setModalMode('create');
    setModalOpen(true);
  }

  function handleOpenEdit(product: Product) {
    setSelectedProduct(product);
    setModalMode('edit');
    setModalOpen(true);
  }

  function handleOpenDelete(product: Product) {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  }

  async function handleFormSubmit(values: ProductFormValues) {
    setFormLoading(true);

    const payload = {
      name: values.name.trim(),
      sku: values.sku.trim().toUpperCase(),
      category: values.category,
      price: parseFloat(values.price),
      stock: parseInt(values.stock, 10),
    };

    let success = false;

    if (modalMode === 'create') {
      success = await createProduct(payload);
    } else if (selectedProduct) {
      success = await updateProduct(selectedProduct.id, payload);
    }

    setFormLoading(false);

    if (success) {
      setModalOpen(false);
      
      if (modalMode === 'create') setCurrentPage(1);
      await fetchProducts(modalMode === 'create' ? 1 : currentPage, PAGE_SIZE);
    }
  }

  async function handleConfirmDelete() {
    if (!productToDelete) return;

    setDeleteLoading(true);
    const success = await deleteProduct(productToDelete.id);
    setDeleteLoading(false);

    if (success) {
      setDeleteDialogOpen(false);
      
      const newPage = products?.items.length === 1 && currentPage > 1
        ? currentPage - 1
        : currentPage;
      setCurrentPage(newPage);
      await fetchProducts(newPage, PAGE_SIZE);
    }
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }



  return (
    <div className="animate-fade-in">
   
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Produtos</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {products
              ? `${products.totalItems} produto${products.totalItems !== 1 ? 's' : ''} cadastrado${products.totalItems !== 1 ? 's' : ''}`
              : 'Carregando...'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="btn-primary"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Novo produto
        </button>
      </div>

  
      <div className="card p-0 overflow-hidden">
        <div className="px-6 pt-5">
          <ProductTable
            products={products?.items ?? []}
            loading={loading}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
          />
        </div>

    
        {products && products.totalPages > 0 && (
          <div className="px-6 py-4 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600">
              Página {products.currentPage} de {products.totalPages} — {products.totalItems} itens
            </p>
            <Pagination
              currentPage={products.currentPage}
              totalPages={products.totalPages}
              onPageChange={handlePageChange}
              disabled={loading}
            />
          </div>
        )}
      </div>

     
      <ProductModal
        isOpen={modalOpen}
        mode={modalMode}
        product={selectedProduct}
        onSubmit={handleFormSubmit}
        onClose={() => setModalOpen(false)}
        loading={formLoading}
      />

   
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        title="Excluir produto"
        message={`Tem certeza que deseja excluir "${productToDelete?.name}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Excluir"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteDialogOpen(false)}
        loading={deleteLoading}
      />
    </div>
  );
}
