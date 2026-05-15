import type { Product, ProductFormValues } from '../types';
import ProductForm from './ProductForm';

interface ProductModalProps {
  isOpen: boolean;
  mode: 'create' | 'edit';
  product?: Product;
  onSubmit: (values: ProductFormValues) => Promise<void>;
  onClose: () => void;
  loading?: boolean;
}


export default function ProductModal({
  isOpen,
  mode,
  product,
  onSubmit,
  onClose,
  loading = false,
}: ProductModalProps) {
  if (!isOpen) return null;

  const title = mode === 'create' ? 'Novo produto' : 'Editar produto';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="card w-full max-w-lg animate-slide-up overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
      
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-brand-900 flex items-center justify-center">
              {mode === 'create' ? (
                <svg className="w-3.5 h-3.5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              )}
            </div>
            <h2 className="font-semibold text-white">{title}</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500
                       hover:text-slate-300 hover:bg-surface-border transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

      
        <div className="px-6 py-5">
          <ProductForm
            initialData={product}
            onSubmit={onSubmit}
            onCancel={onClose}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
