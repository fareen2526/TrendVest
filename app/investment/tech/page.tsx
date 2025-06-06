import Link from 'next/link';

// Sample tech stocks data
const techStocks = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc',
    currentPrice: 185.92,
    change: 2.34,
    changePercent: 1.27,
    marketCap: '2.9T',
    peRatio: 31.2,
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp',
    currentPrice: 415.56,
    change: 5.67,
    changePercent: 1.38,
    marketCap: '3.1T',
    peRatio: 36.8,
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc',
    currentPrice: 142.78,
    change: -1.23,
    changePercent: -0.85,
    marketCap: '1.8T',
    peRatio: 24.5,
  },
  {
    symbol: 'META',
    name: 'Meta Platforms',
    currentPrice: 485.34,
    change: 8.45,
    changePercent: 1.77,
    marketCap: '1.2T',
    peRatio: 28.9,
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corp',
    currentPrice: 875.23,
    change: 15.67,
    changePercent: 1.82,
    marketCap: '2.1T',
    peRatio: 76.3,
  },
];

export default function TechPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Technology Stocks</h1>
          <Link 
            href="/" 
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {techStocks.map((stock) => (
                <tr key={stock.symbol} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold">{stock.symbol}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{stock.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${stock.currentPrice.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">About Technology Stocks</h2>
          <p className="text-gray-600">
            Technology stocks represent companies involved in software, hardware, semiconductors, and digital services.
            This sector is known for its rapid innovation and growth potential, though it can be more volatile than other sectors.
            Key trends include artificial intelligence, cloud computing, and the continued digitization of various industries.
          </p>
        </div>
      </div>
    </div>
  );
} 