/* eslint-disable */
import request from 'supertest';
import container from 'container';
import faker from 'faker';

const server: any = container.resolve('server');

const { storeRepository, usersRepository } = container.resolve('repository');

const rqt: any = request(server.app);

describe('Routes: GET saleEntity', () => {
  const BASE_URI = `/api/sale`;

  // @ts-ignore
  const signIn = container.resolve('jwt').signin();
  let token: any;

  beforeAll( () => {});
  beforeEach( (done) => {
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
      done()
    })
  });

  const SALE_1 = {
    sale_id:  faker.datatype.uuid(),
    amount: 2,
    date_sale: new Date().toISOString(),
    product_id: 1,
    user_id: 1,
    store_id: 1
  };
  const SALE_2 = {
    sale_id:  faker.datatype.uuid(),
    amount: 3,
    date_sale: new Date().toISOString(),
    product_id: 2,
    user_id: 2,
    store_id: 2,
  };

  describe('Should return sale', () => {
    beforeEach((done) => {
      // we need to add user before we can request our token
      storeRepository
        .destroy({ where: {} })
        .then(() =>
          storeRepository.create({
            sale_id:  faker.datatype.uuid(),
            amount: 2,
            date_sale: new Date().toISOString(),
            product_id: 1,
            user_id: 1,
            store_id: 1
          })
        ).then(() => {
        storeRepository.create({
          sale_id:  faker.datatype.uuid(),
          amount: 3,
          date_sale: new Date().toISOString(),
          product_id: 2,
          user_id: 2,
          store_id: 2,
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
          expect(res.body.data[0].sale_id).toEqual(SALE_1.sale_id);
          expect(res.body.data[0].amount).toEqual(SALE_1.amount);
          expect(res.body.data[0].date_sale).toEqual(SALE_1.date_sale);
          expect(res.body.data[0].product_id).toEqual(SALE_1.product_id);
          expect(res.body.data[0].user_id).toEqual(SALE_1.user_id);
          expect(res.body.data[0].store_id).toEqual(SALE_1.store_id);

          expect(res.body.data[1].sale_id).toEqual(SALE_2.sale_id);
          expect(res.body.data[1].amount).toEqual(SALE_2.amount);
          expect(res.body.data[1].date_sale).toEqual(SALE_2.date_sale);
          expect(res.body.data[1].product_id).toEqual(SALE_2.product_id);
          expect(res.body.data[1].user_id).toEqual(SALE_2.user_id);
          expect(res.body.data[1].store_id).toEqual(SALE_2.store_id);
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
