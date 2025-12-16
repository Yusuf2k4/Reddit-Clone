import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../util/api";

export const UserContext = createContext();
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function restoreUser() {
      try {
        const data = await getUser(); // this throws 401 when not logged in
        setUser(data);
      } catch (err) {
        console.log("No logged in user");
        setUser(null); // IMPORTANT: prevent inconsistent state
      }
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
