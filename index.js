const createServer = require('http').createServer;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const SocketServer = require('socket.io').Server;

const app = express();

app.use(morgan('tiny'))
  .use(express.urlencoded({ extended: false }))
  .use(cors())
  .use(bodyParser.json())
;

const server = createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: 'http://localhost:8080',
  }
});

app.get('/', (req, res) => {
  res.json({
    message: 'Yessss',
  });
});

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening -- ${port}`);
});
