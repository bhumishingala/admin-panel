import { deleteRequest, postRequest, putRequest, sendRequest } from "../request"


export const getAllMedicincesData = () => {
    return sendRequest('Medicices')
}

export const postMedicincesData = (data) => {
    return postRequest('Medicices' , data)
}

export const deleteMedicincesData = (id) => {
    return deleteRequest('Medicices/', id)
}

export const updateMedicincesData = (data) => {
    return putRequest('Medicices/' , data)
}
