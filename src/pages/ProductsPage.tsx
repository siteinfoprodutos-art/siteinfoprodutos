import { useState, useMemo, useEffect } from 'react';
import { Search, PackageOpen, Sparkles, Filter, ArrowDownUp } from 'lucide-react';
import { products as allProducts, categories } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { SEO } from '../components/SEO';

interface ProductsPageProps {
  initialCategory?: string;
  onSelectProduct: (slug: string) => void;
}

type SortOption = 'recent' | 'price_asc' | 'price_desc' | 'name_asc';

export function ProductsPage({ initialCategory, onSelectProduct }: ProductsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'Todos');
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  // Sync initialCategory change
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const activeProducts = useMemo(() => allProducts.filter(p => p.active), []);

  // Available categories to show as filter pills (excluding 'Todos' which is rendered separately)
  const availableCategories = useMemo(() => {
    return categories.filter(c => c.name.toLowerCase() !== 'todos');
  }, []);

  const filteredProducts = useMemo(() => {
    let result = activeProducts.filter((product) => {
      // Category match
      const selectedCatLower = selectedCategory.toLowerCase();
      const categoryMatch =
        selectedCategory === 'Todos' ||
        selectedCatLower === 'todos' ||
        product.category.toLowerCase() === selectedCatLower ||
        (product.categoriesList && product.categoriesList.some(c => c.toLowerCase() === selectedCatLower));

      // Search match
      const query = searchQuery.trim().toLowerCase();
      const searchMatch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.shortDescription.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        (product.categoriesList && product.categoriesList.some(c => c.toLowerCase().includes(query)));

      return categoryMatch && searchMatch;
    });

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'name_asc':
          return a.name.localeCompare(b.name);
        case 'recent':
        default:
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
      }
    });

    return result;
  }, [activeProducts, searchQuery, selectedCategory, sortBy]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    try {
      const url = new URL(window.location.href);
      if (cat === 'Todos') {
        url.searchParams.delete('categoria');
      } else {
        url.searchParams.set('categoria', cat);
      }
      window.history.replaceState({}, '', url.toString());
    } catch {
      // ignore in iframe if error
    }
  };

  return (
    <div id="products-catalog-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-in fade-in duration-300">
      <SEO
        title="Produtos Digitais"
        description="Explore aplicativos, templates e ferramentas digitais da AL Studio Tech."
        canonical="/produtos"
      />

      {/* Catalog Header */}
      <div className="space-y-2.5">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Catálogo de Produtos</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Explore nossas ferramentas
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl">
          Aplicativos, planilhas e recursos digitais criados para tornar tarefas do dia a dia mais simples.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#121824] p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 md:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="product-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Busque por nome ou funcionalidade..."
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Sort Selection */}
          <div className="flex items-center gap-2">
            <ArrowDownUp className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-slate-50 dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-medium"
            >
              <option value="recent">Mais recentes</option>
              <option value="price_asc">Menor preço</option>
              <option value="price_desc">Maior preço</option>
              <option value="name_asc">Nome A–Z</option>
            </select>
          </div>
        </div>

        {/* Category Pills & Results Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1 mr-2 shrink-0">
              <Filter className="w-3.5 h-3.5" />
              <span>Filtro:</span>
            </span>
            
            <button
              id="filter-tab-todos"
              type="button"
              onClick={() => handleCategoryChange('Todos')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === 'Todos'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40'
                  : 'bg-transparent border border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Todos
            </button>

            {availableCategories.map((cat) => {
              const isSelected = selectedCategory === cat.name;
              return (
                <button
                  key={cat.id}
                  id={`filter-tab-${cat.name}`}
                  type="button"
                  onClick={() => handleCategoryChange(cat.name)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40'
                      : 'bg-transparent border border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap sm:pl-4">
            {filteredProducts.length === 1
              ? '1 produto encontrado'
              : `${filteredProducts.length} produtos encontrados`}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div
          id="products-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div
          id="products-empty-state"
          className="text-center py-16 px-4 bg-white dark:bg-[#121824] rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in"
        >
          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 mx-auto flex items-center justify-center">
            <PackageOpen className="w-6 h-6" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Nenhum produto encontrado
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tente buscar outro termo ou selecionar uma categoria diferente.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              handleCategoryChange('Todos');
            }}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 text-xs font-bold rounded-xl transition-colors"
          >
            Ver todos os produtos
          </button>
        </div>
      )}
    </div>
  );
}
