import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlusCircle, Bot, Workflow, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

const agents = [
  {
    id: 1,
    name: 'Customer Support Agent',
    description:
      'Handles incoming customer queries and provides automated support.',
    workflows: 3,
    icon: <Bot className="h-8 w-8 text-primary" />,
  },
  {
    id: 2,
    name: 'Sales Outreach Agent',
    description: 'Automates lead generation and initial email outreach.',
    workflows: 5,
    icon: <Bot className="h-8 w-8 text-primary" />,
  },
  {
    id: 3,
    name: 'Social Media Manager',
    description: 'Schedules and posts content across multiple social platforms.',
    workflows: 2,
    icon: <Bot className="h-8 w-8 text-primary" />,
  },
  {
    id: 4,
    name: 'Data Analyst Agent',
    description: 'Collects and analyzes data, generating weekly reports.',
    workflows: 1,
    icon: <Bot className="h-8 w-8 text-primary" />,
  },
];

export default function AgentsPage() {
  return (
    <div className="container mx-auto p-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Agents</h1>
        <Button asChild>
          <Link href="/agents/create">
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Agent
          </Link>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <Card key={agent.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl">{agent.name}</CardTitle>
                {agent.icon}
              </div>
              <CardDescription>{agent.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-center text-sm text-muted-foreground">
                <Workflow className="mr-2 h-4 w-4" />
                <span>{agent.workflows} Workflows</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit
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
