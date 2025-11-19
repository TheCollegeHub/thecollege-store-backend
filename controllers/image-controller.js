import { existsSync } from 'fs';
import { join } from "path";

function findImageWithExtensions(basePath, extensions) {
    for (let ext of extensions) {
        const fullPath = `${basePath}.${ext}`;
        if (existsSync(fullPath)) {
            return fullPath;
        }
    }
    return null;
  }
  
  export async function getImage(req, res) {
//   app.get('/api/v1/images', (req, res) => {
    const { type, name } = req.query;
  
    // console.log(name)
    if (!type || !name) {
        return res.status(400).send('Params "type" e "name" are required');
    }
  
     const baseImagePath = join(__dirname, '..' , 'data', 'images', type, name);
  
     const possibleExtensions = ['jpg', 'png', 'jpeg'];
  
     const imagePath = findImageWithExtensions(baseImagePath, possibleExtensions);
    // console.log(baseImagePath)
  
    if (existsSync(imagePath)) {
        res.sendFile(imagePath);
    } else {
        res.status(404).send('Imagem not found');
    }
  };