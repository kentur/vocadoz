import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import CustomLogo from '../../CustomLogo';
import Image from 'next/image';

const LogoSide = forwardRef(({ global, width, businessLogo }, ref) => {
  
    const businessLogoUrl = global?.base_urls?.business_logo_url;
    return (
        <CustomLogo
            atlText="logo"
            logoImg={`${businessLogoUrl}/${businessLogo}`}
            height="1.5rem"
            width={width}
        />
    );
});

LogoSide.propTypes = {
    global: PropTypes.object,
    width: PropTypes.string,
    businessLogo: PropTypes.string,
};

export default LogoSide;
