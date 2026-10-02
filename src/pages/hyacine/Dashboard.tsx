import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scale, Utensils, Dumbbell, Activity, TrendingDown, Flame, Clock } from 'lucide-react';
import { hyacineApi } from '../../data/hyacine';
import { useProductTheme } from '../../hooks/useProductTheme';
import { getProductById } from '../../data/products';
import HyacineNav from '../../components/HyacineNav';

interface Stats {
  currentWeight: number;
  startWeight: number;
  weightChange: number;
  todayCalories: number;
  todayBurned: number;
  todayNet: number;
  todayMeals: number;
  todayExercise: number;
  weeklyExerciseMin: number;
  latestMetric: { bodyFat?: number; muscle?: number; bmi?: number } | undefined;
}

export default function HyacineDashboard() {
  const { setProduct } = useProductTheme();
  const product = getProductById('hyacine')!;
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => { setProduct('hyacine'); }, [setProduct]);

  useEffect(() => {
    hyacineApi.getStats().then(setStats);
  }, []);

  const c = product.color;

  const statCards = [
    { icon: Scale, label: '当前体重', value: stats ? `${stats.currentWeight}kg` : '--', sub: stats ? `${stats.weightChange > 0 ? '+' : ''}${stats.weightChange}kg` : '', link: '/hyacine/weight' },
    { icon: Flame, label: '今日摄入', value: stats ? `${stats.todayCalories}kcal` : '--', sub: `${stats?.todayMeals || 0}餐`, link: '/hyacine/meals' },
    { icon: Dumbbell, label: '今日消耗', value: stats ? `${stats.todayBurned}kcal` : '--', sub: `${stats?.todayExercise || 0}次`, link: '/hyacine/exercise' },
    { icon: Activity, label: '体脂率', value: stats?.latestMetric?.bodyFat ? `${stats.latestMetric.bodyFat}%` : '--', sub: stats?.latestMetric?.bmi ? `BMI ${stats.latestMetric.bmi}` : '', link: '/hyacine/metrics' },
  ];

  return (
    <div className="max-w-content mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold tracking-wider" style={{ color: c }}>
          HYACINE
        </h1>
        <p className="font-serif text-sm mt-1" style={{ color: `${c}80` }}>
          抚慰裂隙，守护生机
        </p>
      </div>

      <HyacineNav />

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statCards.map(({ icon: Icon, label, value, sub, link }, index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <Link
              to={link}
              className="block p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02]"
              style={{ borderColor: `${c}15`, backgroundColor: `${c}05` }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${c}30`; e.currentTarget.style.boxShadow = `0 0 20px ${c}10`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${c}15`; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4" style={{ color: `${c}80` }} />
                <span className="text-xs font-body" style={{ color: '#7a607880' }}>{label}</span>
              </div>
              <div className="font-display text-xl font-bold" style={{ color: c }}>{value}</div>
              {sub && <div className="text-xs font-body mt-1" style={{ color: '#7a607860' }}>{sub}</div>}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-xl border"
          style={{ borderColor: `${c}15`, backgroundColor: `${c}03` }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-5 h-5" style={{ color: c }} />
            <h3 className="font-display text-sm font-bold tracking-wider" style={{ color: c }}>体重趋势</h3>
          </div>
          <div className="flex items-end gap-1 h-20">
            {[82.5, 82.1, 81.8, 81.3, 80.9, 80.5, 80.2, 79.8, 79.3, 78.9, 78.5, 78.3].map((w, i) => {
              const height = ((w - 77) / 6) * 100;
              return (
                <div key={i} className="flex-1 rounded-t-sm transition-all duration-300"
                  style={{ height: `${height}%`, backgroundColor: `${c}${30 + i * 5}`, minHeight: '4px' }} />
              );
            })}
          </div>
          <div className="flex justify-between mt-2 text-[10px] font-mono" style={{ color: '#7a607850' }}>
            <span>30天前</span><span>今天</span>
          </div>
          <Link to="/hyacine/weight" className="text-xs font-body mt-3 inline-block" style={{ color: `${c}80` }}>
            查看详情 →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="p-6 rounded-xl border"
          style={{ borderColor: `${c}15`, backgroundColor: `${c}03` }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5" style={{ color: c }} />
            <h3 className="font-display text-sm font-bold tracking-wider" style={{ color: c }}>本周运动</h3>
          </div>
          <div className="font-display text-3xl font-bold mb-1" style={{ color: c }}>
            {stats?.weeklyExerciseMin || 0}
            <span className="text-sm font-body ml-1" style={{ color: '#7a607880' }}>分钟</span>
          </div>
          <div className="flex gap-1 mt-3">
            {['一', '二', '三', '四', '五', '六', '日'].map((day, i) => {
              const active = [0, 1, 2, 4, 6].includes(i);
              return (
                <div key={i} className="flex-1 text-center">
                  <div className="w-full aspect-square rounded-md mb-1 flex items-center justify-center text-[10px]"
                    style={{ backgroundColor: active ? `${c}20` : `${c}05`, color: active ? c : '#7a607840' }}>
                    {active ? '●' : '○'}
                  </div>
                  <span className="text-[10px]" style={{ color: '#7a607860' }}>{day}</span>
                </div>
              );
            })}
          </div>
          <Link to="/hyacine/exercise" className="text-xs font-body mt-3 inline-block" style={{ color: `${c}80` }}>
            查看详情 →
          </Link>
        </motion.div>
      </div>

      {/* Today's Meals Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-xl border"
        style={{ borderColor: `${c}15`, backgroundColor: `${c}03` }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Utensils className="w-5 h-5" style={{ color: c }} />
            <h3 className="font-display text-sm font-bold tracking-wider" style={{ color: c }}>今日饮食</h3>
          </div>
          <Link to="/hyacine/meals" className="text-xs font-body" style={{ color: `${c}80` }}>
            添加记录 →
          </Link>
        </div>
        <div className="space-y-2">
          {[
            { type: '早餐', desc: '全麦面包+鸡蛋+牛奶', cal: 420, time: '07:30' },
            { type: '午餐', desc: '鸡胸肉沙拉+糙米饭', cal: 550, time: '12:00' },
            { type: '晚餐', desc: '清蒸鱼+蔬菜汤', cal: 380, time: '18:30' },
          ].map((meal, i) => (
            <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg"
              style={{ backgroundColor: `${c}05` }}>
              <div className="flex items-center gap-3">
                <span className="text-xs font-body w-10" style={{ color: c }}>{meal.type}</span>
                <span className="text-sm font-body" style={{ color: '#b898b0CC' }}>{meal.desc}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono" style={{ color: '#7a607860' }}>{meal.time}</span>
                <span className="text-xs font-mono" style={{ color: `${c}80` }}>{meal.cal}kcal</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 flex justify-between text-sm" style={{ borderTop: `1px solid ${c}10` }}>
          <span className="font-body" style={{ color: '#7a607880' }}>合计</span>
          <span className="font-display font-bold" style={{ color: c }}>1350 kcal</span>
        </div>
      </motion.div>
    </div>
  );
}
