import { generateText, tool, stepCountIs } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';
import { SYSTEM_PROMPT } from '@/lib/ai-context';

// Force dynamic runtime
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

// Lazy-init admin client (env vars not available at build time on Netlify)
let _supabaseAdmin: ReturnType<typeof createClient> | null = null;
function getSupabaseAdmin() {
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }
  return _supabaseAdmin;
}

export async function POST(req: Request) {
  try {
    const { messages, sessionId } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return Response.json({ error: 'OpenAI API key not configured' }, { status: 500 });
    }

    if (!sessionId) {
      return Response.json({ error: 'Session ID required' }, { status: 400 });
    }

    // Get the latest user message
    const latestMessage = messages[messages.length - 1];
    
    // Non-blockingly insert user message into chat_messages
    if (latestMessage && latestMessage.role === 'user') {
      getSupabaseAdmin().from('chat_messages').insert({
        session_id: sessionId,
        role: 'user',
        content: latestMessage.content
      }).then(({ error }) => {
        if (error) console.error('Error inserting user message:', error);
      });
    }

    // Use generateText (not streamText) — returns complete response + handles tool calls
    const result = await generateText({
      model: openai('gpt-4o-mini'),
      system: SYSTEM_PROMPT,
      messages: messages as any[],
      stopWhen: stepCountIs(5),
      tools: {

        saveLead: tool({
          description:
            'Save a customer as a new lead in the CRM. Use this when you have gathered enough info about a prospect during the conversation. Generate notes summarizing what the customer is interested in based on the conversation.',
          inputSchema: z.object({
            name: z.string().describe("The prospect's full name"),
            phone: z.string().optional().describe("The prospect's phone number"),
            email: z.string().optional().describe("The prospect's email address"),
            company: z.string().optional().describe("The prospect's company name"),
            notes: z.string().describe(
              "AI-generated summary of the conversation: what the customer seemed interested in, key topics discussed, and any specific needs or requirements mentioned."
            ),
          }),
          execute: async ({ name, phone, email, company, notes }) => {
            console.log(`Executing saveLead tool for ${name}...`);
            try {
              const { data, error } = await getSupabaseAdmin().rpc('submit_contact_form', {
                p_full_name: name,
                p_email: email || 'no-email-provided@pending.com',
                p_phone: phone || null,
                p_company: company || null,
                p_subject: 'AI Agent Lead',
                p_message: null,
                p_notes: notes,
                p_source: 'ai_agent',
                p_metadata: { sessionId }
              });

              if (error) {
                console.error('Supabase saveLead error:', error);
                return { success: false, error: error.message };
              }

              return {
                success: true,
                leadId: data,
                message: `Lead saved successfully for ${name}`,
              };
            } catch (e: unknown) {
              const err = e as Error;
              console.error('saveLead caught error:', err);
              return { success: false, error: err.message };
            }
          }
        }),

        subscribeNewsletter: tool({
          description: 'Subscribes a user to the email newsletter list.',
          inputSchema: z.object({
            email: z.string().describe('The email to subscribe.'),
            topicInterest: z.string().optional().describe('The overarching manufacturing or service topic they are interested in.'),
          }),
          execute: async ({ email, topicInterest }) => {
            const { error } = await getSupabaseAdmin().rpc('subscribe_email_list', {
              p_email: email,
              p_topic_interest: topicInterest || 'General',
              p_source: 'AI Sales Agent',
              p_source_page: '/chat'
            });

            if (error) {
              console.error('Newsletter Error:', error);
              return { success: false, message: 'Failed to subscribe them.' };
            }
            return { success: true, message: 'Subscribed to the newsletter successfully.' };
          }
        })
      },
    });

    const responseText = result.text;

    // Non-blockingly insert the AI's reply to chat_messages
    if (responseText) {
      getSupabaseAdmin().from('chat_messages').insert({
        session_id: sessionId,
        role: 'assistant',
        content: responseText
      }).then(({ error }) => {
        if (error) console.error('Error inserting assistant message:', error);
      });
    }

    return Response.json({ content: responseText });
  } catch (error) {
    console.error('Chat API Error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
