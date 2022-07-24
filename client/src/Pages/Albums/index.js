import React, { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import AlbumCard from "../../Components/AlbumCards";
import ArtistCard from "../../Components/ArtistCard";
import RowsFlexWrap from "../../Components/RowsFlexWrap";
import { findAlbumAll } from "../../Redux/Actions/album.action";
import { findTopArtist } from "../../Redux/Actions/artist.action";
import { getUrlBackgroundImage } from "../../Redux/Actions/backgroundImage.action";

export const PageContainer = styled.div`
  padding: 10px;

  @media screen and (min-width: 990px) {
    margin-top: 8.5rem;
  }

  .trackCardSearch {
    margin-right: auto;
    margin-left: auto;
    width: 80%;
    height: 220px;

    @media screen and (min-width: 738px) {
      width: 150px;
    }
    @media screen and (min-width: 990px) {
      margin-left: 15px;
      flex-grow: 0;
      flex: none;
      width: 200px;
      height: 280px;
      margin-bottom: 15px;
    }
  }
`;
export const SearchSection = styled.section`
  margin-to: 12px;
  display: flex;
  height: 70px;
  width: 100%;
`;
export const RowTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
`;

export const SectionStyle = styled.section`
  margin-top: 2rem;
`;

export const PageBody = styled.div`
  margin-top: 1rem;
  @media screen and (min-width: 660px) {
    margin-top: 5rem;
  }
  @media screen and (min-width: 660px) {
    margin-top: 5rem;
  }
  @media screen and (min-width: 730px) {
    margin-top: 2.5rem;
  }
  @media screen and (min-width: 990px) {
    margin-top: 0;
  }
`;

const Albums = () => {
  const albumSelector = useSelector((state) => state.AlbumReducers);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findAlbumAll());
    dispatch(getUrlBackgroundImage(""));
  }, [dispatch]);

  const albums = useMemo(() => {
    return albumSelector.collections.data;
  }, [albumSelector.collections]);

  return (
    <PageContainer>
      <Helmet>
        <title>Albums du moments - DeezWeb</title>
      </Helmet>
      <RowTitle>les Albums du moments</RowTitle>
      <PageBody>
        <SectionStyle>
          <RowsFlexWrap>
            {albumSelector.collections.hasOwnProperty("data")
              ? albums.map((album, i) => (
                  <AlbumCard
                    style={{ "--data-count": i }}
                    className="apparition trackCardSearch delay-animations "
                    key={album.id}
                    id={album.id}
                    data={album}
                  />
                ))
              : null}
          </RowsFlexWrap>
        </SectionStyle>
      </PageBody>
    </PageContainer>
  );
};

export default Albums;
