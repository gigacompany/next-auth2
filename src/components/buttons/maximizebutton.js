import React from 'react';
import { FaExpandAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { BiSolidBarChartAlt2 } from 'react-icons/bi';

const MaximizeButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="text-purple px-3 py-1 rounded-full ">
      <IconContext.Provider value={{ size: '1.5rem' }}>
        <BiSolidBarChartAlt2 />
      </IconContext.Provider>
      
    </button>
  );
};

export default MaximizeButton;
