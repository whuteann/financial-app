import { auth } from "../functions/Firebase";

export const login = (email: string, password: string, onSuccess: () => void, onError: (err: string) => void) => {
  auth.signInWithEmailAndPassword(email, password)
    .then(userCredentials => {
      console.log("signed in!")
    })
    .catch(error => {
      onError(error);
    }
    )
}