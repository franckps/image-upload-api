import multer, { diskStorage } from 'multer'
import path from 'path'
import { uniqueName } from './utils'

const storeConfig = multer.diskStorage({ 
    destination: function(req, file, cb) {
        cb(null, path.resolve(__dirname,'uploads'))
    },
    filename: function(req, file, cb) {
        let arrNome = file.originalname.split('.');
        let nome = uniqueName() + '.' 
                + arrNome[arrNome.length - 1]
        cb(null, nome)
    }
});
export default multer({ storage: storeConfig });