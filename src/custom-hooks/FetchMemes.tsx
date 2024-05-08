import { useState, useEffect } from "react"
import { server_calls } from "../api/server"

export const useGetMemes = () => {
    const [ memeData, setData ] = useState<[]>([])

    async function handleMemesFetch() {
        const result = await server_calls.get("memes")
        setData(result)
    }

    useEffect( () => {
        handleMemesFetch();
    }, [])

    return { memeData, getData:handleMemesFetch }
}