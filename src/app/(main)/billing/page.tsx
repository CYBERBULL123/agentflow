'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Crown, 
  Zap, 
  Check, 
  X, 
  CreditCard, 
  Calendar, 
  TrendingUp,
  Download,
  Sparkles,
  Bot,
  Workflow,
  Globe,
  Shield,
  Headphones
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

const plans = [
  {
    name: 'Free',
    price: 0,
    period: 'month',
    description: 'Perfect for getting started',
    features: [
      '50 Credits per month',
      '5 AI Agents',
      '10 Workflows',
      'Basic Templates',
      'Community Support',
    ],
    limitations: [
      'No API Access',
      'No Custom Integrations',
      'No Priority Support',
    ],
    icon: Sparkles,
    popular: false,
    buttonText: 'Current Plan',
    color: 'from-gray-500 to-gray-600',
  },
  {
    name: 'Pro',
    price: 29,
    period: 'month',
    description: 'For professionals and teams',
    features: [
      '1,000 Credits per month',
      'Unlimited AI Agents',
      'Unlimited Workflows',
      'Premium Templates',
      'API Access',
      'Custom Integrations',
      'Priority Support',
      'Advanced Analytics',
    ],
    limitations: [],
    icon: Crown,
    popular: true,
    buttonText: 'Upgrade to Pro',
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Enterprise',
    price: 99,
    period: 'month',
    description: 'For large organizations',
    features: [
      '5,000 Credits per month',
      'Everything in Pro',
      'White-label Solution',
      'Dedicated Support',
      'Custom Development',
      'SLA Guarantee',
      'Advanced Security',
      'Team Management',
    ],
    limitations: [],
    icon: Zap,
    popular: false,
    buttonText: 'Contact Sales',
    color: 'from-orange-500 to-red-500',
  },
];

const usageHistory = [
  { date: '2025-09-15', action: 'Agent Creation', credits: -5, balance: 45 },
  { date: '2025-09-14', action: 'Workflow Execution', credits: -3, balance: 50 },
  { date: '2025-09-13', action: 'API Call', credits: -2, balance: 53 },
  { date: '2025-09-12', action: 'Monthly Refill', credits: 50, balance: 55 },
  { date: '2025-09-10', action: 'Agent Training', credits: -8, balance: 5 },
];

export default function BillingPage() {
  const { userData } = useAuth();
  const [isYearly, setIsYearly] = useState(false);
  
  const currentPlan = userData?.plan || 'free';
  const creditsUsed = userData?.creditsUsed || 0;
  const creditsTotal = userData?.creditsTotal || 50;
  const usagePercentage = (creditsUsed / creditsTotal) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Billing & Usage</h1>
        <p className="text-muted-foreground">
          Manage your subscription, track usage, and view billing history.
        </p>
      </div>

      {/* Usage Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credits Used</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{creditsUsed}</div>
            <p className="text-xs text-muted-foreground">of {creditsTotal} credits</p>
            <Progress value={usagePercentage} className="mt-3" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData?.agentsCreated || 0}</div>
            <p className="text-xs text-muted-foreground">AI agents created</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workflows</CardTitle>
            <Workflow className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData?.workflowsCreated || 0}</div>
            <p className="text-xs text-muted-foreground">automation flows</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="plans" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
          <TabsTrigger value="usage">Usage History</TabsTrigger>
          <TabsTrigger value="billing">Billing History</TabsTrigger>
        </TabsList>

        {/* Subscription Plans */}
        <TabsContent value="plans" className="space-y-6">
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm ${!isYearly ? 'font-semibold' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsYearly(!isYearly)}
              className="relative"
            >
              <div className={`absolute inset-0 bg-primary rounded-md transition-transform duration-200 ${isYearly ? 'translate-x-full' : 'translate-x-0'}`} 
                   style={{ width: '50%' }} />
              <span className="relative z-10 px-2">Monthly</span>
              <span className="relative z-10 px-2">Yearly</span>
            </Button>
            <span className={`text-sm ${isYearly ? 'font-semibold' : 'text-muted-foreground'}`}>
              Yearly
              <Badge variant="secondary" className="ml-2">Save 20%</Badge>
            </span>
          </div>

          {/* Plans Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const isCurrentPlan = currentPlan === plan.name.toLowerCase();
              const yearlyPrice = Math.floor(plan.price * 12 * 0.8);
              
              return (
                <Card 
                  key={plan.name} 
                  className={`relative ${plan.popular ? 'ring-2 ring-primary shadow-lg scale-105' : ''} ${isCurrentPlan ? 'bg-primary/5 border-primary' : ''}`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500">
                      Most Popular
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className={`w-12 h-12 mx-auto rounded-lg bg-gradient-to-r ${plan.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="text-3xl font-bold">
                      ${isYearly ? yearlyPrice : plan.price}
                      <span className="text-sm font-normal text-muted-foreground">
                        /{isYearly ? 'year' : 'month'}
                      </span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                      {plan.limitations.map((limitation) => (
                        <li key={limitation} className="flex items-center gap-2">
                          <X className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-muted-foreground">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className="w-full" 
                      variant={isCurrentPlan ? "secondary" : "default"}
                      disabled={isCurrentPlan}
                    >
                      {isCurrentPlan ? 'Current Plan' : plan.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Usage History */}
        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Credit Usage History</CardTitle>
              <CardDescription>
                Track how your credits are being used across different features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead className="text-right">Credits</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usageHistory.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.date}</TableCell>
                      <TableCell>{item.action}</TableCell>
                      <TableCell className={`text-right font-medium ${item.credits > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.credits > 0 ? '+' : ''}{item.credits}
                      </TableCell>
                      <TableCell className="text-right">{item.balance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing History */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                Download invoices and view payment history.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <CreditCard className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No billing history yet</h3>
                <p className="text-muted-foreground mb-4">
                  You're currently on the free plan. Upgrade to see billing history.
                </p>
                <Button>Upgrade Plan</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}