import React from 'react';
import { useSelector } from 'react-redux';
import PageDecorator from '../../components/PageDecorator/PageDecorator.component';
import SidebarButton from '../../components/SidebarButton/SidebarButton.component';
import './MyProfile.styles.scss';

const MyProfile = () => {
  const user = useSelector((state) => state.user);

  const { fullName, email, profileImg, phone, area, address } = user;
  return (
    <PageDecorator circle={false}>
      <SidebarButton />
      <div className="my-profile container">
        <div className="user-intro">
          <img src={profileImg} alt="" className="user-img" />
          <h3>{fullName}</h3>
          <p>{email}</p>
        </div>
        <div className="user-details">
          <UserDetail label={'phone'} detail={phone} />
          <UserDetail label={'area'} detail={area.name} />
          <UserDetail label={'address'} detail={address} />
        </div>
      </div>
    </PageDecorator>
  );
};

export default MyProfile;

const UserDetail = ({ label, detail }) => {
  return (
    <div className="user-detail">
      <div className="label">{label}</div>
      <div className="detail">{detail}</div>
    </div>
  );
};
