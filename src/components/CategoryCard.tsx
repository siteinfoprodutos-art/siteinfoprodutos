import { Smartphone, Cpu, LayoutTemplate, Package, ArrowRight } from 'lucide-react';
import { CategoryInfo } from '../types';

interface CategoryCardProps {
  key?: string;
  category: CategoryInfo;
  count?: number;
  isSelected?: boolean;
  onSelect: (categoryName: string) => void;
}

export function CategoryCard({ category, count, isSelected = false, onSelect }: CategoryCardProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'LayoutTemplate':
        return <LayoutTemplate className="w-5 h-5" />;
      case 'Package':
        return <Package className="w-5 h-5" />;
      default:
        return <Smartphone className="w-5 h-5" />;
    }
  };

  return (
    <button
      id={`category-card-${category.id}`}
      type="button"
      onClick={() => onSelect(category.name)}
      className={`w-full text-left p-5 sm:p-6 rounded-3xl border transition-all duration-200 flex flex-col justify-between group ${
        isSelected
          ? 'bg-white/10 text-white border-white/20 shadow-md ring-2 ring-white/10'
          : 'bg-[#121212] text-white border-white/10 hover:border-white/20 hover:shadow-md'
      }`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
              isSelected
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20'
                : 'bg-white/5 text-slate-400 border border-white/10 group-hover:bg-blue-500/10 group-hover:text-blue-400 group-hover:border-blue-500/20'
            }`}
          >
            {getIcon(category.icon)}
          </div>
          {typeof count === 'number' && (
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                isSelected
                  ? 'bg-white/20 text-white'
                  : 'bg-white/5 text-slate-400'
              }`}
            >
              {count} {count === 1 ? 'item' : 'itens'}
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          <h3
            className={`font-extrabold text-sm sm:text-base tracking-wider uppercase ${
              isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'
            }`}
          >
            {category.title}
          </h3>
          <p
            className={`text-xs sm:text-sm leading-relaxed ${
              isSelected ? 'text-slate-300' : 'text-slate-400'
            }`}
          >
            {category.description}
          </p>
        </div>
      </div>

      <div
        className={`pt-4 mt-4 border-t flex items-center justify-between text-xs font-bold ${
          isSelected
            ? 'border-white/20 text-blue-400'
            : 'border-white/10 text-slate-500 group-hover:text-white'
        }`}
      >
        <span>Ver produtos</span>
        <ArrowRight
          className={`w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform ${
            isSelected ? 'text-blue-400' : 'text-slate-500 group-hover:text-white'
          }`}
        />
      </div>
    </button>
  );
}
