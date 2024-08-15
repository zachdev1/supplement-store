import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, email } = req.body;
  
        try {
            const checkResult = await sql`
                SELECT * FROM users WHERE username = ${username} OR email = ${email}
                `;

            if (checkResult.rowCount > 0) {
                res.status(409).send('Username or email already exists');
                return;
            }

            await sql`
                INSERT INTO users (username, email) VALUES (${username}, ${email})
                `;

            res.status(201).send('User registered successfully');
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).send('Internal Server Error');
        } 
    } else {
        res.status(405).send(`Method ${req.method} Not Allowed`);
    }
}