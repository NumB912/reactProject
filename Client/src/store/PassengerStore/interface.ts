export interface UsePassengerFlightProp {
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


export interface UsePassengerCarProp{
    numberPassenger:string,
    setNumberPassenger:(passengers:string)=>void;
    isSelectedPassenger?:boolean;
    setIsSelectedPassenger:(isSelected:boolean)=>void;

    numberPassengerOptions:string[]
    setNumberPassengerOptions?:(passengers:string[])=>void;
}

export interface UseCustomerHotelProp {
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

export interface UseTravelerProp {
  adultQuantity: number;
  childrenQuantity: number;
  seniorQuantity:number;

  tempAdultQuantity: number;
  tempChildrenQuantity: number;
  tempSeniorQuantity:number;

  minChildrenQuantity:number;
  maxChildrenQuantity:number;
  maxAdultQuantity:number;
  minAdultQuantity:number;
  total:number;

  isShow:boolean;

  setIsShow:(isShow:boolean)=>void;
  setTotal:()=>void;
  setTempAdultQuantity: (adults: number) => void;
  setTempChildrenQuantity: (children: number) => void;

  incrementAdult: () => void;
  decrementAdult: () => void;

  incrementChildren: () => void;
  decrementChildren: () => void;

  submitTravelerData: () => void;
  resetTempTravelerData: () => void;
}