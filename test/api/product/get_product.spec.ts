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
          name: 'User 1',
          first_name: 'John',
          last_name: 'Doe',
          // email: 'johndoe@gmail.com',
          password: 'test',
          role_id: 1,
          verification_code: 'EB309B5A5079FEE895B20954A390910F5E3AB4B909',
          is_verified: 1,
          is_deleted: 0,
          created_by: '0116A7DC1C65D3AE3A1F6DCB0D70C56A65CB250F77',
          updated_by: '0116A7DC1C65D3AE3A1F6DCB0D70C56A65CB250F77'
        })
      ).then((user: { id: any; first_name: any; last_name: any; email: any; }) => {
      token = signIn({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      })
      done()
    })
  })


  const PRODUCT_1 = {
    product_id: 235235,
    name: 'Product 235235',
  };
  const PRODUCT_2 = {
    product_id: 235234,
    name: 'Product 235234',
  };

  describe('Should return product', () => {
    beforeEach((done) => {
      // we need to add user before we can request our token
      productRepository
        .destroy({ where: {} })
        .then(() =>
          productRepository.create({
            product_id: PRODUCT_1.product_id,
            name: PRODUCT_1.name,
          })
        ).then(() =>
          productRepository.create({
            product_id: PRODUCT_2.product_id,
            name: PRODUCT_2.name,
          })
        ).then((product: { product_id: any; name: any; }) => {
          token = signIn({
            product_id: product.product_id,
            name: product.name,
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
          expect(res.body.data[0].name).toEqual(PRODUCT_1.name);
          expect(res.body.data[1].product_id).toEqual(PRODUCT_2.product_id);
          expect(res.body.data[1].name).toEqual(PRODUCT_2.name);
         done();
        })
    })

    it('should return unauthorized if no token', (done) => {
      rqt.get(BASE_URI)
        .expect(401)
        .end((err: any, res: { text: any; }) => {

          console.log('------> err', err)
          console.log('------> res.text', res.text)
          //@ts-ignore
          // expect(res.text).toEqual('Unauthorized');
          done(err)
        })
    })
  })
})
