
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createAgentFromPrompt,
  CreateAgentOutput,
} from '@/ai/flows/agent-creation-from-prompt';

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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Wand2, Loader2, Save } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useAuth } from '@/hooks/use-auth';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const agentSchema = z.object({
  agentName: z.string().min(1, 'Agent name is required.'),
  agentDescription: z.string().min(1, 'Agent description is required.'),
  suggestedTools: z.string().optional(),
});

export default function CreateAgentPage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof agentSchema>>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      agentName: '',
      agentDescription: '',
      suggestedTools: '',
    },
  });

  const handleGenerate = async () => {
    if (!prompt) {
      toast({
        title: 'Prompt is empty',
        description: 'Please enter a prompt to generate agent details.',
        variant: 'destructive',
      });
      return;
    }
    setIsGenerating(true);
    try {
      const result: CreateAgentOutput = await createAgentFromPrompt({ prompt });
      form.setValue('agentName', result.agentName);
      form.setValue('agentDescription', result.agentDescription);
      form.setValue('suggestedTools', result.suggestedTools.join(', '));
      toast({
        title: 'Agent Details Generated',
        description: 'Review and save your new agent.',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Generation Failed',
        description: 'Could not generate agent details from the prompt.',
        variant: 'destructive',
      });
    }
    setIsGenerating(false);
  };
  
  const onSubmit = async (values: z.infer<typeof agentSchema>) => {
    if (!user) {
        toast({
            title: 'Not authenticated',
            description: 'You must be logged in to save an agent.',
            variant: 'destructive',
        });
        return;
    }
    setIsSaving(true);
    try {
        const agentsCollection = collection(db, 'users', user.uid, 'agents');
        await addDoc(agentsCollection, {
            name: values.agentName,
            description: values.agentDescription,
            tools: values.suggestedTools?.split(',').map(t => t.trim()).filter(Boolean) || [],
            createdAt: serverTimestamp(),
            workflows: 0,
        });

        toast({
          title: 'Agent Saved',
          description: `Agent "${values.agentName}" has been successfully saved.`,
        });
        router.push('/agents');
    } catch (error) {
        console.error('Error saving agent:', error);
        toast({
            title: 'Save Failed',
            description: 'Could not save the agent to the database.',
            variant: 'destructive',
        });
    }
    setIsSaving(false);
  };

  return (
    <div className="container mx-auto p-0">
      <h1 className="text-3xl font-bold mb-6">Create New Agent</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>
                Describe the agent you want to create.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label htmlFor="prompt">Prompt</Label>
                <Textarea
                  id="prompt"
                  placeholder="e.g., An agent that helps manage my calendar by scheduling meetings and sending reminders."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={6}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerate} disabled={isGenerating || isSaving} className="w-full">
                {isGenerating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate with AI
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Card>
                <CardHeader>
                  <CardTitle>Agent Configuration</CardTitle>
                  <CardDescription>
                    Fill in the details for your new agent.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="agentName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agent Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Calendar Bot" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="agentDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agent Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="A detailed description of what the agent does."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="suggestedTools"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tools</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Google Calendar API, SendGrid API"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="submit" disabled={isSaving || isGenerating}>
                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                     Save Agent
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
