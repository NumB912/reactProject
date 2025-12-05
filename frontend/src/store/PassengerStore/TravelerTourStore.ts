import { create } from "zustand";
import { UseTravelerProp } from "./interface";


export const useTravelerTour = create<UseTravelerProp>((set, get) => (    
{

  maxAdultQuantity: 10,
  minAdultQuantity: 0,
  adultQuantity: 0,
  seniorQuantity: 0,
  childrenQuantity: 0,
  tempChildrenQuantity: 0,
  maxChildrenQuantity: 0,
  minChildrenQuantity: 0,
  tempAdultQuantity: 0,
  tempSeniorQuantity: 0,
  total: 0,
  isShow:false,
  
  setIsShow(isShow:boolean) {
    set({isShow:isShow})
  },

  setTempAdultQuantity: (adults) => set({ tempAdultQuantity: adults }),
  setTempChildrenQuantity: (children) =>
    set({ tempChildrenQuantity: children }),

  incrementAdult: () => {
    const {tempAdultQuantity} = get()
    if(tempAdultQuantity<32){
         set({tempAdultQuantity:tempAdultQuantity+1})
    }

  },
  decrementAdult: () =>
    set((state) => ({
      tempAdultQuantity: Math.max(1, state.tempAdultQuantity - 1),
    })),

  incrementChildren: () => {
    const {tempChildrenQuantity } = get();
   {
      set((state) => ({
        tempChildrenQuantity: state.tempChildrenQuantity + 1,
      }));
    }
  },
  decrementChildren: () =>
    set((state) => ({
      tempChildrenQuantity: Math.max(0, state.tempChildrenQuantity - 1),
    })),

  submitTravelerData: () => {
    const { tempAdultQuantity, tempChildrenQuantity } = get();
    set({
      adultQuantity: tempAdultQuantity,
      childrenQuantity: tempChildrenQuantity,
    });
  },

  resetTempTravelerData: () => {
    const {adultQuantity, childrenQuantity } = get();
    set({
      tempAdultQuantity: adultQuantity,
      tempChildrenQuantity: childrenQuantity,
    });
  },
  setTotal:()=>{
    const {childrenQuantity,adultQuantity} = get();
    set({total:adultQuantity+childrenQuantity})
  }
}));

export default useTravelerTour;
