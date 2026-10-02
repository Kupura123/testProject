import { Star } from 'lucide-react';
import { useProductTheme } from '../hooks/useProductTheme';

export default function Footer() {
  const { product } = useProductTheme();

  return (
    <footer style={{ borderTop: `1px solid ${product.color}10` }}
      className="bg-dark-600/50">
      <div className="max-w-content mx-auto px-6 py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4" style={{ color: `${product.color}60` }} />
            <span className="font-display text-sm tracking-widest" style={{ color: `${product.color}80` }}>
              {product.projectName.toUpperCase()}
            </span>
          </div>
          <p className="text-xs font-serif text-center" style={{ color: '#7a607880' }}>
            追忆永续，涟漪不散
          </p>
          <div className="flex items-center gap-4 text-xs font-mono" style={{ color: '#7a607850' }}>
            <span>&copy; {new Date().getFullYear()}</span>
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: `${product.color}30` }} />
            <span>AMPHOREUS CHRONICLE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
