// Portfolio management page for tracking and managing investment entries.
// greeting page
// new entries where users can add new investments
// graphs - total value based off all investments

// when running the app in development mode: npm run dev
// when running the app to present: npm run build && npm run start

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Investment {
  id: number;
  name: string;
  shares: number;
  purchase_price: number;
  current_price: number;
  total_value: number;
  profit_loss: number;
  profit_loss_percentage: number;
}

export default function PortfolioPage() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [isAddingInvestment, setIsAddingInvestment] = useState(false);
  const [editingPriceId, setEditingPriceId] = useState<number | null>(null);
  const [editingPrice, setEditingPrice] = useState<string>('');
  const [newInvestment, setNewInvestment] = useState({
    name: '',
    shares: 0,
    purchasePrice: 0,
  });

  // Fetch user's investments when component mounts
  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user.id) {
          console.error('No user found in localStorage');
          return;
        }
        const response = await fetch(`/api/investments?userId=${user.id}`);
        const data = await response.json();
        console.log("Investments from api response:", data);
        setInvestments(data);
      } catch (error) {
        console.error('Error fetching investments:', error);
      }
    };

    fetchInvestments();
  }, []);

  const handleAddInvestment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user.id) {
        console.error('No user found in localStorage');
        return;
      }
      const response = await fetch(`/api/investments?userId=${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newInvestment),
      });

      if (response.ok) {
        const addedInvestment = await response.json();
        setInvestments([...investments, addedInvestment]);
        setIsAddingInvestment(false);
        setNewInvestment({
          name: '',
          shares: 0,
          purchasePrice: 0,
        });
      }
    } catch (error) {
      console.error('Error adding investment:', error);
    }
  };

  const handlePriceEdit = (investment: Investment) => {
    setEditingPriceId(investment.id);
    setEditingPrice(investment.current_price.toString());
  };

  const handlePriceUpdate = async (investment: Investment) => {
    try {
      const response = await fetch(`/api/investments/${investment.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          current_price: parseFloat(editingPrice)
        }),
      });

      if (response.ok) {
        const updatedInvestment = await response.json();
        setInvestments(investments.map(inv => 
          inv.id === investment.id ? updatedInvestment : inv
        ));
        setEditingPriceId(null);
      }
    } catch (error) {
      console.error('Error updating price:', error);
    }
  };

  const handlePriceKeyDown = (e: React.KeyboardEvent, investment: Investment) => {
    if (e.key === 'Enter') {
      handlePriceUpdate(investment);
    } else if (e.key === 'Escape') {
      setEditingPriceId(null);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Portfolio</h1>
          <div className="space-x-4">
            <button
              onClick={() => setIsAddingInvestment(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Investment
            </button>
            <Link
              href="/"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {/* Add Investment Form */}
        {isAddingInvestment && (
          <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add New Investment</h2>
            <form onSubmit={handleAddInvestment} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    value={newInvestment.name}
                    onChange={(e) => setNewInvestment({...newInvestment, name: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Number of Shares</label>
                  <input
                    type="number"
                    value={newInvestment.shares}
                    onChange={(e) => setNewInvestment({...newInvestment, shares: Number(e.target.value)})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Purchase Price Per Share</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newInvestment.purchasePrice}
                    onChange={(e) => setNewInvestment({...newInvestment, purchasePrice: Number(e.target.value)})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsAddingInvestment(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Investment
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Investments Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shares</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Price Per Share</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price Per Share</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit/Loss</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {investments.map((investment) => (
                <tr key={investment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{investment.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{investment.shares}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${investment.purchase_price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingPriceId === investment.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          step="0.01"
                          value={editingPrice}
                          onChange={(e) => setEditingPrice(e.target.value)}
                          onKeyDown={(e) => handlePriceKeyDown(e, investment)}
                          onBlur={() => handlePriceUpdate(investment)}
                          className="w-24 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                      </div>
                    ) : (
                      <div 
                        className="text-sm text-gray-900 cursor-pointer hover:text-blue-600"
                        onClick={() => handlePriceEdit(investment)}
                      >
                        ${investment.current_price}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${investment.total_value}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${investment.profit_loss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${investment.profit_loss} ({investment.profit_loss_percentage}%)
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Portfolio Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Total Portfolio Value</h3>
            <p className="text-2xl font-bold text-gray-900">
              ${investments.reduce((sum, inv) => sum + Number(inv.total_value), 0).toFixed(2)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Total Profit/Loss</h3>
            <p className="text-2xl font-bold text-gray-900">
              ${investments.reduce((sum, inv) => sum + Number(inv.profit_loss), 0).toFixed(2)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Number of Investments</h3>
            <p className="text-2xl font-bold text-gray-900">{investments.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

