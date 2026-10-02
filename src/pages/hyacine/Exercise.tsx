import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Plus, Flame, Clock } from 'lucide-react';
import { hyacineApi, ExerciseRecord } from '../../data/hyacine';
import { useProductTheme } from '../../hooks/useProductTheme';
import { getProductById } from '../../data/products';
import HyacineNav from '../../components/HyacineNav';

const intensityMap: Record<string, { label: string; color: string }> = {
  low: { label: '低', color: '#66d9a0' },
  medium: { label: '中', color: '#f0d878' },
  high: { label: '高', color: '#e74c3c' },
};

export default function HyacineExercise() {
  const { setProduct } = useProductTheme();
  const product = getProductById('hyacine')!;
  const c = product.color;
  const [records, setRecords] = useState<ExerciseRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('');
  const [formDuration, setFormDuration] = useState('');
  const [formCal, setFormCal] = useState('');
  const [formIntensity, setFormIntensity] = useState<'low' | 'medium' | 'high'>('medium');
  const [formNote, setFormNote] = useState('');

  useEffect(() => { setProduct('hyacine'); }, [setProduct]);
  useEffect(() => { setRecords(hyacineApi.getExerciseRecords()); }, []);

  const handleAdd = async () => {
    if (!formType || !formDuration) return;
    await hyacineApi.addExerciseRecord({
      date: new Date().toISOString().split('T')[0],
      type: formType,
      duration: parseInt(formDuration),
      calories: formCal ? parseInt(formCal) : undefined,
      intensity: formIntensity,
      note: formNote || undefined,
    });
    setRecords(hyacineApi.getExerciseRecords());
    setFormType('');
    setFormDuration('');
    setFormCal('');
    setFormNote('');
    setShowForm(false);
  };

  const totalDuration = records.reduce((s, r) => s + r.duration, 0);
  const totalCalories = records.reduce((s, r) => s + (r.calories || 0), 0);

  return (
    <div className="max-w-content mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-wider" style={{ color: c }}>训练记录</h1>
          <p className="font-serif text-sm mt-1" style={{ color: `${c}80` }}>每一次淬炼都算数</p>
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

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl border" style={{ borderColor: `${c}15`, backgroundColor: `${c}05` }}>
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4" style={{ color: `${c}60` }} />
            <span className="text-xs font-body" style={{ color: '#7a607880' }}>总时长</span>
          </div>
          <span className="font-display text-xl font-bold" style={{ color: c }}>{totalDuration}</span>
          <span className="text-xs font-body ml-1" style={{ color: '#7a607860' }}>分钟</span>
        </div>
        <div className="p-4 rounded-xl border" style={{ borderColor: `${c}15`, backgroundColor: `${c}05` }}>
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-4 h-4" style={{ color: `${c}60` }} />
            <span className="text-xs font-body" style={{ color: '#7a607880' }}>总消耗</span>
          </div>
          <span className="font-display text-xl font-bold" style={{ color: c }}>{totalCalories}</span>
          <span className="text-xs font-body ml-1" style={{ color: '#7a607860' }}>kcal</span>
        </div>
      </div>

      {/* Add Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6 p-5 rounded-xl border"
          style={{ borderColor: `${c}20`, backgroundColor: `${c}05` }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
            <div>
              <label className="text-xs font-body mb-1 block" style={{ color: '#7a607880' }}>运动类型</label>
              <input type="text" value={formType} onChange={e => setFormType(e.target.value)} placeholder="跑步/力量训练..."
                className="w-full px-3 py-2 rounded-lg text-sm font-body bg-dark-500 border outline-none"
                style={{ color: '#f0e0ea', borderColor: `${c}20` }} />
            </div>
            <div>
              <label className="text-xs font-body mb-1 block" style={{ color: '#7a607880' }}>时长(分钟)</label>
              <input type="number" value={formDuration} onChange={e => setFormDuration(e.target.value)} placeholder="40"
                className="w-full px-3 py-2 rounded-lg text-sm font-mono bg-dark-500 border outline-none"
                style={{ color: '#f0e0ea', borderColor: `${c}20` }} />
            </div>
            <div>
              <label className="text-xs font-body mb-1 block" style={{ color: '#7a607880' }}>消耗(kcal)</label>
              <input type="number" value={formCal} onChange={e => setFormCal(e.target.value)} placeholder="可选"
                className="w-full px-3 py-2 rounded-lg text-sm font-mono bg-dark-500 border outline-none"
                style={{ color: '#f0e0ea', borderColor: `${c}20` }} />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as const).map(level => (
                <button key={level} onClick={() => setFormIntensity(level)}
                  className="px-3 py-2 rounded-lg text-xs font-body transition-all"
                  style={{
                    backgroundColor: formIntensity === level ? `${intensityMap[level].color}20` : `${c}05`,
                    color: formIntensity === level ? intensityMap[level].color : '#7a607880',
                    border: `1px solid ${formIntensity === level ? `${intensityMap[level].color}30` : `${c}10`}`,
                  }}>
                  {intensityMap[level].label}强度
                </button>
              ))}
            </div>
            <input type="text" value={formNote} onChange={e => setFormNote(e.target.value)} placeholder="备注(可选)"
              className="flex-1 px-3 py-2 rounded-lg text-sm font-body bg-dark-500 border outline-none"
              style={{ color: '#f0e0ea', borderColor: `${c}20` }} />
            <button onClick={handleAdd} className="px-6 py-2 rounded-lg text-sm font-body"
              style={{ backgroundColor: c, color: '#0d0a12' }}>保存</button>
          </div>
        </motion.div>
      )}

      {/* Records */}
      <div className="space-y-2">
        {records.map((record, index) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            className="flex items-center justify-between p-4 rounded-lg border"
            style={{ borderColor: `${c}10`, backgroundColor: `${c}02` }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${c}10` }}>
                <Dumbbell className="w-4 h-4" style={{ color: c }} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-body text-sm font-medium" style={{ color: '#f0e0eaCC' }}>{record.type}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                    style={{ color: intensityMap[record.intensity].color, backgroundColor: `${intensityMap[record.intensity].color}10` }}>
                    {intensityMap[record.intensity].label}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-0.5 text-xs" style={{ color: '#7a607860' }}>
                  <span className="font-mono">{record.date}</span>
                  <span>{record.duration}分钟</span>
                  {record.calories && <span>{record.calories}kcal</span>}
                </div>
                {record.note && <div className="text-xs font-body mt-0.5" style={{ color: '#7a607850' }}>{record.note}</div>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
