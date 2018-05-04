import React from 'react';
import './LoginForm.css';

const LoginForm = ({
  email,
  password,
  emailChange,
  passwordChange,
  handleClick,
  isLoginPending,
  isLoginSuccess,
  loginError
}) => {
  return (
    <form>
      <div className='form-group' id='inputArea'>
        <label htmlFor='email' className="col-form-label">Email:</label>
        <input id='email' className="form-control" type='email' onChange={emailChange} value={email}/>
        <label htmlFor='password' className="col-form-label">Password:</label>
        <input id='password' className="form-control" type='password'onChange={passwordChange} value={password}/>
        <button type="submit" className="btn btn-primary my-3" onClick={handleClick}>Submit</button>
      </div>
      <div className='text-center mt-3'>
        {isLoginPending && <span className='p-3 mb-2 bg-info text-white rounded'>Please wait...</span>}
        {isLoginSuccess && <span className='p-3 mb-2 bg-success text-white rounded'>Login successfully!</span>}
        {loginError && <span className='p-3 mb-2 bg-danger text-white rounded'>{loginError.message}</span>}
      </div>
    </form>
  );
}

export default LoginForm;
