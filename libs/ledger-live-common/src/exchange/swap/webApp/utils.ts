import { BigNumber } from "bignumber.js";
import { getGasLimit } from "@ledgerhq/coin-evm/logic";
import { AccountLike } from "@ledgerhq/types-live";

export const getCustomFeesPerFamily = transaction => {
  const {
    family,
    maxFeePerGas,
    maxPriorityFeePerGas,
    customGasLimit,
    feePerByte,
    fees,
    utxoStrategy,
  } = transaction;

  switch (family) {
    case "evm": {
      return {
        maxFeePerGas,
        maxPriorityFeePerGas,
        gasLimit: getGasLimit(transaction),
        customGasLimit,
      };
    }
    case "bitcoin": {
      return {
        feePerByte,
        utxoStrategy,
      };
    }
    default:
      return {
        fees,
      };
  }
};

export const convertToNonAtomicUnit = ({
  amount,
  account,
}: {
  amount?: BigNumber;
  account: AccountLike;
}) => {
  const fromMagnitude =
    account.type === "TokenAccount"
      ? account.token.units[0].magnitude || 0
      : account.currency?.units[0].magnitude || 0;
  return amount?.shiftedBy(-fromMagnitude);
};
