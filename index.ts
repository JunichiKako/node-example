import express from 'express';
import { AppDataSOurce } from './datasource';
import { error } from 'console';

const app = express();
app.use(express.json());
app.use(express.static('public'));
const PORT = 8888;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.put('/users/:id', (req, res) => {
  res.send(req.body);
});

app.delete('/users/:id', (req, res) => {
  res.send(req.params.id);
});

app.listen(PORT, () => {
  console.log('サーバーが起動しました');
});

AppDataSOurce.initialize().then((res) => {
  console.log('データベースに接続');
}).catch((error) => console.log(error))

app.get('/users/:id', (req, res) => {
  res.send(
    `User Id is ${req.params.id}.Name is ${req.query.name}.Age is ${req.query.age}`
  );
});

app.post('/', (req, res) => {
  res.send(req.body);
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
