/* eslint-disable */
import request from 'supertest';
import container from '../../../src/container';

const server: any = container.resolve('server');

const { productRepository } = container.resolve('repository');

const rqt: any = request(server.app);

describe('Routes: GET roductsEntity', () => {
  const BASE_URI = `/api/product`;

  // @ts-ignore
  const signIn = container.resolve('jwt').signin();
  let token: any;

  beforeEach((done) => {
    // we need to add user before we can request our token
    productRepository
      .destroy({ where: {} })
      .then(() =>
        productRepository.create({
          product_id: 235235,
          name: 'Product 235235',
        })
      ).then(() =>
        productRepository.create({
          product_id: 235234,
          name: 'Product 235234',
        })
      ).then((product: { product_id: any; name: any; }) => {
        token = signIn({
          product_id: product.product_id,
          name: product.name,
        })
        done();
      })
  })

  describe('Should return product', () => {
    it('should return all products', (done) => {
      rqt.get(`${BASE_URI}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end((err: any, res: { body: { data: any; }; }) => {

          console.log('-------> res res', res)
         expect(res.body.data.length).toEqual(2);
         done()
        })
    })

   /* it('should return unauthorized if no token', (done) => {
      rqt.get(`${BASE_URI}/products`)
        .expect(401)
        .end((err: any, res: { text: any; }) => {
          //@ts-ignore
          expect(res.text).to.equals('Unauthorized')
          done(err)
        })
    })*/
  })
})
