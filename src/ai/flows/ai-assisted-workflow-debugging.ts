'use server';

/**
 * @fileOverview An AI-powered debugging assistant for agent workflows.
 *
 * - analyzeWorkflowExecutionLogs - A function that analyzes agent execution logs and suggests improvements.
 * - AnalyzeWorkflowExecutionLogsInput - The input type for the analyzeWorkflowExecutionLogs function.
 * - AnalyzeWorkflowExecutionLogsOutput - The return type for the analyzeWorkflowExecutionLogs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeWorkflowExecutionLogsInputSchema = z.object({
  executionLogs: z
    .string()
    .describe('The execution logs of the agent workflow.'),
  workflowDesign: z
    .string()
    .describe('The design of the agent workflow.'),
});
export type AnalyzeWorkflowExecutionLogsInput = z.infer<
  typeof AnalyzeWorkflowExecutionLogsInputSchema
>;

const AnalyzeWorkflowExecutionLogsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('Suggestions for improving the agent workflow.'),
  potentialIssues: z
    .string()
    .describe('Potential issues identified in the workflow.'),
});
export type AnalyzeWorkflowExecutionLogsOutput = z.infer<
  typeof AnalyzeWorkflowExecutionLogsOutputSchema
>;

export async function analyzeWorkflowExecutionLogs(
  input: AnalyzeWorkflowExecutionLogsInput
): Promise<AnalyzeWorkflowExecutionLogsOutput> {
  return analyzeWorkflowExecutionLogsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeWorkflowExecutionLogsPrompt',
  input: {schema: AnalyzeWorkflowExecutionLogsInputSchema},
  output: {schema: AnalyzeWorkflowExecutionLogsOutputSchema},
  prompt: `You are an AI-powered debugging assistant that analyzes agent execution logs and suggests improvements to optimize agent workflows.

  Analyze the following execution logs and workflow design to identify potential issues and suggest improvements.

  Execution Logs:
  {{executionLogs}}

  Workflow Design:
  {{workflowDesign}}

  Provide suggestions for improving the agent workflow and identify any potential issues.
  `,
});

const analyzeWorkflowExecutionLogsFlow = ai.defineFlow(
  {
    name: 'analyzeWorkflowExecutionLogsFlow',
    inputSchema: AnalyzeWorkflowExecutionLogsInputSchema,
    outputSchema: AnalyzeWorkflowExecutionLogsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
