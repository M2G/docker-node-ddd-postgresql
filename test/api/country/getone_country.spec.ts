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

  beforeEach((done) => {
    // we need to add user before we can request our token
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

  const COUNTRY = {
    country_name: 'City 235235',
  };

  describe('Should return country', () => {

    let countryId: number | any;

    beforeEach((done) => {
      countryRepository
        .destroy({ where: {},
          truncate : true,
          cascade: false,
          restartIdentity: true })
        .then(() => countryRepository.create({ ...COUNTRY }))
        .then((res: any) => {
        countryId = res.country_id;
            done();
        });
    });

    it('should return one country', (done) => {
      rqt.get(`${BASE_URI}/${countryId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end((err: any, res: { body: { data: any; }; }) => {
          expect(res.body.data.country_id).toEqual(countryId);
          expect(res.body.data.country_name).toEqual(COUNTRY.country_name);
          done();
        });
    });

    it('should return unauthorized if no token', (done) => {
      rqt.get(`${BASE_URI}/235235`)
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
