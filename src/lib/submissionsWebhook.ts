export type SubmissionWebhookPayload =
  | {
      kind: 'investor_deck_request';
      receivedAt: string;
      data: {
        id: string;
        name: string;
        email: string;
        organization?: string;
        role?: string;
        stage?: string;
        message?: string;
        source?: string;
      };
    }
  | {
      kind: 'card_waitlist';
      receivedAt: string;
      data: {
        id: string;
        email: string;
        tier: string;
      };
    }
  | {
      kind: 'expose_submission';
      receivedAt: string;
      data: {
        id: string;
        scamType: string;
        severity: string;
        country: string;
        amountLost?: string;
        summary: string;
        contactPreference: string;
        anonymous: boolean;
        contactEmail?: string;
        contactPhone?: string;
        evidence?: { name: string; size: number; type: string }[];
      };
    };

export const queueSubmissionWebhook = (payload: SubmissionWebhookPayload) => {
  const url = process.env.SUBMISSIONS_WEBHOOK_URL;
  if (!url) return;

  const token = process.env.SUBMISSIONS_WEBHOOK_TOKEN;
  const headers: Record<string, string> = {
    'content-type': 'application/json'
  };
  if (token) headers.authorization = `Bearer ${token}`;

  fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  }).catch(() => undefined);
};

