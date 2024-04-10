import authRoute from './src/routes/auth'
import userRoute from './src/routes/user'
import bookRoute from './src/routes/book'
const initRoute = (app) => {
  app.use('/api/v1/user', userRoute)
  app.use('/api/v1/auth', authRoute)
  app.use('/api/v1/book', bookRoute)
};

module.exports = initRoute;
