import { sendRequest } from "../request"


export const getAllMedicinces = () => {
    return sendRequest('Medicices')
}
