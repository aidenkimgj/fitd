import app from './app.js';
import config from './config/index.js';

const { PORT } = config;

app.listen(PORT, () => {
  console.log(`Server On: http://localhost:${PORT}/`);
});
