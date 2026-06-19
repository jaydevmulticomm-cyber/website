import { NextResponse } from 'next/server';

const WEBHOOK = process.env.QUOTE_WEBHOOK_URL || '';
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || '';
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || '';
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || '';

const airtableEnabled = AIRTABLE_API_KEY && AIRTABLE_BASE_ID && AIRTABLE_TABLE_NAME;

async function createAirtableRecord(record: Record<string, unknown>) {
  const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
    AIRTABLE_TABLE_NAME,
  )}`;

  const response = await fetch(airtableUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields: record }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Airtable request failed: ${response.status} ${response.statusText} ${body}`);
  }

  return response.json();
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { company, name, email, phone, volume, product, details } = data;

    if (!name || !email || !product || !company) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const receivedAt = new Date().toISOString();
    const numericVolume = volume
      ? Number(String(volume).replace(/[^0-9.-]+/g, ''))
      : NaN;
    const detailsWithVolume = details
      ? Number.isFinite(numericVolume)
        ? details
        : `${details}\nVolume: ${volume}`
      : Number.isFinite(numericVolume)
      ? ''
      : volume
      ? `Volume: ${volume}`
      : '';

    const record: Record<string, unknown> = {
      Company: company,
      Name: name,
      Email: email,
      Phone: phone || '',
      Products: product,
      Details: detailsWithVolume,
      Source: 'Website contact form',
      ...(Number.isFinite(numericVolume) ? { Volume: Math.round(numericVolume) } : {}),
    };

    if (airtableEnabled) {
      await createAirtableRecord(record);
    } else if (WEBHOOK) {
      await fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...record, receivedAt }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Invalid request' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, message: 'Quote endpoint is live' });
}
