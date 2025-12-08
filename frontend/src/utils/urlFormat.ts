
const baseURL = import.meta.env.VITE_API_URL
export function formatUrlImg(url:string){
    if(!url){
        return ""
    }   

    console.log(baseURL)

    return baseURL + url
}