import app from './src/app';
import cors from 'cors';

app.use(cors());

const port = 3004;

app.listen(port, () => {
  console.log('Welcome the new project VHT');
  console.log('http://localhost:3004');
  console.log('click in the link');
});
