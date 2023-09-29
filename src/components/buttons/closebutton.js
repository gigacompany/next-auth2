import React from 'react';
import { MdClose } from 'react-icons/md';
import { IconContext } from 'react-icons';

const CloseButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="text-purple px-2 py-1 rounded-full ">
      <IconContext.Provider value={{ size: '1.5rem' }}>
        <MdClose size={25} />
      </IconContext.Provider>
    </button>
  );
};

export default CloseButton;
