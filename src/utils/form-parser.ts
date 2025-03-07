
import { IncomingForm } from 'formidable';
import type { NextApiRequest } from 'next';
import type { Fields, Files } from 'formidable';

export const parseForm = async (req: NextApiRequest) => {
  return new Promise<{ fields: Fields; files: Files }>((resolve, reject) => {
    const form = new IncomingForm({
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, 
    });
    
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};
