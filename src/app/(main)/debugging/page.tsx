'use client';

import { useState } from 'react';
import {
  analyzeWorkflowExecutionLogs,
  AnalyzeWorkflowExecutionLogsOutput,
} from '@/ai/flows/ai-assisted-workflow-debugging';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Bug, Loader2, Lightbulb, AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function DebuggingPage() {
  const [executionLogs, setExecutionLogs] = useState('');
  const [workflowDesign, setWorkflowDesign] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] =
    useState<AnalyzeWorkflowExecutionLogsOutput | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!executionLogs || !workflowDesign) {
      toast({
        title: 'Missing Information',
        description:
          'Please provide both execution logs and workflow design.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await analyzeWorkflowExecutionLogs({
        executionLogs,
        workflowDesign,
      });
      setAnalysisResult(result);
      toast({
        title: 'Analysis Complete',
        description: 'AI debugging assistant has provided suggestions.',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Analysis Failed',
        description: 'Could not analyze the provided information.',
        variant: 'destructive',
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-0">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">AI-Powered Debugging Assistant</h1>
        <p className="text-muted-foreground mt-2">
          Analyze execution logs to identify issues and get optimization
          suggestions.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Input Data</CardTitle>
              <CardDescription>
                Paste your execution logs and describe your workflow design.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logs">Execution Logs</Label>
                <Textarea
                  id="logs"
                  placeholder="[INFO] 2023-10-27 10:00:00 - Workflow started..."
                  value={executionLogs}
                  onChange={(e) => setExecutionLogs(e.target.value)}
                  rows={8}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="design">Workflow Design</Label>
                <Textarea
                  id="design"
                  placeholder="The workflow triggers on new email, an agent reads it, and if it's a support query, creates a ticket."
                  value={workflowDesign}
                  onChange={(e) => setWorkflowDesign(e.target.value)}
                  rows={5}
                />
              </div>
              <Button onClick={handleAnalyze} disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Bug className="mr-2 h-4 w-4" />
                )}
                Analyze & Debug
              </Button>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>
                Suggestions and potential issues from the AI assistant.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isLoading && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg flex items-center mb-2">
                      <Lightbulb className="mr-2 h-5 w-5 text-primary" /> Suggestions
                    </h3>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg flex items-center mb-2">
                      <AlertTriangle className="mr-2 h-5 w-5 text-destructive" /> Potential Issues
                    </h3>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                </div>
              )}
              {analysisResult && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg flex items-center mb-2">
                      <Lightbulb className="mr-2 h-5 w-5 text-primary" /> Suggestions
                    </h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {analysisResult.suggestions}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg flex items-center mb-2">
                      <AlertTriangle className="mr-2 h-5 w-5 text-destructive" /> Potential Issues
                    </h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {analysisResult.potentialIssues}
                    </p>
                  </div>
                </div>
              )}
              {!isLoading && !analysisResult && (
                <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-64">
                    <Bug className="h-12 w-12 mb-4" />
                    <p>Results will appear here after analysis.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
