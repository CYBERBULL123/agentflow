
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
    .describe('Actionable suggestions for improving the agent workflow.'),
  potentialIssues: z
    .string()
    .describe('A step-by-step analysis of potential issues identified in the workflow execution.'),
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
  prompt: `You are an expert AI-powered debugging assistant. Your goal is to analyze agent execution logs against its intended workflow design to identify issues and suggest optimizations.

  Use a Chain of Thought approach to provide your analysis:
  1.  **Understand the Goal:** First, carefully read the 'Workflow Design' to understand what the agent is supposed to do.
  2.  **Trace the Execution:** Go through the 'Execution Logs' step-by-step. Compare what actually happened with the intended design. Note any deviations, errors, or unexpected outcomes.
  3.  **Identify Potential Issues:** Based on your trace, formulate a clear, step-by-step list of 'Potential Issues'. For each issue, explain why it's a problem (e.g., "The agent failed to parse the email correctly, leading to a missing ticket").
  4.  **Provide Actionable Suggestions:** For the identified issues, provide clear, actionable 'Suggestions' for improvement. These should be concrete recommendations (e.g., "Implement a more robust JSON parsing logic with error handling" or "Increase the timeout for the external API call").

  Analyze the following data:

  Execution Logs:
  {{{executionLogs}}}

  Workflow Design:
  {{{workflowDesign}}}

  Provide your analysis in the specified output format.
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
