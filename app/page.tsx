import PageBody from '@/components/PageBody';
import { PageHeader } from '@/components/PageHeader';

export default function Home() {
  return (
    <main>
      <div className="flex justify-center items-center">
        <div className="flex flex-col">
          <PageHeader />
          <div>
            <PageBody />
          </div>
        </div>
      </div>
    </main>
  );
}
