import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import PosterSelectPage from "../../Components/PosterSelectPage";
import ButtonStyled from "../../Components/ButtonStyled";
import ArtistThumbnail from "../../Components/ArtistThumbnail";
import AddFavorie from "../../Components/AddFavorie";
import { Deezer, Play } from "../../Components/SVGs";
import { useSelector, useDispatch } from "react-redux";
import { findOneTrack } from "../../Redux/Actions/tracks.action";
import ExternalLink from "../../Components/ExternalLink";
import numeral from "numeral";
import { getTrackSelected } from "../../Redux/Actions/player.action";
import { getUrlBackgroundImage } from "../../Redux/Actions/backgroundImage.action";
import LoadPrieview from "../../Components/LoadPreview";
import { sleep } from "../../Utils/tracksFunction";
import LoadPreview from "../../Components/LoadPreview";

const image =
  "https://e-cdns-images.dzcdn.net/images/cover/cc8599644826ed15bb892f12bc88b418/250x250-000000-80-0-0.jpg";

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
    @media screen and (min-width:990px){
      width: fit-content;
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
  width: 100%;
  position: relative;
  margin-left: 24px;
  overflow: hidden;
  text-align: center;
  @media screen and (min-width: 990px) {
    text-align: left;
  }
`;
export const TrackTitle = styled.h2`
  overflow: hidden;
  font-weight: bold;
  font-size: 16px;
  max-width: 60%;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--color-text);
  @media screen and (min-width: 850px) {
    font-size: 26px;
  }
`;

export const AlbumText = styled.p`
  font-size: 14px;
  margin: 8px 0;
  color: var(--color-default);
  @media screen and (min-width: 990px) {
    font-size: 16px;
  }
`;

export const TrackArtistText = styled.p`
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-default);
  margin-top: 18px;

  @media screen and (min-width: 990px) {
    font-size: 16px;
    justify-content: flex-start;
  }
`;

export const TimeText = styled.p`
  font-size: 14px;
  margin: 18px 0;
  color: var(--color-default);
  @media screen and (min-width: 990px) {
    font-size: 14px;
    margin: 8px 0;
  }
`;

export const FavorieAction = styled(AddFavorie)`
  width: fit-content;
  cursor: pointer;

  transform: translateX(25px) translateY(-2px);
  top: 0;
  right: 0;
  svg {
    width: 25px;
    height: 25px;
  }
  @media screen and (min-width: 990px) {
    svg {
      width: 35px;
      height: 35px;
    }
  }
`;

export const PlayIconBtn = styled.span`
  margin-right: 5px;
  display: flex;
  align-items: center;
  svg {
    width: 15px;
    height: 15px;
    margin: 0;
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

export const IconTextBtn = styled.p`
  display: flex;
  align-items: center;
  font-size: 12px;
  @media screen and (min-width: 990px) {
    font-size: 14px;
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 18px;
  justify-content: center;
  @media screen and (min-width: 990px) {
    margin-top: 0;
    justify-content: flex-start;
  }
`;
export const RowButton = styled.div`
  margin-top: 18px;
  @media screen and (min-width: 990px) {
    display: flex;
    align-items: center;
  }
`;

export const BackgroundImage = styled.div`
  position: absolute;
  width: 100%;
  background-image: url(${image});
  background-repeat: no-repeat;
  background-size: cover;
  :before {
    content: "";
    width: 100%;
    background: rgba(4, 12, 26, 0.9);
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
  }
  top: 100%;
  left: 0;
  bottom: 0;
`;

const TrackSelected = () => {
  const params = useParams();
  const { id } = params;

  const trackSelector = useSelector((state) => state.TrackReducers);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    isLoading: true,
  });

  useEffect(() => {}, []);

  const { title, link, duration, preview, artist, album } =
    trackSelector.selected;
  const play = () => {
    const data = {
      id: id ? id : 0,
      title: title ? title : "",
      artist: artist.hasOwnProperty("name") ? artist : "",
      album: album.hasOwnProperty("title") ? album : "",
      preview: preview ? preview : "",
      cover: album
        ? album.hasOwnProperty("cover_medium")
          ? album.cover_medium
          : ""
        : "",
    };
    dispatch(getTrackSelected({ ...data, index: 0 }));
  };

  useEffect(() => {
    dispatch(findOneTrack(id))
      .then(() => {
        sleep(1500).then(() => {
          setState((prevState) => {
            return {
              ...prevState,
              isLoading: false,
            };
          });
        });
      })
      .then(() =>
        dispatch(getUrlBackgroundImage(trackSelector.selected.album.cover_xl))
      );
  }, [state.isLoading, dispatch, id]);

  return (
    <>
      <Container>
        {state.isLoading ? (
          <LoadPreview />
        ) : (
          <Header>
            <PosterSelectPage
              className="apparition"
              src={album.cover_medium}
              alt={`${album.title}-cover`}
            />
            <TrackDetailContainer>
              <div>
                <HeaderRow
                  style={{ animationDelay: "150ms" }}
                  className="apparition"
                >
                  {" "}
                  <TrackTitle>{title}</TrackTitle>
                  <FavorieAction id={id} />
                </HeaderRow>

                <AlbumText
                  style={{ animationDelay: "250ms" }}
                  className="apparition"
                >{`${album.title} - Disponible le ${album.release_date}`}</AlbumText>
                <TrackArtistText
                  style={{ animationDelay: "350ms" }}
                  className="apparition"
                >
                  <ArtistThumbnail
                    className="apparition"
                    style={{ marginRight: 12, animationDelay: "500ms" }}
                    src={artist.picture}
                    alt={`${artist.name}-picture`}
                  />
                  {artist.name}
                </TrackArtistText>
                <TimeText
                  className="apparition"
                  style={{ animationDelay: "450ms" }}
                >
                  Durée : {numeral(duration).format("0:00")}
                </TimeText>
              </div>
              <RowButton>
                <ButtonStyled
                  style={{ animationDelay: "550ms" }}
                  inversed
                  className="hover apparition"
                  onClick={play}
                >
                  <IconTextBtn>
                    <PlayIconBtn>
                      <Play />
                    </PlayIconBtn>
                    Ecouter un Extrait
                  </IconTextBtn>
                </ButtonStyled>

                <ButtonStyled
                  inversed
                  className="hover-stroke apparition"
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                    animationDelay: "650ms",
                  }}
                >
                  <ExternalLink href={link}>
                    <IconTextBtn>
                      <DeezerIconBtn>
                        <Deezer />
                      </DeezerIconBtn>
                      Voir le titre sur Deeezr
                    </IconTextBtn>
                  </ExternalLink>
                </ButtonStyled>
              </RowButton>
            </TrackDetailContainer>
          </Header>
        )}
      </Container>
    </>
  );
};

export default TrackSelected;
