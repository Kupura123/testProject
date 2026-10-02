// ============ Types ============

export interface WeightRecord {
  id: string;
  date: string;
  weight: number;
  note?: string;
}

export interface MealRecord {
  id: string;
  date: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  description: string;
  calories?: number;
  imageUrl?: string;
  time: string;
}

export interface ExerciseRecord {
  id: string;
  date: string;
  type: string;
  duration: number; // minutes
  calories?: number;
  intensity: 'low' | 'medium' | 'high';
  note?: string;
}

export interface BodyMetric {
  id: string;
  date: string;
  bodyFat?: number;
  muscle?: number;
  waist?: number;
  chest?: number;
  hip?: number;
  thigh?: number;
  arm?: number;
  bmi?: number;
}

// ============ Mock Data ============

const today = new Date();
function daysAgo(n: number): string {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
}

export const mockWeightRecords: WeightRecord[] = [
  { id: 'w1', date: daysAgo(30), weight: 82.5, note: '开始记录' },
  { id: 'w2', date: daysAgo(27), weight: 82.1 },
  { id: 'w3', date: daysAgo(24), weight: 81.8 },
  { id: 'w4', date: daysAgo(21), weight: 81.3, note: '控制饮食' },
  { id: 'w5', date: daysAgo(18), weight: 80.9 },
  { id: 'w6', date: daysAgo(15), weight: 80.5 },
  { id: 'w7', date: daysAgo(12), weight: 80.2, note: '加入有氧' },
  { id: 'w8', date: daysAgo(9), weight: 79.8 },
  { id: 'w9', date: daysAgo(6), weight: 79.3 },
  { id: 'w10', date: daysAgo(3), weight: 78.9, note: '趋势良好' },
  { id: 'w11', date: daysAgo(1), weight: 78.5 },
  { id: 'w12', date: daysAgo(0), weight: 78.3 },
];

export const mockMealRecords: MealRecord[] = [
  { id: 'm1', date: daysAgo(0), type: 'breakfast', description: '全麦面包+鸡蛋+牛奶', calories: 420, time: '07:30' },
  { id: 'm2', date: daysAgo(0), type: 'lunch', description: '鸡胸肉沙拉+糙米饭', calories: 550, time: '12:00' },
  { id: 'm3', date: daysAgo(0), type: 'dinner', description: '清蒸鱼+蔬菜汤', calories: 380, time: '18:30' },
  { id: 'm4', date: daysAgo(1), type: 'breakfast', description: '燕麦粥+蓝莓', calories: 350, time: '07:45' },
  { id: 'm5', date: daysAgo(1), type: 'lunch', description: '牛肉面', calories: 680, time: '12:15' },
  { id: 'm6', date: daysAgo(1), type: 'dinner', description: '虾仁炒西兰花+杂粮饭', calories: 450, time: '19:00' },
  { id: 'm7', date: daysAgo(1), type: 'snack', description: '酸奶+坚果', calories: 180, time: '15:30' },
  { id: 'm8', date: daysAgo(2), type: 'breakfast', description: '豆浆+包子', calories: 400, time: '08:00' },
  { id: 'm9', date: daysAgo(2), type: 'lunch', description: '鸡腿饭+蔬菜', calories: 620, time: '12:30' },
  { id: 'm10', date: daysAgo(2), type: 'dinner', description: '番茄鸡蛋面', calories: 480, time: '18:45' },
];

export const mockExerciseRecords: ExerciseRecord[] = [
  { id: 'e1', date: daysAgo(0), type: '跑步', duration: 40, calories: 380, intensity: 'high', note: '5km慢跑' },
  { id: 'e2', date: daysAgo(1), type: '力量训练', duration: 60, calories: 300, intensity: 'high', note: '胸+三头' },
  { id: 'e3', date: daysAgo(2), type: '游泳', duration: 45, calories: 350, intensity: 'medium' },
  { id: 'e4', date: daysAgo(3), type: '瑜伽', duration: 30, calories: 120, intensity: 'low' },
  { id: 'e5', date: daysAgo(5), type: '跑步', duration: 35, calories: 320, intensity: 'medium' },
  { id: 'e6', date: daysAgo(7), type: '力量训练', duration: 55, calories: 280, intensity: 'high', note: '背+二头' },
  { id: 'e7', date: daysAgo(9), type: '骑行', duration: 60, calories: 400, intensity: 'medium' },
  { id: 'e8', date: daysAgo(11), type: 'HIIT', duration: 25, calories: 280, intensity: 'high' },
];

export const mockBodyMetrics: BodyMetric[] = [
  { id: 'b1', date: daysAgo(30), bodyFat: 24.5, muscle: 35.2, waist: 88, chest: 98, hip: 100, thigh: 58, arm: 32, bmi: 26.8 },
  { id: 'b2', date: daysAgo(21), bodyFat: 23.8, muscle: 35.5, waist: 86, chest: 97, hip: 99, thigh: 57, arm: 32, bmi: 26.4 },
  { id: 'b3', date: daysAgo(14), bodyFat: 23.0, muscle: 35.8, waist: 84, chest: 97, hip: 98, thigh: 57, arm: 32.5, bmi: 26.0 },
  { id: 'b4', date: daysAgo(7), bodyFat: 22.3, muscle: 36.1, waist: 83, chest: 96, hip: 97, thigh: 56, arm: 33, bmi: 25.6 },
  { id: 'b5', date: daysAgo(0), bodyFat: 21.8, muscle: 36.4, waist: 82, chest: 96, hip: 96, thigh: 56, arm: 33, bmi: 25.2 },
];

// ============ Mock API ============

let weightRecords = [...mockWeightRecords];
let mealRecords = [...mockMealRecords];
let exerciseRecords = [...mockExerciseRecords];
let bodyMetrics = [...mockBodyMetrics];

export const hyacineApi = {
  // Weight
  getWeightRecords: () => Promise.resolve([...weightRecords].sort((a, b) => a.date.localeCompare(b.date))),
  addWeightRecord: (record: Omit<WeightRecord, 'id'>) => {
    const newRecord = { ...record, id: `w${Date.now()}` };
    weightRecords.push(newRecord);
    return Promise.resolve(newRecord);
  },

  // Meals
  getMealRecords: (date?: string) => {
    let result = [...mealRecords].sort((a, b) => b.date.localeCompare(a.date));
    if (date) result = result.filter(m => m.date === date);
    return Promise.resolve(result);
  },
  addMealRecord: (record: Omit<MealRecord, 'id'>) => {
    const newRecord = { ...record, id: `m${Date.now()}` };
    mealRecords.push(newRecord);
    return Promise.resolve(newRecord);
  },

  // Exercise
  getExerciseRecords: () => [...exerciseRecords].sort((a, b) => b.date.localeCompare(a.date)),
  addExerciseRecord: (record: Omit<ExerciseRecord, 'id'>) => {
    const newRecord = { ...record, id: `e${Date.now()}` };
    exerciseRecords.push(newRecord);
    return Promise.resolve(newRecord);
  },

  // Body Metrics
  getBodyMetrics: () => [...bodyMetrics].sort((a, b) => a.date.localeCompare(b.date)),
  addBodyMetric: (metric: Omit<BodyMetric, 'id'>) => {
    const newMetric = { ...metric, id: `b${Date.now()}` };
    bodyMetrics.push(newMetric);
    return Promise.resolve(newMetric);
  },

  // Stats
  getStats: () => {
    const latest = weightRecords.sort((a, b) => b.date.localeCompare(a.date))[0];
    const first = weightRecords.sort((a, b) => a.date.localeCompare(b.date))[0];
    const todayMeals = mealRecords.filter(m => m.date === daysAgo(0));
    const todayCalories = todayMeals.reduce((sum, m) => sum + (m.calories || 0), 0);
    const todayExercise = exerciseRecords.filter(e => e.date === daysAgo(0));
    const todayBurned = todayExercise.reduce((sum, e) => sum + (e.calories || 0), 0);
    const latestMetric = bodyMetrics.sort((a, b) => b.date.localeCompare(a.date))[0];

    return Promise.resolve({
      currentWeight: latest?.weight || 0,
      startWeight: first?.weight || 0,
      weightChange: latest && first ? +(latest.weight - first.weight).toFixed(1) : 0,
      todayCalories,
      todayBurned,
      todayNet: todayCalories - todayBurned,
      todayMeals: todayMeals.length,
      todayExercise: todayExercise.length,
      latestMetric,
      weeklyExerciseMin: exerciseRecords
        .filter(e => {
          const d = new Date(e.date);
          const now = new Date();
          return (now.getTime() - d.getTime()) / 86400000 <= 7;
        })
        .reduce((sum, e) => sum + e.duration, 0),
    });
  },
};
