import React from 'react';

const Banner = ({ children }) => {
  return (
    <div>
      <div className="defunct-banner">
        This demo site is no longer operational. To try out the latest capabilities, please visit the respective service demo within the AWS Console.
      </div>
      {children}
    </div>
  );
};

export default Banner;