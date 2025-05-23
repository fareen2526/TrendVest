import Link from 'next/link';

export default function DemoPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Next.js Routing Demo</h1>
      
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Basic Navigation</h2>
          <p className="mb-4">This page demonstrates how Next.js routing works. Try these links:</p>
          
          <div className="space-y-2">
            <Link 
              href="/demo/nested" 
              className="block p-2 bg-blue-100 hover:bg-blue-200 rounded"
            >
              Go to Nested Route
            </Link>
            
            <Link 
              href="/demo/dynamic/123" 
              className="block p-2 bg-green-100 hover:bg-green-200 rounded"
            >
              Go to Dynamic Route (ID: 123)
            </Link>
            
            <Link 
              href="/" 
              className="block p-2 bg-gray-100 hover:bg-gray-200 rounded"
            >
              Back to Home
            </Link>
          </div>
        </div>
        
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">How it works:</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Routes are created by folders in the <code>app</code> directory</li>
            <li>Each route needs a <code>page.tsx</code> file to render</li>
            <li>Use the <code>Link</code> component for client-side navigation</li>
            <li>Dynamic routes use square brackets: <code>[param]</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
} 