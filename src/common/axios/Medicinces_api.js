import { postRequest, sendRequest } from "../request"


export const getAllMedicinces = () => {
    return sendRequest('Medicices')
}

export const postMedicinces = (data) => {
    return postRequest('Medicices' ,data)
}
