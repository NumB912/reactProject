export interface Room {
  id: string;
  name: string;         
  FacilitesGroup: FacilitiesGroup[]; 
  price: number;        
  area: number;          
  beds: Bed[];            
}

export interface FacilitiesGroup {
  id: string;              
  name: string;           
  facilities: Facility[];  
}

export interface Facility {
  id: string;             
  name: string;          
  facilityIcon: string;  
}

export interface Bed {
  id: string;              
  name: string;         
}
