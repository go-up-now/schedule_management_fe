import React from 'react';


interface HomeMiniPanelProps {
    title: string;
    amount: number;
    icon?: React.ReactNode;
    subtitle?: string;
    dateRange?: string;
    layout?: string;
}

const HomeMiniPanel: React.FC<HomeMiniPanelProps> = ({ title, amount, icon, subtitle, dateRange, layout }) => {
    return (


        <div className={`flex-shrink-0  h-min-full  rounded-lg border shadow-md  ${layout ? layout : 'md:w-3/12 '} flex flex-col justify-between `}>
            <div>
                {/* {icon && ( */}
                <div className="flex p-4">
                    <div className="text-blue-500 h-full text-3xl p-6 bg-blue-50 rounded-lg ">
                        {icon}
                    </div>
                    <div className="p-3" >
                        <div className="text-base text-gray-400">{title} {dateRange && ` - ${dateRange}`}</div>
                        <div className="text-2xl font-bold ">{amount}</div>
                        {subtitle && <div className="text-xs text-gray-400">{subtitle}</div>}
                    </div>

                </div>
                {/* )} */}


            </div>

        </div>


    );
};

export default HomeMiniPanel;
