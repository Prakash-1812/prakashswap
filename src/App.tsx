import React from 'react';
import { Layout } from './components/layout/Layout';
import { TokenSwap } from './components/TokenSwap';
import { Card } from './components/ui/Card';

function App() {
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Swap Tokens Instantly
          </h1>
          <p className="text-gray-300 max-w-2xl">
            Trade tokens in an instant with our decentralized protocol. 
            No registration, no hassle - just connect your wallet and trade.
          </p>
        </div>

        <TokenSwap />

        <div className="mt-12 grid grid-cols-3 gap-8 w-full max-w-3xl">
          {[
            { title: 'Total Value Locked', value: '$1.2B' },
            { title: '24h Volume', value: '$238M' },
            { title: 'Supported Pairs', value: '100+' }
          ].map((stat, i) => (
            <Card key={i} className="p-4">
              <h3 className="text-gray-400 text-sm">{stat.title}</h3>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default App;