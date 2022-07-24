import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import TrackCard from "../../Components/TrackCard";
import RowsFlexWrap from "../../Components/RowsFlexWrap";
import Api from "../../Services/Api";
import { getFavoris } from "../../Redux/Actions/favoris.action";
import { Helmet } from "react-helmet";
import { sleep } from "../../Utils/tracksFunction";

export const PageContainer = styled.div`
  padding: 10px;

  @media screen and (min-width: 680px) {
    display: grid;
    grid-template-columns: 920px 1fr;
  }

  .trackCardSearch {
    margin-right: auto;
    margin-left: auto;
    width: 80%;
    height: 220px;
    @media screen and (min-width: 738px) {
      width: 150px;
    }
    @media screen and (min-width: 990px) {
      margin-left: 15px;
      flex-grow: 0;
      flex: none;
      width: 200px;
      height: 280px;
      margin-bottom: 15px;
    }
  }
`;
export const SearchSection = styled.section`
  margin-to: 12px;
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
  border-radius: 100px;
  height: 40px;
  svg,
  span {
    width: 25px;
    height: 25px;
    color: var(--color-text);
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
  }
  @media screen and (min-width: 738px) {
    width: 450px;
  }
`;

export const Rows = styled.section`
  margin-top: 18px;
  margin-bottom: 18px;
  padding: 8px 12px;
  @media screen and (min-width: 1920px) {
    max-width: 1800px;
    margin: 15px auto;
  }
`;

export const RowTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
`;

export const RightSide = styled.aside`
  display: none;
  @media screen and (min-width: 738px) {
    display: block;
    padding-top: 2rem;
  }
`;

export const ResultText = styled.p`
  margin-top: 1.5rem;
  color: var(--color-default);
`;
export const Header = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.8rem;
`;

export const PageBody = styled.div``;

const Favoris = () => {
  const [loading, setLoading] = useState(true);
  const [favories, setFavoris] = useState([
    {
      id: 0,
      title: "",
      artist: { id: 0, name: "" },
      album: { id: 0, title: "" },
      cover: "",
      duration: "",
      preview: "",
    },
  ]);

  const dispatch = useDispatch();
  const favorieSelectore = useSelector((state) => state.FavorisReducers);

  useEffect(() => {
    dispatch(getFavoris());
    sleep(3000).then(() => setLoading(false));
  }, []);

  return (
    <PageContainer>
      <Helmet>
        <title>Mes favoris - DeezWeb</title>
      </Helmet>
      <PageBody>
        <Header>
          <RowTitle>Mes favoris</RowTitle>
        </Header>
        {!loading ? (
          <RowsFlexWrap>
            {favorieSelectore.map((search, i) => (
              <TrackCard
                style={{ "--data-count": i * 2 }}
                className="trackCardSearch apparition delay-animations "
                key={search.id}
                id={search.id}
                data={search}
              />
            ))}
          </RowsFlexWrap>
        ) : (
          "Chargements de vos pistes favoris"
        )}
      </PageBody>
      <div></div>
    </PageContainer>
  );
};

export default Favoris;
