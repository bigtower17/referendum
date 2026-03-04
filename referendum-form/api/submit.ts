import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      nome,
      cognome,
      codiceFiscale,
      telefono,
      email,
      comuneVoto,
      provincia,
      regione,
      privacyAccepted
    } = req.body;

    // Validate required fields
    if (!nome || !cognome || !codiceFiscale || !telefono || !email || !comuneVoto || !provincia || !regione || !privacyAccepted) {
      return res.status(400).json({ error: 'Tutti i campi sono obbligatori' });
    }

    // Connect to Neon database
    const sql = neon(process.env.DATABASE_URL!);

    // Insert data into database
    await sql`
      INSERT INTO fuorisede_registrations (
        nome,
        cognome,
        codice_fiscale,
        telefono,
        email,
        comune_voto,
        provincia,
        regione,
        privacy_accepted
      ) VALUES (
        ${nome},
        ${cognome},
        ${codiceFiscale.toUpperCase()},
        ${telefono},
        ${email},
        ${comuneVoto},
        ${provincia},
        ${regione},
        ${privacyAccepted}
      )
    `;

    return res.status(200).json({
      success: true,
      message: 'Registrazione completata con successo'
    });

  } catch (error: any) {
    console.error('Error:', error);

    // Check for duplicate codice fiscale
    if (error.message?.includes('duplicate key') || error.code === '23505') {
      return res.status(400).json({
        error: 'Questo codice fiscale è già stato registrato'
      });
    }

    return res.status(500).json({
      error: 'Errore durante la registrazione. Riprova più tardi.'
    });
  }
}
