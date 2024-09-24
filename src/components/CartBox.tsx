import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const CardBox = ({ icon, title, count }: { icon: any; title: string; count: number }) => {
    return (
        <div className="w-full md:w-4/12 bg-white shadow-md rounded-2xl mb-4 md:mb-0">
            <div className="w-full h-24 flex items-center">
                <div className="h-14 w-14 bg-[#f7f7fe] self-center p-2 ml-4 md:ml-8">
                    <FontAwesomeIcon className="h-full w-full" icon={icon} style={{ color: '#5779F1' }} />
                </div>
                <div className="h-16 self-center p-2 ml-2">
                    <p className="text-[#9A9A9A] text-sm">{title}</p>
                    <p className="text-xl font-bold">{count}</p>
                </div>
            </div>
        </div>
    );
};

export default CardBox;