import { create } from "zustand";

export interface Prop{
    numberPassenger:string,
    setNumberPassenger:(passengers:string)=>void;
    isSelectedPassenger?:boolean;
    setIsSelectedPassenger:(isSelected:boolean)=>void;

    numberPassengerOptions:string[]
    setNumberPassengerOptions?:(passengers:string[])=>void;
}

export const usePassengerCar = create<Prop>((set,get)=>{
    const store:Prop = {
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