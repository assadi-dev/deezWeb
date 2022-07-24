import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { VolumeMuted, Volume } from "../SVGs";

const Container = styled.span`
  cursor: pointer;
`;

const VolumeBtn = ({ isMute = false, ...props }) => {
  return (
    <Container {...props}>
      {isMute === true ? <VolumeMuted /> : <Volume />}
    </Container>
  );
};

export default VolumeBtn;
