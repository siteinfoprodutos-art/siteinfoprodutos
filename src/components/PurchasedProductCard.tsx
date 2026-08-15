import { Product, PurchasedProductStatus } from '../types';
import { ExternalLink, Lock } from 'lucide-react';

interface PurchasedProductCardProps {
  product: Product;
  status: PurchasedProductStatus;
}

export function PurchasedProductCard({ product, status }: PurchasedProductCardProps) {
  const isActive = status === 'active';
  
  return (
    <div className="bg-[#121212] border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
      <div className="w-full sm:w-32 aspect-video sm:aspect-square bg-[#0A0A0A] rounded-xl flex items-center justify-center border border-white/5 overflow-hidden shrink-0">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain p-2"
        />
      </div>
      
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
            {product.category}
          </span>
          {status === 'active' ? (
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
              Ativo
            </span>
          ) : (
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-400/10 px-2 py-0.5 rounded-full">
              {status === 'expired' ? 'Expirado' : 'Suspenso'}
            </span>
          )}
        </div>
        <h4 className="font-bold text-lg text-white leading-tight">{product.name}</h4>
      </div>
      
      <div className="w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
        <button 
          disabled={!isActive}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-colors ${
            isActive 
              ? 'bg-white hover:bg-slate-200 text-[#0A0A0A]' 
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          {isActive ? <ExternalLink className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          Acessar
        </button>
      </div>
    </div>
  );
}
