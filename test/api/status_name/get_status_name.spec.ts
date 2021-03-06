/* eslint-disable */
import request from 'supertest';
import container from 'container';

const server: any = container.resolve('server');

const { statusNameRepository, usersRepository } = container.resolve('repository');

const rqt: any = request(server.app);

describe('Routes: GET statusNameEntity', () => {
  const BASE_URI = '/api/status_name';

  // @ts-ignore
  const signIn = container.resolve('jwt').signin();
  let token: any;

  beforeEach( (done) => {
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
      });
      done();
    })
  });

  let statusNameId1: any;

  let statusNameId2: any;

  const STATUS_NAME_1 = {
    status_name: 'Status Name 235235',
  };
  const STATUS_NAME_2 = {
    status_name: 'Status Name 235236',
  };

  describe('Should return status name', () => {
    beforeEach((done) => {
      statusNameRepository
        .destroy({ where: {},
          truncate : true,
          cascade: false,
          restartIdentity: true })
        .then(() => statusNameRepository.create({ ...STATUS_NAME_1 }))
        .then((res: any) => {
          statusNameId1 = res.status_name_id;
        })
        .then(() => statusNameRepository.create({ ...STATUS_NAME_2 }))
        .then((res: any) => {
          statusNameId2 = res.status_name_id;
          done();
        })
    });

    it('should return all status name', (done) => {
      rqt.get(BASE_URI)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end((err: any, res: { body: { data: any; }; }) => {
         expect(res.body.data.length).toEqual(2);
          expect(res.body.data[0].status_name_id).toEqual(statusNameId1);
          expect(res.body.data[0].status_name).toEqual(STATUS_NAME_1.status_name);
          expect(res.body.data[1].status_name_id).toEqual(statusNameId2);
          expect(res.body.data[1].status_name).toEqual(STATUS_NAME_2.status_name);
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
