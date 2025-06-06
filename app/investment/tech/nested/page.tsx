// Nested tech investment overview page.
import Link from 'next/link';

export default function NestedPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Nested Route Demo</h1>
      
      <div className="p-4 border rounded-lg">
        <p className="mb-4">This is a nested route at <code>/demo/nested</code></p>
        
        <Link 
          href="/demo" 
          className="block p-2 bg-gray-100 hover:bg-gray-200 rounded w-fit"
        >
          Back to Demo Home
        </Link>
      </div>
    </div>
  );
} 