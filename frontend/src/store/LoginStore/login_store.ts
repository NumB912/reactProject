import { create } from "zustand";

export interface Login {
    isLogin: boolean;
    isShow: boolean;
    accessToken: string;
    refeshToken: string;
    expireDate: string;
    user_id:string;

    setUserId:(user_id:string)=>void;
    setRefeshToken: (refeshToken: string | null) => void;
    setExpireDate: (expireDate: string | null) => void;
    setAccessToken: (accessToken: string | null) => void;
    setIsLogin: (isLogin: boolean) => void;
    setShow: (isShow: boolean) => void;
    login: (accessToken: string,user_id:string) => Promise<void>;
    logout: () => Promise<void>;
}

const useStateLogin = create<Login>((set, get) => ({
    isShow: false,
    isLogin: false,
    accessToken: "",
    refeshToken: "",
    expireDate: "",
    user_id:"",

    ...(typeof window !== "undefined" && {
    accessToken: localStorage.getItem("accessToken") || "",
    user_id: localStorage.getItem("user_id") || "",
    isLogin:
      !!localStorage.getItem("accessToken") && !!localStorage.getItem("user_id"),
  }),

    setUserId(user_id) {
        set({user_id:user_id})
    },
    login: async (accessToken,user_id) => {
        get().setAccessToken(accessToken);
        get().setUserId(user_id)
        get().setIsLogin(true)

        await localStorage.setItem("accessToken", accessToken)
        await localStorage.setItem("user_id",user_id)
    },

    logout: async () => {
        get().setAccessToken(null);
        get().setUserId("")
        get().setIsLogin(false)

        localStorage.removeItem("user_id")
        localStorage.removeItem("accessToken");
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