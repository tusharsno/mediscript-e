const { Pool } = require('pg');

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 15000
});

async function test() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Connection successful:', result.rows[0]);
  } catch (error) {
    console.error('❌ Connection failed:');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Full error:', error);
  } finally {
    await pool.end();
  }
}

test();
