import React, { useEffect } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar";
import Playerbar from "../PlayerBar";
import BottomNavigation from "../BottomNavigation";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getUrlBackgroundImage } from "../../Redux/Actions/backgroundImage.action";
const image =
  "https://e-cdns-images.dzcdn.net/images/cover/373bf35cf9fda4c0c3a10ed81ce8ccc9/1000x1000-000000-80-0-0.jpg";
export const BackgroundImage = styled.div`
  position: absolute;
  width: 100%;

  top: 100%;
  left: 0;
  bottom: 0;
`;

const MainContainer = styled.div`
  display: flex;
  min-height: 100vh;
  max-width: 100%;
  margin: 0 auto;
  position: relative;
  background: linear-gradient(0.33deg, #040c18 24.1%, #031b34 96.92%);
  tansition: all 0.35s;
  overflow-x: hidden;
`;
const LeftSide = styled.div`
  display: none;
  min-height: 100vh;
  position: relative;
  @media screen and (min-width: 550px) {
    width: 250px;
  }
`;
const MiddleSide = styled.div`
  width: 100%;
  min-height: 100vh;
  color: #fff;
  padding-bottom: 180px;
  transition: all 0.35s linear;
  background-image: linear-gradient(rgba(4, 12, 26, 0.8), rgba(4, 12, 26, 1)),
    ${({ img }) => `${img ? `url(${img})` : null}`};

  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
`;

const RightSide = styled.div`
  display: none;
  width: 200px;
  min-height: 100vh;
  position: relative;

  @media screen and (min-width: 550px) {
    width: 200px;
  }
`;

const MainLayout = () => {
  const backgroundImage = useSelector((state) => state.BackgroundImageReducer);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <MainContainer className="mainView">
        <SideBar />
        <MiddleSide img={backgroundImage}>
          <Outlet />
        </MiddleSide>
        <BottomNavigation />
      </MainContainer>
      <ToastContainer />
    </>
  );
};

export default MainLayout;
