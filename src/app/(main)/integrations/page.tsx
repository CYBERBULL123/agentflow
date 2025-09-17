import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import Image from 'next/image';

const integrations = [
  {
    name: 'Google Drive',
    category: 'Cloud Storage',
    description: 'Access and manage files in your Google Drive.',
    logo: '/logos/google-drive.svg',
    connected: true,
  },
  {
    name: 'Slack',
    category: 'Communication',
    description: 'Send messages, and manage channels and users.',
    logo: '/logos/slack.svg',
    connected: true,
  },
  {
    name: 'Stripe',
    category: 'Payments',
    description: 'Process payments, manage customers and subscriptions.',
    logo: '/logos/stripe.svg',
    connected: false,
  },
  {
    name: 'HubSpot',
    category: 'CRM',
    description: 'Manage contacts, deals, and marketing campaigns.',
    logo: '/logos/hubspot.svg',
    connected: false,
  },
  {
    name: 'Gmail',
    category: 'Email',
    description: 'Read, send, and manage your emails.',
    logo: '/logos/gmail.svg',
    connected: true,
  },
  {
    name: 'OpenAI',
    category: 'AI / ML',
    description: 'Integrate GPT models for advanced text generation.',
    logo: '/logos/openai.svg',
    connected: false,
  },
  {
    name: 'Notion',
    category: 'Productivity',
    description: 'Create and update pages, databases, and blocks.',
    logo: '/logos/notion.svg',
    connected: false,
  },
  {
    name: 'GitHub',
    category: 'Development',
    description: 'Manage repositories, issues, and pull requests.',
    logo: '/logos/github.svg',
    connected: false,
  },
];

const SvgPlaceholder = ({ className }: { className?: string }) => (
    <div className={`bg-muted rounded-full ${className}`}></div>
)

export default function IntegrationsPage() {
  return (
    <div className="container mx-auto p-0">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">App Integrations</h1>
        <p className="text-muted-foreground mt-2">
          Connect your favorite apps to unlock powerful new automations.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {integrations.map((integration) => (
          <Card key={integration.name} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <SvgPlaceholder className="w-12 h-12" />
                {integration.connected ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Connected</Badge>
                ) : (
                  <Badge variant="outline">Not Connected</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <h2 className="text-lg font-semibold">{integration.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {integration.description}
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={integration.connected}>
                {integration.connected ? 'Connected' : 'Connect'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
