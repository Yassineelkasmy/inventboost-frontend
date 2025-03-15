import { useState, useEffect } from "react";
import { getIdToken, onAuthStateChanged, User } from "firebase/auth";
import { auth } from '../firebase';
import { useDispatch } from "react-redux";
import { userActions } from "../user/userSlice";

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()


    useEffect(() => {
        if (user) {
            dispatch(userActions.setUser({
                email: user.email ?? undefined,
                extAuthId: user.uid,
            }))


        }
    }, [user])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await getIdToken(user)
                localStorage.setItem('jwt_token', token)
            }
            setUser(user)
            setLoading(false)


        });

        return unsubscribe;
    }, []);



    return { user, loading };
};