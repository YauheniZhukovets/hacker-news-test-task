import { StatusType } from '../../type/Common'
import { NullAnd } from '../../type/NullAnd'

export const setStatus = (status: StatusType) => {
  return { type: 'APP/SET-STATUS', status } as const
}

export const setError = (error: NullAnd<string>) => {
  return { type: 'APP/SET-ERROR', error } as const
}
