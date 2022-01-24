import React from 'react';
// import './TimeInput.css';

function TimeInput(props) {
  return (
    <div className='flex-1 flex flex-col bg-blue-400'>
      <div className='flex justify-center py-4'>
        <input className='p-2 rounded-md text-center' type='text' />
      </div>
      <div className='flex-1 flex flex-col justify-evenly items-center text-white'>
        {/* <div className='bg-yellow-200 w-1/3 h-20'>
          Icon
        </div> */}
        <div className='w-3/4'>
          <div className='text-center mb-5'>
            <h1 className='text-3xl'>Mon, 24 Jan 2022</h1>
            <h2 className='text-5xl font-bold'>14:07</h2>
          </div>
          <input type="range" min={0} max={100} className='text-red-100'/>
        </div>
      </div>
    </div>
  );
}

export default TimeInput;