import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Heart } from "../SVGs";
import { useSelector, useDispatch } from "react-redux";
import {
  addFavoris,
  getFavoris,
  removeFavoris,
} from "../../Redux/Actions/favoris.action";
import { getItems } from "../../Services/storage";

const Container = styled.span`
  color: var(--color-text);
  :hover {
    svg {
      color: var(--color-text);
      fill: var(--color-text);
      stroke: var(--color-text);
    }
  }

  svg {
    color: var(--color-text);
    ${(props) => (props.inFavorite ? "fill: var(--color-text);" : "")}
    stroke: var(--color-text);
  }
`;
const AddFavorie = ({ id, ...props }) => {
  const [listFavorie, setListFavorie] = useState(false);
  const favorieselector = useSelector((state) => state.FavorisReducers);
  const dispatch = useDispatch();

  const addToFavorie = () => {
    dispatch(addFavoris(id));
    setListFavorie(true);
  };
  const removeToFavorie = () => {
    dispatch(removeFavoris(id));
    setListFavorie(false);
  };

  useEffect(() => {
    getItems("MesFavoriesDeezWeb").then((res) => {
      if (res) {
        if (res.toString().includes(id.toString())) {
          setListFavorie(true);
        } else {
          setListFavorie(false);
        }
      }
    });
  }, [listFavorie, id, favorieselector]);

  return (
    <Container
      onClick={listFavorie ? removeToFavorie : addToFavorie}
      inFavorite={listFavorie}
      {...props}
    >
      <Heart />
    </Container>
  );
};

export default AddFavorie;
