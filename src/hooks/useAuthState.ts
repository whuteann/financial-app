import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { auth } from "../functions/Firebase";
import { reset } from "../redux/reducers/Auth";

export default function () {
  const dispatch = useDispatch();

  const [session, setSession] = useState<any>(undefined);
  const [isSessionAlive, setSessionAlive] = useState<boolean | null>(null);

  const onAuthStateChanged = async (state: any) => {
    setSession(state);
    setSessionAlive(!!state);
  };

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const clearSession = async () => {
    dispatch(reset());
    setSession(null);
    setSessionAlive(false);
  };

  return {
    isSessionAlive,
    session,
    clearSession,
  };
}
