import fs from 'fs/promises';
import path from 'path';

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const filePath = path.join(process.cwd(), 'src', 'database', 'db.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const json = JSON.parse(fileData);

    const photographer = json.photographers.find((p) => p.id.toString() === id);

    if (!photographer) {
      return new Response(JSON.stringify({ message: 'Photographer not found' }), {
        status: 404,
      });
    }

    return Response.json(photographer);
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Internal Server Error', error: error.message }),
      { status: 500 }
    );
  }
}
