/*eslint-disable*/
import postUsecase from 'app/sale/post';

describe('App -> Sale -> Post', () => {
  const saleId = '61e3932a1c0df789e0deb729';
  const amount = 5;
  const dateSale = new Date().getTime();
  const productId = 1;
  const userId = 1;
  let useCase: { create: any; };

  describe('Success path', () => {

    beforeEach(() => {
      const MockRepository = {
        create: (data: any) => data
      }

      useCase = postUsecase({
        saleRepository: MockRepository
      })
    })

    it('test', async () => {
      const body = {
        sale_id: saleId,
        amount: amount,
        date_sale: dateSale,
        product_id: productId,
        user_id: userId,
      }

      const lists = await useCase.create({ body });
      expect(lists.sale_id).toEqual(body.sale_id);
      expect(lists.amount).toEqual(body.amount);
      expect(lists.date_sale).toEqual(body.date_sale);
      expect(lists.product_id).toEqual(body.product_id);
      expect(lists.user_id).toEqual(body.user_id);
    });
  });

  describe('Fail path', () => {
    const body = {
      sale_id: saleId,
      amount: amount,
      date_sale: dateSale,
      product_id: productId,
      user_id: userId,
    }

    beforeEach(() => {
      const MockRepository = {
        create: () => Promise.reject('Error')
      }

      useCase = postUsecase({
        saleRepository: MockRepository
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
