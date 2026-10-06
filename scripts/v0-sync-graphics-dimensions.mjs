// Reads every image referenced by app/(legacy)/v0/graphics/data.ts and writes its real
// pixel width/height back into the file, leaving titles, order, and curation
// untouched. Run after adding or replacing images: npm run v0:graphics:sizes
import fs from 'fs';
import path from 'path';
import { imageSize } from 'image-size';

const PUBLIC_DIR = path.join(import.meta.dirname, '../public');
const DATA_FILE = path.join(import.meta.dirname, '../app/(legacy)/v0/graphics/data.ts');
const ARRAY_START = 'export const graphicsData: GraphicProject[] = ';

function measure(src) {
    const filePath = path.join(PUBLIC_DIR, src);
    const { width, height } = imageSize(fs.readFileSync(filePath));
    if (!width || !height) {
        throw new Error(`Could not read dimensions for ${filePath}`);
    }
    return { width, height };
}

const source = fs.readFileSync(DATA_FILE, 'utf8');
const eol = source.includes('\r\n') ? '\r\n' : '\n';
const start = source.indexOf(ARRAY_START);
if (start === -1) {
    throw new Error(`Could not find "${ARRAY_START}" in ${DATA_FILE}`);
}

const header = source.slice(0, start + ARRAY_START.length);
const projects = JSON.parse(source.slice(start + ARRAY_START.length).trim().replace(/;$/, ''));

const updated = projects.map(project => {
    const { id, title, organization, type, image, items } = project;
    const next = { id, title, organization, type, image, ...measure(image) };
    if (items) {
        next.items = items.map(item => ({ title: item.title, src: item.src, ...measure(item.src) }));
    }
    return next;
});

const body = JSON.stringify(updated, null, 4) + ';';
fs.writeFileSync(DATA_FILE, (header + body).replace(/\r?\n/g, eol) + eol);

const count = updated.reduce((total, p) => total + 1 + (p.items ? p.items.length : 0), 0);
console.log(`Updated dimensions for ${count} images in ${path.relative(process.cwd(), DATA_FILE)}`);
