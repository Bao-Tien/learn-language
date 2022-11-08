export interface IGetVideoInfoResponse {
  id: string
  title: string
  duration: {
    secondsText: string
  }
  viewCount: {
    text: string
  }
  thumbnails: {
    url: string
    width: number
    height: number
  }[]
  description: string
  channel: {
    name: string
    id: string
    link: string
  }
  allowRatings: boolean
  averageRating: null
  keywords: null
  isLiveContent: boolean
  publishDate: Date
  uploadDate: Date
  isFamilySafe: boolean
  category: string
  isLiveNow: boolean
  link: string
}
