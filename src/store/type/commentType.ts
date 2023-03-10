import { refreshComment, setComment } from '../action/commentAction'

export type SetCommentType = ReturnType<typeof setComment>
export type refreshCommentType = ReturnType<typeof refreshComment>

export type ActionCommentType = SetCommentType | refreshCommentType
