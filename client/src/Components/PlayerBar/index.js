import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import useAudio from "../../Hooks/audio";
import PlayBtn from "../PlayBtn";
import { SkipBack, SkipForward } from "../SVGs";
import AddFavorie from "../AddFavorie";
import VolumeBtn from "./VolumeBtn";
import numeral from "numeral";
import { useSelector } from "react-redux";

export const PlayerContainer = styled.div`
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  padding-left: 15px;
  padding-right: 15px;
  min-height: 50px;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
  @media screen and (min-width: 990px) {
    height: 140px;
  }
`;
export const RelativeParent = styled.div`
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 0px 55px;

  @media screen and (min-width: 990px) {
    display: grid;
    grid-template-columns: 380px 1fr 220px;
    height: 140px;
  }
`;

const AudioMediaSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 55px;
  @media screen and (min-width: 990px) {
    width: 45%;
    position: absolute;
    bottom: 0;
    right: 0;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;
export const AudioCover = styled.img`
  width: 55px;
  height: 40px;
  object-fit: cover;
  border-radius: 3px 0 3px 0;
  margin: auto 0;
  @media screen and (min-width: 990px) {
    width: 150px;
    height: 115px;
  }
`;
export const TrackdataSide = styled.div`
  display: flex;
  margin: auto 0;
  overflow: hidden;
  @media screen and (min-width: 990px) {
    height: 115px;
  }
`;

export const TrackMetaData = styled.div`
  width: 100%;
  margin-left: 1rem;
  overflow: hidden;
`;

export const TrackTitle = styled.p`
  font-weight: bold;
  white-space: nowrap;
  @media screen and (max-width: 990px) {
    font-size: 12px;
  }
`;
export const TrackArtist = styled.p`
  margin-top: 1rem;
  white-space: nowrap;
  @media screen and (max-width: 990px) {
    margin-top: 0.3rem;
    font-size: 10px;
  }
`;
export const RowBtn = styled.div`
  display: flex;
  align-items: center;
`;
export const PlayWrapperBtn = styled.span`
  padding: 5px;
  background-color: transparent;
  height: 30px;
  width: 30px;
  border-radius: 0 15px 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 1.3rem;
  @media screen and (min-width: 990px) {
    background-color: var(--color-text);
    padding: 5px;
    height: 60px;
    width: 60px;
    svg {
      width: 35px;
      height: 35px;
    }
  }
`;

export const SkipAction = styled.span`
  display: none;
  color: var(--color-text);

  alig-items: center;
  transition: all 0.35s ease-out;
  cursor: pointer;
  svg {
    width: 35px;
    height: 35px;
  }
  :hover {
    transform: scale(1.2);
  }

  @media screen and (min-width: 990px) {
    display: flex;
    svg {
      width: 45px;
      height: 45px;
    }
  }
`;

export const PlayStateBtn = styled(PlayBtn)`
  color: var(--color-text);
  svg {
    width: 25px;
    height: 25px;
    fill: var(--color-text);
  }
  transition: all 0.35s ease-out;
  :hover {
    transform: scale(1.1);
  }

  @media screen and (min-width: 990px) {
    color: var(--color-bg);
    svg {
      width: 40px;
      height: 40px;
      fill: var(--color-bg);
    }
  }
`;

export const RowRange = styled.div`
  margin-top: 25px;
  width: 100%;
 display:none;
  align-items: center;
  justify-content-center;
  span {
    font-size: 12px;
    margin:0 10px;
  }
  @media screen and (min-width: 990px) {
    display: flex;
  }
`;

export const AudioRangeSlide = styled.input`
  height: 3px;
  width: 100%;
  outline: none;
  appearance: none;
  cursor: pointer;
  position: relative;
  background: rgba(129, 175, 221, 0.3);

  &::-webkit-slider-thumb {
    width: 10px;
    height: 10px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    border-radius: 0.5rem;
  }
  &::-moz-range-thumb {
    width: 10px;
    height: 10px;
    background-color: #ffffff;
    border-radius: 0.5rem;
    border: none;
  }
  &::-moz-range-progress {
    background: rgba(129, 175, 221, 1);
  }
`;

export const LastSide = styled.div`
  display: none;
  @media screen and (min-width: 990px) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

export const RowVolumeLike = styled.div`
  position: relative;
  display: flex;
  margin-right: 18px;
  svg,
  span {
    width: 40px;
    height: 40px;
    :hover {
      svg {
        transition: all 0.35s ease-out;
        :hover {
          transform: scale(1.1);
        }
      }
    }
  }
  .volume {
    margin-right: 18px;
  }
`;

export const VolumeRange = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  background: transparent;
  display: flex;
  align-items: center;
  height: 50px;
  display: flex;
  flex-direction: column;
  transform: translateY(-75px);
`;

export const VolumeRangeSlide = styled.input`
  transform: translateX(-25px) rotate(-90deg);
  height: 8px;
  width: 100%;
  outline: none;
  appearance: none;
  cursor: pointer;
  position: relative;
  background: rgba(129, 175, 221, 0.5);

  &::-webkit-slider-thumb {
    width: 10px;
    height: 10px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    border-radius: 0.5rem;
  }
  &::-moz-range-thumb {
    width: 10px;
    height: 10px;
    background-color: #ffffff;
    border-radius: 0.5rem;
    border: none;
  }
  &::-moz-range-progress {
    background: rgba(129, 175, 221, 1);
  }
`;

export const ValueVolume = styled.span`
  margin-left: 15px;
  white-space: nowrap;
  font-size: 18px;
`;

const Playerbar = ({ id, cover, preview, artist, album, index }) => {
  const [state, setState] = useState({
    duration: 0,
    volume: 25,
    playing: false,
    currentTime: 0,
    volumMuted: false,
    preview: "",
    timeInplayer: 0,
  });

  const trackSelector = useSelector((state) => state.PlayerReducers);

  const [volumRange, setVolumeRange] = useState(false);

  const showInput = () => {
    setVolumeRange(!volumRange);
  };

  const currentTrack = useMemo(() => {
    let data = {
      id: trackSelector.current.id ? trackSelector.current.id : 0,
      title: trackSelector.current.title ? trackSelector.current.title : "???",
      artist: trackSelector.current.artist.hasOwnProperty("name")
        ? trackSelector.current.artist.name
        : "???",
      album: trackSelector.current.album.hasOwnProperty("title")
        ? trackSelector.current.album.title
        : "???",
      cover: trackSelector.current.cover ? trackSelector.current.cover : "",
      preview: trackSelector.current.preview
        ? trackSelector.current.preview
        : "",
    };

    return data;
  }, [trackSelector.current]);

  const handlChangeVolume = (e) => {
    let value = e.target.value;
    setState((prevState) => {
      return { ...prevState, volumMuted: false, volume: value };
    });
  };

  const handlChangeCurrentTime = (e) => {
    setState({ ...state, currentTime: e.target.value });
  };

  const audio = useAudio(state.preview, {
    volume: state.volume * 0.01,
    currentTime: state.currentTime,
  });

  const togglePlay = () => {
    setState({ ...state, playing: !state.playing });
    state.playing ? audio.pause() : audio.play();
  };
  const toogleVolumeChange = useCallback(() => {
    setState((prevState) => {
      return { ...prevState, volumMuted: !prevState.volumMuted };
    });
    if (!state.volumMuted) {
      audio.volume = 0;
    } else {
      audio.volume = state.volume;
    }
  }, [state.volumMuted]);

  useEffect(() => {
    if (trackSelector.current.id) {
      audio.src = trackSelector.current.preview;
      audio.pause();
      audio.load();
      setState((prevState) => {
        return { ...prevState, playing: true, currentTime: 0 };
      });

      audio.play();
    }
  }, [trackSelector.current.id]);

  useEffect(() => {
    audio.addEventListener("loadedmetadata", () => {
      let cleandata = parseInt(audio.duration.toString());

      setState((prevState) => {
        return { ...prevState, duration: cleandata };
      });
    });
    audio.addEventListener("ended", () =>
      setState((prevState) => {
        return { ...prevState, playing: false, currentTime: 0 };
      })
    );
    return () => {
      audio.removeEventListener("ended", () =>
        setState((prevState) => {
          return { ...prevState, playing: false, currentTime: 0 };
        })
      );
      audio.removeEventListener("loadedmetadata", () => {
        let cleandata = parseInt(audio.duration.toString());
        setState((prevState) => {
          return { ...prevState, duration: cleandata };
        });
      });
    };
  }, []);

  useEffect(() => {
    let timerId = null;
    if (state.playing) {
      timerId = setInterval(() => {
        setState((prevState) => {
          return {
            ...prevState,
            timeInplayer: parseInt(audio.currentTime.toString()),
          };
        });

        return clearInterval(timerId);
      }, 500);
    }
  }, [state.playing, audio.currentTime, state.duration, state.timeInplayer]);

  return (
    <PlayerContainer>
      <RelativeParent>
        <TrackdataSide>
          {
            <AudioCover
              src={
                currentTrack.id
                  ? currentTrack.cover
                  : "https://static.vecteezy.com/system/resources/previews/002/249/673/original/music-note-icon-song-melody-tune-flat-symbol-free-vector.jpg"
              }
            />
          }
          <TrackMetaData TrackMetaData>
            <TrackTitle>{currentTrack.title}</TrackTitle>
            <TrackArtist>{`${currentTrack.artist} - ${currentTrack.album}`}</TrackArtist>
          </TrackMetaData>
        </TrackdataSide>
        <div></div>
        <AudioMediaSide>
          <RowBtn>
            <SkipAction>
              <SkipBack />{" "}
            </SkipAction>
            <PlayWrapperBtn>
              <PlayStateBtn isPlay={state.playing} onClick={togglePlay} />
            </PlayWrapperBtn>
            <SkipAction>
              <SkipForward />
            </SkipAction>
          </RowBtn>
          <RowRange>
            <span>{numeral(state.timeInplayer).format("00:00")}</span>
            <AudioRangeSlide
              type="range"
              min="0"
              max={state.duration}
              name="progress"
              onChange={handlChangeCurrentTime}
              value={state.timeInplayer}
            />
            <span>{numeral(state.duration).format("00:00")}</span>
          </RowRange>
        </AudioMediaSide>
        <LastSide>
          <RowVolumeLike>
            {volumRange ? (
              <VolumeRange>
                <VolumeRangeSlide
                  type="range"
                  min="0"
                  max="100"
                  name="volume"
                  value={state.volume}
                  onChange={handlChangeVolume}
                  onMouseLeave={showInput}
                />
                <ValueVolume>{state.volume} %</ValueVolume>
              </VolumeRange>
            ) : null}
            <VolumeBtn
              className="volume"
              isMute={state.volume == 0 ? true : false}
              onMouseEnter={showInput}
            />

            <AddFavorie id={currentTrack.id} />
          </RowVolumeLike>
        </LastSide>
      </RelativeParent>
    </PlayerContainer>
  );
};

export default Playerbar;
