export interface PROVINCE{
 ProvinceID:string
 NameProvince:string
 Area:AREA;
}

export interface AREA{
    AreaID:string;
    NameArea:string;
}

export interface LOCATION{
    LocationID:string,
    Province:PROVINCE,
    Distinct?:DISTINCT,
    AddressNumber:string,
    Area:AREA,
    Ward?:WARD
}

export interface DISTINCT{
    DistinctID:string,
    NameDistinct:string,
    Province:PROVINCE
}

export interface WARD{
    WardID:string,
    NameWard:string,
    Distinct:DISTINCT
}
