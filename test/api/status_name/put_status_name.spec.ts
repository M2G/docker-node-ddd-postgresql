/* eslint-disable */
import request from 'supertest';
import container from 'container';

const server: any = container.resolve('server');

const { statusNameRepository, usersRepository } = container.resolve('repository');

const rqt: any = request(server.app);

describe('Routes: GET statusNameEntity', () => {
  const BASE_URI = `/api/status_name`;

  // @ts-ignore
  const signIn = container.resolve('jwt').signin();
  let token: any;

  beforeEach((done) => {
    // we need to add user before we can request our token
    usersRepository
      .destroy({ where: {} })
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

  describe('Should return status name', () => {

    let statusNameId: number | any;

    beforeEach((done) => {

      const STATUS_NAME = {
        status_name_id: 235235,
        status_name: 'Status Name 235235',
      };

      statusNameRepository
        .destroy({ where: {} })
        .then(() =>
      rqt.post(BASE_URI)
        .set('Authorization', `Bearer ${token}`)
        .send(STATUS_NAME))
        .then((res: any) => {
          statusNameId = res.body.data.status_name_id;
          done();
        })
    });

    it('should return update status name', (done) => {

      const STATUS_NAME_2 = {
        status_name: 'Status Name 235236',
      }

      console.log('-------> statusNameId', statusNameId)

      rqt.put(`${BASE_URI}/${statusNameId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(STATUS_NAME_2)
        .expect(200)
        .end((err: any, res: { body: { success: boolean; data: any; }; }) => {

          console.log(':::::::::', res.body)

          expect(res.body.success).toBeTruthy();
          expect(res.body.data.status_name).toEqual(STATUS_NAME_2.status_name);
          done();
        });
    });

    it('should return fail update product', (done) => {

      const PRODUCT_2 = {
        status_name: 'Status Name 235236',
      }

      rqt.put(`${BASE_URI}/${11111}`)
        .set('Authorization', `Bearer ${token}`)
        .send(PRODUCT_2)
        .expect(404)
        .end((err: any, res: { text: any; body: { success: boolean; data: any; }; }) => {
          const result = JSON.parse(res.text);
          expect(result.success).toBeFalsy();
          expect(result.error).toEqual('Not found.');
          done(err);
        });
    });

    it('should return unauthorized if no token', (done) => {
      rqt.put(`${BASE_URI}/${statusNameId}`)
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
