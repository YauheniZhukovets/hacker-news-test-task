import { AxiosResponse } from 'axios'

import { api } from '../http'
import { IStory } from '../models/IStory'

export class StoryService {
  static async fetchStoriesIds(): Promise<AxiosResponse<number[]>> {
    return api.get<number[]>(`/newstories.json`)
  }

  static async fetchStory(sId: number): Promise<AxiosResponse<IStory>> {
    return api.get<IStory>(`/item/${sId}.json`)
  }
}
