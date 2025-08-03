import express from 'express';
import { AppDataSource } from './datasource';
import { User } from './user.entity';

const app = express();
app.use(express.json());
app.use(express.static('public'));
const PORT = 8888;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/', (req, res) => {
  res.send(req.body);
});

app.get('/test', (req, res) => {
  res.send('Hello Test');
});

// Users CRUD
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User();
    user.name = name;
    user.email = email;

    const userRepository = AppDataSource.getRepository(User);
    const newUser = await userRepository.save(user);
    res.json(newUser);
  } catch (error) {
    console.error('POST error:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    console.error('GET users error:', error);
    res.status(500).json({ error: 'Failed to get users' });
  }
});

// 重複を削除して1つだけにする
app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: parseInt(id) });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('GET user error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

app.put('/users/:id', async (req, res) => {
  console.log('=== PUT Request Started ===');
  console.log('ID:', req.params.id);
  console.log('Body:', req.body);

  try {
    const { id } = req.params;
    const { name, email } = req.body;

    console.log('Getting repository...');
    const userRepository = AppDataSource.getRepository(User);

    console.log('Finding existing user...');
    const existingUser = await userRepository.findOneBy({ id: parseInt(id) });

    if (!existingUser) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('Updating user data...');
    existingUser.name = name;
    existingUser.email = email;

    console.log('Saving to database...');
    const updatedUser = await userRepository.save(existingUser);

    console.log('Success! Sending response...');
    res.json(updatedUser);
    console.log('=== PUT Request Completed ===');
  } catch (error) {
    console.error('=== PUT Error ===', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.delete(parseInt(id));
    res.json({ message: 'User deleted', id });
  } catch (error) {
    console.error('DELETE error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// データベース接続
AppDataSource.initialize()
  .then(() => {
    console.log('データベースに接続');
  })
  .catch(error => console.log('DB Error:', error));

// サーバー起動
app.listen(PORT, () => {
  console.log(`サーバーが起動しました: http://localhost:${PORT}`);
});
