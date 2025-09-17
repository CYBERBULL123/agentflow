
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlusCircle, Bot, Workflow, Edit, Trash2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '@/hooks/use-auth';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

interface Agent {
  id: string;
  name: string;
  description: string;
  workflows: number;
}

export default function AgentsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAgents();
    }
  }, [user]);

  const fetchAgents = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const agentsCollection = collection(db, 'users', user.uid, 'agents');
      const querySnapshot = await getDocs(agentsCollection);
      const agentsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Agent[];
      setAgents(agentsList);
    } catch (error) {
      console.error('Error fetching agents:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch agents.',
        variant: 'destructive',
      });
    }
    setLoading(false);
  };

  const handleDelete = async (agentId: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'agents', agentId));
      setAgents(agents.filter(agent => agent.id !== agentId));
      toast({
        title: 'Success',
        description: 'Agent deleted successfully.',
      });
    } catch (error) {
      console.error('Error deleting agent:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete agent.',
        variant: 'destructive',
      });
    }
  };

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

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : agents.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-4 text-xl font-semibold">No Agents Found</h2>
            <p className="mt-2 text-muted-foreground">
              Get started by creating your first AI agent.
            </p>
            <Button asChild className="mt-4">
              <Link href="/agents/create">
                <PlusCircle className="mr-2 h-4 w-4" /> Create New Agent
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <Card key={agent.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{agent.name}</CardTitle>
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <CardDescription>{agent.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Workflow className="mr-2 h-4 w-4" />
                  <span>{agent.workflows || 0} Workflows</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your agent.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(agent.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
