import { brand } from '../config/brand';

interface BrandLogoProps {
  className?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export function BrandLogo({ onClick, size = 'md' }: BrandLogoProps) {
  const badgeSizes = {
    sm: 'w-7 h-7 text-xs rounded-md',
    md: 'w-9 h-9 text-sm rounded-lg',
    lg: 'w-11 h-11 text-base rounded-xl',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl sm:text-3xl',
  };

  return (
    <button
      id="brand-logo-button"
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-0.5 transition-opacity"
    >
      {/* Visual Element AL */}
      <div
        className={`${badgeSizes[size]} bg-slate-900 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center font-black tracking-tighter shadow-sm group-hover:scale-[1.03] transition-all border border-slate-700/20 dark:border-white/20`}
      >
        AL
      </div>

      {/* Wordmark text */}
      <div className="flex flex-col">
        <div className={`font-extrabold ${textSizes[size]} tracking-tight text-slate-900 dark:text-white leading-none flex items-center gap-1`}>
          <span>Studio</span>
          <span className="text-blue-600 dark:text-blue-400 font-black">Tech</span>
        </div>
        {size !== 'sm' && (
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-normal mt-0.5 hidden sm:block">
            {brand.slogan}
          </span>
        )}
      </div>
    </button>
  );
}
