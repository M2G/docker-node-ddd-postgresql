/* eslint-disable */
import request from 'supertest';
import container from '../../../src/container';

const server: any = container.resolve('server');

const { productRepository, usersRepository } = container.resolve('repository');

const rqt: any = request(server.app);

describe('Routes: DELETE Product', () => {
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
      done()
    })
  });

  describe('Should DELETE Product', () => {

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

    it('should delete product', (done) => {
      rqt.delete(`${BASE_URI}/${productId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)
        .end((err: any, res: { body: { data: any; }; }) => {

          console.log('----->', res.body)

          //expect(res.body.data.product_id).toEqual(PRODUCT_1.product_id);
          // expect(res.body.data.product_name).toEqual(PRODUCT_1.product_name);
          done();
        });
    });

    it('should return unauthorized if no token', (done) => {
      rqt.delete(BASE_URI)
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
