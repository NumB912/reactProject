import { Service } from "./Service";
import { User } from "./user";

export interface request{
    id:string,
    person:User,
    status:string,
    name:string,
    service:Service,
    tax_code:string,
    company_name:string,
    create_at:string
    process_at:string,
    other_Document_supplier:Document[],
}

export interface Document{
    id:string,
    upload_by_id:string,
    file_url:string,
    upload_at:string,
    create_at:string,
}