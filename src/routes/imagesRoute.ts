import express from 'express';
import imageService from '../services/ImageService';

const router = express.Router();

//this middleware checks if the image exists and if the width/hight parameters are valid
const validateImage = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    imageService.validateImage(req);
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

//this endpoint resizes an image by taking 3 validated parameters (image name,new width,new hight)
router.get('/resize', validateImage, async (req, res) => {
  const width = Number(req.query.width);
  const hight = Number(req.query.hight);
  const filename = req.query.filename as string;
  const imageResized = await imageService.resizeImage(width, hight, filename);
  res.status(200).contentType('image/jpg').send(imageResized);
});

export default router;
