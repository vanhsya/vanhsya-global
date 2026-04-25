'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBitcoin, FaEthereum, FaCcStripe } from 'react-icons/fa';
import { SiBinance, SiPolygon } from 'react-icons/si';

type CryptoMethod = 'btc' | 'eth' | 'usdt' | 'usdc' | 'yno';

const methods = [
  { id: 'btc' as CryptoMethod, label: 'Bitcoin', icon: FaBitcoin, color: 'orange-500', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wl' },
  { id: 'eth' as CryptoMethod, label: 'Ethereum', icon: FaEthereum, color: 'indigo-500', address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976' },
  { id: 'usdt' as CryptoMethod, label: 'USDT (TRC20)', icon: SiPolygon, color: 'green-500', address: 'TQn9Y2NZ4gN7H2Q4Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z' },
  { id: 'usdc' as CryptoMethod, label: 'USDC (Polygon)', icon: SiPolygon, color: 'blue-600', address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174' },
  { id: 'yno' as CryptoMethod, label: 'YNO Coin', icon: FaBitcoin, color: 'purple-600', address: 'yno1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wl' },
];

interface Props {
  amount: number;
  service: string;
  onComplete?: (txHash: string) => void;
}

export default function CryptoPayment({ amount, service, onComplete }: Props) {
  const [selected, setSelected] = useState<CryptoMethod | null>(null);
  const [txHash, setTxHash] = useState('');
  const [status, setStatus] = useState<'select' | 'pay' | 'confirm'>('select');

  const method = methods.find((m) => m.id === selected);

  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-1">Pay with Crypto</h3>
      <p className="text-sm text-gray-600 mb-4">
        {service} — <span className="font-semibold">${amount.toLocaleString()}</span>
      </p>

      {status === 'select' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {methods.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => { setSelected(m.id); setStatus('pay'); }}
              className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 p-4 hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <m.icon className={`text-2xl text-${m.color}`} />
              <span className="text-sm font-medium text-gray-800">{m.label}</span>
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {status === 'pay' && method && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-800">Send {method.label}</h4>
              <button type="button" onClick={() => { setStatus('select'); setSelected(null); }} className="text-sm text-blue-600">
                Change
              </button>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-xs text-gray-500 mb-1">Send exactly</p>
              <p className="text-2xl font-bold text-gray-900">${amount.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-3 mb-1">To wallet address</p>
              <code className="block break-all text-sm bg-white border rounded p-2 text-gray-800">
                {method.address}
              </code>
              <p className="text-xs text-gray-400 mt-2">
                Network: {method.id === 'usdt' ? 'TRC-20' : method.id === 'usdc' ? 'Polygon' : method.id === 'eth' ? 'ERC-20' : 'Native'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transaction Hash (after payment)
              </label>
              <input
                type="text"
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                placeholder="0x..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="button"
              disabled={!txHash}
              onClick={() => {
                setStatus('confirm');
                onComplete?.(txHash);
              }}
              className="w-full rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              Confirm Payment
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {status === 'confirm' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-6"
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-2">Payment Submitted</h4>
          <p className="text-sm text-gray-600">
            We'll verify your transaction and confirm within 1 hour.
          </p>
        </motion.div>
      )}
    </div>
  );
}
