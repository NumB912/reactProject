import { create } from "zustand";
import { UseCustomerHotelProp } from "./interface";

export const useTravelerHotel = create<UseCustomerHotelProp>((set, get) => ({
  maxRoomQuantity: 8,
  maxAdultQuantity: 32,
  maxChildrenQuantity:10,
  minChildrenQuantity: 0,
  minRoomQuantity: 1,
  minAdultQuantity: 1,
  


  roomQuantity: 1,
  adultQuantity: 1,
  childrenQuantity: 0,
  total: 1,

  setAdultQuantity(adult) {
    console.log(adult)
    set({
      adultQuantity: adult,
    });
  },

  setChildrenQuantity(children) {
    set({ childrenQuantity: children });
  },

  setRoomQuantity(room) {
    set({ roomQuantity: room });
  },

  incrementRoom: () => {
    const { roomQuantity, adultQuantity, maxRoomQuantity } = get();

    if (roomQuantity >= maxRoomQuantity) return;

    const nextRoom = roomQuantity + 1;
    if (adultQuantity < nextRoom) {
      set({
        adultQuantity: adultQuantity + 1,
        roomQuantity: nextRoom,
      });
    } else {
      set({ roomQuantity: nextRoom });
    }
  },

  decrementRoom: () => {
    const { roomQuantity, adultQuantity, childrenQuantity } = get();

    const nextRoom = roomQuantity - 1;
    if (nextRoom < 1) return;

    const totalPeople = adultQuantity + childrenQuantity;
    if (totalPeople < nextRoom) return;

    let newChildren = childrenQuantity;
    if (nextRoom < 2 && newChildren > 10) {
      newChildren = 10;
    }

    let newAdults = adultQuantity;
    const maxAdults = nextRoom * 4;
    if (newAdults > maxAdults) {
      newAdults = maxAdults;
    }

    set({
      roomQuantity: nextRoom,
      childrenQuantity: newChildren,
      adultQuantity: newAdults,
    });
  },

  incrementAdult: () => {
    const { roomQuantity, adultQuantity } = get();

    if (roomQuantity * 4 <= adultQuantity && roomQuantity < 8) {
      set({ roomQuantity: roomQuantity + 1 });
    }
    if (adultQuantity < 32) {
      set({ adultQuantity: adultQuantity + 1 });
    }
  },
  decrementAdult: () =>
    set((state) => ({
      adultQuantity: Math.max(1, state.adultQuantity - 1),
    })),

  incrementChildren: () => {
    const { childrenQuantity } = get();
    if (
      childrenQuantity < get().maxChildrenQuantity
    ) {
      set((state) => ({
        childrenQuantity: state.childrenQuantity + 1,
      }));
    }
  },
  decrementChildren: () =>
    set((state) => ({
      childrenQuantity: Math.max(0, state.childrenQuantity - 1),
    })),

  submitTravelerData: () => {
    const { roomQuantity, adultQuantity, childrenQuantity } = get();
    set({
      roomQuantity: roomQuantity,
      adultQuantity: adultQuantity,
      childrenQuantity: childrenQuantity,
    });
  },

  resetTempTravelerData: () => {
    const { roomQuantity, adultQuantity, childrenQuantity } = get();
    set({
      roomQuantity: roomQuantity,
      adultQuantity: adultQuantity,
      childrenQuantity: childrenQuantity,
    });
  },
  setTotal: () => {
    const { childrenQuantity, adultQuantity } = get();
    set({ total: adultQuantity + childrenQuantity });
  },
}));

export default useTravelerHotel;
