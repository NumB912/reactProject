import { create } from "zustand";
import { UsePassengerCarProp } from "./interface";


export const usePassengerCar = create<UsePassengerCarProp>((set,get)=>{
    const store:UsePassengerCarProp = {
        numberPassengerOptions:["Select","1","2","3","4","5","6+"],
        numberPassenger:"1",
        isSelectedPassenger:false,
        setNumberPassenger:(numberPassenger:string)=>{
            set({numberPassenger:numberPassenger})
        },
        setNumberPassengerOptions:(numberPassengerOptions:string[])=>{
            set({numberPassengerOptions:numberPassengerOptions})
        },

        setIsSelectedPassenger:(isSelected:boolean)=>{
            set({ isSelectedPassenger: isSelected });
        },
    }

    return store
})