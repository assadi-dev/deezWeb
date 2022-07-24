import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Disc, Heart, Play, Users } from "../SVGs";

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
  height: 85px;

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

const AlbumCard = ({ id, ready, data, showNbTrack, ...props }) => {
  const { title, artist, cover_medium, cover, duration, nbTracks } = data;

  return (
    <CardContainer {...props}>
      <TrackPoster title="Consuler l'album">
        <Link to={"/album/" + id}>
          <img
            src={cover_medium ? cover_medium : cover}
            alt={`${title} - cover`}
          />
        </Link>
      </TrackPoster>
      <TrackCardbody>
        <Titletext>{title} </Titletext>
        <OtherText>{`${artist.name}`}</OtherText>
        {showNbTrack && <OtherText>{`${nbTracks} pistes`}</OtherText>}
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
              <Link to={"/album/" + id}>
                <Disc />
              </Link>
            </span>
          </div>
          <div className="right-section"></div>
        </IconSections>
      </TrackCardbody>
    </CardContainer>
  );
};

export default AlbumCard;
