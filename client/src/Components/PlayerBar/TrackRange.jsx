import React from "react";

const TrackRange = ({ max, onChange, curentTime, isPlay }) => {
  return (
    <div>
      <input
        type="range"
        name="currentTime"
        id="currentTime"
        min={0}
        max={max}
        onChange={onChange}
      />
    </div>
  );
};

export default TrackRange;
