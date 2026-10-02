import express from 'express';

export function createApp() {
  const app = express();

  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'testproject-server',
      time: new Date().toISOString(),
    });
  });

  app.get('/api/products', (_req, res) => {
    res.json({
      products: [
        { id: 'cyrene', projectName: 'Cyrene', nameZh: '昔涟', role: '主页 / 记忆' },
        { id: 'hyacine', projectName: 'Hyacine', nameZh: '风堇', role: '健康管理 / 存护' },
        { id: 'cipher', projectName: 'Cipher', nameZh: '赛飞儿', role: '副业 / 欢愉' },
        { id: 'tribbie', projectName: 'Tribbie', nameZh: '缇宝', role: '日程管理 / 同谐' },
        { id: 'mydei', projectName: 'Mydei', nameZh: '万敌', role: '主业 / 巡猎' },
      ],
    });
  });

  return app;
}