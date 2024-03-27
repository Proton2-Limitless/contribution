import type { BeforeChangeHook } from 'payload/dist/collections/config/types'

export const walletBeforeCreate: BeforeChangeHook = async ({
  req,
  operation,
  data
}) => {
  if (operation === 'create') {
    data.userId = req.user?.id
  }
  return data
}
