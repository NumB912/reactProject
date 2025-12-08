export interface location{
  location:string,
  ward:ward
}

export interface ward{
  code:string,
  fullName:string,
  name:string,
  province:province
}

export interface province{
  code:string
  fullName:string,
  name:string
}