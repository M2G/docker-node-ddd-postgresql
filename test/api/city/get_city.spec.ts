/* eslint-disable */
import request from 'supertest';
import container from 'container';

const server: any = container.resolve('server');

const { cityRepository, usersRepository } = container.resolve('repository');

const rqt: any = request(server.app);

describe('Routes: GET cityEntity', () => {
  const BASE_URI = `/api/city`;

  // @ts-ignore
  const signIn = container.resolve('jwt').signin();
  let token: any;

  beforeEach( (done) => {

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

  const CITY_1 = {
    country_id: 1,
    city_id: 1,
    city_name: 'City 235235',
  };
  const CITY_2 = {
    country_id: 2,
    city_id: 2,
    city_name: 'City 235236',
  };

  describe('Should return City', () => {
    beforeEach((done) => {
      // we need to add user before we can request our token
      cityRepository
        .destroy({ where: {} })
        .then(() =>
          cityRepository.create({
            country_id: CITY_1.country_id,
            city_id: CITY_1.city_id,
            city_name: CITY_1.city_name,
          })
        ).then(() => {
        cityRepository.create({
          country_id: CITY_2.country_id,
          city_id: CITY_2.city_id,
          city_name: CITY_2.city_name,
        });
        done();
      });
    });

    it('should return all city', (done) => {
      rqt.get(BASE_URI)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end((err: any, res: { body: { data: any; }; }) => {
         expect(res.body.data.length).toEqual(2);
          expect(res.body.data[0].country_id).toEqual(CITY_1.country_id);
          expect(res.body.data[0].city_id).toEqual(CITY_1.city_id);
          expect(res.body.data[0].city_name).toEqual(CITY_1.city_name);
          expect(res.body.data[1].country_id).toEqual(CITY_2.country_id);
          expect(res.body.data[1].city_id).toEqual(CITY_2.city_id);
          expect(res.body.data[1].city_name).toEqual(CITY_2.city_name);
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
