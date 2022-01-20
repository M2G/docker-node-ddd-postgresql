/* eslint-disable */
import request from 'supertest';
import container from 'container';

const server: any = container.resolve('server');

const { productRepository, usersRepository } = container.resolve('repository');

const rqt: any = request(server.app);

describe('Routes: GET productsEntity', () => {
  const BASE_URI = `/api/product`;

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

  const PRODUCT_1 = {
    product_id: 235235,
    product_name: 'Product 235235',
  };
  const PRODUCT_2 = {
    product_id: 235234,
    product_name: 'Product 235234',
  };

  describe('Should return product', () => {
    beforeEach((done) => {
      // we need to add user before we can request our token
      productRepository
        .destroy({ where: {} })
        .then(() =>
          productRepository.create({
            product_id: PRODUCT_1.product_id,
            product_name: PRODUCT_1.product_name,
          })
        ).then(() => {
        productRepository.create({
          product_id: PRODUCT_2.product_id,
          product_name: PRODUCT_2.product_name,
        });
        done();
      });
    });

    it('should return all products', (done) => {
      rqt.get(BASE_URI)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end((err: any, res: { body: { data: any; }; }) => {
         expect(res.body.data.length).toEqual(2);
          expect(res.body.data[0].product_id).toEqual(PRODUCT_1.product_id);
          expect(res.body.data[0].product_name).toEqual(PRODUCT_1.product_name);
          expect(res.body.data[1].product_id).toEqual(PRODUCT_2.product_id);
          expect(res.body.data[1].product_name).toEqual(PRODUCT_2.product_name);
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
