import path from "path";
import { fileURLToPath } from "url";
import {promises as fs} from 'fs';


const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);


function resolve(file) {
    return path.join(__dirName, '..', 'data', file);
}

async function readJSON(file) {
    try {
        const data = await fs.readFile(resolve(file), 'utf8');
        return JSON.parse(data || '[]');
    } catch (error) {
        if(error.code === 'ENOENT'){
            await writeJSON(file, []);
            return [];
        }
        throw error;
    }
}

async function writeJSON(file,data){
    const filePath = resolve(file);
    const dirPath = path.dirname(filePath);
    await fs.mkdir(dirPath, {recursive : true});
    const json = JSON.stringify(data,null,2);
    await fs.writeFile(filePath,json,'utf8');
}

export {readJSON, writeJSON}