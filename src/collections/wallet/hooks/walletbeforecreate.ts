import { FieldHook } from 'payload/types'

export const walletBeforeCreate: FieldHook = async ({
  req,
  operation,
  value
}) => {
  if (operation === 'create') {
    value = req.user?.id
  }
  return value
}
