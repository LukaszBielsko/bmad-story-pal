export const appConfig = () => ({
  app: {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3001,
  },
});