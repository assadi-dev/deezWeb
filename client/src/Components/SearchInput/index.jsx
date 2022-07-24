import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Search } from "../SVGs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SelectInput from "./SelectInput";
import { search } from "../../Redux/Actions/search.action";
import SearchContext from "../../context/SearchContext";

export const SearchSection = styled.section`
  margin-top: 12px;
  display: flex;
  height: 70px;
  width: 100%;
`;

export const SearchInputContainer = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  border: 2px solid var(--color-text);
  padding: 8px 15px;
  width: 100%;
  border-radius: 13px 0 13px 0;
  height: 40px;
  svg,
  span {
    width: 25px;
    height: 25px;
    color: var(--color-default);
    opacity: 0.5;
  }
  input {
    margin-left: 10px;
    color: var(--color-text);
    width: 100%;
    font-size: 18px;
    background-color: transparent;
    outline: none;
    border: none;
    font-weight: light;
    ::placeholder {
      font-size: 14px;
    }
  }
  @media screen and (min-width: 738px) {
    width: 250px;
  }
  @media screen and (min-width: 990px) {
    height: 40px;
    width: 350px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  align-items: center;
  width: 100%;
  @media screen and (min-width: 550px) {
    flex-direction: row;
  }
  @media screen and (min-width: 738px) {
    width: 100%;
    width: fit-content;
  }
`;

export const SearchFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px;
  font-size: 8px;
  @media screen and (min-width: 738px) {
    flex-direction: row;
    align-items: center;
  }
  .orderSelect {
    @media screen and (min-width: 638px) {
      margin-left: 10px;
      margin-right: 10px;
    }
    
  }
  .typeSelect {
    @media screen and (min-width: 638px) {
      margin-left: 10px;
    
    }

`;

export const TypeSelect = styled.select`
  background-color: transparent;
`;
export const SearchButton = styled.span`
  background: transparent;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: fit-content;
  :hover {
    svg {
      color: var(--color-text);
      opacity: 1;
    }
  }
`;

export const SubmitButton = styled.button`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  padding: 8px 15px;
  background: var(--color-text);
  outline: none;
  border: none;
  font-weight: bold;
  border-radius: 10px 0 10px 0;
  margin-top: 12px;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    height: 35px;
  }
`;

const SearchInput = () => {
  const [state, setState] = useState({
    search: "",
    validate: false,
  });
  const [type, setType] = useState("track");
  const [order, setOrder] = useState("ranking");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cleanOrderText = (type, order) => {
    let typeUpper = type.toUpperCase();
    let orderUpper = order.toUpperCase();

    if (order === "ranking") {
      return "RANKING";
    }

    return `${typeUpper}_${orderUpper}`;
  };
  const searchContext = useContext(SearchContext);

  const onSubmit = (e) => {
    e.preventDefault();
    const cleanOrder = cleanOrderText(type, order);
    if (state.search !== null && state.search !== "") {
      setState((prevState) => {
        return { ...prevState, type: type, order: cleanOrder, validate: true };
      });
      dispatch(search(state.search, type, cleanOrder));
      searchContext.setSearchContext((prevState) => {
        return { ...prevState, loading: true };
      });
      navigate(`/results/${state.search}/${type}/${cleanOrder}`, {
        replace: true,
      });
    }
  };

  const handInputSearch = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setState({ ...state, [name]: name, search: value });
  };

  const typesOptions = [
    { value: "track", label: "Musiques" },
    { value: "album", label: "Albums" },
    { value: "artist", label: "Artistes" },
  ];

  const orderOptions = [
    { value: "ranking", label: "Les plus populaires" },
    { value: "asc", label: "Croissant" },
    { value: "desc", label: "Décroissant" },
  ];

  useEffect(() => {
    if (state.validate) {
      setState({ ...state, validate: false });
    }
  }, []);

  return (
    <>
      <SearchFormContainer onSubmit={onSubmit} method="post">
        <Row>
          <SearchInputContainer>
            <SearchButton>
              <Search />
            </SearchButton>
            <input
              type="text"
              name="search"
              placeholder="Appuyer sur entrer pour lancer la recherche"
              onChange={handInputSearch}
              required
            />
          </SearchInputContainer>
          <SelectInput
            options={typesOptions}
            name="type"
            className="typeSelect"
            onSelectValue={setType}
          />
          <SelectInput
            options={orderOptions}
            name="order"
            className="orderSelect"
            onSelectValue={setOrder}
          />
        </Row>
        <SubmitButton type="submit">Rechercher</SubmitButton>
      </SearchFormContainer>
    </>
  );
};

export default SearchInput;
