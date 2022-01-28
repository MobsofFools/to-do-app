import {useContext, createContext} from 'react'

export const thirdPartyTokenContext = createContext<string>("");
export const thirdPartyToken = useContext(thirdPartyTokenContext);