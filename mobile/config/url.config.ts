export const getPriceUrl = (slug: string) => `/price/${slug}`
export const getOrderUrl = (slug: string) => `/order/${slug}`
export const getUserUrl = (slug: string) => `/user/${slug}`

export const getAdminUrl = (url: string) => `/manage/${url}`
export const getAdminHomeUrl = () => getAdminUrl('').slice(0, -1)
