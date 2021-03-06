/* eslint-disable */
import request from 'supertest';
import container from 'container';
import faker from 'faker';

const server: any = container.resolve('server');

const { orderStatusRepository, usersRepository } = container.resolve('repository');

const rqt: any = request(server.app);

describe('Routes: GET orderStatusEntity', () => {
  const BASE_URI = '/api/order_status';

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
          first_name: 'John',
          last_name: 'Doe',
          password: 'test',
          role_id: 1,
          verification_code: 'EB309B5A5079FEE895B20954A390910F5E3AB4B909',
          is_verified: 1,
          is_deleted: 0,
          created_by: 11,
          updated_by: 11
        })).then((user: { user_id: any; first_name: any; last_name: any; email: any; }) => {
      token = signIn({
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      })
      done();
    })
  });

  describe('Should return order_status', () => {

    let orderStatusId: number | any;

    beforeEach((done) => {

      const ORDER_STATUS = {
        order_status_id: faker.datatype.uuid(),
        update_at: new Date().toISOString(),
        sale_id: faker.datatype.uuid(),
        status_name_id: 1,
      };

      orderStatusRepository
        .destroy({ where: {},
          truncate : true,
          cascade: false,
          restartIdentity: true })
        .then(() => orderStatusRepository.create({ ...ORDER_STATUS }))
        .then((res: any) => {
          orderStatusId = res.order_status_id;
        }).then(() => done())
    });

    it('should return update order_status', (done) => {

      const ORDER_STATUS = {
        order_status_id: faker.datatype.uuid(),
        update_at: new Date().toISOString(),
        sale_id: faker.datatype.uuid(),
        status_name_id: 1,
      };

      rqt.put(`${BASE_URI}/${orderStatusId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(ORDER_STATUS)
        .expect(200)
        .end((err: any, res: { body: { success: boolean; data: any; }; }) => {
          expect(res.body.success).toBeTruthy();
          expect(res.body.data.order_status_id).toEqual(ORDER_STATUS.order_status_id);
          expect(res.body.data.sale_id).toEqual(ORDER_STATUS.sale_id);
          expect(res.body.data.status_name_id).toEqual(ORDER_STATUS.status_name_id);
          done();
        });
    });

    it('should return fail update order_status', (done) => {

      const ORDER_STATUS = {
        order_status_id: faker.datatype.uuid(),
        update_at: new Date().toISOString(),
        sale_id: faker.datatype.uuid(),
        status_name_id: 1,
      };

      rqt.put(`${BASE_URI}/${11111}`)
        .set('Authorization', `Bearer ${token}`)
        .send(ORDER_STATUS)
        .expect(404)
        .end((err: any, res: { text: any; body: { success: boolean; data: any; }; }) => {
          const result = JSON.parse(res.text);
          expect(result.success).toBeFalsy();
          expect(result.error).toEqual('Not found.');
          done(err);
        });
    });

    it('should return unauthorized if no token', (done) => {
      rqt.put(`${BASE_URI}/${orderStatusId}`)
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
