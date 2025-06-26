import { create } from "zustand";
import React, { ReactNode } from "react";

interface Props {
    icon?: ReactNode;
    iconColor?:string;
    children?: React.ReactNode;
    containStyle?:string;
    onClick?:()=>void;
}

const useButton = create((get,set)=>{

    

})