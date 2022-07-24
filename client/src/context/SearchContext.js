import { createContext } from "react";

export default createContext({
  q: "",
  type: "track",
  order: "ranking",
  setSearchContext: () => {},
  loading: true,
});
