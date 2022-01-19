/* eslint-disable */
import request from 'supertest';
import container from '../../../src/container';

const server: any = container.resolve('server');

const { productRepository, usersRepository } = container.resolve('repository');

const rqt: any = request(server.app);

describe('Routes: GET productsEntity', () => {
  const BASE_URI = `/api/product`;

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

  describe('Should return product', () => {

    let productId: number | any;

    beforeEach((done) => {

      const PRODUCT = {
        product_id: 235235,
        product_name: 'Product 235235',
      }

      productRepository
        .destroy({ where: {} })
        .then(() =>
      rqt.post(BASE_URI)
        .set('Authorization', `Bearer ${token}`)
        .send(PRODUCT))
        .then((res: any) => {
          productId = res.body.data.product_id;
          done();
        })
    });

    it('should return update product', (done) => {

      const PRODUCT_2 = {
        product_name: 'Product 235236',
      }

      rqt.put(`${BASE_URI}/${productId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(PRODUCT_2)
        .expect(200)
        .end((err: any, res: { body: { success: boolean; data: any; }; }) => {
          expect(res.body.success).toBeTruthy();
          expect(res.body.data.product_name).toEqual(PRODUCT_2.product_name);
          done();
        });
    });

    it('should return fail update product', (done) => {

      const PRODUCT_2 = {
        product_name: 'Product 235236',
      }

      rqt.put(`${BASE_URI}/${11111}`)
        .set('Authorization', `Bearer ${token}`)
        .send(PRODUCT_2)
        .expect(500)
        .end((err: any, res: { text: any; body: { success: boolean; data: any; }; }) => {
          const result = JSON.parse(res.text);
          expect(result.success).toBeFalsy();
          expect(result.error).toEqual('An unexpected error occurred during the update process.');
          done(err);
        });
    });

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
