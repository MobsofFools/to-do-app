import type { NextPage } from "next";
import { auth } from "../db/firebase-config";
import { signOut } from "firebase/auth";

const Home: NextPage = () => {
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      Home
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
