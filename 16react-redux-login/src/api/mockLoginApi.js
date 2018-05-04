import delay  from './delay';

export default function mockLoginApi(email, password, callback) {
  setTimeout(() => {
    if (email === 'admin@redux.com' && password === '12345') {
      return callback(null);
    } else {
      return callback(new Error('Invalid email and password. Please try again.'));
    }
  }, delay);
};
