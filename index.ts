import * as http from 'http'

const server = http.createServer((re4q,res) => {
  res.writeHead(200,{'content-type':'text/plain; charset=utf-8'})
  res.end('Hello Node.js')
})

const PORT = 8888;
server.listen(PORT, () => {
  console.log('サーバーが起動しました');
})