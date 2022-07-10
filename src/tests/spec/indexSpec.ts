import fs from 'fs';
import path from 'path';
import request from 'supertest';
import app from '../../routes/index';
import imageService from '../../services/ImageService';

describe('testing image resize endpoint', async () => {
  it('GET /images/resize should return a status code 200 (success) if image exists', async () => {
    const width = 50;
    const hight = 50;
    const filename = 'fjord';
    const res = await request(app).get(
      `/images/resize?width=${width}&hight=${hight}&filename=${filename}`
    );

    expect(res.statusCode).toEqual(200);
  });
  it('GET /images/resize should return a resized image if image exists', async () => {
    const width = 50;
    const hight = 50;
    const filename = 'fjord';
    const res = await request(app).get(
      `/images/resize?width=${width}&hight=${hight}&filename=${filename}`
    );
    expect(res.noContent).toBeFalse();
  });
  it('GET /images/resize should return a status code 400 (bad request) if image doesnt exist', async () => {
    const width = 50;
    const hight = 50;
    const filename = 'test';
    const res = await request(app).get(
      `/images/resize?width=${width}&hight=${hight}&filename=${filename}`
    );

    expect(res.statusCode).toEqual(400);
  });
  it('GET /images/resize should return a status code 400 (bad request) if width/hight parameter(s) are invalid', async () => {
    const width = -2;
    const hight = -3;
    const filename = 'fjord';
    const res = await request(app).get(
      `/images/resize?width=${width}&hight=${hight}&filename=${filename}`
    );

    expect(res.statusCode).toEqual(400);
  });
});

describe('image proccessing', async () => {
  it('resizeImage function should create a new resized image', async () => {
    const width = 100;
    const hight = 100;
    const filename = 'fjord';
    const resizedImgPath = path.resolve(
      __dirname,
      `../../../images/resized/${filename}_${width}_${hight}.jpg`
    );

    //if the resized image already exists, it will get deleted to test that the resizeImage function generates new resized images
    if (fs.existsSync(resizedImgPath)) {
      fs.unlinkSync(resizedImgPath);
    }
    await imageService.resizeImage(width, hight, filename);
    expect(fs.existsSync(resizedImgPath)).toBeTrue();
  });
});
