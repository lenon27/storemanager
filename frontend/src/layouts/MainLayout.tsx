import type { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}


export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      
      <header className="border-b border-surface-border bg-surface-card sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
          
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 3h14M2 3l1.5 9h11L16 3M2 3H1M16 3h1M6 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM12 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <span className="font-semibold text-white tracking-tight">StoreManager</span>
              <span className="hidden sm:inline text-slate-500 text-sm ml-2">Gestão de Produtos</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="badge bg-brand-900 text-brand-300">
              v1.0
            </span>
          </div>
        </div>
      </header>

    
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      
      <footer className="border-t border-surface-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-600">
          StoreManager &copy; {new Date().getFullYear()} — Gestão profissional de produtos
        </div>
      </footer>
    </div>
  );
}
