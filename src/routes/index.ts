import express from 'express';
import imageRouter from './imagesRoute';

const app = express();
const port = 3000;

app.use('/images', imageRouter);

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});

export default app;
