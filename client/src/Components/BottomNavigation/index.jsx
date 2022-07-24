import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Playerbar from "../PlayerBar";
import { Disc, Heart, HomeIcone, NoteSquare } from "../SVGs";

const BottomContainer = styled.footer`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, #031b34 0%, rgba(4, 12, 24, 0.74) 100%);
  box-shadow: 0px 0px 12px -3px #81afdd;
  backdrop-filter: blur(50px);

  z-index: 90;
`;

export const BottomNav = styled.div`
  position: relative;
  height: 75px;
  width: 100%;
  background: black;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  @media screen and (min-width: 990px) {
    display: none;
  }
`;

export const GridColumns = styled.div`
  align-self: center;
  justify-self: center;
`;
export const NavLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  font-size: 14px;
  span,
  svg {
    width: 25px;
    height: 25px;
    margin-bottom: 8px;
  }
  :hover {
    opacity: 1;
  }
`;

const BottomNavigation = () => {
  return (
    <BottomContainer>
      <Playerbar />
      <BottomNav>
        <GridColumns>
          {" "}
          <Link to="/">
            <NavLink>
              <span>
                <HomeIcone />
              </span>
              Accueil
            </NavLink>
          </Link>
        </GridColumns>
        <GridColumns>
          {" "}
          <Link to="artists">
            <NavLink>
              <span>
                <NoteSquare />
              </span>
              Artistes
            </NavLink>
          </Link>
        </GridColumns>
        <GridColumns>
          {" "}
          <Link to="albums">
            <NavLink>
              <span>
                <Disc />
              </span>
              Albums
            </NavLink>
          </Link>
        </GridColumns>
        <GridColumns>
          {" "}
          <Link to="favoris">
            <NavLink>
              <span>
                <Heart />
              </span>
              Favoris
            </NavLink>
          </Link>
        </GridColumns>
      </BottomNav>
    </BottomContainer>
  );
};

export default BottomNavigation;
