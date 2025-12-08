import { create } from "zustand";

export interface Login {
    isLogin: boolean;
    isShow: boolean;
    accessToken: string;
    refeshToken: string;
    expireDate: string;
    user_id:string;
    role:string,
    setUserId:(user_id:string)=>void;
    setRefeshToken: (refeshToken: string | null) => void;
    setExpireDate: (expireDate: string | null) => void;
    setAccessToken: (accessToken: string | null) => void;
    setIsLogin: (isLogin: boolean) => void;
    setShow: (isShow: boolean) => void;
    login: (accessToken: string,user_id:string,role:string) => Promise<void>;
    logout: () => Promise<void>;
    setRole:(role:string)=>void;
}

const useStateLogin = create<Login>((set, get) => ({
    isShow: false,
    isLogin: false,
    accessToken: "",
    refeshToken: "",
    expireDate: "",
    user_id:"",
    role:"",

    setRole(role) {
        set({role:role})
    },

    ...(typeof window !== "undefined" && {
    accessToken: localStorage.getItem("access_token") || "",
    user_id: localStorage.getItem("user_id") || "",
    isLogin:
      !!localStorage.getItem("access_token") && !!localStorage.getItem("user_id"),
  }),

    setUserId(user_id) {
        set({user_id:user_id})
    },
    login: async (accessToken,user_id,role) => {
        get().setAccessToken(accessToken);
        get().setUserId(user_id)
        get().setIsLogin(true)
        get().setRole(role)
        console.log(role)
        await localStorage.setItem("access_token", accessToken)
        await localStorage.setItem("user_id",user_id)
    },

    logout: async () => {
        get().setAccessToken(null);
        get().setUserId("")
        get().setIsLogin(false)
        get().setRole("")

        localStorage.removeItem("user_id")
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token")
    },

    setExpireDate: (expireDate: string | null) => {
        set({ expireDate: expireDate ?? "" });
    },

    setRefeshToken: (refeshToken: string | null) => {
        set({ refeshToken: refeshToken ?? "" })
    },

    setAccessToken: (accessToken: string | null) => {
        set({ accessToken: accessToken ?? "" })
    },

    setShow: (isShow: boolean) => {
        set({ isShow: isShow });
    },
    setIsLogin: (isLogin: boolean) => {
        set({ isLogin: isLogin });
    },
}));

export default useStateLogin;