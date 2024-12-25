import { getUserData, removeUserData } from "./storage";
import { auth } from "./firebase";

export const isAuthenticated = () => {
  return getUserData() != null ? true : false; //if data present then true else false
};
export const logout = () => {
  removeUserData();
};
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};
