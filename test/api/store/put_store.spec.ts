/* eslint-disable */
import request from 'supertest';
import container from 'container';

const server: any = container.resolve('server');

const { storeRepository, usersRepository } = container.resolve('repository');

const rqt: any = request(server.app);

describe('Routes: PUT storeEntity', () => {
  const BASE_URI = `/api/store`;

  // @ts-ignore
  const signIn = container.resolve('jwt').signin();
  let token: any;

  beforeEach((done) => {
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

  describe('Should return sale', () => {

    let saleId: number | any;

    beforeEach((done) => {

      const STORE = {
        store_id:  1,
        store_name: 'Store name 1',
        city_id: 1,
      };

      storeRepository
        .destroy({ where: {},
          truncate : true,
          cascade: false,
          restartIdentity: true })
        .then(() =>
      rqt.post(BASE_URI)
        .set('Authorization', `Bearer ${token}`)
        .send(STORE))
        .then((res: any) => {
          saleId = res.body.data.store_id;
          done();
        })
    });

    it('should return update store', (done) => {

      const STORE = {
        store_id:  1,
        store_name: 'Store name 1',
        city_id: 1,
      };

      rqt.put(`${BASE_URI}/${saleId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(STORE)
        .expect(200)
        .end((err: any, res: { body: { success: boolean; data: any; }; }) => {
          expect(res.body.success).toBeTruthy();
          expect(res.body.data.store_id).toEqual(STORE.store_id);
          expect(res.body.data.store_name).toEqual(STORE.store_name);
          expect(res.body.data.city_id).toEqual(STORE.city_id);
          done();
        });
    });

    it('should return fail update store', (done) => {

      const STORE = {
        store_id:  1,
        store_name: 'Store name 1',
        city_id: 1,
      };

      rqt.put(`${BASE_URI}/${11111}`)
        .set('Authorization', `Bearer ${token}`)
        .send(STORE)
        .expect(404)
        .end((err: any, res: { text: any; body: { success: boolean; data: any; }; }) => {
          const result = JSON.parse(res.text);
          expect(result.success).toBeFalsy();
          expect(result.error).toEqual('Not found.');
          done(err);
        });
    });

    it('should return unauthorized if no token', (done) => {
      rqt.put(`${BASE_URI}/${saleId}`)
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
