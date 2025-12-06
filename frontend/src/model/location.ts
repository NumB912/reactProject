export interface location{
  location:string,
  ward:ward
}

export interface ward{
  fullName:string,
  name:string,
  province:province
}

export interface province{
  fullName:string,
  name:string
}