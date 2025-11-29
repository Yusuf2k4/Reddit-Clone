export async function getCommunities({req, res}){
    const response = await fetch("http://localhost:8080/communities")
    const data = await response.json();
    return data
}


export async function getPostById({params} ){
    const {id} = params
    

    const respone = await fetch(`http://localhost:8080/post/${id}`)
    const data = await respone.json();
    console.log(data)
    return data;
}