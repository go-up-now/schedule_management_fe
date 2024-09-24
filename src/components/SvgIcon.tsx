import React from 'react';

interface SvgIconProps {
    Component: React.FC<React.SVGProps<SVGSVGElement>> | string;
    className?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({ Component, className = '' }) => {
    return (
        <Component className={`${className}`} />
    );
};

export default SvgIcon;