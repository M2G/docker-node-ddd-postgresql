import Post from './post';

export default ({ database }: any) => {
  const postModel = database.models.test_tb

  return {
    postRepository: Post({ model: postModel })
  }
}
