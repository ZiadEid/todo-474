import { createContext, useState } from "react";

export const GlobalStore = createContext();

export default function MainStore({ children }) {
  // States
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")),
  );

  // Vars
  const base_url = "http://localhost:1337/api";

  const data = {
    token,
    setToken,
    userData,
    setUserData,
    base_url
  };
  return <GlobalStore.Provider value={data}>{children}</GlobalStore.Provider>;
}
