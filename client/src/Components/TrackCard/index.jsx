import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Disc, Heart, Play, Users } from "../SVGs";
import AddFavorie from "../AddFavorie";
import numeral from "numeral";
import { useDispatch } from "react-redux";
import { getTrackSelected } from "../../Redux/Actions/player.action";

export const CardContainer = styled.div`
  width: 120px;
  height: 180px;

  @media screen and (min-width: 660px) {
    width: 85%;
    height: 195px;
  }

  @media screen and (min-width: 738px) {
    width: 75%;
    height: 195px;
  }

  @media screen and (min-width: 990px) {
    width: 85%;
    height: fit-content;
  }
`;
export const TrackPoster = styled.div`
  width: 100%;
  height: 75px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 13px 0 13px 0;
    object-fit: cover;
  }
  @media screen and (min-width: 738px) {
    height: 85px;
  }
  @media screen and (min-width: 990px) {
    height: 145px;
  }
`;

export const TrackCardbody = styled.div`
  padding: 8px;
  overflow: hidden;
`;

export const Titletext = styled.p`
  overflow: hidden;
  width: 100%;
  font-size: 10px;
  margin-top: 10px;
  color: var(--color-text);
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media screen and (min-width: 738px) {
    font-size: 14px;
    margin-top: 5px;
  }
`;
export const OtherText = styled.p`
  overflow: hidden;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 8px;
  margin-top: 5px;
  color: var(--color-default);
  font-weight: 300;
  @media screen and (min-width: 738px) {
    font-size: 12px;
  }
`;
export const IconSections = styled.div`
  display: flex;

  align-items: flex-end;
  justify-content: space-between;
  margin-top: 8px;
  span {
    cursor: pointer;
    :hover {
      svg {
        color: var(--color-text);
      }
    }
  }
  svg {
    width: 15px;
    height: 15px;
    color: var(--color-default);
  }
  .right-section,
  left-section {
    display: flex;
    align-items: flex-end;
  }
  .right-section {
    justify-content: flex-end;
  }

  @media screen and (min-width: 550px) {
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const TrackCard = ({ ready, data, ...props }) => {
  const { title, artist, cover, album, duration, preview, id } = data;
  const dispatch = useDispatch();

  const [isPlay, setIsPlay] = useState(false);

  const play = () => {
    dispatch(getTrackSelected({ ...data, index: 0 }));
  };

  return (
    <CardContainer {...props}>
      <TrackPoster title="Voir la fiche du morceau">
        <Link to={"/track/" + id}>
          {cover ? <img src={cover} alt={`${album.title} - cover`} /> : ""}
        </Link>
      </TrackPoster>
      <TrackCardbody>
        <Titletext>{title ? title : "chargement"} </Titletext>
        {artist.name && album.title ? (
          <OtherText>{`${artist.name} - ${album.title}`}</OtherText>
        ) : null}
        {duration ? (
          <OtherText>{numeral(duration).format("0:00")}</OtherText>
        ) : null}
        <IconSections>
          <div className="left-section">
            <span title="Voir la fiche de l'artiste">
              <Link to={"/artist/" + artist.id}>
                <Users />
              </Link>
            </span>
            <span
              title="Consulter l'album"
              style={{ marginLeft: 5, marginRight: 5 }}
            >
              <Link to={"/album/" + album.id}>
                <Disc />
              </Link>
            </span>
            <span title="Ecouter un extrait" onClick={play}>
              <Play />
            </span>
          </div>
          <div className="right-section">
            <span title="Ajouter aux favoris">
              {id ? <AddFavorie id={id} /> : null}
            </span>
          </div>
        </IconSections>
      </TrackCardbody>
    </CardContainer>
  );
};

export default TrackCard;
