// app/api/webhooks/route.ts

import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { createUser, updateUser } from '@/lib/db/userFunctions'; // Import your utility functions

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
async function handleUserCreated(data: any) {
  const { id: userId, email_addresses, first_name, last_name } = data;

  if (!userId || !email_addresses || email_addresses.length === 0) {
    console.warn('Incomplete user data received');
    throw new Error('Incomplete user data');
  }

  const email = email_addresses[0].email_address;

  try {
    // Create user using utility function
    await createUser(userId, email, first_name, last_name);
    console.log(`User [ID: ${userId}] created successfully`);
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}

// Handler for 'user.updated' event
async function handleUserUpdated(data: any) {
  const { id: userId, email_addresses, first_name, last_name } = data;

  if (!userId || !email_addresses || email_addresses.length === 0) {
    console.warn('Incomplete user data received for update');
    throw new Error('Incomplete user data for update');
  }

  const email = email_addresses[0].email_address;

  try {
    // Update user using utility function
    await updateUser(userId, {
      email,
      firstName: first_name || undefined,
      lastName: last_name || undefined,
    });
    console.log(`User [ID: ${userId}] updated successfully`);
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
}
