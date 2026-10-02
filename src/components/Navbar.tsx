import { Link, useLocation } from 'react-router-dom';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProductTheme } from '../hooks/useProductTheme';
import { products } from '../data/products';

export default function Navbar() {
  const location = useLocation();
  const { product, setProduct } = useProductTheme();

  const navItems = products.map(p => ({
    to: p.path,
    label: p.projectName.toUpperCase(),
    id: p.id,
  }));

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-dark-500/90 backdrop-blur-md"
      style={{ borderBottom: `1px solid ${product.color}15` }}
    >
      <div className="max-w-content mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          onClick={() => setProduct('cyrene')}
          className="flex items-center gap-2 group"
        >
          <Star
            className="w-5 h-5 transition-all"
            style={{ color: product.color, filter: `drop-shadow(0 0 6px ${product.color}60)` }}
          />
          <span
            className="font-display text-lg font-bold tracking-widest transition-colors"
            style={{ color: product.color, filter: `drop-shadow(0 0 8px ${product.color}30)` }}
          >
            {product.projectName.toUpperCase()}
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {navItems.map(({ to, label, id }) => {
            const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
            const p = products.find(x => x.id === id)!;
            return (
              <Link
                key={id}
                to={to}
                onClick={() => setProduct(id)}
                className="relative text-sm font-display tracking-wider transition-all"
                style={{
                  color: isActive ? p.color : '#7a607880',
                  filter: isActive ? `drop-shadow(0 0 6px ${p.color}40)` : 'none',
                }}
              >
                {label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-[9px] left-0 right-0 h-[2px]"
                    style={{ backgroundColor: p.color, boxShadow: `0 0 8px ${p.color}40` }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
