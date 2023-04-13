import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import InputField from '../../components/common/InputField/InputField.component';
import { setLoading } from '../../redux/redducers/loading';
import { getAllAreas } from '../../services/area';
import { createNewCustomer, loginCustomer } from '../../services/customer';
import PageDecorator from './../../components/PageDecorator/PageDecorator.component';
import CustomButton from './../../components/common/CustomButton/CustomButton.component';
import Dropdown from './../../components/common/Dropdown/Dropdown.component';
import FileInput from './../../components/common/FileInput/FileInput.component';
import './Signup.styles.scss';
import customerValidatorSchema from './signup.validator';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    profileImg: '',
    area: '',
  });
  const [areas, setAreas] = useState([]);
  const [errorMessages, setErrorMessages] = useState(null);
  const [serverError, setServerError] = useState(null);
  const dispatch = useDispatch();

  const updateForm = (data) => {
    setErrorMessages(null);
    setServerError(null);
    setFormData({ ...formData, ...data });
  };

  const handleChange = (e) => {
    setServerError(null);
    setErrorMessages(null);
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const {
    fullName,
    email,
    phone,
    password,
    confirmPassword,
    address,
    profileImg,
    area,
  } = formData;

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { error } = customerValidatorSchema.validate(formData);

      if (error) {
        setErrorMessages({
          [error?.details[0]?.path[0]]: error?.message,
        });
        return;
      }

      if (password !== confirmPassword)
        return setErrorMessages({ confirmPassword: 'Password does not match' });

      dispatch(setLoading(true));

      await createNewCustomer({
        fullName,
        email,
        phone,
        password,
        address,
        profileImg,
        area,
      });

      await loginCustomer(email, password);

      dispatch(setLoading(false));
      document.location = '/';
    } catch (error) {
      dispatch(setLoading(false));
      setServerError(error.response.data);
    }
  };

  const getAreas = useCallback(async () => {
    const allAreas = await getAllAreas();

    setAreas(allAreas);
  }, []);

  useEffect(() => {
    getAreas();
  }, [getAreas]);

  return (
    <div>
      <PageDecorator>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-container">
            <InputField
              name="fullName"
              value={fullName}
              label={'full Name'}
              error={errorMessages?.fullName}
              handleChange={handleChange}
            />
            <InputField
              name="email"
              type="email"
              value={email}
              label={'email'}
              error={errorMessages?.email}
              handleChange={handleChange}
            />
            <InputField
              name="phone"
              value={phone}
              label={'phone'}
              error={errorMessages?.phone}
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
            <InputField
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              label={'confirm Password'}
              error={errorMessages?.confirmPassword}
              handleChange={handleChange}
            />
            <Dropdown
              label="Area"
              options={areas}
              defaultPlaceholder="Select an area"
              placeholderProp={'name'}
              error={errorMessages?.area}
              handleChange={(area) => updateForm({ area: area._id })}
            />
            <FileInput
              label={'Profile image'}
              error={errorMessages?.profileImg}
              handleChange={(fileStr) => updateForm({ profileImg: fileStr })}
            />
            <InputField
              name="address"
              element="textArea"
              value={address}
              label={'address'}
              error={errorMessages?.address}
              handleChange={handleChange}
            />
          </div>
          <div className="error-message-container">
            {serverError ? (
              <div className="error-message">{serverError}</div>
            ) : null}
          </div>
          <CustomButton label={'sign up'} primary={true} size="large" />
          <div className="route-link">
            Already have an account?{' '}
            <Link to="/login" className="link">
              Login
            </Link>
          </div>
        </form>
      </PageDecorator>
    </div>
  );
};

export default Signup;
