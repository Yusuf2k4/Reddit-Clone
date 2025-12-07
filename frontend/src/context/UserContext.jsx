import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../util/api";

export const UserContext = createContext();
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function restoreUser() {
      const data = await getUser();
      setUser(data);
    }
    restoreUser();
  }, []);
  function saveUser(User) {
    setUser(User);
  }

  function updateUser(updatedField) {
    setUser((prev) => ({ ...prev, ...updatedField }));
  }

  return (
    <UserContext.Provider value={{ user, saveUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}
