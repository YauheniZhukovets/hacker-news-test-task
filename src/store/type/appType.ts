import { setError, setStatus } from '../action'

export type SetStatusType = ReturnType<typeof setStatus>
export type SetErrorType = ReturnType<typeof setError>

export type ActionAppType = SetStatusType | SetErrorType
