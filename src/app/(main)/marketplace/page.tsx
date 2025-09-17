import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Bot, Plus, Star } from 'lucide-react';

const marketplaceAgents = [
  {
    id: 1,
    name: 'Advanced SEO Agent',
    author: 'SEO Experts Inc.',
    description:
      'Performs keyword research, on-page analysis, and backlink monitoring.',
    rating: 4.9,
    users: 1200,
  },
  {
    id: 2,
    name: 'E-commerce Inventory Manager',
    author: 'Shopify Gurus',
    description: 'Tracks stock levels, predicts demand, and automates reordering.',
    rating: 4.8,
    users: 850,
  },
  {
    id: 3,
    name: 'Code Review Assistant',
    author: 'DevTools Co.',
    description: 'Analyzes pull requests for style, errors, and performance issues.',
    rating: 4.7,
    users: 2500,
  },
  {
    id: 4,
    name: 'Financial News Summarizer',
    author: 'FinTech Analytics',
    description: 'Summarizes daily financial news from top sources.',
    rating: 4.9,
    users: 500,
  },
  {
    id: 5,
    name: 'Automated Content Creator',
    author: 'WriterAI',
    description: 'Generates blog posts and articles from a simple prompt.',
    rating: 4.6,
    users: 3200,
  },
  {
    id: 6,
    name: 'Meeting Scheduler Pro',
    author: 'Cal.com',
    description: 'Finds optimal meeting times across multiple calendars and timezones.',
    rating: 5.0,
    users: 8000,
  },
];

export default function MarketplacePage() {
  return (
    <div className="container mx-auto p-0">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold">Agent Marketplace</h1>
        <p className="text-muted-foreground mt-2">
          Discover powerful agents built by the community to automate your workflows.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input placeholder="Search for agents..." className="flex-grow" />
        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="support">Support</SelectItem>
            <SelectItem value="development">Development</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Popularity</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {marketplaceAgents.map((agent) => (
          <Card key={agent.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Bot className="h-8 w-8 text-primary" />
                <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                  <Star className="h-4 w-4 fill-amber-500" /> {agent.rating}
                </div>
              </div>
              <CardTitle className="text-xl pt-2">{agent.name}</CardTitle>
              <CardDescription>by {agent.author}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm">{agent.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">{agent.users.toLocaleString()} users</p>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Agent
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
