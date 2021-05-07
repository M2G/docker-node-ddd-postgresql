import container from '../../../../container';
import { get, getOne, post, put, remove } from '../../../../app/country';

export default () => {
  const { cradle } = container;
  const {
 repository: {
   countryRepository
    }
  } = cradle;

  const getUseCase = get({countryRepository});
  const getOneUseCase = getOne({countryRepository});
  const postUseCase = post({countryRepository});
  const putUseCase = put({countryRepository});
  const deleteUseCase = remove({countryRepository});

  return {
    deleteUseCase,
    getOneUseCase,
    getUseCase,
    postUseCase,
    putUseCase
  };
};
