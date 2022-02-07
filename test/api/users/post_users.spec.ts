/* eslint-disable */
import request from 'supertest';
import container from 'container';

const server: any = container.resolve('server');

const { usersRepository } = container.resolve('repository');

const rqt: any = request(server.app);

describe('Routes: GET usersEntity', () => {
  const BASE_URI = `/api/users`;

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

  describe('Should return users', () => {
    beforeEach((done) => {
      // we need to add user before we can request our token
      usersRepository
        .destroy({ where: {} })
        .then(() => {
        done();
      });
    });

    it('should return create users', (done) => {

      const USER = {
        user_id: 2,
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

      rqt.post(BASE_URI)
        .set('Authorization', `Bearer ${token}`)
        .send(USER)
        .expect(200)
        .end((err: any, res: { body: { success: boolean; data: any; }; }) => {
          expect(res.body.success).toBeTruthy();
          expect(res.body.data.user_id).toEqual(USER.user_id);
          expect(res.body.data.first_name).toEqual(USER.first_name);
          expect(res.body.data.last_name).toEqual(USER.last_name);
          done();
        });
    });

    it('should return unauthorized if no token', (done) => {
      rqt.post(BASE_URI)
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
