import express from 'express';
const app = express();
app.get('/', (req, res) => res.send('OK'));
if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 3001, () => console.log('API listening'));
}
export default app;

