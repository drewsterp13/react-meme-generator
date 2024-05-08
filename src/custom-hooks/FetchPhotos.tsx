import { useState, useEffect } from "react"
import { server_calls } from "../api/server"

export const useGetPhotos = () => {
    const [ photoData, setData ] = useState<[]>([])

    async function handlePhotosFetch() {
        const result = await server_calls.get("photos")
        setData(result)
    }

    useEffect( () => {
        handlePhotosFetch();
    }, [])

    return { photoData, getData:handlePhotosFetch }
}