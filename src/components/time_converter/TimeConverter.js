import React from 'react';
import TimeInput from './TimeInput';

function TimeConverter(props) {

  const handleChange = (timezone, value) => {
    console.log(timezone, value);
  }

  return (
    <div className='flex h-screen'>
      <TimeInput handleChange={handleChange} />
      <TimeInput handleChange={handleChange} />
    </div>
  );
}

export default TimeConverter;