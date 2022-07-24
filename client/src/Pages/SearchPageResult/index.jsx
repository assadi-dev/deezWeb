import React, { useEffect, useContext, useState, useMemo } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import SearchInput from "../../Components/SearchInput";
import RowsFlexWrap from "../../Components/RowsFlexWrap";
import TrackCard from "../../Components/TrackCard";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../../Redux/Actions/search.action";
import AlbumCard from "../../Components/AlbumCards";
import ArtistCard from "../../Components/ArtistCard";
import SearchContext from "../../context/SearchContext";
import { sleep } from "../../Utils/tracksFunction";

export const PageContainer = styled.div`
  padding: 10px;

  @media screen and (min-width: 990px) {
    display: grid;
    grid-template-columns: 920px 1fr;
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

export const SearchInputContainer = styled.div`
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
  @media screen and (min-width: 990px) {
    display: block;
    padding-top: 2rem;
  }
`;

export const ResultText = styled.p`
  margin-top: 1.5rem;
  color: var(--color-default);
`;

export const SectionStyle = styled.section`
  margin-top: 2rem;
`;

export const PageBody = styled.div`
  margin-top: 12rem;
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

const SearchPageResult = () => {
  const params = useParams();
  const { q, type, order } = params;
  const searchSelectore = useSelector((state) => state.SearchReducers);
  const dispatch = useDispatch();
  const searchContext = useContext(SearchContext);

  /**Si l'utisateur selectionne Musique */
  const trackResult = useMemo(() => {
    let data = [];
    if (searchSelectore.collections.data && type == "track") {
      return searchSelectore.collections.data.map((track) => {
        return {
          id: track.id ? track.id : "",
          title: track.title ? track.title : "",
          artist: {
            id: track.artist ? track.artist.id : "",
            name: track.artist ? track.artist.name : "",
          },
          album: {
            id: track.album ? track.album.id : "",
            title: track.album ? track.album.title : "",
          },
          cover: track.album ? track.album.cover_medium : "",
          duration: track.duration ? track.duration : "",
          preview: track.preview ? track.preview : "",
        };
      });
    }
    return data;
  }, [searchSelectore.collections, type]);

  const [isLoading, setLoading] = useState(false);

  /**Si l'utisateur selectionne Musique */
  useEffect(() => {
    if (!searchSelectore.isReady && type === "track" && q) {
      dispatch(search(q, type, order));
    }

    if (
      searchSelectore.collections.hasOwnProperty("data") &&
      type === "track"
    ) {
      sleep(2000).then(() => {
        searchContext.setSearchContext((prevState) => {
          return { ...prevState, loading: false };
        });
      });
    }
  }, [
    isLoading,
    searchSelectore.collections,
    searchSelectore.isReady,
    dispatch,
    q,
    order,
    type,
    searchContext.loading,
  ]);

  /**Si l'utisateur selectionne Album */
  const albumResult = useMemo(() => {
    let data = [];
    if (searchSelectore.collections.data && type === "album") {
      return searchSelectore.collections.data.map((album) => {
        return {
          id: album.id ? album.id : "",
          title: album.title ? album.title : "",
          artist: {
            id: album.artist ? album.artist.id : "",
            name: album.artist ? album.artist.name : "",
          },
          cover: album.cover_medium ? album.cover_medium : "",
          duration: album.duration ? album.duration : "",
          nbTracks: album.nb_tracks ? album.nb_tracks : "",
        };
      });
    }

    return data;
  }, [searchSelectore.collections, type]);
  useEffect(() => {
    if (!searchSelectore.isReady && type === "album") {
      dispatch(search(q, type, order));
    }
    if (
      searchSelectore.collections.hasOwnProperty("data") &&
      type === "album"
    ) {
      sleep(2000).then(() => {
        searchContext.setSearchContext((prevState) => {
          return { ...prevState, loading: false };
        });
      });
    }
  }, [
    searchSelectore.collections,
    searchSelectore.isReady,
    dispatch,
    q,
    order,
    type,
    searchContext.loading,
  ]);

  /**Si l'utisateur selectionne Artiste*/

  const artistResult = useMemo(() => {
    let data = [];
    if (searchSelectore.collections.data && type === "artist") {
      return searchSelectore.collections.data.map((artist) => {
        return {
          id: artist.id ? artist.id : "",
          name: artist.name ? artist.name : "",
          picture: artist.picture_medium ? artist.picture_medium : "",
          nb_album: artist.nb_album ? artist.nb_album : "",
          nb_fan: artist.nb_fan ? artist.nb_fan : "",
        };
      });
    }

    return data;
  }, [type, searchSelectore.collections]);

  useEffect(() => {
    if (!searchSelectore.isReady && type === "artist") {
      dispatch(search(q, type, order));
    }
    if (
      searchSelectore.collections.hasOwnProperty("data") &&
      type === "artist"
    ) {
      sleep(2000).then(() => {
        searchContext.setSearchContext((prevState) => {
          return { ...prevState, loading: false };
        });
      });
    }
  }, [
    isLoading,
    searchSelectore.collections,
    searchSelectore.isReady,
    dispatch,
    q,
    order,
    type,
    searchContext.loading,
  ]);

  return (
    <PageContainer>
      {
        <div style={{ marginTop: "2rem" }}>
          <SearchSection>
            <SearchInput />
          </SearchSection>
          <PageBody>
            <ResultText>Résultat trouvé pour : {q}</ResultText>
            <SectionStyle>
              {type === "track" && (
                <RowsFlexWrap>
                  {!searchContext.loading ? (
                    trackResult.length > 0 ? (
                      trackResult.map((search, i) => (
                        <TrackCard
                          style={{ "--data-count": i }}
                          className="apparition trackCardSearch delay-animations"
                          key={search.id}
                          id={search.id}
                          data={search}
                        />
                      ))
                    ) : (
                      "Aucun resultat trouvé pour cette artiste"
                    )
                  ) : (
                    <>
                      <h2>Chargement en cours...</h2>
                    </>
                  )}
                </RowsFlexWrap>
              )}
              {type === "album" ? (
                <RowsFlexWrap>
                  {!searchContext.loading ? (
                    albumResult.length > 0 ? (
                      albumResult.map((search, i) => (
                        <AlbumCard
                          style={{ "--data-count": i }}
                          className="apparition trackCardSearch delay-animations"
                          key={search.id}
                          id={search.id}
                          data={search}
                          showNbTrack={true}
                        />
                      ))
                    ) : (
                      "Aucun resultat trouvé pour cette artiste"
                    )
                  ) : (
                    <>
                      <h2>Chargement en cours...</h2>
                    </>
                  )}
                </RowsFlexWrap>
              ) : null}
              {type == "artist" ? (
                <RowsFlexWrap>
                  {!searchContext.loading ? (
                    artistResult.length > 0 ? (
                      artistResult.map((artist, i) => (
                        <ArtistCard
                          style={{ "--data-count": i }}
                          className="apparition delay-animations"
                          key={artist.id}
                          id={artist.id}
                          data={artist}
                          showFan={true}
                          showNbAlbum={true}
                        />
                      ))
                    ) : (
                      "Aucun resultat trouvé pour cette artiste"
                    )
                  ) : (
                    <>
                      <h2>Chargement en cours...</h2>
                    </>
                  )}
                </RowsFlexWrap>
              ) : null}
            </SectionStyle>
          </PageBody>
        </div>
      }
    </PageContainer>
  );
};

export default SearchPageResult;
