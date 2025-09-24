import { gql, request } from 'graphql-request'

const getDemos = async (activityId, projectId, target) => {
    let queryString = "";
    if(target === "onlyActivity"){
      queryString = `, where: {activityId: "${activityId}"}`;
    }else if(target === "Both"){
        queryString = `, where: {activityId: "${activityId}", demo_demoId: "${projectId}"}`;
    }  
    const query = gql`{
     demos(first: 10 ${queryString}) {
      id
      activityId
      demo_demoId
      demo_dataCID
      demo_cohortId
     }
    }`

    console.log("GraphQL Query:", query);
    const url = 'https://api.studio.thegraph.com/query/119046/subgraph-demos/v0.0.1'
    const headers = { 
        Authorization: `Bearer ${import.meta.env.VITE_GRAPH_API_KEY}` 
    }

    try {
        const data = await request(url, query, {}, headers)
        console.log("Demo graphql response data:", data);
        return data;
    } catch (error) {
        console.log("error:", error)
        throw error
    }
}

export default getDemos