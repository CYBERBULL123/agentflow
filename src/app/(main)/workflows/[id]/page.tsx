import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Bot, Mail, ShieldCheck, Zap } from 'lucide-react';

const FlowNode = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="flex items-center gap-4 p-4 bg-card rounded-lg border shadow-sm w-64">
    <div className="p-3 bg-accent/10 rounded-full">{icon}</div>
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

const Connector = () => (
    <div className="h-20 w-px bg-border relative my-2">
        <svg className="absolute top-0 -left-[5px] h-full w-2.5" viewBox="0 0 10 80">
            <path d="M5 0 V 80" stroke="hsl(var(--border))" strokeWidth="2" fill="none" strokeDasharray="4 4" className="animate-flow" />
        </svg>
        <style jsx>{`
            @keyframes flow {
                to {
                    stroke-dashoffset: -8;
                }
            }
            .animate-flow {
                animation: flow 1s linear infinite;
            }
        `}</style>
    </div>
);

export default function WorkflowDesignerPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="container mx-auto p-0">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Workflow: Customer Onboarding</h1>
        <p className="text-muted-foreground">
          Visualizing the flow for workflow ID: {params.id}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Canvas</CardTitle>
              <CardDescription>
                This is a static visualization of your workflow.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center py-10">
              <div className="flex flex-col items-center">
                <FlowNode
                  icon={<Zap className="h-6 w-6 text-accent-foreground" />}
                  title="Trigger"
                  description="New User Signup"
                />
                <Connector />
                <FlowNode
                  icon={<Bot className="h-6 w-6 text-primary" />}
                  title="Agent: Welcome Bot"
                  description="Verify user data"
                />
                <Connector />
                <FlowNode
                  icon={<Mail className="h-6 w-6 text-green-500" />}
                  title="Action: Send Email"
                  description="Send a welcome email"
                />
                <Connector />
                <FlowNode
                  icon={<ShieldCheck className="h-6 w-6 text-blue-500" />}
                  title="Condition: Is Premium?"
                  description="Check user subscription"
                />
                 <div className="h-px w-32 bg-border relative my-2">
                    <div className="flex justify-around w-full absolute -bottom-4 text-sm text-muted-foreground">
                        <span>Yes</span>
                        <span>No</span>
                    </div>
                 </div>
                <div className="flex gap-16 mt-8">
                    <div className="flex flex-col items-center">
                        <Connector />
                        <FlowNode icon={<Bot className="h-6 w-6 text-primary" />} title="Agent: Onboarding" description="Start premium onboarding" />
                    </div>
                    <div className="flex flex-col items-center">
                        <Connector />
                        <FlowNode icon={<Mail className="h-6 w-6 text-red-500" />} title="Action: End Flow" description="End of workflow path" />
                    </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:w-80">
          <Card>
            <CardHeader>
              <CardTitle>Details & Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Status</h4>
                  <p className="text-green-500">Active</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold">Last Run</h4>
                  <p>2 minutes ago (Success)</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold">Total Executions</h4>
                  <p>1,287</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
