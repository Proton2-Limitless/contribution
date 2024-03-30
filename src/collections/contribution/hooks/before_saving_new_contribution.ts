import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { addMonths, addWeeks, } from "date-fns";

export const savingNewContribution: BeforeChangeHook = async ({
  operation,
  data,
  req: { user, payload },
}) => {
  if (operation === "create") {
    let targetDateTime = new Date();
  
    if (data?.intervals === "week") {
      targetDateTime = addWeeks(targetDateTime,1);
    } else if (data?.intervals === "month") {
      targetDateTime = addMonths(targetDateTime,1);
    }

    data.members = [user.id]
    data.payDate = targetDateTime
    data.totalSaving = data?.amountToContribute
    data.rotationOrder = user?.id,
    data.payoutHistory = []


    const userWallet = await payload.find({
      collection: "wallets",
      where: { userId: user?.id },
    });

    await payload.create({
      collection: "perform_bank_op",
      data: {
        amount: data?.amountToContribute,
        reason: "for contribution",
        type: "debit",
        wallet: userWallet.docs[0].id,
      },
    });

    await payload.update({
      collection: "wallets",
      id: userWallet.docs[0].id,
      data: {
        availableBalance: userWallet.docs[0].availableBalance - data?.amountToContribute
      },
    });
  }
  return data
};