// app/api/webhooks/route.ts

import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';


export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error('Missing WEBHOOK_SECRET in environment variables');
    return new Response('Server configuration error', { status: 500 });
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.warn('Missing Svix headers');
    return new Response('Missing headers', { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Received webhook with ID: ${id}, Event Type: ${eventType}`);
  console.log('Webhook Payload:', body);

  try {
    switch (eventType) {
      case 'user.created':
        await handleUserCreated(evt.data);
        break;
      case 'user.updated':
        await handleUserUpdated(evt.data);
        break;
      case 'session.created':
        await handleSessionCreated(evt.data);
      // Add more cases as needed
      default:
        console.warn(`Unhandled event type: ${eventType}`);
    }
  } catch (error) {
    console.error(`Error handling event type ${eventType}:`, error);
    return new Response('Error handling event', { status: 500 });
  }

  return new Response('', { status: 200 });
}

// Handler for 'user.created' event
import prisma from "@/lib/db/prisma"; // Ensure this is correctly pointing to your Prisma client

interface UserData {
  id: string;
  email_addresses: { email_address: string }[];
  first_name?: string | null;
  last_name?: string | null;
}

async function handleUserCreated(data: UserData) {
  const { id: userId, email_addresses, first_name, last_name } = data;

  if (!userId || !email_addresses || email_addresses.length === 0) {
    console.warn("Incomplete user data received");
    throw new Error("Incomplete user data");
  }

  const email = email_addresses[0].email_address;

  try {
    // Directly interact with Prisma to create the user
    await prisma.user.upsert({
      where: { id: userId },
      update: {}, // No need to update, since it's a creation process
      create: {
        id: userId,
        email: email,
        firstName: first_name || null,
        lastName: last_name || null,
      },
    });

    console.log(`User [ID: ${userId}] created successfully`);
  } catch (error) {
    console.error("Error creating user with Prisma:", error);
    throw new Error("Failed to create user");
  }
}


// Handler for 'session.created' event
interface SessionJSON {
  id: string;
  user_id: string;
  // Add other properties as needed
}

async function handleSessionCreated(data: SessionJSON) {
  const { id: sessionId, user_id: userId } = data;

  if (!sessionId || !userId) {
    console.warn("Incomplete session data received");
    throw new Error("Incomplete session data");
  }

  try {
    // Handle session creation logic here
    console.log(`Session [ID: ${sessionId}] created for User [ID: ${userId}]`);
  } catch (error) {
    console.error("Error handling session creation:", error);
    throw new Error("Failed to handle session creation");
  }
}

// Handler for 'user.updated' event
interface UserUpdatedData {
  id: string;
  email_addresses: { email_address: string }[];
  first_name?: string | null;
  last_name?: string | null;
}

async function handleUserUpdated(data: UserUpdatedData) {
  const { id: userId, email_addresses, first_name, last_name } = data;

  if (!userId || !email_addresses || email_addresses.length === 0) {
    console.warn("Incomplete user data received for update");
    throw new Error("Incomplete user data for update");
  }

  const email = email_addresses[0].email_address;

  try {
    // Use upsert to handle both update and creation
    await prisma.user.upsert({
      where: { id: userId },
      update: {
        email: email,
        firstName: first_name || undefined,
        lastName: last_name || undefined,
      },
      create: {
        id: userId,
        email: email,
        firstName: first_name || null,
        lastName: last_name || null,
      },
    });

    console.log(`User [ID: ${userId}] upserted successfully`);
  } catch (error) {
    console.error("Error upserting user with Prisma:", error);
    throw new Error("Failed to upsert user");
  }
}
