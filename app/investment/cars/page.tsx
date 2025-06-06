// Car investment tracking and management page.
import Link from 'next/link';

// Sample car stocks data
const carStocks = [
  {
    symbol: 'TSLA',
    name: 'Tesla Inc',
    currentPrice: 245.67,
    change: 5.23,
    changePercent: 2.17,
    marketCap: '780.5B',
    peRatio: 72.3,
  },
  {
    symbol: 'TM',
    name: 'Toyota Motor Corp',
    currentPrice: 185.34,
    change: -1.45,
    changePercent: -0.78,
    marketCap: '250.8B',
    peRatio: 10.2,
  },
  {
    symbol: 'F',
    name: 'Ford Motor Co',
    currentPrice: 12.45,
    change: 0.23,
    changePercent: 1.88,
    marketCap: '49.8B',
    peRatio: 8.5,
  },
  {
    symbol: 'GM',
    name: 'General Motors Co',
    currentPrice: 38.92,
    change: -0.56,
    changePercent: -1.42,
    marketCap: '55.3B',
    peRatio: 6.8,
  },
  {
    symbol: 'RIVN',
    name: 'Rivian Automotive',
    currentPrice: 15.67,
    change: 0.89,
    changePercent: 6.02,
    marketCap: '14.5B',
    peRatio: -8.2,
  },
];

export default function CarsPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Automotive Stocks</h1>
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
              {carStocks.map((stock) => (
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
          <h2 className="text-lg font-semibold mb-2">About Automotive Stocks</h2>
          <p className="text-gray-600">
            Automotive stocks represent companies involved in the manufacturing and sale of vehicles. 
            This sector includes traditional automakers, electric vehicle companies, and automotive parts suppliers.
            The industry is currently undergoing significant transformation with the rise of electric vehicles,
            autonomous driving technology, and changing consumer preferences.
          </p>
        </div>
      </div>
    </div>
  );
}
