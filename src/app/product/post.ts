/*eslint-disable*/
/**
 * this file will hold all the get use-case for product domain
 */
// import Product from '../../domain/product';

const { attributes } = require('structure');

const Product = attributes({
  product_id: Number,
  name: String,
})(
  class Product {}
);

/**
  * function for create product.
  */
export default ({ productRepository }: any) => {
  // code for getting all the items
  const create = ({ body }: any) =>
    Promise.resolve()
      .then(() => {
        const post = new Product({
          product_id: body.product_id,
          name: body.product_id,
        });

        return productRepository.create({
          product_id: post.product_id,
          name: post.product_id,
        });

      })
      .catch((error) => {
        throw new Error(error);
      });

  return {
    create
  }
}
