/* eslint-disable */
import request from 'supertest';
import container from 'container';

const server: any = container.resolve('server');

const { usersRepository } = container.resolve('repository');

const rqt: any = request(server.app);

describe('Routes: GET usersEntity', () => {
  const BASE_URI = '/api/users';

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
      })
      done()
    })
  });

  const USER_1 = {
    first_name: 'John',
    last_name: 'Doe',
    password: 'test',
    role_id: 1,
    verification_code: 'EB309B5A5079FEE895B20954A390910F5E3AB4B909',
    is_verified: 1,
    is_deleted: 0,
    created_by: 11,
    updated_by: 11
  };

  const USER_2 = {
    first_name: 'Thomas',
    last_name: 'David',
    password: 'test',
    role_id: 1,
    verification_code: 'EB309B5A5079FEE895B20954A390910F5E3AB4B909',
    is_verified: 1,
    is_deleted: 0,
    created_by: 11,
    updated_by: 11
  };

  let userId1: any;

  let userId2: any;

  describe('Should return users', () => {
    beforeEach((done) => {
      usersRepository
        .destroy({ where: {},
          truncate : true,
          cascade: false,
          restartIdentity: true })
        .then(() => usersRepository.create({ ...USER_1 }))
        .then((res: any) => {
          userId1 = res.user_id;
        })
        .then(() => usersRepository.create({ ...USER_2 }))
        .then((res: any) => {
          userId2 = res.user_id;
          done();
        });
    });

    it('should return all users', (done) => {
      rqt.get(BASE_URI)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end((err: any, res: { body: { data: any; }; }) => {
         expect(res.body.data.length).toEqual(2);
          expect(res.body.data[0].user_id).toEqual(userId1);
          expect(res.body.data[0].first_name).toEqual(USER_1.first_name);
          expect(res.body.data[0].last_name).toEqual(USER_1.last_name);

          expect(res.body.data[1].user_id).toEqual(userId2);
          expect(res.body.data[1].first_name).toEqual(USER_2.first_name);
          expect(res.body.data[1].last_name).toEqual(USER_2.last_name);
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
