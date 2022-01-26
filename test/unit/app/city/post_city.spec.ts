/*eslint-disable*/
import postUsecase from 'app/city/post';

describe('App -> City -> Post', () => {
  const cityId = 1;
  const cityName = "City 1";
  const countryId = 1;
  let useCase: { create: any; };

  describe('Success path', () => {

    beforeEach(() => {
      const MockRepository = {
        create: (data: any) => data
      }

      useCase = postUsecase({
        cityRepository: MockRepository
      })
    })

    it('test', async () => {
      const body = {
        city_id: cityId,
        city_name: cityName,
        country_id: countryId
      }

      const lists = await useCase.create({ body });
      expect(lists.city_name).toEqual(body.city_name);
    })
  })

  describe('Fail path', () => {
    const body = {
      city_id: cityId,
      city_name: cityName,
      country_id: countryId
    }

    beforeEach(() => {
      const MockRepository = {
        create: () => Promise.reject('Error')
      }

      useCase = postUsecase({
        cityRepository: MockRepository
      })
    })

    it('should display error on rejection', async () => {

      let error
      try {
        await useCase.create({ body })
      } catch (e) {
        // error = e.message;
        error = e;
      }
      expect(error).toEqual('Error')
    })
  })

})
