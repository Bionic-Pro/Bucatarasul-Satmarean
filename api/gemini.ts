// This file is deprecated. The application now uses client-side generation via services/geminiService.ts.
// Kept as a placeholder to prevent build errors from missing files if referenced in routing config.

export default function handler(req: any, res: any) {
  // Support both Express-like (Vercel Node) and Standard Web API (Edge) signatures blindly
  if (res && typeof res.status === 'function') {
    return res.status(200).json({ message: "API deprecated. Use client-side service." });
  }
  
  return new Response(JSON.stringify({ message: "API deprecated" }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}