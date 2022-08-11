import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { Search } from "../../Components/SVGs";
import RowTracksSection from "./RowTracksSection";
import TrackList from "./TrackList";
import { useSelector, useDispatch } from "react-redux";
import { findTopPlaylist } from "../../Redux/Actions/playlist.action";
import SearchInput from "../../Components/SearchInput";
import { getFavoris } from "../../Redux/Actions/favoris.action";
import { Helmet } from "react-helmet";
import { getUrlBackgroundImage } from "../../Redux/Actions/backgroundImage.action";

export const HomeContainer = styled.div`
  padding: 10px;

  @media screen and (min-width: 680px) {
    display: grid;
    grid-template-columns: 920px 1fr;
  }
`;

export const SearchSection = styled.section`
  margin-top: 12px;
  display: flex;
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 25;
  @media screen and (min-width: 738px) {
    height: 70px;
    margin-bottom: 1rem;
  }
`;

export const SearchInputContainer = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  border: 2px solid var(--color-text);
  padding: 8px 15px;
  width: 100%;
  border-radius: 100px;
  height: 40px;
  svg,
  span {
    width: 25px;
    height: 25px;
    color: var(--color-text);
  }
  input {
    margin-left: 10px;
    color: var(--color-text);
    width: 100%;
    font-size: 18px;
    background-color: transparent;
    outline: none;
    border: none;
    font-weight: light;
  }
  @media screen and (min-width: 738px) {
    width: 450px;
  }
`;

export const Rows = styled.section`
  margin-top: 18px;
  margin-bottom: 18px;
  padding: 8px 12px;
  @media screen and (min-width: 1920px) {
    max-width: 1800px;
    margin: 15px auto;
  }
`;

export const RowTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
`;

export const RightSide = styled.aside`
  display: none;
  @media screen and (min-width: 738px) {
    display: block;
    padding-top: 2rem;
  }
`;

export const RightSideTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

const Home = () => {
  const [songState, setSongState] = useState({
    topArtist: [],
    topTracks: [],
    topPlaylist: [],
    isLoading: true,
  });
  const playlistSelector = useSelector((state) => state.PlaylistReducers);
  const dispatch = useDispatch();

  const topPlaylist = useMemo(() => {
    let data = [];
    if (playlistSelector.collections) {
      return playlistSelector.collections;
    }
    return data;
  }, [playlistSelector.collections]);

  useEffect(() => {
    dispatch(findTopPlaylist()).then(() => {
      setSongState({
        ...songState,
        topTracks: [],
        topPlaylist: playlistSelector.collections,
        isLoading: false,
      });
    });
    dispatch(getUrlBackgroundImage(""));
  }, [songState.isLoading]);

  return (
    <HomeContainer>
      <Helmet>
        <title>Acceuil - DeezWeb</title>
      </Helmet>

      <div style={{ marginTop: "2rem" }}>
        <SearchSection>
          <SearchInput />
        </SearchSection>

        {!songState.isLoading
          ? songState.topPlaylist.map((playlist) => (
              <Rows key={playlist.id}>
                <RowTracksSection
                  title={playlist.title}
                  id={playlist.id}
                  className="apparition delay-animationshh"
                />
              </Rows>
            ))
          : null}
      </div>
    </HomeContainer>
  );
};

export default Home;
