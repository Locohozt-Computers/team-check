import axios from "axios"

export const createHttp = async (path: string, payload: any) => {
  const userObj: any = localStorage.getItem("techCheckPoint")
  const token = JSON.parse(userObj)?.token
  
  const response = await axios.post(path, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })

  return response?.data?.data
}

export const createResponseType = typeof createHttp