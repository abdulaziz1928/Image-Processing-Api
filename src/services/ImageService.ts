import fs from 'fs';
import express from 'express';
import path from 'path';
import sharp from 'sharp';

const validateImage = (req: express.Request) => {
  const hight = Number(req.query.hight);
  const width = Number(req.query.width);
  const filename = req.query.filename as string;

  const imgPath = path.resolve(__dirname, `../../images/full/${filename}.jpg`);

  if (width > 0 && hight > 0 && fs.existsSync(imgPath)) {
    return;
  } else {
    if (!fs.existsSync(imgPath)) {
      throw 'image doesnt exist';
    }
    if (width <= 0 || hight <= 0) {
      throw 'width/hight parameter(s) are invalid';
    }
    throw 'invalid request!';
  }
};

const resizeImage = async (req: express.Request) => {
  const width = Number(req.query.width);
  const hight = Number(req.query.hight);
  const filename = req.query.filename as string;
  const imgPath = path.resolve(__dirname, `../../images/full/${filename}.jpg`);
  const resizedImgPath = path.resolve(
    __dirname,
    `../../images/resized/${filename}_${width}_${hight}.jpg`
  );

  //if the resized image already exists with the same parameters in the cache it will be retrieved rather than resizing again
  if (fs.existsSync(resizedImgPath)) {
    return fs.readFileSync(resizedImgPath);
  }

  //else a new image will be resized and retrieved
  await sharp(imgPath).resize(width, hight).toFile(resizedImgPath);
  return fs.readFileSync(resizedImgPath);
};

export default { validateImage, resizeImage };
