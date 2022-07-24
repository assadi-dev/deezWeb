import React from "react";
import styled from "styled-components";

const Parent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  div {
    flex: none;
  }
  @media screen and (max-width: 738px) {
    display: grid;
    grid-template-columns: repeat(auto-fill, 30%);
    justify-content: center;
  }
  @media screen and (max-width: 638px) {
    display: grid;
    grid-template-columns: repeat(auto-fill, 50%);
    justify-content: center;
  }
`;

const RowsFlexWrap = ({ children, ...props }) => {
  return <Parent {...props}> {children} </Parent>;
};

export default RowsFlexWrap;
