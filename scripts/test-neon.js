require('dotenv').config();
const { Pool } = require('pg');

console.log('Testing connection to:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@'));

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 20000,
  ssl: { rejectUnauthorized: false }
});

async function test() {
  try {
    console.log('Attempting connection...');
    const result = await pool.query('SELECT NOW(), version()');
    console.log('✅ SUCCESS! Connected to database');
    console.log('Time:', result.rows[0].now);
    console.log('Version:', result.rows[0].version.substring(0, 50));
  } catch (error) {
    console.error('❌ FAILED:', error.code, error.message);
  } finally {
    await pool.end();
  }
}

test();
