import Link from 'next/link';

// Sample banking stocks data
const bankingStocks = [
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    currentPrice: 185.45,
    change: 2.34,
    changePercent: 1.28,
    marketCap: '450.2B',
    peRatio: 11.2,
  },
  {
    symbol: 'BAC',
    name: 'Bank of America Corp',
    currentPrice: 34.67,
    change: -0.45,
    changePercent: -1.28,
    marketCap: '275.8B',
    peRatio: 10.5,
  },
  {
    symbol: 'WFC',
    name: 'Wells Fargo & Co',
    currentPrice: 48.92,
    change: 0.78,
    changePercent: 1.62,
    marketCap: '180.3B',
    peRatio: 9.8,
  },
  {
    symbol: 'C',
    name: 'Citigroup Inc',
    currentPrice: 56.34,
    change: 1.23,
    changePercent: 2.23,
    marketCap: '110.5B',
    peRatio: 8.9,
  },
  {
    symbol: 'GS',
    name: 'Goldman Sachs Group Inc',
    currentPrice: 385.67,
    change: -2.34,
    changePercent: -0.60,
    marketCap: '130.2B',
    peRatio: 15.3,
  },
];

export default function BankingPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Banking Stocks</h1>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Cap</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">P/E Ratio</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bankingStocks.map((stock) => (
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${stock.marketCap}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{stock.peRatio}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">About Banking Stocks</h2>
          <p className="text-gray-600">
            Banking stocks represent shares in financial institutions that provide various financial services. 
            These stocks are often considered stable investments and are key components of many investment portfolios.
            The performance of banking stocks is closely tied to interest rates, economic conditions, and regulatory changes.
          </p>
        </div>
      </div>
    </div>
  );
}
