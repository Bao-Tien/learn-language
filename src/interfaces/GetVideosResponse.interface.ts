export interface IYoutubeVideo {
  type: 'video'
  id: string
  title: string
  publishedTime: string
  duration: string
  viewCount: {
    text: string
    short: string
  }
  thumbnails: {
    url: string
    width: number
    height: number
  }[]
  richThumbnail: {
    url: string
    width: number
    height: number
  } | null
  descriptionSnippet: {
    text: string
    bold?: boolean
  }[]
  channel: {
    name: string
    id: string
    thumbnails: {
      url: string
      width: number
      height: number
    }[]
    link: string
  }
  accessibility: {
    title: string
    duration: string
  }
  link: string
  shelfTitle: null
}

export interface IGetVideosResponse {
  result: IYoutubeVideo[]
}
