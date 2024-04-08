export const handleCatchError = (error) => {

    console.log("*************error***************", error)
}
export const catchError = (name, error, req, res) => {
    handleCatchError(error)
    return res.status(500).json({ status: 500, message: `something went wrong with ${name}`})
}