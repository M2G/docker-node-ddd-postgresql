/*eslint-disable*/
import getOneUseCase from 'app/status_name/getOne';

describe('App -> StatusName -> Get One', () => {
  const statusNameId = 1;
  let useCase: any;
  const mockData = [{
    status_name_id: statusNameId
  }];

  describe('Success path', () => {
    beforeEach(() => {

      const MockRepository = {
        findById: () => mockData
      }

      useCase = getOneUseCase({
        statusNameRepository: MockRepository,
      })
    });

    it('should display the user on success', async () => {
      const user = await useCase.one({ id: statusNameId });
      expect(user).toEqual(mockData);
    })
  });

  describe('Fail path', () => {
    beforeEach(() => {
      const MockRepository = {
        findById: () => Promise.reject('Error'),
      }

      useCase = getOneUseCase({
        statusNameRepository: MockRepository,
      })
    })

    it('should display error on rejection', async () => {

      let error;
      try {
        await useCase.one({ id: statusNameId });
      } catch (e) {
        // error = e.message;
        error = e;
      }
      expect(error).toEqual('Error');
    })
  })

})
