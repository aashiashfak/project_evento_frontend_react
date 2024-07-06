import React, {useState, useRef} from "react";
import {FaChevronDown} from "react-icons/fa";

const Accordion = ({title, description}) => {
  const [accordion, setAccordion] = useState(false);
  const contentRef = useRef(null);

  const toggleAccordion = () => {
    setAccordion(!accordion);
  };

  return (
    <div className="p-4">
      <button
        className="flex justify-between w-full items-center"
        onClick={toggleAccordion}
      >
        <span className="text-violet-700 px-4 font-semibold">{title}</span>
        <FaChevronDown
          className={`text-violet-700 font-bold text-2xl transition-transform duration-500 ${
            accordion ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <div
        ref={contentRef}
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
          accordion ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          maxHeight: accordion ? `${contentRef.current?.scrollHeight}px` : "0",
        }}
      >
        <p className={`whitespace-pre-wrap p-4 text-sm`}>{description}</p>
      </div>
    </div>
  );
};

export default Accordion;
