import { useMemo, useEffect, useState, useRef } from "react";

const useAudio = (src, { volume = 0.5, currentTime = 0, duration = 0 }) => {
  const audio = useRef(new Audio(src));

  useEffect(() => {
    audio.current.volume = volume;
  }, [volume]);
  useEffect(() => {
    audio.current.currentTime = currentTime;
  }, [currentTime]);

  return audio.current;
};

export default useAudio;
