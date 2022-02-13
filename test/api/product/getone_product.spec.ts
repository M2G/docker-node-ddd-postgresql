/* eslint-disable */
import request from 'supertest';
import container from 'container';

const server: any = container.resolve('server');

const { productRepository, usersRepository } = container.resolve('repository');

const rqt: any = request(server.app);

describe('Routes: GET productsEntity', () => {
  const BASE_URI = '/api/product';

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
        }))
      .then((user: { user_id: any; first_name: any; last_name: any; email: any; }) => {
      token = signIn({
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      });
      done();
    });
  });

  let productId: any;

  const PRODUCT = {
    product_name: 'Product 235235',
  };

  describe('Should return product', () => {
    beforeEach((done) => {
      productRepository
        .destroy({ where: {},
          truncate : true,
          cascade: false,
          restartIdentity: true })
        .then(() => productRepository.create({ ...PRODUCT }))
        .then((res: any) => {
        productId = res.product_id;
        done();
      });
    });

    it('should return one product', (done) => {
      rqt.get(`${BASE_URI}/${productId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end((err: any, res: { body: { data: any; }; }) => {
          expect(res.body.data.product_id).toEqual(productId);
          expect(res.body.data.product_name).toEqual(PRODUCT.product_name);
          done();
        });
    });

    it('should return unauthorized if no token', (done) => {
      rqt.get(`${BASE_URI}/235235`)
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
