import container from '../../../../container';
import { get, getOne, post, put, remove } from '../../../../app/order_status';

export default () => {
  const { cradle } = container;
  const {
 repository: {
   orderStatusRepository
    }
  } = cradle;

  const getUseCase = get({orderStatusRepository});
  const getOneUseCase = getOne({orderStatusRepository});
  const postUseCase = post({orderStatusRepository});
  const putUseCase = put({orderStatusRepository});
  const deleteUseCase = remove({orderStatusRepository});

  return {
    deleteUseCase,
    getOneUseCase,
    getUseCase,
    postUseCase,
    putUseCase
  };
};
