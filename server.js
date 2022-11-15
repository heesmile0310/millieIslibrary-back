const dotenv = require('dotenv');
dotenv.config();

const { createApp } = require('./app');

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT;

  app.listen(PORT || 8000, () => {
    console.log(`server is listening on PORT ${PORT}`);
  });
};

startServer();
