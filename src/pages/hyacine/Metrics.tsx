import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Plus, TrendingDown, TrendingUp } from 'lucide-react';
import { hyacineApi, BodyMetric } from '../../data/hyacine';
import { useProductTheme } from '../../hooks/useProductTheme';
import { getProductById } from '../../data/products';
import HyacineNav from '../../components/HyacineNav';

const metricLabels: Record<string, { label: string; unit: string; icon: string }> = {
  bodyFat: { label: '体脂率', unit: '%', icon: '🔥' },
  muscle: { label: '肌肉量', unit: 'kg', icon: '💪' },
  bmi: { label: 'BMI', unit: '', icon: '📊' },
  waist: { label: '腰围', unit: 'cm', icon: '📏' },
  chest: { label: '胸围', unit: 'cm', icon: '📐' },
  hip: { label: '臀围', unit: 'cm', icon: '📐' },
  thigh: { label: '大腿围', unit: 'cm', icon: '📐' },
  arm: { label: '臂围', unit: 'cm', icon: '📐' },
};

export default function HyacineMetrics() {
  const { setProduct } = useProductTheme();
  const product = getProductById('hyacine')!;
  const c = product.color;
  const [metrics, setMetrics] = useState<BodyMetric[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<BodyMetric>>({});

  useEffect(() => { setProduct('hyacine'); }, [setProduct]);
  useEffect(() => { setMetrics(hyacineApi.getBodyMetrics()); }, []);

  const handleAdd = async () => {
    await hyacineApi.addBodyMetric({
      date: new Date().toISOString().split('T')[0],
      ...form,
    } as Omit<BodyMetric, 'id'>);
    setMetrics(hyacineApi.getBodyMetrics());
    setForm({});
    setShowForm(false);
  };

  const latest = metrics[metrics.length - 1];
  const previous = metrics.length > 1 ? metrics[metrics.length - 2] : undefined;

  function getChange(key: keyof BodyMetric): { value: number; direction: 'up' | 'down' | 'same' } | null {
    if (!latest || !previous) return null;
    const l = latest[key] as number | undefined;
    const p = previous[key] as number | undefined;
    if (l == null || p == null) return null;
    const diff = +(l - p).toFixed(1);
    return { value: diff, direction: diff > 0 ? 'up' : diff < 0 ? 'down' : 'same' };
  }

  const keyMetrics = ['bodyFat', 'muscle', 'bmi', 'waist'] as const;

  return (
    <div className="max-w-content mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-wider" style={{ color: c }}>身体指标</h1>
          <p className="font-serif text-sm mt-1" style={{ color: `${c}80` }}>观测每一次蜕变</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-body transition-all"
          style={{ backgroundColor: `${c}15`, color: c, border: `1px solid ${c}20` }}
        >
          <Plus className="w-4 h-4" />
          记录指标
        </button>
      </div>

      <HyacineNav />

      {/* Key Metrics Cards */}
      {latest && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {keyMetrics.map((key, index) => {
            const info = metricLabels[key];
            const val = latest[key] as number | undefined;
            const change = getChange(key);
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="p-4 rounded-xl border"
                style={{ borderColor: `${c}15`, backgroundColor: `${c}05` }}
              >
                <div className="text-lg mb-1">{info.icon}</div>
                <div className="text-xs font-body mb-1" style={{ color: '#7a607880' }}>{info.label}</div>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-xl font-bold" style={{ color: c }}>
                    {val ?? '--'}
                  </span>
                  <span className="text-xs font-body" style={{ color: '#7a607860' }}>{info.unit}</span>
                </div>
                {change && change.direction !== 'same' && (
                  <div className="flex items-center gap-1 mt-1">
                    {change.direction === 'down' ? (
                      <TrendingDown className="w-3 h-3" style={{ color: key === 'bodyFat' || key === 'waist' || key === 'bmi' ? '#2ecc71' : '#e74c3c' }} />
                    ) : (
                      <TrendingUp className="w-3 h-3" style={{ color: key === 'muscle' ? '#2ecc71' : '#e74c3c' }} />
                    )}
                    <span className="text-[10px] font-mono" style={{ color: '#7a607860' }}>
                      {change.direction === 'up' ? '+' : ''}{change.value}{info.unit}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Add Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6 p-5 rounded-xl border"
          style={{ borderColor: `${c}20`, backgroundColor: `${c}05` }}
        >
          <h4 className="font-body text-sm mb-3" style={{ color: c }}>录入身体指标</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(metricLabels).map(([key, info]) => (
              <div key={key}>
                <label className="text-[10px] font-body mb-1 block" style={{ color: '#7a607880' }}>
                  {info.icon} {info.label} ({info.unit})
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={(form as Record<string, number | undefined>)[key] ?? ''}
                  onChange={e => setForm({ ...form, [key]: e.target.value ? parseFloat(e.target.value) : undefined })}
                  placeholder="--"
                  className="w-full px-3 py-2 rounded-lg text-sm font-mono bg-dark-500 border outline-none"
                  style={{ color: '#f0e0ea', borderColor: `${c}20` }}
                />
              </div>
            ))}
          </div>
          <button onClick={handleAdd} className="mt-4 px-6 py-2 rounded-lg text-sm font-body"
            style={{ backgroundColor: c, color: '#0d0a12' }}>保存</button>
        </motion.div>
      )}

      {/* History Table */}
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: `${c}15` }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: `${c}08` }}>
                <th className="text-left px-4 py-3 font-mono text-xs" style={{ color: c }}>日期</th>
                {Object.entries(metricLabels).map(([key, info]) => (
                  <th key={key} className="text-right px-3 py-3 font-body text-xs" style={{ color: `${c}80` }}>
                    {info.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metrics.slice().reverse().map((m, i) => (
                <motion.tr
                  key={m.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-t"
                  style={{ borderColor: `${c}08` }}
                >
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: '#7a607880' }}>{m.date}</td>
                  {Object.keys(metricLabels).map(key => (
                    <td key={key} className="text-right px-3 py-3 font-mono text-xs" style={{ color: '#b898b0CC' }}>
                      {((m as unknown) as Record<string, number | string | undefined>)[key] ?? '-'}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
