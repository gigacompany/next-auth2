import React from 'react';
import { IconContext } from 'react-icons';
import { BsThreeDots } from 'react-icons/bs';


const MenuButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="text-purple px-3 py-1 rounded-full ">
      <IconContext.Provider value={{ size: '1.5rem' }}>
        <BsThreeDots />
      </IconContext.Provider>
      
    </button>
  );
};

export default MenuButton;
