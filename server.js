const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8015;
const secondName = 'Политыко';

const task = (x) => {
  return new Promise((resolve, reject) => {
    if (x < 13) resolve('yes');
    else reject('no');
  });
};

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/login/', (req, res) => res.set({ 'Content-Type': 'text/plain' }).send(secondName));
app.get('/login/1', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(secondName));
  res.end();
});
app.get('/login/2', (req, res) =>
  res.set({ 'Content-Type': 'application/json; charset=utf-8' }).send(JSON.stringify(secondName))
);
app.get('/login/code1', (req, res) =>
  res.set({ 'Content-Type': 'text/html' }).send('<style>strong{font-size:21px;}</style><strong>Morozov</strong>')
);
app.get('/login/code2', (req, res) =>
  res.set({ 'Content-Type': 'text/plain' }).send('<style>strong{font-size:21px;}</style><strong>Morozov</strong>')
);
app.get('/promise', (req, res) => res.send(task.toString()));
app.get('/promise/:val', async (req, res) => {
  try {
    const val = req.params.val;
    const result = await task(parseInt(val));
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});
app.get('/fetch', (req, res) =>
  res.set({ 'Content-Type': 'text/html; charset=UTF-8' }).sendFile(path.resolve(__dirname, 'fetch.html'))
);
app.get('/', (req, res) => res.status(500).sendFile(path.resolve(__dirname, 'index.html')));
app.get('*', (req, res) => res.status(404).sendFile(path.resolve(__dirname, 'error.html')));

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
