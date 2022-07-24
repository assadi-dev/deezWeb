import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 0 13px 0 13px;
`;

const LoadPreview = ({ ...props }) => {
  return <Container {...props}></Container>;
};

export default LoadPreview;
