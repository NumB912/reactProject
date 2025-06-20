import { create } from "zustand";

interface TravelerState {
  roomQuantity: number;
  adultQuantity: number;
  childrenQuantity: number;

  tempRoomQuantity: number;
  tempAdultQuantity: number;
  tempChildrenQuantity: number;
  maxRoomQuantity:number;
  minRoomQuantity:number;
  minChildrenQuantity:number;
  maxAdultQuantity:number;
  minAdultQuantity:number;
  total:number;

  setTotal:()=>void;
  setTempRoomQuantity: (rooms: number) => void;
  setTempAdultQuantity: (adults: number) => void;
  setTempChildrenQuantity: (children: number) => void;

  incrementRoom: () => void;
  decrementRoom: () => void;

  incrementAdult: () => void;
  decrementAdult: () => void;

  incrementChildren: () => void;
  decrementChildren: () => void;

  submitTravelerData: () => void;
  resetTempTravelerData: () => void;
}

const useTravelerHotel = create<TravelerState>((set, get) => (    
{

  maxRoomQuantity:8,
  maxAdultQuantity:32,
  minChildrenQuantity:0,
  minRoomQuantity:1,
  minAdultQuantity:1,

  roomQuantity: 1,
  adultQuantity: 1,
  childrenQuantity: 0,

  tempRoomQuantity: 1,
  tempAdultQuantity: 1,
  tempChildrenQuantity: 0,
  total: 1,

  setTempRoomQuantity: (rooms) => set({ tempRoomQuantity: rooms }),
  setTempAdultQuantity: (adults) => set({ tempAdultQuantity: adults }),
  setTempChildrenQuantity: (children) =>
    set({ tempChildrenQuantity: children }),

incrementRoom: () => {
  const { tempRoomQuantity, tempAdultQuantity,maxRoomQuantity } = get();

  if (tempRoomQuantity >= maxRoomQuantity) return;

  const nextRoom = tempRoomQuantity + 1;
  if (tempAdultQuantity < nextRoom) {
    set({
      tempAdultQuantity: tempAdultQuantity + 1,
      tempRoomQuantity: nextRoom,
    });
  } else {
    set({ tempRoomQuantity: nextRoom });
  }
},

decrementRoom: () => {
  const { tempRoomQuantity, tempAdultQuantity, tempChildrenQuantity } = get();

  const nextRoom = tempRoomQuantity - 1;
  if (nextRoom < 1) return;

  const totalPeople = tempAdultQuantity + tempChildrenQuantity;
  if (totalPeople < nextRoom) return;

  let newChildren = tempChildrenQuantity;
  if (nextRoom < 2 && newChildren > 10) {
    newChildren = 10;
  }

  let newAdults = tempAdultQuantity;
  const maxAdults = nextRoom * 4;
  if (newAdults > maxAdults) {
    newAdults = maxAdults;
  }

  set({
    tempRoomQuantity: nextRoom,
    tempChildrenQuantity: newChildren,
    tempAdultQuantity: newAdults,
  });
},


  incrementAdult: () => {
    const {tempRoomQuantity,tempAdultQuantity} = get()

    if(tempRoomQuantity*4<=tempAdultQuantity && tempRoomQuantity < 8){
        set({tempRoomQuantity:tempRoomQuantity+1})
        
    }
    if(tempAdultQuantity<32){
         set({tempAdultQuantity:tempAdultQuantity+1})
    }

  },
  decrementAdult: () =>
    set((state) => ({
      tempAdultQuantity: Math.max(1, state.tempAdultQuantity - 1),
    })),

  incrementChildren: () => {
    const { tempRoomQuantity, tempChildrenQuantity } = get();
    if (
      tempRoomQuantity * 10 > tempChildrenQuantity &&
      tempChildrenQuantity < 20
    ) {
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
    const { tempRoomQuantity, tempAdultQuantity, tempChildrenQuantity } = get();
    set({
      roomQuantity: tempRoomQuantity,
      adultQuantity: tempAdultQuantity,
      childrenQuantity: tempChildrenQuantity,
    });
  },

  resetTempTravelerData: () => {
    const { roomQuantity, adultQuantity, childrenQuantity } = get();
    set({
      tempRoomQuantity: roomQuantity,
      tempAdultQuantity: adultQuantity,
      tempChildrenQuantity: childrenQuantity,
    });
  },
  setTotal:()=>{
    const {childrenQuantity,adultQuantity} = get();
    set({total:adultQuantity+childrenQuantity})
  }
}));

export default useTravelerHotel;
