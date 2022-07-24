import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import AddFavorie from "../../Components/AddFavorie";
import { findOneArtist } from "../../Redux/Actions/artist.action";
import { useSelector, useDispatch } from "react-redux";
import { Deezer, Disc, Play, Users } from "../../Components/SVGs";
import ExternalLink from "../../Components/ExternalLink";
import ArtistThumbnail from "../../Components/ArtistThumbnail";
import PosterSelectPage from "../../Components/PosterSelectPage";
import ButtonStyled from "../../Components/ButtonStyled";
import { Helmet } from "react-helmet";
import { getUrlBackgroundImage } from "../../Redux/Actions/backgroundImage.action";
import { sleep } from "../../Utils/tracksFunction";
import LoadPrieview from "../../Components/LoadPreview";
import LoadPreview from "../../Components/LoadPreview";

export const Container = styled.div`
  padding: 0 22px;
  width: 100%;
  .hover {
    cursor:pointer;
    :hover {
      svg {
        fill: black;
      }
    }
  }
  .hover-stroke {
    heigth:16px;
    :hover {
      svg {
        fill: black;
        path {
          stroke: var(--color-text);
        }
      }
    }
    @media screen and (min-width: 990px) {
      width: 980px;
    }
  

`;
export const Header = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
  }
  @media screen and (min-width: 812px) {
    margin-top: 8.5rem;
  }
  @media screen and (min-width: 838px) {
    margin-top: 2.5rem;
  }
  @media screen and (min-width: 910px) {
    margin-top: 8.5rem;
  }
`;

export const TrackDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  width: 100%;
  position: relative;
  margin-left: 24px;
  text-align: center;
  margin-top: 18px;
  @media screen and (min-width: 990px) {
    text-align: left;
    align-items: flex-start;
    margin-top: 0;
  }
`;
export const ArtistName = styled.h2`
  font-weight: bold;
  font-size: 26px;
  color: var(--color-text);
`;

export const IconText = styled.p`
  font-size: 16px;
  margin: 16px 0;
  color: var(--color-default);
  display: flex;
  align-items: center;
  span {
    margin-right: 8px;
    display: flex;
    align-items: center;
  }
`;

export const TrackArtistText = styled.p`
  display: flex;
  align-items: center;
  color: var(--color-default);
`;

export const TimeText = styled.p`
  margin: 8px 0;
  color: var(--color-default);
`;

export const FavorieAction = styled(AddFavorie)`
  width: fit-content;
  cursor: pointer;
  position: absolute;
  transform: translateX(25px) translateY(-2px);
  top: 0;
  right: 0;
  svg {
    width: 35px;
    height: 35px;
  }
`;

export const PlayIconBtn = styled.span`
  margin-right: 5px;
  display: flex;
  align-items: center;
  svg {
    width: 15px;
    height: 15px;
    fill: black;
    margin: 0;
  }
`;

export const IconTextBtn = styled.p`
  display: flex;
  align-items: center;
  font-size: 12px;
  @media screen and (min-width: 990px) {
    font-size: 14px;
  }
`;
export const DeezerIconBtn = styled.span`
margin-right: 5px;
display: flex;
align-items: center;
svg {
  width: 15px;
  height: 15px;
  margin: 0;
}
@media screen and (min-width: 990px){
  svg,span {
    width: 15px;
    height: 15px;
    margin: 0;
  }
}

}
`;

export const BodySection = styled.div`
  margin-top: 2rem;
`;
export const TracklistContainer = styled.ul`
  width: 100%;
  margin-top: 2rem;
  @media screen and (min-width: 990px) {
    width: 980px;
  }
`;

export const TrackItem = styled.li`
  display: grid;
  grid-template-columns: 85px 1fr 100px;
  border-top: 1px solid rgba(129, 175, 221, 0.3);
  border-bottom: 1px solid rgba(129, 175, 221, 0.3);
  @media screen and (min-width: 990px) {
    padding: 5px 0;
  }
`;

export const PictureContainer = styled.div`
  padding: 5px;
  width: 90px;
  height: 80px;
  @media screen and (min-width: 990px) {
    width: 105px;
    height: 80px;
  }
`;

export const AlbumCover = styled.img`
  border-radius: 8px 0 8px 0;
  object-fit: cover;
  align-self: center;
  width: 100%;
  height: 100%;
`;

export const ActionSection = styled.div`
  display: flex;
  align-items: center;
`;
export const ActionBtn = styled.span`
  color: var(--color-text);
  margin-left: 11px;
  svg {
    width: 25px;
    height: 25px;
  }
  @media screen and (min-width: 990px) {
    svg {
      width: 25px;
      height: 25px;
    }
  }
`;
export const TracktextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: 1.5rem;
`;
export const TracktextItem = styled.p`
  color: var(--color-default);
  margin-bottom: 8px;
  font-size: 12px;
`;

const ArtistSelected = () => {
  const params = useParams();
  const { id } = params;
  const [state, setState] = useState({
    id: id,
    name: "",
    link: "",
    picture: "",
    nbAlbums: 0,
    nbFan: 0,
    isLoading: true,
  });
  const artistSelector = useSelector((state) => state.ArtistReducers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findOneArtist(id)).then(() => {
      setState({
        ...state,
        name: artistSelector.selected.name,
        link: artistSelector.selected.link,
        picture: artistSelector.selected.picture_medium,
        nbAlbums: artistSelector.selected.nb_album,
        nbFan: artistSelector.selected.nb_fan,
      });
      sleep(1000).then(() => {
        setState((prevState) => {
          return { ...prevState, isLoading: false };
        });
      });
    });

    dispatch(getUrlBackgroundImage(artistSelector.selected.picture_xl));
  }, [state.isLoading, artistSelector.selected.name]);

  return (
    <Container>
      <Helmet>
        <title>{`${state.name} - DeezWeb`}</title>
      </Helmet>
      <Header>
        {state.isLoading ? (
          <LoadPreview />
        ) : (
          <PosterSelectPage
            className="apparition"
            src={state.picture}
            alt={`${state.name}-picture`}
          />
        )}
        <TrackDetailContainer>
          {state.isLoading ? null : (
            <div>
              <ArtistName
                style={{ animationDelay: "150ms" }}
                className="apparition"
              >
                {state.name}
              </ArtistName>
              <IconText
                style={{ animationDelay: "250ms" }}
                className="apparition"
              >
                <span>
                  <Users />
                </span>
                {`${state.nbFan} Fans `}
              </IconText>
              <IconText
                style={{ animationDelay: "350ms" }}
                className="apparition"
              >
                <span>
                  <Disc />
                </span>
                {`${state.nbAlbums} Albums `}
              </IconText>
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center" }}>
            {state.isLoading ? null : (
              <ButtonStyled
                inversed
                className="hover-stroke apparition"
                style={{
                  marginLeft: 10,
                  marginRight: 10,
                  width: "fit-content",
                  animationDelay: "450ms",
                }}
              >
                <ExternalLink href={state.link}>
                  <IconTextBtn>
                    <DeezerIconBtn>
                      <Deezer />
                    </DeezerIconBtn>
                    Voir l'artiste sur Deezer
                  </IconTextBtn>
                </ExternalLink>
              </ButtonStyled>
            )}
          </div>
        </TrackDetailContainer>
      </Header>
      <BodySection>
        {state.isLoading ? null : <h2 className="apparition">Top Titres</h2>}
        {state.isLoading ? null : (
          <TracklistContainer>
            <TrackItem className="apparition">
              <PictureContainer>
                <AlbumCover src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
              </PictureContainer>
              <TracktextContainer>
                <TracktextItem>Morceau</TracktextItem>
                <TracktextItem>3:20</TracktextItem>
              </TracktextContainer>
              <ActionSection>
                <ActionBtn>
                  <Play />
                </ActionBtn>
                <ActionBtn>
                  <AddFavorie />
                </ActionBtn>
              </ActionSection>
            </TrackItem>
          </TracklistContainer>
        )}
      </BodySection>
    </Container>
  );
};

export default ArtistSelected;
