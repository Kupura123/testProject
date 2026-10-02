export interface Product {
  id: string;
  projectName: string;
  nameZh: string;
  nameEn: string;
  path: string;
  pathZh: string;
  tagline: string;
  epithet: string;
  description: string;
  longDescription: string;
  coverImage: string;
  color: string;
  colorLight: string;
  colorDark: string;
  features: string[];
}

export const products: Product[] = [
  {
    id: 'cyrene',
    projectName: 'Cyrene',
    nameZh: '昔涟',
    nameEn: 'Cyrene',
    path: '/',
    pathZh: '记忆',
    tagline: 'Echo of Origin',
    epithet: '追忆永续，涟漪不散',
    description: '个人数字宇宙的总入口——在这里，记忆的涟漪连接一切',
    longDescription: 'Cyrene 是你的数字记忆中枢。所有产品在这里交汇，每一次回溯都是为了更好地前行。在记忆的涟漪中，找到连接一切的共鸣。这是你的起点，也是你的归处。',
    coverImage: 'https://aka.doubaocdn.com/s/7Ufu1wanvU',
    color: '#f24082',
    colorLight: '#f76da8',
    colorDark: '#de1d63',
    features: ['产品导航中心', '全局时间线', '记忆图谱', '跨产品搜索'],
  },
  {
    id: 'hyacine',
    projectName: 'Hyacine',
    nameZh: '风堇',
    nameEn: 'Hyacine',
    path: '/hyacine',
    pathZh: '存护',
    tagline: 'Mend the Body',
    epithet: '抚慰裂隙，守护生机',
    description: '身体健康管理与减重——以温柔而坚定的力量，守护最珍贵的资产',
    longDescription: 'Hyacine 守护你最根本的存在——身体。减重不是对抗，而是修复。当身体出现裂痕，以温柔而坚定的力量修复每一处断裂，让健康的秩序重新流动。体重追踪、饮食记录、运动计划、睡眠监测，一切为了更长久的存在。',
    coverImage: 'https://aka.doubaocdn.com/s/lq0b1wanuu',
    color: '#2ecc71',
    colorLight: '#66d9a0',
    colorDark: '#1fa85a',
    features: ['体重趋势追踪', '饮食热量记录', '运动计划编排', '睡眠质量监测', '健康报告生成'],
  },
  {
    id: 'cipher',
    projectName: 'Cipher',
    nameZh: '赛飞儿',
    nameEn: 'Cipher',
    path: '/cipher',
    pathZh: '欢愉',
    tagline: 'Outrun the Routine',
    epithet: '捷足翻越日常，速度即自由',
    description: '副业、业余学习与爱好——以极致的效率穿越日常，抵达自由的彼岸',
    longDescription: 'Cipher 是你逃离日常的密道。副业、学习、爱好——这些不属于"正轨"的事物，恰恰是最真实的自我。以极致的效率处理日常，把更多时间留给真正热爱的事。学习进度追踪、项目看板、灵感收集，在信息膨胀的时代，速度即自由。',
    coverImage: 'https://aka.doubaocdn.com/s/CyfP1wanvP',
    color: '#00b894',
    colorLight: '#00d4aa',
    colorDark: '#009975',
    features: ['学习进度追踪', '副业项目看板', '灵感速记收集', '技能树图谱', '阅读清单管理'],
  },
  {
    id: 'tribbie',
    projectName: 'Tribbie',
    nameZh: '缇宝',
    nameEn: 'Tribbie',
    path: '/tribbie',
    pathZh: '同谐',
    tagline: 'Paths in Harmony',
    epithet: '万径交汇，时序无碍',
    description: '日程管理与DDL追踪——在无数路径之间传递意图，让一切如期而至',
    longDescription: 'Tribbie 让所有日程路径和谐共振。手办发售日、项目DDL、会议安排、生日提醒——在无数路径之间传递意图，让每一个节点都能如期而至。日历视图、DDL倒计时、手办发售追踪、周期任务管理，万径交汇，时序无碍。',
    coverImage: 'https://aka.doubaocdn.com/s/uJNl1wanuk',
    color: '#0984e3',
    colorLight: '#74b9ff',
    colorDark: '#0662ad',
    features: ['日历多视图', 'DDL倒计时', '手办发售追踪', '周期任务管理', '智能提醒'],
  },
  {
    id: 'mydei',
    projectName: 'Mydei',
    nameZh: '万敌',
    nameEn: 'Mydei',
    path: '/mydei',
    pathZh: '巡猎',
    tagline: 'Hunt the Solution',
    epithet: '于纷争中淬炼，以代码加冕',
    description: '程序员主业——在代码的纷争中淬炼技艺，以解决方案加冕',
    longDescription: 'Mydei 是程序员的战场。每一次 Bug 都是对抗，每一次重构都是淬炼，每一次上线都是加冕。项目追踪、技术笔记、代码片段、面试准备——在纷争中铸就更强的形态，以解决方案加冕。这不是工作，这是征途。',
    coverImage: 'https://aka.doubaocdn.com/s/TTCP1wanuk',
    color: '#e74c3c',
    colorLight: '#ff6b6b',
    colorDark: '#c0392b',
    features: ['项目进度追踪', '技术笔记归档', '代码片段管理', '面试题库', '技术雷达'],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductByPath(path: string): Product {
  if (path === '/') return products[0];
  const product = products.find(p => p.path === path);
  return product || products[0];
}
