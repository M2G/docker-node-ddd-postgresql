/* eslint-disable */
import request from 'supertest';
import container from 'container';

const server: any = container.resolve('server');

const { countryRepository, usersRepository } = container.resolve('repository');

const rqt: any = request(server.app);

describe('Routes: GET countryEntity', () => {
  const BASE_URI = '/api/country';

  // @ts-ignore
  const signIn = container.resolve('jwt').signin();
  let token: any;

  beforeAll( () => {});
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

  let countryId1: number | any;

  let countryId2: number | any;

  const CITY_1 = {
    country_name: 'Country 235235',
  };
  const CITY_2 = {
    country_name: 'Country 235236',
  };

  describe('Should return country', () => {
    beforeEach((done) => {
      countryRepository
        .destroy({ where: {},
          truncate : true,
          cascade: false,
          restartIdentity: true })
        .then(() => countryRepository.create({ ...CITY_1 }))
        .then((res: any) => {
          countryId1 = res.country_id;
        }).then(() => countryRepository.create({ ...CITY_2 }))
        .then((res: any) => {
          countryId2 = res.country_id;
          done();
        })
    });

    it('should return all country', (done) => {
      rqt.get(BASE_URI)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end((err: any, res: { body: { data: any; }; }) => {
         expect(res.body.data.length).toEqual(2);
          expect(res.body.data[0].country_id).toEqual(countryId1);
          expect(res.body.data[0].country_name).toEqual(CITY_1.country_name);
          expect(res.body.data[1].country_id).toEqual(countryId2);
          expect(res.body.data[1].country_name).toEqual(CITY_2.country_name);
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
