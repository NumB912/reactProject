import { create } from "zustand";

export interface Prop {
  adultQuantity: number;
  seniorQuantity: number;
  childrenQuantity: number;
  total: number;
  isTotalOver:boolean;
  
  setIsTotalOveer:(isOver:boolean)=>void;
  setAddAdultQuantity: ()=>void
  setMinusAdultQuantity: () => void;
  setAddSeniorQuantity:()=>void
  setMinusSeniorQuantity: () => void;
  setAddChildrenQuantity: () => void;
  setMinusChildrenQuantity: ()=>void;
  setReset: () => void;
}

export const useTraveler = create<Prop>((set, get) => {
  const updateTotal = () => {
    const { adultQuantity, seniorQuantity, childrenQuantity } = get();
    const total = adultQuantity + seniorQuantity + childrenQuantity;
    set({ total });
  };



  const store: Prop = {
    adultQuantity: 1,
    seniorQuantity: 0,
    childrenQuantity: 0,
    total: 1,
    isTotalOver:false,

setIsTotalOveer(isOver:boolean) {
  set({isTotalOver:isOver})
},

setAddAdultQuantity: () => {
  const { total, adultQuantity } = get();
  if (total + 1 > 6) return;
  set({ adultQuantity: adultQuantity + 1 });
  updateTotal();
},

setMinusAdultQuantity: () => {
  const { adultQuantity,seniorQuantity } = get();
  if(adultQuantity==1&&seniorQuantity<1)return;

  if (adultQuantity > 0) {
    set({ adultQuantity: adultQuantity - 1 });
    updateTotal();
  }
},

setAddSeniorQuantity: () => {
  const { total, seniorQuantity } = get();
  if (total + 1 > 6) return;
  set({ seniorQuantity: seniorQuantity + 1 });
  updateTotal();
},

setMinusSeniorQuantity: () => {
  const { adultQuantity,seniorQuantity } = get();
  if(seniorQuantity==1&&adultQuantity<1)return;
  if (seniorQuantity > 0) {
    set({ seniorQuantity: seniorQuantity - 1 });
    updateTotal();
  }
},

setAddChildrenQuantity: () => {
  const { total, childrenQuantity,adultQuantity,seniorQuantity} = get();
  if (adultQuantity+seniorQuantity<1) return
  if (total + 1 > 6) return;
  set({ childrenQuantity: childrenQuantity + 1 });
  updateTotal();
},

setMinusChildrenQuantity: () => {
  const { childrenQuantity } = get();
  if (childrenQuantity > 0) {
    set({ childrenQuantity: childrenQuantity - 1 });
    updateTotal();
  }
},

    setReset: () => {
      set({
        adultQuantity: 1,
        seniorQuantity: 0,
        childrenQuantity: 0,
        total: 1,
      });
    },
  };

  return store;
});
