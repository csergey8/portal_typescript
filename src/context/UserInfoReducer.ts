import { UserInfoState } from "./UserInfoContext";

export enum userInfoActions {
  SET_USER_GEOLOCATION = '@@USER_INFO/SET_USER_GEOLOCATION',
  SET_USER_AIRPORTS = '@@USER_INFO/SET_USER_AIRPORTS',
}

const handlers: any = {
  DEFAULT: (state: UserInfoState) => state,
  [userInfoActions.SET_USER_GEOLOCATION]: (state: UserInfoState, action: any) => ({ ...state, coords: action.payload }),
  [userInfoActions.SET_USER_AIRPORTS]: (state: UserInfoState, action: any) => ({ ...state, airports: action.payload })
}

const userReducer = (state: UserInfoState, action: any) => {
  const handle: any = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
}

export { userReducer }