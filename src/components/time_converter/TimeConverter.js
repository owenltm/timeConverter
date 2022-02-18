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

  const handleRemoveTime = (position) => {
    const temp = [...times];

    temp.splice(position, 1);

    setTimes(temp);
  }

  const handleZoneChange = (index, timezone, value) => {
    const tempTime = value.tz(timezone);

    setTimes(times.map((t, i) => {
      if(i !== index){
        return {
          ...t,
          time: tempTime.tz(t.timezone)
        }
      } else {
        return {
          timezone: timezone,
          time: tempTime
        };
      }
    }))
  }

  const handleTimeChange = (index, timezone, value) => {
    console.log(index, timezone, value);

    setTimes(times.map((t, i) => {
      if(i !== index){        return {
          ...t,
          time: value.tz(t.timezone)
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
<<<<<<< HEAD
        times.map((time, index) => 
          <TimeInput key={index} index={index} timeValue={time.time} zoneValue={time.timezone} handleTimeChange={handleTimeChange} handleZoneChange={handleZoneChange} />
=======
        times && times.map((time, index) => 
          <TimeInput
            key={index}
            index={index}
            timeValue={time.time}
            zoneValue={time.timezone}
            handleChange={handleChange}
            handleAddTime={handleAddTime}
            handleRemoveTime={handleRemoveTime} />
>>>>>>> master
        )
      }
    </div>
  );
}

export default TimeConverter;