import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'database', 'db.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const json = JSON.parse(fileData);

    return Response.json(json.photographers);
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to load photographers' }),
      { status: 500 }
    );
  }
}



export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  if (method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const filePath = path.join(process.cwd(), 'src', 'database', 'db.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(jsonData);

    const photographer = data.photographers.find((p) => p.id === id);

    if (!photographer) {
      return res.status(404).json({ message: 'Photographer not found' });
    }

    return res.status(200).json(photographer);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
