import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  describe('/ (POST)', () => {
    it('Behaves in the expected manner when given the right data', async () => {
      jest.setTimeout(30000);

      const response = await request(app.getHttpServer())
        .post('/get-closest-neo')
        .send({
          start_date: '2022-05-01',
          end_date: '2022-05-01',
        })
        .expect(201);

      expect(response.body).toEqual({
        id: expect.any(String),
        estimated_diameter_km: {
          max: expect.any(Number),
          min: expect.any(Number),
        },
        miss_distance_km: expect.any(String),
        name: expect.any(String),
        nasa_url: expect.any(String),
      });
    });

    it('Replies with status code 400 when doing an invalid query', () => {
      jest.setTimeout(10000);

      return request(app.getHttpServer())
        .post('/get-closest-neo')
        .send({
          start_date: 'invalid',
        })
        .expect(400);
    });
  });
});
