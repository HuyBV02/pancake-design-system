import { Playground } from './playground/Playground';
import { AppShell } from './recipes/AppShell';
import { SettingsTablePage } from './recipes/SettingsTablePage';

export function App() {
  if (import.meta.env.DEV && location.pathname.startsWith('/playground')) return <Playground />;
  return (
    <AppShell>
      <SettingsTablePage initial={[]} />
    </AppShell>
  );
}
