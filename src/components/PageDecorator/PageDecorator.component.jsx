import React from 'react';
import { ReactComponent as Decoration } from '../../assets/icons/decoration.svg';
import './PageDecorator.styles.scss';

const PageDecorator = ({ children, circle = true }) => {
  return (
    <div className="page-decorator">
      {circle ? (
        <>
          <div className="top-decoration">
            <div className="circle-1"></div>
            <div className="circle-2"></div>
            <div className="circle-3"></div>
          </div>
        </>
      ) : (
        <Decoration className="top-decoration" />
      )}
      <div className={`container content ${circle ? '' : 'extra'}`}>
        {children}
      </div>
    </div>
  );
};

export default PageDecorator;
