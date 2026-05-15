
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(iso));
}


export const CATEGORIES = [
  'Eletrônicos',
  'Roupas',
  'Alimentos',
  'Livros',
  'Móveis',
  'Esportes',
  'Beleza',
  'Brinquedos',
  'Ferramentas',
  'Outros',
] as const;

export type Category = (typeof CATEGORIES)[number];
