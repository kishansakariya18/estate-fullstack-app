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
        console.log('request:: ', request);
        const query = request.url.split('?')[1];
        const res = await apiRequest('/post?' + query)
        console.log('res:: ', res.data.data.posts);

        return res.data.data.posts
    } catch (error) {
        console.log('err in listpage loader:: ', error);
    }
}