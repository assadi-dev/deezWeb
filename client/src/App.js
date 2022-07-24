import "./App.css";

import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Tracks from "./Pages/Tracks";
import Favoris from "./Pages/Favoris";
import Albums from "./Pages/Albums";
import Artists from "./Pages/Artists";
import MainLayout from "./Components/Themes/MainLayout";
import TrackSelected from "./Pages/Tracks/TrackSelected";
import AlbumSelected from "./Pages/Albums/AlbumSelected";
import ArtistSelected from "./Pages/Artists/ArtistSelected";
import SearchPageResult from "./Pages/SearchPageResult";
import "react-toastify/dist/ReactToastify.css";
import SearchContext from "./context/SearchContext";
import { useState } from "react";
import { useEffect } from "react";
import { sleep } from "./Utils/tracksFunction";

function App() {
  const [searchState, setSearchState] = useState({
    q: "",
    type: "track",
    order: "ranking",
    loading: true,
  });

  const contextValue = {
    q: searchState.q,
    type: searchState.type,
    order: searchState.order,
    setSearchContext: setSearchState,
    loading: searchState.loading,
  };

  useEffect(() => {
    sleep(3000).then(() =>
      setSearchState((prevState) => {
        return { ...prevState, loading: false };
      })
    );
  }, []);

  return (
    <SearchContext.Provider value={contextValue}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="tracks" element={<Tracks />}></Route>
          <Route path="track/:id" element={<TrackSelected />}></Route>
          <Route path="artists" element={<Artists />}></Route>
          <Route path="artist/:id" element={<ArtistSelected />}></Route>
          <Route path="albums" element={<Albums />}></Route>
          <Route path="album/:id" element={<AlbumSelected />}></Route>
          <Route path="favoris" element={<Favoris />}></Route>
          <Route
            path="/results/:q/:type/:order"
            element={<SearchPageResult />}
          ></Route>
        </Route>
      </Routes>
    </SearchContext.Provider>
  );
}

export default App;
