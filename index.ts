import express from 'express';
import { AppDataSource } from './datasource';
import { error } from 'console';
import { User } from './user.entity';

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

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const user = new User();
  user.name = name;
  user.email = email;

  const userRepository = AppDataSource.getRepository(User);
  const newUser = await userRepository.save(user);
  res.json(newUser);
});

app.listen(PORT, () => {
  console.log('サーバーが起動しました');
});

AppDataSource.initialize()
  .then(res => {
    console.log('データベースに接続');
  })
  .catch(error => console.log(error));

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
