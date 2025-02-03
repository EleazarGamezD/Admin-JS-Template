export type IConfiguration = {
  type: string;
  connectionUrl: string | undefined;
  logger: string;
  nodeEnv: string;
  adminjs_sessionSecret: string;
  adminjs_cookieSecret: string;
  adminjs_cookieName: string;
};

export default (): IConfiguration => ({
  type: 'mongodb',
  connectionUrl: process.env.MONGODB_CONNECTION_STRING,
  logger: process.env.LOGGER,
  nodeEnv: process.env.NODE_ENV,
  adminjs_sessionSecret: process.env.ADMINJS_SESSION_SECRET,
  adminjs_cookieSecret: process.env.ADMINJS_COOKIE_SECRET,
  adminjs_cookieName: process.env.ADMINJS_COOKIE_NAME,
});
