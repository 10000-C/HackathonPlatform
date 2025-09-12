import { gql, request } from 'graphql-request'

const callSearchService = async (searchTerm, target) => {
    let queryString = "";
    if(target === "topic" || target === "activityId"){
      queryString = `, where: {${target}: "${searchTerm}"}`;
    }else if(target === "all"){
        queryString = "";
    }  
    const query = gql`{
     activities(first: 10 ${queryString}) {
      id
      activityId
      activity_dataCID
      activity_topic
      activity_participants
     }
    }`

    console.log("GraphQL Query:", query);
    const url = 'https://api.studio.thegraph.com/query/119046/subgraph-hackthon/version/latest'
    const headers = { 
        Authorization: `Bearer ${import.meta.env.VITE_GRAPH_API_KEY}` 
    }

    try {
        const data = await request(url, query, {}, headers)
        console.log("response data:", data);
        return data;
    } catch (error) {
        console.log("error:", error)
        throw error
    }
}

export default callSearchService