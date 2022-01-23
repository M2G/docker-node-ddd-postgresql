/*eslint-disable*/
import postUsecase from 'app/product/post';

describe('App -> Product -> Post', () => {
  const productId = 1;
  const productName = "Product 1";
  let useCase: { create: any; };

  describe('Success path', () => {

    beforeEach(() => {
      const MockRepository = {
        create: (data: any) => data
      }

      useCase = postUsecase({
        productRepository: MockRepository
      })
    })

    it('test', async () => {
      const body = {
        product_id: productId,
        product_name: productName,
      }

      const lists = await useCase.create({ body });
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
        create: () => Promise.reject('Error')
      }

      useCase = postUsecase({
        productRepository: MockRepository
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
