
import React from 'react';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletDialogButton } from '@solana/wallet-adapter-material-ui';
import { useCandyMachine } from '../contexts/candy-machine';

const WalletPage = () => {
    const wallet = useWallet();

    const candyMachineContext = useCandyMachine();

    React.useEffect(() => {
        console.log(candyMachineContext.candyMachineState);
    }, [candyMachineContext.candyMachineState]);

    return (
        <>
            {!wallet.connected ? (
                <WalletDialogButton>Connect Wallet</WalletDialogButton>
            ) : <>{"Connected!"} {wallet.publicKey?.toBase58()}</>}
        </>
    )
}

export default WalletPage;