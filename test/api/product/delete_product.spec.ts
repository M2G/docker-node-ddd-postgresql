/* eslint-disable */
import request from 'supertest';
import container from 'container';

const server: any = container.resolve('server');

const { cityRepository, usersRepository } = container.resolve('repository');

const rqt: any = request(server.app);

describe('Routes: DELETE cityEntity', () => {
  const BASE_URI = `/api/city`;

  // @ts-ignore
  const signIn = container.resolve('jwt').signin();
  let token: any;

  beforeEach( (done) => {
    // we need to add user before we can request our token
    usersRepository
      .destroy({ where: {},
        truncate : true,
        cascade: false,
        restartIdentity: true })
      .then(() =>
        usersRepository.create({
          user_id: 1,
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

  describe('Should DELETE City', () => {

    let cityId: number | any;

    beforeEach((done) => {

      const CITY = {
        country_id: 1,
        city_id: 1,
        city_name: 'Product 235235',
      }

      cityRepository
        .destroy({ where: {},
          truncate : true,
          cascade: false,
          restartIdentity: true })
        .then(() =>
          rqt.post(BASE_URI)
            .set('Authorization', `Bearer ${token}`)
            .send(CITY))
        .then((res: any) => {
          cityId = res.body.data.city_id;
          done();
        });
    });

    it('should delete City', (done) => {

      rqt.delete(`${BASE_URI}/${cityId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)
        .end((err: any) => {
          expect(err).toEqual(null);
          done();
        });
    });

    it('should delete product which does not exist', (done) => {

      rqt.delete(`${BASE_URI}/${111111}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404)
        .end((err: any) => {
          expect(err).toEqual(null);
          done();
        });
    });

    it('should return unauthorized if no token', (done) => {
      rqt.delete(`${BASE_URI}/${cityId}`)
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
