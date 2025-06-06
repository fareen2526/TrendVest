// Dynamic tech investment detail page with ID-based routing.
import Link from 'next/link';

interface PageProps {
  params: {
    id: string;
  };
}

export default function DynamicPage({ params }: PageProps) {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Dynamic Route Demo</h1>
      
      <div className="p-4 border rounded-lg">
        <p className="mb-4">
          This is a dynamic route. The ID parameter is: <code>{params.id}</code>
        </p>
        
        <div className="space-y-2">
          <Link 
            href="/demo" 
            className="block p-2 bg-gray-100 hover:bg-gray-200 rounded w-fit"
          >
            Back to Demo Home
          </Link>
          
          <Link 
            href={`/demo/dynamic/${Number(params.id) + 1}`}
            className="block p-2 bg-blue-100 hover:bg-blue-200 rounded w-fit"
          >
            Next ID
          </Link>
        </div>
      </div>
    </div>
  );
} 