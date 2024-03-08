import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [auth,setAuth] = useState({
        user : null
    })

    useEffect(()=>{
        const loginUser = JSON.parse(localStorage.getItem('userLogin'))
        if(loginUser){
            setAuth({
                ...auth,
                user : loginUser
            })
        }
    },[])

    return (
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )


}
//useAuth is Custom Hook
const useAuth = () => useContext(AuthContext);
export {useAuth,AuthProvider};