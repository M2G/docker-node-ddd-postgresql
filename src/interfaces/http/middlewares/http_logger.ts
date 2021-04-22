import morgan from 'morgan';

export default (logger: { info: (arg0: any) => void; }) => {
  return morgan('common', {
    stream: {
      write: (message: string | any[]) => {
        logger.info(message.slice(0, -1))
      }
    }
  })
}
