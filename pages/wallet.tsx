
import React from 'react';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletDialogButton } from '@solana/wallet-adapter-material-ui';

const WalletPage = () => {
    const wallet = useWallet();

    return (
        <>
            {!wallet.connected ? (
                <WalletDialogButton>Connect Wallet</WalletDialogButton>
            ) : <>{"Connected!"} {wallet.publicKey?.toBase58()}</>}
        </>
    )
}

export default WalletPage;