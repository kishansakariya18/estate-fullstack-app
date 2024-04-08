import apiRequest from "./apiRequest"

export const singlePageLoader = async ({ request, params}) => {
    try {
        const res = await apiRequest('/post/' + params.id);
        return res.data.data
    } catch (error) {
        console.log('error in loader:: ', error)
    }
}