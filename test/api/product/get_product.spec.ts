/* eslint-disable */
import request from 'supertest';
import container from '../../../src/container';

const server: any = container.resolve('server');

const { productRepository, userRepository } = container.resolve('repository');

const rqt: any = request(server.app);

describe('Routes: GET productsEntity', () => {
  const BASE_URI = `/api/product`;

  // @ts-ignore
  const signIn = container.resolve('jwt').signin();
  let token: any;

  beforeEach((done) => {
    // we need to add user before we can request our token
    userRepository
      .destroy({ where: {} })
      .then(() =>
        userRepository.create({
          user_id: 1,
          name: 'User 1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@gmail.com',
          password: 'test',
          roleId: 1,
          verificationCode: 'EB309B5A5079FEE895B20954A390910F5E3AB4B909',
          isVerified: 1,
          isDeleted: 0,
          createdBy: '0116A7DC1C65D3AE3A1F6DCB0D70C56A65CB250F77',
          updatedBy: '0116A7DC1C65D3AE3A1F6DCB0D70C56A65CB250F77'
        })
      ).then((user: { id: any; firstName: any; lastName: any; middleName: any; email: any; }) => {
      token = signIn({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
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
