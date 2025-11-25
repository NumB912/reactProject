export interface Person{
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    role: Role;
    avatar:Image;
    wallpaper:Image;
    bio:string;
}

interface Role{
    id: number;
    role_name: string;
    permission:Permission[];
}

interface Permission{
    id: number;
    permission_name: string;
}
