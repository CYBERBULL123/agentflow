import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Workflow, Play, Pause, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

const workflows = [
  {
    id: 1,
    name: 'Customer Onboarding',
    description:
      'Sends welcome emails and creates tasks for new customer sign-ups.',
    status: 'Active',
    trigger: 'New User in Stripe',
  },
  {
    id: 2,
    name: 'Lead Nurturing Sequence',
    description: 'A 5-step email sequence for new marketing leads.',
    status: 'Active',
    trigger: 'New Lead in HubSpot',
  },
  {
    id: 3,
    name: 'Social Media Publishing',
    description: 'Posts blog updates to Twitter and LinkedIn.',
    status: 'Paused',
    trigger: 'New Post on Blog RSS',
  },
  {
    id: 4,
    name: 'Daily Standup Reminder',
    description: 'Sends a reminder to the engineering team on Slack.',
    status: 'Active',
    trigger: 'Scheduled (9 AM Daily)',
  },
];

export default function WorkflowsPage() {
  return (
    <div className="container mx-auto p-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Workflows</h1>
        <Button asChild>
          <Link href="/workflows/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Workflow
          </Link>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl">{workflow.name}</CardTitle>
                <Workflow className="h-8 w-8 text-primary" />
              </div>
              <CardDescription>{workflow.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-2">
              <div className="flex items-center text-sm">
                <span className="text-muted-foreground w-16">Status:</span>
                <Badge
                  variant={workflow.status === 'Active' ? 'default' : 'secondary'}
                  className={workflow.status === 'Active' ? 'bg-green-500 text-white' : ''}
                >
                  {workflow.status}
                </Badge>
              </div>
              <div className="flex items-center text-sm">
                 <span className="text-muted-foreground w-16">Trigger:</span>
                <span className="font-medium">{workflow.trigger}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
               <Button variant="ghost" size="icon">
                {workflow.status === 'Active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span className="sr-only">{workflow.status === 'Active' ? 'Pause' : 'Play'}</span>
              </Button>
               <Button variant="outline" size="sm" asChild>
                <Link href={`/workflows/${workflow.id}`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
