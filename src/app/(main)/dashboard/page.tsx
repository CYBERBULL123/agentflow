'use client';

import {
  Activity,
  Bot,
  CircleDollarSign,
  Workflow,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const chartData = [
  { name: 'Jan', total: Math.floor(Math.random() * 20) + 10 },
  { name: 'Feb', total: Math.floor(Math.random() * 20) + 10 },
  { name: 'Mar', total: Math.floor(Math.random() * 20) + 10 },
  { name: 'Apr', total: Math.floor(Math.random() * 20) + 10 },
  { name: 'May', total: Math.floor(Math.random() * 20) + 10 },
  { name: 'Jun', total: Math.floor(Math.random() * 20) + 10 },
  { name: 'Jul', total: Math.floor(Math.random() * 20) + 10 },
  { name: 'Aug', total: Math.floor(Math.random() * 20) + 10 },
  { name: 'Sep', total: Math.floor(Math.random() * 20) + 10 },
  { name: 'Oct', total: Math.floor(Math.random() * 20) + 10 },
  { name: 'Nov', total: Math.floor(Math.random() * 20) + 10 },
  { name: 'Dec', total: Math.floor(Math.random() * 20) + 10 },
];

const recentActivities = [
    {
      id: "1",
      agent: 'Sales Agent',
      activity: 'Executed workflow "Lead Follow-up"',
      timestamp: '2 minutes ago',
      status: 'Success',
    },
    {
      id: "2",
      agent: 'Support Agent',
      activity: 'Created new ticket from email',
      timestamp: '5 minutes ago',
      status: 'Success',
    },
    {
      id: "3",
      agent: 'Marketing Agent',
      activity: 'Failed to post on Social Media',
      timestamp: '10 minutes ago',
      status: 'Failed',
    },
    {
      id: "4",
      agent: 'Data Analyst',
      activity: 'Generated "Weekly Sales Report"',
      timestamp: '30 minutes ago',
      status: 'Success',
    },
     {
      id: "5",
      agent: 'Onboarding Agent',
      activity: 'Sent welcome email to new user',
      timestamp: '1 hour ago',
      status: 'Success',
    },
  ];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Credits
            </CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,523.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agents</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+23</div>
            <p className="text-xs text-muted-foreground">
              +18.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workflows</CardTitle>
            <Workflow className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Executions This Month
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Workflow Executions</CardTitle>
            <CardDescription>
              Total executions over the last 12 months.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              A log of the most recent agent activities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">{activity.agent}</TableCell>
                    <TableCell>{activity.activity}</TableCell>
                    <TableCell>
                      <Badge variant={activity.status === 'Success' ? 'default' : 'destructive'} className={`${activity.status === 'Success' ? 'bg-green-500' : ''}`}>
                        {activity.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{activity.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
