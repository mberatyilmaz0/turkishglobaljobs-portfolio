import { getSettings } from '@/actions/settings';
import ContactClient from './ContactClient';

export default async function AdminContactPage() {
  const settings = await getSettings();
  
  return <ContactClient settings={settings} />;
}
