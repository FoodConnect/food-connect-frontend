import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import DonationsTable from '@/components/DonationsTable/DonationsTable';

export default function HomePage() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      <DonationsTable />
    </>
  );
}
