import axios from "axios"

export const createHttp = async (path: string, payload: any) => {
  const response = await axios.post(path, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("hahyvToken")}`
    }
  })

  return response?.data?.data
}

export const createResponseType = typeof createHttp