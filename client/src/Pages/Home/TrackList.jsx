import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Play } from "../../Components/SVGs";

export const Container = styled.ul`
  margin-top: 25px;
  width: 100%;
`;
export const TrackListItem = styled.li`
  height: 60px;
  display: flex;
  margin: 1remrem 0;
`;

export const PosterTrack = styled.img`
  width: 65px;
  height: 100%;
  object-fit: cover;
  border-radius: 0 13px 0 13px;
  flex: 1;
`;

export const TrackDetailed = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0 0.6rem;
  justify-content: flex-end;
`;

export const TrackAction = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 18px;
`;

const TrackName = styled.p`
  font-size: 12px;
  color: var(--color-default);
`;
const ArtisName = styled.p`
  margin-top: 8px;
  font-size: 12px;
  color: var(--color-default);
`;

export const TrackLink = styled(Link)``;

export const PlayIcon = styled.span`
  color: var(--color-default);
  svg {
    width: 40px;
    height: 40px;
    :hover {
      fill: var(--color-text);
      color: var(--color-text);
    }
  }
`;

const TrackList = () => {
  return (
    <Container>
      <TrackListItem>
        <TrackLink to="track/12">
          <PosterTrack src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
        </TrackLink>
        <TrackDetailed>
          <TrackName>Titre</TrackName>
          <ArtisName>Artiste</ArtisName>
        </TrackDetailed>
        <TrackAction>
          <PlayIcon>
            <Play />
          </PlayIcon>
        </TrackAction>
      </TrackListItem>
    </Container>
  );
};

export default TrackList;
