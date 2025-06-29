import { create } from "zustand";

export interface Prop{
    numberPassenger:string,
    setNumberPassenger:(passengers:string)=>void;

    numberPassengerOptions:string[]
    setNumberPassengerOptions?:(passengers:string[])=>void;
}

export const usePassengerCar = create<Prop>((set,get)=>{
    const store:Prop = {
        numberPassengerOptions:["Select","1","2","3","4","5","6+"],
        numberPassenger:"1",
        setNumberPassenger:(numberPassenger:string)=>{
            set({numberPassenger:numberPassenger})
        },
        setNumberPassengerOptions:(numberPassengerOptions:string[])=>{
            set({numberPassengerOptions:numberPassengerOptions})
        }
    }

    return store
})