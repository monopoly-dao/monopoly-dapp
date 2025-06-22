'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// import { injected, metaMask, safe } from 'wagmi/connectors';
import { persistor, store } from '../../store';

// export const config = createConfig({
//   chains: [hardhat],
//   connectors: [injected(), metaMask(), safe()],
//   transports: {
//     [hardhat.id]: http(),
//   },
// });

// const queryClient = new QueryClient();

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    // <WagmiProvider config={config}>
    //   <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
    //   </QueryClientProvider>
    // </WagmiProvider>
  );
}
