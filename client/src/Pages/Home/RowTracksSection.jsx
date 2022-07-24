import React, { useEffect, useMemo, useState, usestate } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import TrackCard from "../../Components/TrackCard";

import { findOnePlaylist } from "../../Redux/Actions/playlist.action";
import Api from "../../Services/Api";
import { sleep } from "../../Utils/tracksFunction";

export const RowTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  margin-top: 13px;
  margin-bottom: 13px;
`;

const RowTracksSection = ({ title, id }) => {
  const [state, setState] = useState({
    playListTrack: [],
    isLoading: true,
  });

  useEffect(() => {
    const tracks = async () => {
      const result = await Api.get("/playlists/" + id);
      let data = result.data.tracks.data;
      data = data.slice(0, 10);

      data = data.map((track) => {
        return {
          id: track.id,
          title: track.title,
          artist: { id: track.artist.id, name: track.artist.name },
          album: { id: track.album.id, title: track.album.title },
          cover: track.album.cover_medium,
          duration: track.duration,
          preview: track.preview,
        };
      });

      setState((prevState) => {
        return { ...prevState, playListTrack: data };
      });

      sleep(3000).then(() => {
        setState((prevState) => {
          return { ...prevState, playListTrack: data, isLoading: false };
        });
      });
    };
    tracks();
  }, [state.isLoading, id]);

  return (
    <>
      <RowTitle>{title}</RowTitle>
      <Swiper
        spaceBetween={15}
        slidesPerView={2.5}
        breakpoints={{ 550: { slidesPerView: 3, spaceBetween: 0 } }}
      >
        {!state.isLoading
          ? state.playListTrack.map((track, i) => (
              <SwiperSlide
                style={{ "--data-count": i * 2 }}
                className="apparition delay-animations"
                key={track.id}
              >
                <TrackCard id={track.id} data={track} />
              </SwiperSlide>
            ))
          : "chargement en cours"}
      </Swiper>
    </>
  );
};

export default RowTracksSection;
