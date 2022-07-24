import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import numeral from "numeral";

const Container = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:space-between;
width: 120px;
padfing:10px;margin:15px;
color:var(--color-default)
font-size:14px;


@media screen and (min-width: 990px) {
  width: 200px;
 
}
`;

const ArtistPicture = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 100px;
  object-fit: cover;
  @media screen and (min-width: 660px) {
    width: 80px;
    height: 80px;
  }
  @media screen and (min-width: 990px) {
    width: 160px;
    height: 160px;
  }
`;

export const TextSection = styled.div`
  text-align: center;
  max-width: 120px;
  overflow: hidden;

  @media screen and (min-width: 660px) {
    max-width: 100px;
  }
  @media screen and (min-width: 990px) {
    max-width: 200px;
  }
`;

const ArtistName = styled.p`
  font-size: 14px;
  margin-top: 10px;
  color: var(--color-text);
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const ArtistOthertext = styled.p`
  font-size: 12px;
  color: var(--color-default);
`;

const ArtistCard = ({ id, data, ready, showFan, showNbAlbum, ...props }) => {
  const { name, picture, nb_album, nb_fan } = data;

  return (
    <Container {...props}>
      <Link to={`/artist/${id}`}>
        <ArtistPicture src={picture} alt={`${name}-picture`} />
        <TextSection>
          <ArtistName>{name}</ArtistName>
          {showNbAlbum ? (
            <ArtistOthertext>{`${nb_album} albums`}</ArtistOthertext>
          ) : null}
          {showFan ? (
            <ArtistOthertext>{`${numeral(nb_fan).format(
              "0 a"
            )} fans`}</ArtistOthertext>
          ) : null}
        </TextSection>
      </Link>
    </Container>
  );
};

export default ArtistCard;
