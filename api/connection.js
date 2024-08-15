import { sql } from '@vercel/postgres';

const queryUsers = async () => {
  try {
    const result = await sql`SELECT * FROM users`;
    return result;
  } catch (error) {
    console.error('Error querying database:', error);
    throw error;
  }
};

export default queryUsers;