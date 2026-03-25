export const GTM_ID = 'GTM-5P5MC48H'

type DataLayer = Record<string, unknown>[]

const getDataLayer = (): DataLayer | undefined => {
  if (typeof window === 'undefined') return undefined
  return (window as unknown as { dataLayer?: DataLayer }).dataLayer
}

export const pageview = (url: string) => {
  const dl = getDataLayer()
  if (dl) {
    dl.push({ event: 'pageview', page: url })
  }
}

export const pushEvent = (event: string, data?: Record<string, unknown>) => {
  const dl = getDataLayer()
  if (dl) {
    dl.push({ event, ...data })
  }
}
