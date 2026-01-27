import { chatRoute, standingsRoute, teamsRoute } from '@/lib/routes';
import Link from 'next/link';
import Image from 'next/image';
import Dribbble from '@/assets/dribble.svg';
import { Table, Text } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="w-full flex-1 px-6 py-8">
      <div className="grid grid-cols-5 md:grid-cols-4 gap-8">
        <Link href={teamsRoute}>
          <div className="flex flex-col items-center bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-8">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <Image src={Dribbble} alt="Dribble" width={24} height={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Teams</h2>
            <p className="text-gray-600">Euroleague teams</p>
          </div>
        </Link>
        <Link href={standingsRoute}>
          <div className="flex flex-col items-center bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-8">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <Table aria-label="Dribble" width={24} height={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Standings</h2>
            <p className="text-gray-600">Euroleague standings</p>
          </div>
        </Link>
        <Link href={chatRoute}>
          <div className="flex flex-col items-center bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-8">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <Text aria-label="chat" size={24} height={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">AI Chat</h2>
            <p className="text-gray-600">Ask about Euroleague</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
