const httpGet = async (endpointSuffix:string, params?: URLSearchParams, accessToken?: string) =>{
    try {
        //const res = await fetch(`${process.env.MAIN_ROUTE}${endpointSuffix}${params ? `${params}` : '' }`,{
        const res = await fetch(`http://localhost:5056${endpointSuffix}${params ? `${params}` : '' }`,{
            headers: !accessToken ?{'Content-Type': 'application/json'} : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        })
        if(!res.ok){
            console.log(`${res.status} - ${res.statusText}`);
            
            throw new Error('Faild to retrieve: ' + endpointSuffix)
        }
        return res.json()   
    } catch (error) {
        console.log("ERROR AQUÍ httpGet:", error);
        throw new Error(`Failed to retrieve users: ${error}`)
        
    }
}

export default httpGet;