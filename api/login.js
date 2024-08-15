import { sql } from '@vercel/postgres';

const connectionString = process.env.development.local.POSTGRES_URL;

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, email } = req.body;

        try {
            const result = await sql`
                SELECT * FROM users WHERE username = ${username} OR email = ${email}
            `;

            if (result.rows.length > 0) {
                res.status(200).json({ message: 'Login Successful', user: result.rows[0] });
            } else {
                res.status(401).send('Invalid username or email');
            }
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ message:'Internal Server Error', error: error.toString() });
        }
    } else {
        res.status(405).send(`Method ${req.method} Not Allowed`);
    }
}   