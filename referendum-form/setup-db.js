import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config();

const sql = neon(process.env.VITE_DATABASE_URL);

async function setupDatabase() {
  try {
    console.log('🔌 Connecting to database...');

    // Read schema file
    const schemaSQL = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');

    console.log('📝 Creating tables...');
    await sql(schemaSQL);

    console.log('✅ Database setup completed successfully!');
    console.log('\nTables created:');
    console.log('  - registrations (with indexes)');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();
