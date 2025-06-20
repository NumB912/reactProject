import { create } from "zustand";

export interface Prop{
    numberPassenger:number,
    setNumberPassenger:(passengers:number)=>void;
}

export const usePassengerCar = create<Prop>((set,get)=>{
    const store:Prop = {
        numberPassenger:1,
        setNumberPassenger:(numberPassenger:number)=>{
            set({numberPassenger:numberPassenger})
        },

    }

    return store
})