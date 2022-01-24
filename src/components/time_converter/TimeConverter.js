import React from 'react';
import TimeInput from './TimeInput';

function TimeConverter(props) {
  return (
    <div className='flex h-screen'>
      <TimeInput />
      <TimeInput />
    </div>
  );
}

export default TimeConverter;