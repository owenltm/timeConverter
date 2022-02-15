import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import TimeInput from './TimeInput';

dayjs.extend(advancedFormat)

function TimeConverter(props) {
  //base times
  const [times, setTimes] = useState([{
    timezone: "Asia/Singapore",
    time: dayjs().tz("Asia/Singapore")
  }, {
    timezone: "PST8PDT",
    time: dayjs().tz("PST8PDT")
  }])

  const handleAddTime = (position) => {
    if(position === 0) {
      setTimes([{
        timezone: "PST8PDT",
        time: dayjs().tz("PST8PDT")
      }, ...times])
    } else {
      setTimes([...times, {
        timezone: "PST8PDT",
        time: dayjs().tz("PST8PDT")
      }])
    }
  }

  const handleChange = (index, timezone, value) => {
    const tempTime = dayjs(value).tz(timezone);

    setTimes(times.map((t, i) => {
      if(i !== index){        return {
          ...t,
          time: tempTime.tz(t.timezone)
        }
      } else {
        return {
          ...t,
          time: value
        };
      }
    }))

    //console.log(times);
  }

  return (
    <div className='flex h-screen'>
      <div className='side-btn-container px-2 bg-sky-400 flex h-screen'>
        <button onClick={() => handleAddTime(0)}>
          <PlusIcon className="h-12 w-12 text-white"/>
        </button>
      </div>
      {
        times.map((time, index) => 
          <TimeInput key={index} index={index} timeValue={time.time} zoneValue={time.timezone} handleChange={handleChange} />
        )
      }
      <div className='side-btn-container px-2 bg-sky-400 flex h-screen'>
        <button onClick={() => handleAddTime(1)}>
          <PlusIcon className="h-12 w-12 text-white"/>
        </button>
      </div>
    </div>
  );
}

export default TimeConverter;