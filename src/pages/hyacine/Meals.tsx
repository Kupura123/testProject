import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Plus, Camera } from 'lucide-react';
import { hyacineApi, MealRecord } from '../../data/hyacine';
import { useProductTheme } from '../../hooks/useProductTheme';
import { getProductById } from '../../data/products';
import HyacineNav from '../../components/HyacineNav';

const mealTypeMap: Record<string, string> = {
  breakfast: '早餐',
  lunch: '午餐',
  dinner: '晚餐',
  snack: '加餐',
};

export default function HyacineMeals() {
  const { setProduct } = useProductTheme();
  const product = getProductById('hyacine')!;
  const c = product.color;
  const [records, setRecords] = useState<MealRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');
  const [formDesc, setFormDesc] = useState('');
  const [formCal, setFormCal] = useState('');
  const [formTime, setFormTime] = useState('');

  useEffect(() => { setProduct('hyacine'); }, [setProduct]);
  useEffect(() => { hyacineApi.getMealRecords().then(setRecords); }, []);

  const handleAdd = async () => {
    if (!formDesc) return;
    await hyacineApi.addMealRecord({
      date: new Date().toISOString().split('T')[0],
      type: formType,
      description: formDesc,
      calories: formCal ? parseInt(formCal) : undefined,
      time: formTime || new Date().toTimeString().slice(0, 5),
    });
    hyacineApi.getMealRecords().then(setRecords);
    setFormDesc('');
    setFormCal('');
    setFormTime('');
    setShowForm(false);
  };

  // Group by date
  const grouped = records.reduce<Record<string, MealRecord[]>>((acc, r) => {
    if (!acc[r.date]) acc[r.date] = [];
    acc[r.date].push(r);
    return acc;
  }, {});

  return (
    <div className="max-w-content mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-wider" style={{ color: c }}>三餐记录</h1>
          <p className="font-serif text-sm mt-1" style={{ color: `${c}80` }}>每一餐都值得被记住</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-body transition-all"
          style={{ backgroundColor: `${c}15`, color: c, border: `1px solid ${c}20` }}
        >
          <Plus className="w-4 h-4" />
          添加记录
        </button>
      </div>

      <HyacineNav />

      {/* Add Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6 p-5 rounded-xl border"
          style={{ borderColor: `${c}20`, backgroundColor: `${c}05` }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map(type => (
              <button
                key={type}
                onClick={() => setFormType(type)}
                className="px-3 py-2 rounded-lg text-sm font-body transition-all"
                style={{
                  backgroundColor: formType === type ? `${c}20` : `${c}05`,
                  color: formType === type ? c : '#7a607880',
                  border: `1px solid ${formType === type ? `${c}30` : `${c}10`}`,
                }}
              >
                {mealTypeMap[type]}
              </button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={formDesc}
                onChange={e => setFormDesc(e.target.value)}
                placeholder="吃了什么..."
                className="w-full px-3 py-2 rounded-lg text-sm font-body bg-dark-500 border outline-none"
                style={{ color: '#f0e0ea', borderColor: `${c}20` }}
              />
            </div>
            <div className="w-28">
              <input
                type="number"
                value={formCal}
                onChange={e => setFormCal(e.target.value)}
                placeholder="kcal"
                className="w-full px-3 py-2 rounded-lg text-sm font-mono bg-dark-500 border outline-none"
                style={{ color: '#f0e0ea', borderColor: `${c}20` }}
              />
            </div>
            <div className="w-24">
              <input
                type="time"
                value={formTime}
                onChange={e => setFormTime(e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm font-mono bg-dark-500 border outline-none"
                style={{ color: '#f0e0ea', borderColor: `${c}20` }}
              />
            </div>
            <button
              onClick={handleAdd}
              className="px-6 py-2 rounded-lg text-sm font-body transition-all"
              style={{ backgroundColor: c, color: '#0d0a12' }}
            >
              保存
            </button>
          </div>
        </motion.div>
      )}

      {/* Records by Date */}
      {Object.entries(grouped).map(([date, meals], gi) => {
        const totalCal = meals.reduce((s, m) => s + (m.calories || 0), 0);
        return (
          <div key={date} className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs" style={{ color: '#7a607860' }}>{date}</span>
              <span className="font-mono text-xs" style={{ color: `${c}60` }}>合计 {totalCal} kcal</span>
            </div>
            <div className="space-y-2">
              {meals.map((meal, i) => (
                <motion.div
                  key={meal.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: gi * 0.05 + i * 0.03 }}
                  className="flex items-center justify-between p-4 rounded-lg border"
                  style={{ borderColor: `${c}10`, backgroundColor: `${c}02` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${c}10` }}>
                      <Utensils className="w-4 h-4" style={{ color: c }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-body" style={{ color: c }}>{mealTypeMap[meal.type]}</span>
                        <span className="text-xs font-mono" style={{ color: '#7a607850' }}>{meal.time}</span>
                      </div>
                      <div className="text-sm font-body mt-0.5" style={{ color: '#b898b0CC' }}>{meal.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    {meal.calories && (
                      <span className="font-mono text-sm" style={{ color: c }}>{meal.calories}</span>
                    )}
                    {meal.calories && <span className="text-xs font-body ml-0.5" style={{ color: '#7a607860' }}>kcal</span>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
