const token = "248f11e47ba02aaf45db324dad329d6e1ad5de49a6e9cdbe"
const link = "https://flask-meme-generator-kaz8.onrender.com/api"
// after '/api' enter '/memes' or '/photos'

export const server_calls = {
    get: async (table: string) => {
            const response = await fetch(`${link}/${table}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "x-access-token": `Bearer ${token}`,
                }
            })
            
            if (!response.ok) {
                throw new Error("Sorry, failed to fetch data")
            }

            return await response.json()
    },

    add: async (table: string, data: any = {}) => {
        const response = await fetch(`${link}/${table}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "x-access-token": `Bearer ${token}`,
                },
                body: JSON.stringify(data)
            })
            
        console.log(JSON.stringify(data))
        console.log(response.ok)
        
        if (!response.ok) {
            throw new Error("Sorry, cannot post data")
        }

        return await response.json()
    },

    update: async (table: string, id: string, data:any = {}) => {
        const response = await fetch(`${link}/${table}/${id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "x-access-token": `Bearer ${token}`,
                },
                body: JSON.stringify(data)
            })

        if (!response.ok) {
            throw new Error("Sorry, cannot update data")
        }

        return await response.json()
    },

    delete: async (table: string, id: string) => {
        const response = await fetch(`${link}/${table}/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "x-access-token": `Bearer ${token}`,
                }
            })

            if (!response.ok) {
                throw new Error("Sorry, cannot delete data")
            }

        return;
    }
}