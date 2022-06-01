import '../styles/globals.css'
import type { AppProps } from 'next/app'

import React from 'react'
import {
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletWalletAdapter,
  SolletExtensionWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui';

function MyApp({ Component, pageProps }: AppProps) {

  const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

  const endpoint = React.useMemo(() => clusterApiUrl(network), []);

  const wallets = React.useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
    ], [],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletDialogProvider>
          <Component {...pageProps} />
        </WalletDialogProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default MyApp
