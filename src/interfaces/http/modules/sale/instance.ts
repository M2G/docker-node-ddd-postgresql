import container from '../../../../container';
import { get, getOne, post, put, remove } from '../../../../app/sale';

export default () => {
  const { cradle } = container;
  const {
 repository: {
   saleRepository
    }
  } = cradle;

  const getUseCase = get({saleRepository});
  const getOneUseCase = getOne({saleRepository});
  const postUseCase = post({saleRepository});
  const putUseCase = put({saleRepository});
  const deleteUseCase = remove({saleRepository});

  return {
    deleteUseCase,
    getOneUseCase,
    getUseCase,
    postUseCase,
    putUseCase
  };
};
