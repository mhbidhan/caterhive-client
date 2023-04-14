import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLoading } from '../../redux/redducers/loading';
import { loginCustomer } from '../../services/customer';
import PageDecorator from './../../components/PageDecorator/PageDecorator.component';
import CustomButton from './../../components/common/CustomButton/CustomButton.component';
import InputField from './../../components/common/InputField/InputField.component';
import './Login.styles.scss';
import loginValidator from './login.validator';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessages, setErrorMessages] = useState(null);
  const [serverError, setServerError] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setServerError(null);
    setErrorMessages(null);
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { email, password } = formData;

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const { error } = loginValidator.validate(formData);

      if (error) {
        setErrorMessages({
          [error?.details[0]?.path[0]]: error?.message,
        });
        return;
      }

      dispatch(setLoading(true));

      await loginCustomer(email, password);

      dispatch(setLoading(false));
      document.location = '/';
    } catch (error) {
      dispatch(setLoading(false));
      setServerError(error.response.data);
    }
  };

  return (
    <div>
      <PageDecorator>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-container">
            <InputField
              name="email"
              type="email"
              value={email}
              label={'email'}
              error={errorMessages?.email}
              handleChange={handleChange}
            />
            <InputField
              name="password"
              type="password"
              value={password}
              label={'password'}
              error={errorMessages?.password}
              handleChange={handleChange}
            />
          </div>
          <div className="error-message-container">
            {serverError ? (
              <div className="error-message">{serverError}</div>
            ) : null}
          </div>
          <CustomButton
            type="submit"
            label={'Login'}
            size="large"
            primary={true}
          />
          <div className="route-link">
            Don't have an account?{' '}
            <Link to="/signup" className="link">
              Signup
            </Link>
          </div>
        </form>
      </PageDecorator>
    </div>
  );
};

export default Login;
