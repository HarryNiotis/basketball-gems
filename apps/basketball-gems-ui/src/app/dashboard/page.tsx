import { teamsRoute } from '@/lib/routes';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="w-full flex-1 bg-gray-50 px-6 py-8">
      <div className="grid grid-cols-5 md:grid-cols-4 gap-8">
        <Link href={teamsRoute}>
          <div className="flex flex-col items-center bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-8">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM16 16a6 6 0 11-12 0 6 6 0 0112 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Teams</h2>
            <p className="text-gray-600">Explore all teams.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
