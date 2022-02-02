
import { useEffect, useState } from "react";
import { AuthContext } from "../../common/context";
import {User} from 'firebase/auth';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../db/firebase-config";

const AuthProvider:React.FC = ({children}) => {
    const [user, setUser] = useState<User|null>(null);
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    },[]);
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export default AuthProvider