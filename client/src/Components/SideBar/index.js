import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Disc, Heart, HomeIcone, NoteSquare } from "../SVGs";
import disc from "../SVGs/disc.svg";

export const SideBarContainer = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 300px;
  color: #fff;
  padding: 12px;
  background-attachment: fixed;
  @media screen and (min-width: 990px) {
    display: flex;
  }
`;

export const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  color: var(--color-default);

  :hover {
    color: var(--color-text);
  }
  span {
    margin-right: 8px;
  }
`;

export const ListItem = styled.li`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  padding: 10px;
  svg {
    width: 25px;
    height: 25px;
  }
`;

export const ListMenuContainer = styled.div`
  margin-top: 8.5rem;
  position: fixed;
`;

const SideBar = () => {
  return (
    <SideBarContainer>
      <ListMenuContainer>
        <ListItem>
          <NavLink to="/">
            <span>
              <HomeIcone />
            </span>
            Accueil
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="/artists">
            <span>
              <NoteSquare />
            </span>
            Artistes
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="/albums">
            {" "}
            <span>
              <Disc />
            </span>{" "}
            Albums
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="/favoris">
            {" "}
            <span>
              <Heart />
            </span>{" "}
            Favoris
          </NavLink>
        </ListItem>
      </ListMenuContainer>
    </SideBarContainer>
  );
};

export default SideBar;
