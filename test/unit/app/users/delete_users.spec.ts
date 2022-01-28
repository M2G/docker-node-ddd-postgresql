/*eslint-disable*/
import faker from 'faker';
import deleteUseCase from 'app/users/delete';

describe('App -> Sale -> Delete', () => {
  const saleId = faker.datatype.uuid();
  let useCase: any;
  const mockData = [{
    sale_id: saleId
  }];

  describe('Success path', () => {
    beforeEach(() => {
      const MockRepository = {
        destroy: () => mockData
      };

      useCase = deleteUseCase({
        usersRepository: MockRepository
      });
    });

    it('should display the user on success', async () => {
      const user = await useCase.remove({ id: saleId });
      expect(user).toEqual(mockData);
    });
  });

  describe('Fail path', () => {
    beforeEach(() => {
      const MockRepository = {
        destroy: async () => Promise.reject('Error')
      };

      useCase = deleteUseCase({
        usersRepository: MockRepository
      });
    });

    it('should display error on rejection', async () => {

      let error;
      try {
        await useCase.remove({ id: saleId });
      } catch (e) {
        // error = e.message;
        error = e;
      }
      expect(error).toEqual('Error');
    });
  });
});
