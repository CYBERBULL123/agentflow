
'use server';

/**
 * @fileOverview Creates an AI agent based on a prompt describing its role and capabilities.
 *
 * - createAgentFromPrompt - A function that creates an AI agent from a prompt.
 * - CreateAgentInput - The input type for the createAgentFromprompt function.
 * - CreateAgentOutput - The return type for the createAgentFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreateAgentInputSchema = z.object({
  prompt: z.string().describe('A prompt describing the role and capabilities of the AI agent.'),
});
export type CreateAgentInput = z.infer<typeof CreateAgentInputSchema>;

const CreateAgentOutputSchema = z.object({
  agentName: z.string().describe('The name of the AI agent.'),
  agentDescription: z.string().describe('A detailed description of the AI agent, derived from the prompt.'),
  suggestedTools: z.array(z.string()).describe('A list of suggested tools that the agent might need.'),
});
export type CreateAgentOutput = z.infer<typeof CreateAgentOutputSchema>;

export async function createAgentFromPrompt(input: CreateAgentInput): Promise<CreateAgentOutput> {
  return createAgentFromPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'createAgentFromPromptPrompt',
  input: {schema: CreateAgentInputSchema},
  output: {schema: CreateAgentOutputSchema},
  prompt: `You are an AI agent creation assistant. Your task is to create a new AI agent based on a user-provided prompt.

  The prompt describes the desired role and capabilities of the agent. Your goal is to generate a detailed description, suggest a name, and list tools the agent might need.

  The AI agent should be capable of connecting with different apps and performing its work, automating workflows. The agent can be used as a service.

  Use a Chain of Thought approach to generate the response:
  1.  **Analyze the Prompt:** Deconstruct the user's prompt to understand the agent's core function, target audience, and key actions.
  2.  **Suggest a Name:** Based on the analysis, brainstorm a concise and descriptive name for the agent.
  3.  **Create a Description:** Write a clear, detailed description of the agent's purpose, capabilities, and how it works.
  4.  **Identify Tools:** Suggest a list of potential tools (APIs, libraries, services) that would be necessary for the agent to perform its duties.

  Prompt: {{{prompt}}}`,
});

const createAgentFromPromptFlow = ai.defineFlow(
  {
    name: 'createAgentFromPromptFlow',
    inputSchema: CreateAgentInputSchema,
    outputSchema: CreateAgentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
