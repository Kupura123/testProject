import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, Plus, TrendingDown } from 'lucide-react';
import { hyacineApi, WeightRecord } from '../../data/hyacine';
import { useProductTheme } from '../../hooks/useProductTheme';
import { getProductById } from '../../data/products';
import HyacineNav from '../../components/HyacineNav';

export default function HyacineWeight() {
  const { setProduct } = useProductTheme();
  const product = getProductById('hyacine')!;
  const c = product.color;
  const [records, setRecords] = useState<WeightRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newWeight, setNewWeight] = useState('');
  const [newNote, setNewNote] = useState('');

  useEffect(() => { setProduct('hyacine'); }, [setProduct]);
  useEffect(() => { hyacineApi.getWeightRecords().then(setRecords); }, []);

  const handleAdd = async () => {
    if (!newWeight) return;
    await hyacineApi.addWeightRecord({
      date: new Date().toISOString().split('T')[0],
      weight: parseFloat(newWeight),
      note: newNote || undefined,
    });
    hyacineApi.getWeightRecords().then(setRecords);
    setNewWeight('');
    setNewNote('');
    setShowForm(false);
  };

  const minW = Math.min(...records.map(r => r.weight)) - 1;
  const maxW = Math.max(...records.map(r => r.weight)) + 1;
  const range = maxW - minW || 1;

  return (
    <div className="max-w-content mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-wider" style={{ color: c }}>体重登记</h1>
          <p className="font-serif text-sm mt-1" style={{ color: `${c}80` }}>追踪每一次变化</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-body transition-all"
          style={{ backgroundColor: `${c}15`, color: c, border: `1px solid ${c}20` }}
        >
          <Plus className="w-4 h-4" />
          记录体重
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
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="text-xs font-body mb-1 block" style={{ color: '#7a607880' }}>体重 (kg)</label>
              <input
                type="number"
                step="0.1"
                value={newWeight}
                onChange={e => setNewWeight(e.target.value)}
                placeholder="78.5"
                className="w-full px-3 py-2 rounded-lg text-sm font-mono bg-dark-500 border outline-none focus:ring-1"
                style={{ color: '#f0e0ea', borderColor: `${c}20`, '--tw-ring-color': c } as React.CSSProperties}
              />
            </div>
            <div className="flex-1">
              <label className="text-xs font-body mb-1 block" style={{ color: '#7a607880' }}>备注</label>
              <input
                type="text"
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
                placeholder="可选"
                className="w-full px-3 py-2 rounded-lg text-sm font-body bg-dark-500 border outline-none focus:ring-1"
                style={{ color: '#f0e0ea', borderColor: `${c}20` }}
              />
            </div>
            <button
              onClick={handleAdd}
              className="px-6 py-2 rounded-lg text-sm font-body self-end transition-all"
              style={{ backgroundColor: c, color: '#0d0a12' }}
            >
              保存
            </button>
          </div>
        </motion.div>
      )}

      {/* Chart */}
      <div className="mb-8 p-6 rounded-xl border" style={{ borderColor: `${c}15`, backgroundColor: `${c}03` }}>
        <div className="flex items-center gap-2 mb-4">
          <TrendingDown className="w-5 h-5" style={{ color: c }} />
          <h3 className="font-display text-sm font-bold tracking-wider" style={{ color: c }}>趋势图</h3>
        </div>
        <div className="relative h-48">
          {/* Y axis labels */}
          <div className="absolute left-0 top-0 bottom-6 w-10 flex flex-col justify-between text-right">
            <span className="text-[10px] font-mono" style={{ color: '#7a607850' }}>{maxW.toFixed(1)}</span>
            <span className="text-[10px] font-mono" style={{ color: '#7a607850' }}>{((maxW + minW) / 2).toFixed(1)}</span>
            <span className="text-[10px] font-mono" style={{ color: '#7a607850' }}>{minW.toFixed(1)}</span>
          </div>
          {/* Chart area */}
          <div className="ml-12 h-full relative">
            {/* Grid lines */}
            {[0, 0.5, 1].map(ratio => (
              <div key={ratio} className="absolute left-0 right-0" style={{ top: `${ratio * 100}%`, borderBottom: `1px solid ${c}08` }} />
            ))}
            {/* Line */}
            <svg className="absolute inset-0 w-full" style={{ height: 'calc(100% - 24px)' }} preserveAspectRatio="none" viewBox={`0 0 ${records.length * 50} 100`}>
              <polyline
                fill="none"
                stroke={c}
                strokeWidth="2"
                strokeLinejoin="round"
                points={records.map((r, i) => {
                  const x = i * 50 + 25;
                  const y = 100 - ((r.weight - minW) / range) * 100;
                  return `${x},${y}`;
                }).join(' ')}
              />
              {records.map((r, i) => {
                const x = i * 50 + 25;
                const y = 100 - ((r.weight - minW) / range) * 100;
                return <circle key={r.id} cx={x} cy={y} r="4" fill={c} />;
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Records List */}
      <div className="space-y-2">
        {records.slice().reverse().map((record, index) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            className="flex items-center justify-between p-4 rounded-lg border"
            style={{ borderColor: `${c}10`, backgroundColor: `${c}02` }}
          >
            <div className="flex items-center gap-3">
              <Scale className="w-4 h-4" style={{ color: `${c}60` }} />
              <div>
                <span className="font-display text-lg font-bold" style={{ color: c }}>{record.weight}</span>
                <span className="text-xs font-body ml-1" style={{ color: '#7a607860' }}>kg</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono" style={{ color: '#7a607860' }}>{record.date}</div>
              {record.note && <div className="text-xs font-body mt-0.5" style={{ color: '#7a607850' }}>{record.note}</div>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
