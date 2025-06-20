import { create } from "zustand";

export interface Login{
    isSuccess:boolean;
    isShow: boolean;
    accessToken: string;
    refeshToken:string;
    expireDate:string;

    setRefeshToken:(refeshToken:string|null)=>void;
    setExpireDate:(expireDate:string|null)=>void;
    setAccessToken:(accessToken:string|null)=>void;
    setIsSuccess:(isSuccess: boolean) => void;
    setShow: (isShow: boolean) => void;
    login: (refeshToken:string,expireDate:string,accessToken:string) =>void;
    logout:(refeshToken:string,expireDate:string,accessToken:string)=>void;
}

const useStateLogin = create<Login>((set, get) => ({
    isShow: false,
    isSuccess:false,
    accessToken:"",
    refeshToken:"",
    expireDate:"",
    login:async (refeshToken,exprireDate, accessToken)=>{
         get().setRefeshToken(refeshToken);
        get().setAccessToken(accessToken);
        get().setExpireDate(exprireDate);

        await localStorage.setItem("refeshToken",refeshToken)
         await localStorage.setItem("accessToken",accessToken)
          await localStorage.setItem("expireDate",exprireDate)
    },

    logout: async () => {
        get().setRefeshToken(null);
        get().setAccessToken(null);
        get().setExpireDate(null);

        await localStorage.removeItem("refeshToken")
         await localStorage.removeItem("accessToken")
          await localStorage.removeItem("expireDate")
    },

    setExpireDate:(expireDate: string | null) => {
        set({ expireDate: expireDate ?? "" });
    },

    setRefeshToken:(refeshToken:string|null)=>{
        set({refeshToken: refeshToken ?? ""})
    },

    setAccessToken:(accessToken:string|null)=>{
        set({accessToken: accessToken ?? ""})
    },

    setShow: (isShow: boolean) => {
        set({ isShow:isShow });
    },
    setIsSuccess:(isSuccess:boolean)=>{
        set({isSuccess:isSuccess});
    },
}));

export default useStateLogin;