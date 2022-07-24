import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { Pause, Play } from "../SVGs";

const Container = styled.span`
  cursor: pointer;
  color: var(--color-text);
  svg {
    fill: var(--color-text);
  }
`;

const PlayBtn = ({ isPlay, ...props }) => {
  return <Container {...props}>{!isPlay ? <Play /> : <Pause />}</Container>;
};

export default PlayBtn;
