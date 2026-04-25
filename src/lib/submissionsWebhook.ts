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
    }
  | {
      kind: 'consultation_booking';
      receivedAt: string;
      data: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone?: string;
        country: string;
        preferredDestination: string;
        consultationType: string;
        preferredDate?: string;
        preferredTime?: string;
        immigrationGoal: string;
        currentStatus?: string;
        additionalNotes?: string;
        marketingConsent: boolean;
        source?: string;
      };
    }
  | {
      kind: 'contact_message';
      receivedAt: string;
      data: {
        id: string;
        name: string;
        email: string;
        phone?: string;
        country?: string;
        service?: string;
        message?: string;
        source?: string;
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

