import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import PosterSelectPage from "../../Components/PosterSelectPage";
import ButtonStyled from "../../Components/ButtonStyled";
import ArtistThumbnail from "../../Components/ArtistThumbnail";
import AddFavorie from "../../Components/AddFavorie";
import { Deezer, Heart, Play } from "../../Components/SVGs";
import { findOneAlbum } from "../../Redux/Actions/album.action";
import { useSelector, useDispatch } from "react-redux";
import ExternalLink from "../../Components/ExternalLink";
import numeral from "numeral";
import { getTrackSelected } from "../../Redux/Actions/player.action";
import { Helmet } from "react-helmet";
import { getUrlBackgroundImage } from "../../Redux/Actions/backgroundImage.action";
import LoadPrieview from "../../Components/LoadPreview";
import { sleep } from "../../Utils/tracksFunction";
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
export const TrackTitle = styled.h2`
  font-weight: bold;
  font-size: 26px;
  color: var(--color-text);
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
  margin-bottom: 18px;

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

const AlbumSelected = () => {
  const params = useParams();
  const { id } = params;

  const albumSelector = useSelector((state) => state.AlbumReducers);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    title: "",
    nbTracks: 0,
    release: "",
    cover: "",
    duration: 0,
    link: "",
    artist: [],
    tracklist: [],
    isLoading: true,
  });

  const play = (track) => {
    let data = {
      id: track.id,
      title: track.title,
      cover: state.cover,
      artist: { id: track.artist.id, name: track.artist.name },
      album: { id: track.album.id, title: track.album.title },
      preview: track.preview,
      duration: track.duration,
    };
    dispatch(getTrackSelected({ ...data, index: 0 }));
  };

  useEffect(() => {
    dispatch(findOneAlbum(id))
      .then(() => {
        setState({
          ...state,
          title: albumSelector.selected.hasOwnProperty("title")
            ? albumSelector.selected.title
            : "",
          nbTracks: albumSelector.selected.hasOwnProperty("nb_tracks")
            ? albumSelector.selected.nb_tracks
            : "",
          release: albumSelector.selected.release_date,
          cover: albumSelector.selected.cover_medium,
          duration: albumSelector.selected.duration,
          link: albumSelector.selected.link,
          artist: {
            name: albumSelector.selected.artist
              ? albumSelector.selected.artist.name
              : "",
            picture: albumSelector.selected.artist
              ? albumSelector.selected.artist.picture
              : "",
          },
          tracklist: albumSelector.selected.tracks
            ? albumSelector.selected.tracks.data
            : "",
        });
      })
      .then(() => {
        sleep(1000).then(() =>
          setState((prevState) => {
            return { ...prevState, isLoading: false };
          })
        );
      });

    dispatch(getUrlBackgroundImage(albumSelector.selected.cover_xl));
  }, [state.isLoading, id]);

  return (
    <Container>
      <Helmet>
        <title>{`${state.title} - DeezWeb`}</title>
      </Helmet>
      <Header>
        {state.isLoading ? (
          <LoadPreview />
        ) : (
          <PosterSelectPage
            style={{ animationDelay: "500ms" }}
            className="apparition"
            src={state.cover}
            alt={`${state.title}-album-cover`}
          />
        )}
        <TrackDetailContainer>
          <div>
            {state.isLoading ? (
              <TrackTitle></TrackTitle>
            ) : (
              <TrackTitle
                style={{ animationDelay: "350ms" }}
                className="apparition"
              >
                {state.title}
              </TrackTitle>
            )}
            {state.isLoading ? (
              <AlbumText></AlbumText>
            ) : (
              <AlbumText
                style={{ animationDelay: "500ms" }}
                className="apparition"
              >{`${state.nbTracks} pistes - Disponible le ${state.release}`}</AlbumText>
            )}
            {state.isLoading ? (
              <TrackArtistText></TrackArtistText>
            ) : (
              <TrackArtistText
                className="apparition"
                style={{ marginRight: 12, animationDelay: "600ms" }}
              >
                <ArtistThumbnail
                  className="apparition"
                  style={{ marginRight: 12 }}
                  src={state.artist.picture}
                  alt={`${state.artist.name} - picture`}
                />
                {state.artist.name}
              </TrackArtistText>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {state.isLoading ? (
              <TrackArtistText></TrackArtistText>
            ) : (
              <ButtonStyled
                inversed
                className="hover-stroke apparition"
                style={{
                  marginLeft: 10,
                  marginRight: 10,
                  width: "fit-content",
                  animationDelay: "800ms",
                }}
              >
                <ExternalLink href={state.link}>
                  <IconTextBtn>
                    <DeezerIconBtn>
                      <Deezer />
                    </DeezerIconBtn>
                    Voir l'album sur Deezer
                  </IconTextBtn>
                </ExternalLink>
              </ButtonStyled>
            )}
          </div>
        </TrackDetailContainer>
      </Header>
      <BodySection>
        {!state.isLoading ? <h2 className="apparition">Pistes</h2> : null}
        <TracklistContainer>
          {state.tracklist.length && !state.isLoading
            ? state.tracklist.map((track, i) => (
                <>
                  <TrackItem
                    key={track.id}
                    style={{ "--data-count": i * 3.5 }}
                    className="apparition delay-animations"
                  >
                    <PictureContainer>
                      <AlbumCover
                        src={state.cover}
                        alt={`${track.title}-album-cover`}
                      />
                    </PictureContainer>
                    <TracktextContainer>
                      <TracktextItem>{track.title}</TracktextItem>
                      <TracktextItem>
                        {numeral(track.duration).format("0:00")}
                      </TracktextItem>
                    </TracktextContainer>
                    <ActionSection>
                      <ActionBtn onClick={() => play(track)}>
                        <Play />
                      </ActionBtn>
                      <ActionBtn>
                        <AddFavorie id={track.id} />
                      </ActionBtn>
                    </ActionSection>
                  </TrackItem>
                </>
              ))
            : null}
        </TracklistContainer>
      </BodySection>
    </Container>
  );
};

export default AlbumSelected;
