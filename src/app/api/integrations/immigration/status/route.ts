export const runtime = 'nodejs';

const COUNTRIES = ['usa', 'uk', 'canada', 'australia', 'eu'] as const;

const envFor = (country: (typeof COUNTRIES)[number]) => {
  const c = country.toUpperCase();
  return {
    baseUrl: process.env[`IMMIGRATION_API_${c}_BASE_URL`],
    key: process.env[`IMMIGRATION_API_${c}_KEY`]
  };
};

export async function GET() {
  const providers = COUNTRIES.map((country) => {
    const env = envFor(country);
    const baseUrlPresent = Boolean(env.baseUrl);
    const keyPresent = Boolean(env.key);
    return { country, configured: baseUrlPresent && keyPresent, baseUrlPresent, keyPresent };
  });

  return Response.json({ providers }, { status: 200 });
}

