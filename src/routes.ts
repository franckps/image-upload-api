import { Router, Request, Response, NextFunction } from 'express'
import path from 'path'
import upload from './uploader'
import db from './database/connection'

const serverIP = `http://192.168.0.108:3333`;

const routes = Router();

routes.get('/', async (req: Request, resp: Response) => {
    let imagens = await db('imagem');

    imagens = imagens.map(
        element => {
            return { ...element,
                url: `${serverIP}/${element.name}`
            }
        }
    )

    return resp.json(imagens);
})

interface Image {
    name: string,
    title: string,
    size: string,
    url: string
}

routes.get('/:name', async (req: Request, resp: Response, next: NextFunction) => {
    const { name } = req.params;
    let imagem: Image = {} as Image;
    imagem = ( await db('imagem')
        .where('name','=',name) as [Image] )[0];

    if(!!imagem){
        const fileName = imagem.name

        if(!!req.query.download){
            return resp.download(path.join(__dirname, 'uploads', fileName))
        }

        const options = {
            root: path.join(__dirname, 'uploads'),
            dotfiles: 'deny',
            headers: {
              'x-timestamp': Date.now(),
              'x-sent': true
            }
        }
        
        resp.sendFile(fileName, options)
          
    } else {
        return resp.status(404).json({ message: 'Image not found' });
    }
})

routes.post('/', upload.single('avatar') ,async (req: Request, resp: Response) => {
    if(!!req.file) {
        const id = (await db('imagem').insert({
            name: req.file.filename,
            title: (req.file.originalname)
                .replace(/\.[0-9a-zA-Z]{3}$/,''),
            size: req.file.size
        }) as [number]) [0];

        const imageData = (await db('imagem').where('id','=',id) as [Image])[0]
        imageData.url = `${serverIP}/${imageData.name}`;

        return resp.json({
            image: imageData
        });
    }
    
})

routes.delete('/:name', async (req: Request, resp: Response, next: NextFunction) => {
    const { name } = req.params;
    let imagem: Image = {} as Image;
    await db('imagem')
        .delete()
        .where('name','=',name);
    return resp.json({
        message: 'success'
    });
})

export default routes