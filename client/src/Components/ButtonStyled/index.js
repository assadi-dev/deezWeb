import React from "react";
import styled from "styled-components";

export const Container = styled.button`
  border: none;
  border-radius: 0 13px 0 13px;
  padding: 8px 12px;
  color: #040c18;
  background-color: var(--color-text);
  font-size: 12px;
  transition: all 0.35s;
  cursor: pointer;
  position: relative;
  @media screen and (min-width: 738px) {
    font-size: 14px;
  }
`;
export const ContainerInversed = styled.button`
  border: none;
  border-radius: 13px 0 13px 0;
  padding: 8px 12px;
  color: #040c18;
  background-color: var(--color-text);
  font-size: 12px;
  transition: all 0.35s;
  position: relative;
  cursor: pointer;
  @media screen and (min-width: 738px) {
    font-size: 14px;
  }
`;
const ButtonStyled = ({ inversed, icon, children, ...props }) => {
  if (inversed) {
    return <ContainerInversed {...props}>{children}</ContainerInversed>;
  }
  return <Container {...props}>{children}</Container>;
};

export default ButtonStyled;
