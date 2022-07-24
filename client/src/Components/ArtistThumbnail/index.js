import React from "react";
import styled from "styled-components";

const Container = styled.img`
  border-radius: 100px;
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

const ArtistThumbnail = ({ ...props }) => {
  return <Container {...props} />;
};

export default ArtistThumbnail;
