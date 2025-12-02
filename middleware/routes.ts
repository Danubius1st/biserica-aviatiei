export const landingPath = '/';
export const loginPath = '/auth/login';
export const registerPath = '/auth/register';
export const errorPath = '/auth/error';
export const forgotPasswordPath = '/auth/forgot-password';
export const newPasswordPath = '/auth/new-password';
export const newVerificationPath = '/auth/new-verification';
export const verifyPath = '/auth/verify';
export const profilePath = '/profile';

export const publicRoutes: (string | RegExp)[] = [
  // API public
  '/api/bible-books-json',
  '/api/bible-verse-json',
  '/api/public-files',
  /^\/api\/bible-verse-json\/.+$/,
  /^\/api\/parse-json\/.+$/,
  /^\/api\/public-files\/.+$/,

  // Auth routes
  loginPath,
  registerPath,
  errorPath,
  forgotPasswordPath,
  newPasswordPath,
  newVerificationPath
];

/*
 Routes accessible for authentication
 Redirect logged users to /settings
*/
export const authRoutes = [
  loginPath,
  registerPath,
  errorPath,
  forgotPasswordPath,
  newPasswordPath,
];

export const dashboardRoutes = [
  '/admin',
  '/client',
  '/server',
  '/settings',
];

export const adminRoutes = [
  '/admin-db',
];

/*
 Prefix for API authentication routes
*/
export const apiAuthPrefix = '/api/auth';

/*
 Default redirect path after logging in
 */
export const DEFAULT_LOGIN_REDIRECT = '/dashboard';
