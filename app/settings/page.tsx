import { DashboardShell } from '@/components/ui/DashboardShell';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function SettingsPage() {
  return (
    <DashboardShell title="Organization branding">
      <form className="max-w-3xl space-y-6 rounded-2xl bg-white p-6 shadow-sm">
        <Input id="name" label="Organization name" placeholder="RadSystems Academy" />
        <Input id="domain" label="Custom domain" placeholder="academy.radsystems.app" />
        <div className="grid gap-4 md:grid-cols-3">
          <Input id="color-primary" label="Primary color" type="color" defaultValue="#CF441E" />
          <Input id="color-secondary" label="Secondary color" type="color" defaultValue="#073B4C" />
          <Input id="color-accent" label="Accent color" type="color" defaultValue="#A9D8C7" />
        </div>
        <Button type="submit">Save changes</Button>
      </form>
    </DashboardShell>
  );
}
