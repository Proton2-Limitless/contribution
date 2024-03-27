import type { Access } from 'payload/config'

export const firstTimeWalletAccess: Access = async ({ req: { user,payload } }) => {
    const hasWallet = await payload.find({collection: "wallets",where:{userId: user}})
    if(hasWallet.docs.length){
        return false
    }
    return true
}
