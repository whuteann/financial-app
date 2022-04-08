import Validate from "validate.js";
import { auth, userRef } from "../functions/Firebase"
import { User } from "../types/User"

export const getUserDetail = (uid: string, onSuccess: (user: User) => void, onError: () => void) => {
  userRef.doc(uid)
    .onSnapshot((snapshot) => {
      if (Validate.isEmpty(snapshot) || !snapshot?.exists) {
        onError();
        return;
      }

      let user: User = {
        id: uid,
        ...snapshot.data()
      } as User;

      return onSuccess(user);
    });
}

export const createUser = (data: { name: string, email: string, password: string, currency: string }, onSuccess: () => void, onError: (error: string) => void) => {
  const { email, password } = data;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      userRef.doc(user?.uid).set(data).then(() => {
        onSuccess();
      }).catch((error) => {
        onError(error);
      })
    })
    .catch((error) => {
      onError(error);
    });
}

