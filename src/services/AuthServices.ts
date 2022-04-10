import { auth } from "../functions/Firebase";
import firebase from "firebase/app";

export const login = (email: string, password: string, onSuccess: () => void, onError: (err: string) => void) => {
  auth.signInWithEmailAndPassword(email, password)
    .then(userCredentials => {
    })
    .catch(error => {
      onError(error);
    }
    )
}

export const reauthenticateUser = (currentPassword: string) => {
  var user = auth.currentUser;
  var cred = firebase.auth.EmailAuthProvider.credential(user?.email || "", currentPassword);
  return user?.reauthenticateWithCredential(cred);
} 