import authRoute from './src/routes/auth'
import userRoute from './src/routes/user'
const initRoute = (app) => {
  app.use('/api/v1/user', userRoute)
  app.use('/api/v1/auth', authRoute)
};

module.exports = initRoute;
