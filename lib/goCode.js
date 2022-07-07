import fs from 'fs';
import path from 'path';


const codeDirectory = path.join(process.cwd(), 'go-code');

export function getAllCodeIds() {
    const fileNames = fs.readdirSync(codeDirectory).filter(s => s.endsWith('.gos') || s.endsWith('.go'));
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName,
            },
        };
    });
}
export async function getCodeData(id) {
    const fullPath = path.join(codeDirectory, id);
    const codeContent = fs.readFileSync(fullPath, 'utf8');

    return {
        id,
        codeContent
    };
}

