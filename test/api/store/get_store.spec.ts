/* eslint-disable */
import request from 'supertest';
import container from 'container';

const server: any = container.resolve('server');

const { storeRepository, usersRepository } = container.resolve('repository');

const rqt: any = request(server.app);

describe('Routes: GET storeEntity', () => {
  const BASE_URI = `/api/store`;

  // @ts-ignore
  const signIn = container.resolve('jwt').signin();
  let token: any;

  beforeAll( () => {});
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
      done()
    })
  });

  const STORE_1 = {
    store_id:  1,
    store_name: 'Store name 1',
    city_id: 1,
  };
  const STORE_2 = {
    store_id:  2,
    store_name: 'Store name 2',
    city_id: 2,
  };

  describe('Should return sale', () => {
    beforeEach((done) => {
      // we need to add user before we can request our token
      storeRepository
        .destroy({ where: {},
          truncate : true,
          cascade: false,
          restartIdentity: true })
        .then(() =>
          storeRepository.create({
            store_id:  1,
            store_name: 'Store name 1',
            city_id: 1,
          })).then(() => {
        storeRepository.create({
          store_id:  2,
          store_name: 'Store name 2',
          city_id: 2,
        });
        done();
      });
    });

    it('should return all sale', (done) => {
      rqt.get(BASE_URI)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end((err: any, res: { body: { data: any; }; }) => {
         expect(res.body.data.length).toEqual(2);
          expect(res.body.data[0].store_id).toEqual(STORE_1.store_id);
          expect(res.body.data[0].store_name).toEqual(STORE_1.store_name);
          expect(res.body.data[0].city_id).toEqual(STORE_1.city_id);

          expect(res.body.data[1].store_id).toEqual(STORE_2.store_id);
          expect(res.body.data[1].store_name).toEqual(STORE_2.store_name);
          expect(res.body.data[1].city_id).toEqual(STORE_2.city_id);
         done();
        })
    })

    it('should return unauthorized if no token', (done) => {
      rqt.get(BASE_URI)
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
