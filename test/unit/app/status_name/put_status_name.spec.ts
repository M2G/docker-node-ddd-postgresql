/*eslint-disable*/
import updateUsecase from  'app/product/put';

describe('App -> Product -> Put', () => {
  const productId = 1;
  const productName = "Product 1";
  let useCase: { update: any; };

  describe('Success path', () => {
    beforeEach(() => {
      const MockRepository = {
        update: (data: any) => data
      }

      useCase = updateUsecase({
        productRepository: MockRepository
      })
    })

    it('test', async () => {
      const body = {
        product_id: productId,
        product_name: productName,
      }

      const lists = await useCase.update({ id: productId, body });
      expect(lists.product_id).toEqual(body.product_id);
      expect(lists.product_name).toEqual(body.product_name);
    })
  })

  describe('Fail path', () => {
    const body = {
      product_id: productId,
      product_name: productName,
    }
    beforeEach(() => {
      const MockRepository = {
        update: () => Promise.reject('Error')
      }

      useCase = updateUsecase({
        productRepository: MockRepository
      })
    })

    it('should display error on rejection', async () => {

      let error
      try {
        await useCase.update({ id: productId, body })
      } catch (e) {
        // error = e.message;
        error = e;
      }
      expect(error).toEqual('Error')
    })
  })

})
