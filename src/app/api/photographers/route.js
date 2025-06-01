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




