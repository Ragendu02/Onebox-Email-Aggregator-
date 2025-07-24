import express from 'express';
import bodyParser from 'body-parser';
import { startIMAP } from './imap';
import { searchEmails } from './elastic';

const app = express();
app.use(bodyParser.json());

app.get('/search', async (req, res) => {
  const q = (req.query.q as string) || '';
  const results = await searchEmails(q);
  res.json(results);
});

app.listen(4000, () => {
  console.log('✅ Backend running on http://localhost:4000');
  startIMAP();
});

