export const API_URL = 'http://localhost:5000'
export const getAuthUrl = (str: string) => `/auth${str}`
export const getOrdersUrl = (str: string) => `/orders${str}`
export const getProductUrl = (str: string) => `/items${str}`
export const getUsersUrl = (str: string) => `/users${str}`
export const getFilesUrl = (folder?: string) => `/files${folder ? `?folder=${folder}` : ''}`
