import React, {useState} from "react";

const Accordion = ({title, description}) => {
  const [accordion, setAccordion] = useState(false);

  return (
    <div className="p-4">
      <button
        className="flex justify-between w-full"
        onClick={() => setAccordion(!accordion)}
      >
        <span className="text-violet-700 px-4 font-semibold">{title}</span>
        <span
          className={`text-violet-700 font-bold text-3xl transition-transform duration-500 ${
            accordion ? "rotate-180" : "rotate-0"
          }`}
        >
          {accordion ? "-" : "+"}
        </span>
      </button>
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          accordion ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p
          className={`whitespace-pre-wrap p-4 text-sm ${
            accordion ? "block" : "hidden"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default Accordion;
