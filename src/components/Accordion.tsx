// import React, { useEffect, useState } from "react";

// interface AccordionProps {
//     title: string;
//     content: string;
// }

// const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
//     const [ishidden, setisHidden] = useState(true);

//     const handleButon = () => {
//         setisHidden(!ishidden)
//     }

//     return (
//         <>
//             <div id="accordion-open" data-accordion="open" className="my-5">
//                 <h2 id="accordion-open-heading-1">
//                     <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-open-body-1" aria-expanded={`${ishidden ? 'true' : 'false'}`} aria-controls="accordion-open-body-1" onClick={handleButon}>
//                         <span className="flex items-center"><svg className="w-5 h-5 me-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd">
//                         </path></svg> {title}</span>
//                         <svg data-accordion-icon className={`w-3 h-3 shrink-0 ${ishidden ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//                             <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
//                         </svg>
//                     </button>
//                 </h2>
//                 <div id="accordion-open-body-1" className={`${ishidden ? 'hidden' : ''}`} aria-labelledby="accordion-open-heading-1">
//                     <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
//                         <p className="mb-2 text-gray-500 dark:text-gray-400">{content}</p>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Accordion;


import React, { useState } from 'react';

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="border-b border-gray-100">
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full text-left px-4 py-2 flex justify-between items-center bg-slate-100 hover:bg-gray-200 transition-colors"
          >
            <span className=" font-medium text-gray-500">{item.title}</span>
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${
                activeIndex === index ? 'transform rotate-180' : ''
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {activeIndex === index && (
            <div className="p-4 text-gray-500 bg-white">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
