import { useRecoilValue } from "recoil";
import { ethers, BigNumber } from "ethers";
import type { FeeData } from "@ethersproject/abstract-provider";
import type { EthereumContext } from "@coral-xyz/common";
import * as atoms from "../../atoms";
import { useActiveEthereumWallet } from "../wallet";
import { useBackgroundClient } from "../client";

const { AddressZero } = ethers.constants;

export function useEthersContext(): any {
  return useRecoilValue(atoms.ethersContext);
}

export function useEthereumFeeData(): any {
  const feeData = useRecoilValue(atoms.ethereumFeeData);
  return {
    gasPrice: BigNumber.from(feeData.gasPrice),
    maxFeePerGas: BigNumber.from(feeData.maxFeePerGas),
    maxPriorityFeePerGas: BigNumber.from(feeData.maxPriorityFeePerGas),
  } as FeeData;
}

export function useEthereumCtx(): EthereumContext {
  const wallet = useActiveEthereumWallet();
  const { provider } = useEthersContext();
  const backgroundClient = useBackgroundClient();
  const feeData = useEthereumFeeData();

  return {
    walletPublicKey: wallet ? wallet.publicKey : AddressZero,
    provider,
    feeData,
    backgroundClient,
  };
}
