import React, { useState } from 'react';
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
  }]);

  const handleAddTime = (position) => {
    const temp = [...times];

    temp.splice(position, 0, {
      timezone: "Asia/Bangkok",
      time: dayjs().tz("Asia/Bangkok")
    })

    setTimes(temp);
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
      {
        times && times.map((time, index) => 
          <TimeInput key={index} index={index} timeValue={time.time} zoneValue={time.timezone} handleChange={handleChange} handleAddTime={handleAddTime} />
        )
      }
    </div>
  );
}

export default TimeConverter;