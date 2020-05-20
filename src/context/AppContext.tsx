/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { userReducer, userInfoActions } from "./UserInfoReducer";
import { airportsFinderApi } from "../api";

export interface UserInfoState {
  coords: { 
    lat: string
    lng: string
  } | null
  city: string | null
  country: string | null
  airports: Array<{}> | null
  isLoading: boolean,
  origin: string
  originAutcomplete: Array<{}> 
  destination: string 
  destinationAutocomplete: Array<{}>
}
// export interface InitialStateInterface {
//   userInfo: UserInfoState
// }

const initialState: UserInfoState = {
    coords: null,
    city: null,
    country: null,
    airports: null,
    isLoading: true,
    origin: '',
    originAutcomplete: [],
    destination: '',
    destinationAutocomplete: [],
}

const getCoords = async () => {
  try {
    let pos: any = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => resolve(position), reject);
    }); 
    return { lat: pos.coords.latitude, lng: pos.coords.longitude }
  } catch (error) {
    return { lat: 51.5098, lng: 0.1180 }
  }
}


const AppContext = 
React.createContext<{ state: UserInfoState; getUserInfo: () => void }>({state: initialState, getUserInfo: () => null})

const AppProvider: React.FC = ({ children }) => {
  
  const [state, dispatch] = React.useReducer(userReducer, initialState)

  const getUserInfo = async () => {
    const coords = await getCoords();
    dispatch({ type: userInfoActions.SET_USER_GEOLOCATION , payload: coords })
    const { data } = await airportsFinderApi.getAirportsByRadius(coords)
    dispatch({ type: userInfoActions.SET_USER_AIRPORTS, payload: data })
}


return <AppContext.Provider value={{state, getUserInfo}}>{children}</AppContext.Provider>
}

export { AppProvider, AppContext }