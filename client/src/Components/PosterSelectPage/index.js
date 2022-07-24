import React from "react";
import styled from "styled-components";

const Image = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 0 13px 0 13px;
`;

const PosterSelectPage = ({ ...props }) => {
  return <Image {...props} />;
};

export default PosterSelectPage;
