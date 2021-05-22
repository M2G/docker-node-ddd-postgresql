import container from '../../../../container';
import {
 get, getOne, post, put, remove
} from '../../../../app/product';

export default () => {
  const {cradle} = container;
  const {
 repository: {
    productRepository
    }
  } = cradle;

  const getUseCase = get({productRepository});
  const getOneUseCase = getOne({productRepository});
  const postUseCase = post({productRepository});
  const putUseCase = put({productRepository});
  const deleteUseCase = remove({productRepository});

  return {
    deleteUseCase,
    getOneUseCase,
    getUseCase,
    postUseCase,
    putUseCase
  };
};
