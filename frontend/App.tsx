import React, { useState, useEffect } from 'react';

// Types pour le projet
interface Trade {
  id: number;
  symbol: string;
  type: 'BUY' | 'SELL';
  profit: number;
}

const App = () => {
  const [balance, setBalance] = useState(5000);
  const [status, setStatus] = useState<'ACTIVE' | 'FAILED'>('ACTIVE');
  const [iamPrice, setIamPrice] = useState(95.20);
  const [btcPrice, setBtcPrice] = useState(64500);
  const [trades, setTrades] = useState<Trade[]>([]);

  // Simulation des prix en temps réel (Module B)
  useEffect(() => {
    const interval = setInterval(() => {
      setIamPrice(prev => prev + (Math.random() - 0.5));
      setBtcPrice(prev => prev + (Math.random() - 0.5) * 100);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Logique d'échec (Max Loss 10% = 500$)
  useEffect(() => {
    if (balance <= 4500) {
      setStatus('FAILED');
    }
  }, [balance]);

  const executeTrade = (symbol: string, type: 'BUY' | 'SELL') => {
    if (status === 'FAILED') return;
    
    // Simulation d'un trade qui impacte le solde
    const profitChange = (Math.random() - 0.6) * 100; // Simule souvent des pertes pour la démo
    setBalance(prev => prev + profitChange);
    setTrades([...trades, { id: Date.now(), symbol, type, profit: profitChange }]);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">TradeSense Dashboard</h1>
      
      {/* Statut du compte */}
      <div className={`p-4 rounded mb-6 ${status === 'ACTIVE' ? 'bg-green-200' : 'bg-red-500 text-white'}`}>
        <h2 className="text-xl">Status: {status}</h2>
        <p className="text-2xl font-mono">Balance: {balance.toFixed(2)} $</p>
        {status === 'FAILED' && <p className="font-bold">Account Breached: 10% Max Loss Reached</p>}
      </div>

      {/* Marché en direct (Module B) */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 shadow rounded">
          <h3 className="font-bold">Maroc Telecom (IAM)</h3>
          <p className="text-xl">{iamPrice.toFixed(2)} MAD</p>
          <button onClick={() => executeTrade('IAM', 'BUY')} className="bg-blue-500 text-white px-4 py-2 mt-2 mr-2 rounded">BUY</button>
          <button onClick={() => executeTrade('IAM', 'SELL')} className="bg-gray-500 text-white px-4 py-2 rounded">SELL</button>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h3 className="font-bold">Bitcoin (BTC)</h3>
          <p className="text-xl">${btcPrice.toFixed(2)}</p>
          <button onClick={() => executeTrade('BTC', 'BUY')} className="bg-orange-500 text-white px-4 py-2 mt-2 mr-2 rounded">BUY</button>
        </div>
      </div>

      {/* Leaderboard (Module D) */}
      <div className="bg-white p-4 shadow rounded">
        <h3 className="font-bold text-xl mb-4 text-blue-600">Leaderboard (Top Profit %)</h3>
        <table className="w-full text-left">
          <thead>
            <tr><th>Rank</th><th>User</th><th>Profit %</th></tr>
          </thead>
          <tbody>
            <tr className="border-t"><td>1</td><td>Sami_Trader</td><td className="text-green-600">+12.4%</td></tr>
            <tr className="border-t"><td>2</td><td>Lina_Invest</td><td className="text-green-600">+8.1%</td></tr>
            <tr className="border-t"><td>3</td><td>Vous</td><td className={balance >= 5000 ? "text-green-600" : "text-red-600"}>
              {(((balance - 5000) / 5000) * 100).toFixed(2)}%
            </td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;