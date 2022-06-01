
import React from 'react';
import * as anchor from '@project-serum/anchor';
import { Connection } from '@solana/web3.js';

import { useWallet } from '@solana/wallet-adapter-react';
import { getCandyMachineState } from '../candy-machine';
import type { CandyMachineState } from '../candy-machine';

const CandyMachineContext = React.createContext({} as any);

export const useCandyMachine = () => React.useContext(CandyMachineContext);

export const CandyMachineProvider = (
    { children }: { children: React.ReactNode }
) => {
    const wallet = useWallet();

    const [candyMachineState, setCandyMachineState] = React.useState<CandyMachineState>({} as CandyMachineState);

    const candyMachineId = process.env.NEXT_PUBLIC_CANDY_MACHINE_ID!;
    const rpcHost = process.env.NEXT_PUBLIC_SOLANA_RPC_HOST!;

    const anchorWallet = React.useMemo(() => {

        if (
            !wallet
        ) {
            console.log("empty wallet");
            return;
        }

        return {
            publicKey: wallet.publicKey,
            signAllTransactions: wallet.signAllTransactions,
            signTransaction: wallet.signTransaction,
        } as anchor.Wallet;
    }, [wallet]);

    const connection = new Connection(rpcHost, 'confirmed');

    const refreshCandyMachineState = async () => {
        const cndy = await getCandyMachineState(
            anchorWallet as anchor.Wallet,
            new anchor.web3.PublicKey(candyMachineId),
            connection,
        )
        setCandyMachineState(cndy?.state);
    }

    React.useEffect(() => {
        if (anchorWallet) {
            refreshCandyMachineState();
        }
    }, []);

    return <CandyMachineContext.Provider
        value={{
            candyMachineState,
        }}
    >
        {children}
    </CandyMachineContext.Provider>
}
