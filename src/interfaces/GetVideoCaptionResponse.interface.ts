export interface IGetVideoCaptionResponse {
  segments: {
    startMs: string
    endMs: string
    text: string
    startTime: string
  }[]
  languages: {
    params: string
    selected: boolean
    title: string
  }[]
}
