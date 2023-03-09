import { setError, setStatus } from '../action/appAction'

export type SetStatusType = ReturnType<typeof setStatus>
export type SetErrorType = ReturnType<typeof setError>

export type ActionAppType = SetStatusType | SetErrorType
