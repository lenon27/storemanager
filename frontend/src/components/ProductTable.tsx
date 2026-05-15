import type { Product } from '../types';
import { formatCurrency, formatDate } from '../utils';
import Spinner from './Spinner';

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const categoryColors: Record<string, string> = {
  'Eletrônicos': 'bg-blue-900/40 text-blue-300 border-blue-800',
  'Roupas':      'bg-purple-900/40 text-purple-300 border-purple-800',
  'Alimentos':   'bg-green-900/40 text-green-300 border-green-800',
  'Livros':      'bg-amber-900/40 text-amber-300 border-amber-800',
  'Móveis':      'bg-orange-900/40 text-orange-300 border-orange-800',
  'Esportes':    'bg-cyan-900/40 text-cyan-300 border-cyan-800',
  'Beleza':      'bg-pink-900/40 text-pink-300 border-pink-800',
  'Brinquedos':  'bg-yellow-900/40 text-yellow-300 border-yellow-800',
  'Ferramentas': 'bg-red-900/40 text-red-300 border-red-800',
};

function getCategoryColor(category: string): string {
  return categoryColors[category] ?? 'bg-slate-800 text-slate-400 border-slate-700';
}


export default function ProductTable({
  products,
  loading,
  onEdit,
  onDelete,
}: ProductTableProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Spinner size="lg" />
        <p className="text-slate-500 text-sm">Carregando produtos...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-16 h-16 rounded-2xl bg-surface-card border border-surface-border flex items-center justify-center">
          <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-slate-300 font-medium">Nenhum produto encontrado</p>
          <p className="text-slate-600 text-sm mt-1">Clique em "Novo produto" para começar.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-surface-border text-left">
            <th className="pb-3 pr-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Nome</th>
            <th className="pb-3 pr-4 text-xs font-medium text-slate-500 uppercase tracking-wider">SKU</th>
            <th className="pb-3 pr-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Categoria</th>
            <th className="pb-3 pr-4 text-xs font-medium text-slate-500 uppercase tracking-wider text-right">Preço</th>
            <th className="pb-3 pr-4 text-xs font-medium text-slate-500 uppercase tracking-wider text-right">Estoque</th>
            <th className="pb-3 pr-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Criado em</th>
            <th className="pb-3 text-xs font-medium text-slate-500 uppercase tracking-wider text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-border">
          {products.map((product) => (
            <tr
              key={product.id}
              className="group hover:bg-surface-card/50 transition-colors"
            >
          
              <td className="py-3.5 pr-4">
                <span className="font-medium text-slate-100 group-hover:text-white transition-colors">
                  {product.name}
                </span>
              </td>

            
              <td className="py-3.5 pr-4">
                <code className="text-xs bg-surface-border px-2 py-0.5 rounded text-slate-300 font-mono">
                  {product.sku}
                </code>
              </td>

           
              <td className="py-3.5 pr-4">
                <span className={`badge border ${getCategoryColor(product.category)}`}>
                  {product.category}
                </span>
              </td>

             
              <td className="py-3.5 pr-4 text-right font-medium text-brand-400">
                {formatCurrency(product.price)}
              </td>

             
              <td className="py-3.5 pr-4 text-right">
                <span className={`font-medium ${product.stock === 0 ? 'text-red-400' : product.stock <= 5 ? 'text-amber-400' : 'text-slate-200'}`}>
                  {product.stock}
                </span>
              </td>

             
              <td className="py-3.5 pr-4 text-slate-500 text-xs">
                {formatDate(product.createdAt)}
              </td>

             
              <td className="py-3.5 text-right">
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => onEdit(product)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500
                               hover:bg-brand-900 hover:text-brand-400 transition-colors"
                    aria-label={`Editar ${product.name}`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(product)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500
                               hover:bg-red-900/30 hover:text-red-400 transition-colors"
                    aria-label={`Excluir ${product.name}`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
