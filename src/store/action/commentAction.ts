import { IComment } from '../../models/IComment'

export const setComment = (comment: IComment) => {
  return { type: 'COMMENT/SET-COMMENT', comment } as const
}
