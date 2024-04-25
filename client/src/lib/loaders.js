import { defer } from "react-router-dom";
import apiRequest from "./apiRequest"

export const singlePageLoader = async ({ request, params}) => {
    try {
        const res = await apiRequest('/post/' + params.id);
        return res.data.data
    } catch (error) {
        console.log('error in loader:: ', error)
    }
}


export const listPageLoader = async ({ request, params}) => {
    try {
        const query = request.url.split('?')[1];
        const postPromise =  apiRequest('/post?' + query)
        return defer({
            postResponse: postPromise
        })

    } catch (error) {
        console.log('err in listpage loader:: ', error);
    }
}

export const profilePageLoader  = async ({requst, params}) => {
    const postPromise = apiRequest('/user/profilePosts')
    const chatPromise = apiRequest('/chat')
    
    console.log('postPromis:: ', postPromise);
    return defer({
        postResponse: postPromise,
        chatResponse: chatPromise
    })
}