import { refreshComment, setComment } from '../action'

export type SetCommentType = ReturnType<typeof setComment>
export type refreshCommentType = ReturnType<typeof refreshComment>

export type ActionCommentType = SetCommentType | refreshCommentType
