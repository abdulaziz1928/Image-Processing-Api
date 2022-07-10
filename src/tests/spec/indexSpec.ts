import request from 'supertest';
import app from '../../routes/index';

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

  it('expect 5 to equal 5', () => {
    expect(5).toEqual(5);
  });
});
