//import React from 'react';
//import { userReducer } from './UserInfoReducer';

export interface UserInfoState {
  coords: { 
    lat: string
    long: string
  } | null
}

export const initialState: UserInfoState = {
  coords: null
}

// const UserInfoContext = 
// React.createContext<{state: UserInfoState; dispatch: React.Dispatch<any>;}>({ state: initialState, dispatch: () => null })

// const UserInfoProvider: React.FC<any> = ({ children }) => {
//   const [state, dispatch] = React.useReducer(userReducer, initialState)

//   return <UserInfoContext.Provider value={{ state, dispatch}}>{children}</UserInfoContext.Provider>
// }

// export { UserInfoProvider }