/*eslint-disable*/
import deleteUseCase from 'app/status_name/delete';

describe('App -> Status Name -> Delete', () => {
  const statusNameId = 1;
  let useCase: any;
  const mockData = [{
    status_name_id: statusNameId
  }];

  describe('Success path', () => {
    beforeEach(() => {
      const MockRepository = {
        destroy: () => mockData
      };

      useCase = deleteUseCase({
        statusNameRepository: MockRepository
      });
    });

    it('should display the user on success', async () => {
      const user = await useCase.remove({ id: statusNameId });
      expect(user).toEqual(mockData);
    });
  });

  describe('Fail path', () => {
    beforeEach(() => {
      const MockRepository = {
        destroy: async () => Promise.reject('Error')
      };

      useCase = deleteUseCase({
        statusNameRepository: MockRepository
      });
    });

    it('should display error on rejection', async () => {

      let error;
      try {
        await useCase.remove({ id: +statusNameId });
      } catch (e) {
        // error = e.message;
        error = e;
      }
      expect(error).toEqual('Error');
    });
  });
});
