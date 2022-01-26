/*eslint-disable*/
import postUsecase from 'app/country/post';

describe('App -> Country -> Post', () => {
  const countryId = 1;
  const countryName = "Country 1";
  let useCase: { create: any; };

  describe('Success path', () => {

    beforeEach(() => {
      const MockRepository = {
        create: (data: any) => data
      }

      useCase = postUsecase({
        countryRepository: MockRepository
      })
    })

    it('test', async () => {
      const body = {
        country_id: countryId,
        country_name: countryName,
      }

      const lists = await useCase.create({ body });
      expect(lists.country_name).toEqual(body.country_name);
    })
  })

  describe('Fail path', () => {
    const body = {
      country_id: countryId,
      country_name: countryName,
    }

    beforeEach(() => {
      const MockRepository = {
        create: () => Promise.reject('Error')
      }

      useCase = postUsecase({
        countryRepository: MockRepository
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
