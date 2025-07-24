import express from 'express';

const app = express();
const PORT = 8888;

app.get('/', (req, res) => {
  res.send('Hello web server');
});

app.listen(PORT, () => {
  console.log('サーバーが起動しました');
});

app.get('/users/:id', (req, res) => {
  res.send(`User Id is ${req.params.id}.Name is ${req.query.name}.Age is ${req.query.age}`);
});

app.get('/test', (req, res) => {
  res.send('Hello Test');
});

// import * as http from 'http'

// const server = http.createServer((re4q,res) => {
//   res.writeHead(200,{'content-type':'text/plain; charset=utf-8'})
//   res.end('Hello Node.js')
// })

// const PORT = 8888;
// server.listen(PORT, () => {
//   console.log('サーバーが起動しました');
// })
