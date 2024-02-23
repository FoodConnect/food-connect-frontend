import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { AuthenticationForm } from '@/components/AuthenticationForm/AuthenticationForm';

export default function HomePage() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      <AuthenticationForm />
    </>
  );
}
