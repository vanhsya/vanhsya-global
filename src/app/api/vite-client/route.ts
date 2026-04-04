export function GET() {
  return new Response('export {};', {
    headers: {
      'content-type': 'application/javascript; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
}
