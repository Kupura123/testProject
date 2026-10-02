import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Scale, Utensils, Dumbbell, Activity } from 'lucide-react';
import { getProductById } from '../data/products';

const subNav = [
  { to: '/hyacine', label: '概览', icon: LayoutDashboard, exact: true },
  { to: '/hyacine/weight', label: '体重', icon: Scale },
  { to: '/hyacine/meals', label: '饮食', icon: Utensils },
  { to: '/hyacine/exercise', label: '训练', icon: Dumbbell },
  { to: '/hyacine/metrics', label: '指标', icon: Activity },
];

export default function HyacineNav() {
  const location = useLocation();
  const product = getProductById('hyacine')!;
  const c = product.color;

  return (
    <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-1">
      {subNav.map(({ to, label, icon: Icon, exact }) => {
        const isActive = exact ? location.pathname === to : location.pathname.startsWith(to);
        return (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body whitespace-nowrap transition-all"
            style={{
              backgroundColor: isActive ? `${c}15` : 'transparent',
              color: isActive ? c : '#7a607880',
              border: isActive ? `1px solid ${c}20` : '1px solid transparent',
            }}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </Link>
        );
      })}
    </div>
  );
}
