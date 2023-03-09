import { AxiosResponse } from 'axios'

import { api } from '../http'
import { IComment } from '../models/IComment'

export class CommentService {
  static async fetchComment(cId: number): Promise<AxiosResponse<IComment>> {
    return api.get<IComment>(`/item/${cId}.json`)
  }
}
