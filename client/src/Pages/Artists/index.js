import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ArtistCard from "../../Components/ArtistCard";
import RowsFlexWrap from "../../Components/RowsFlexWrap";
import { findTopArtist } from "../../Redux/Actions/artist.action";
import { Helmet } from "react-helmet";
import { getUrlBackgroundImage } from "../../Redux/Actions/backgroundImage.action";

export const PageContainer = styled.div`
  padding: 10px;

  @media screen and (min-width: 990px) {
    margin-top: 8.5rem;
  }

  .trackCardSearch {
    margin-right: 10px;
    margin-left: 10px;
    width: 100px;
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

const Artists = () => {
  const artistSelector = useSelector((state) => state.ArtistReducers);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findTopArtist());
    dispatch(getUrlBackgroundImage(""));
  }, [dispatch]);

  const artists = useMemo(() => {
    return artistSelector.collections.data;
  }, [artistSelector.collections]);

  return (
    <PageContainer>
      <Helmet>
        <title>Les artistes du moments - Deezweb</title>
      </Helmet>
      <RowTitle>les Artistes du moments</RowTitle>
      <PageBody>
        <SectionStyle>
          <RowsFlexWrap>
            {artistSelector.collections.hasOwnProperty("data")
              ? artists.map((artist, i) => (
                  <ArtistCard
                    style={{ "--data-count": i }}
                    className="apparition delay-animations"
                    key={artist.id}
                    id={artist.id}
                    data={{
                      id: artist.id,
                      name: artist.name,
                      picture: artist.picture_medium,
                      nb_album: 0,
                      nb_fan: 0,
                    }}
                  />
                ))
              : null}
          </RowsFlexWrap>
        </SectionStyle>
      </PageBody>
    </PageContainer>
  );
};

export default Artists;
