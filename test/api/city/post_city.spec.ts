/* eslint-disable */
import request from 'supertest';
import container from 'container';

const server: any = container.resolve('server');

const { cityRepository, usersRepository } = container.resolve('repository');

const rqt: any = request(server.app);

describe('Routes: GET cityEntity', () => {
  const BASE_URI = '/api/city';

  // @ts-ignore
  const signIn = container.resolve('jwt').signin();
  let token: any;

  beforeEach((done) => {
    usersRepository
      .destroy({ where: {},
        truncate : true,
        cascade: false,
        restartIdentity: true })
      .then(() =>
        usersRepository.create({
          first_name: 'John',
          last_name: 'Doe',
          password: 'test',
          role_id: 1,
          verification_code: 'EB309B5A5079FEE895B20954A390910F5E3AB4B909',
          is_verified: 1,
          is_deleted: 0,
          created_by: 11,
          updated_by: 11
        })
      ).then((user: { user_id: any; first_name: any; last_name: any; email: any; }) => {

      token = signIn({
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      })
      done();
    })
  });

  describe('Should return product', () => {
    beforeEach((done) => {
      cityRepository
        .destroy({ where: {},
          truncate : true,
          cascade: false,
          restartIdentity: true })
        .then(() => done());
    });

    it('should return create product', (done) => {

      const CITY = {
        country_id: 1,
        city_name: 'City 235235',
      };

      rqt.post(BASE_URI)
        .set('Authorization', `Bearer ${token}`)
        .send(CITY)
        .expect(200)
        .end((err: any, res: { body: { success: boolean; data: any; }; }) => {
          expect(res.body.success).toBeTruthy();
          expect(res.body.data.city_id).toEqual(1);
          expect(res.body.data.country_id).toEqual(CITY.country_id);
          expect(res.body.data.city_name).toEqual(CITY.city_name);
          done();
        });
    });

    it('should return unauthorized if no token', (done) => {
      rqt.post(BASE_URI)
        .expect(401)
        .end((err: any, res: { text: any; }) => {
          const result = JSON.parse(res.text);
          expect(err).toEqual(null);
          expect(result.error.success).toBeFalsy();
          expect(result.error.message).toEqual('No token provided.');
          done(err)
        })
    })
  })
})
