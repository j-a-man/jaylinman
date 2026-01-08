const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');

const PUBLIC_DIR = path.join(__dirname, '../public');
const BASE_PATH = '/graphic design portfolio';
const ROOT_DIR = path.join(PUBLIC_DIR, BASE_PATH);

// Map folder names to Organization details
const ORG_MAP = {
    'HKES Design Portfolio': 'Binghamton HKES',
    'GDG Designs': 'Binghamton GDG',
    'Stackhacks': 'Binghamton Stackhacks',
    'Swim Design Portfolio': 'Herricks Swim Team'
};

function getDimensions(filePath) {
    try {
        const dimensions = sizeOf(filePath);
        return { width: dimensions.width, height: dimensions.height };
    } catch (e) {
        console.error('Error reading dimensions for:', filePath);
        return { width: 800, height: 600 }; // Fallback
    }
}

function scanDirectory() {
    const projects = [];

    // Get Top Level Folders (The Organizations)
    const orgFolders = fs.readdirSync(ROOT_DIR).filter(f => fs.statSync(path.join(ROOT_DIR, f)).isDirectory());

    orgFolders.forEach(orgFolder => {
        const orgName = ORG_MAP[orgFolder] || orgFolder;
        const orgPath = path.join(ROOT_DIR, orgFolder);

        const items = fs.readdirSync(orgPath);

        items.forEach(item => {
            if (item === '.DS_Store') return;
            const itemPath = path.join(orgPath, item);
            const stats = fs.statSync(itemPath);
            const relativePath = path.join(BASE_PATH, orgFolder, item).replace(/\\/g, '/');

            if (stats.isDirectory()) {
                // Formatting Folder Name to Title: 'HKES E-Board Reveal...' -> 'HKES E-Board Reveal...'
                const title = item;

                // Scan sub-items
                const subItems = fs.readdirSync(itemPath)
                    .filter(sub => sub !== '.DS_Store')
                    .map(sub => {
                        const subPath = path.join(itemPath, sub);
                        if (fs.statSync(subPath).isDirectory()) {
                            // Handle deeper nesting (FREP Reveals etc)
                            // Since our flat structure supports one level of "Folder Project", 
                            // we can flatten these or just present them as sub-folders?
                            // Current app logic only supports 1 level of modal grid. 
                            // Let's Flatten deeply nested images into this one folder for now? 
                            // OR better: Create a "sub-project" for each deep folder? 
                            // Actually, the user's data structure had 'FREP Reveals' as a top-level project in the list.
                            // So if we encounter a folder here, we should promote it to a top-level project?
                            // NO, that loses context. 
                            // Let's just recurse and collect ALL images deep inside this folder into one flat list for the modal.
                            // Or just list them.

                            // Recursive collector
                            const collectImages = (dir, prefix = '') => {
                                let collected = [];
                                fs.readdirSync(dir).forEach(f => {
                                    const p = path.join(dir, f);
                                    if (fs.statSync(p).isDirectory()) {
                                        collected = collected.concat(collectImages(p, prefix + f + ' '));
                                    } else if (/\.(png|jpg|jpeg|gif)$/i.test(f)) {
                                        const dims = getDimensions(p);
                                        collected.push({
                                            title: (prefix + f).replace(/\.[^/.]+$/, ""),
                                            src: path.join(BASE_PATH, orgFolder, item, path.relative(itemPath, p)).replace(/\\/g, '/'),
                                            width: dims.width,
                                            height: dims.height
                                        });
                                    }
                                });
                                return collected;
                            };
                            return collectImages(subPath, sub + ' / ');
                        } else {
                            // Normal file
                            if (!/\.(png|jpg|jpeg|gif)$/i.test(sub)) return null;
                            const dims = getDimensions(subPath);
                            return {
                                title: sub.replace(/\.[^/.]+$/, ""),
                                src: path.join(BASE_PATH, orgFolder, item, sub).replace(/\\/g, '/'),
                                width: dims.width,
                                height: dims.height
                            };
                        }
                    })
                    .flat()
                    .filter(Boolean);

                if (subItems.length > 0) {
                    projects.push({
                        id: item.replace(/\s+/g, '-').toLowerCase(),
                        title: title,
                        organization: orgName,
                        type: 'folder',
                        image: subItems[0].src, // Use first image as thumbnail
                        items: subItems
                    });
                }

            } else {
                // Single Image Project
                if (!/\.(png|jpg|jpeg|gif)$/i.test(item)) return;

                const dims = getDimensions(itemPath);

                projects.push({
                    id: item.replace(/\.[^/.]+$/, "").replace(/\s+/g, '-').toLowerCase(),
                    title: item.replace(/\.[^/.]+$/, ""),
                    organization: orgName,
                    type: 'image',
                    image: relativePath,
                    width: dims.width,
                    height: dims.height
                });
            }
        });
    });

    console.log(`export type GraphicProject = {
    id: string;
    title: string;
    organization: string;
    type: 'image' | 'folder';
    image: string;
    width?: number;
    height?: number;
    items?: { src: string; title: string; width: number; height: number }[];
};

export const graphicsData: GraphicProject[] = ${JSON.stringify(projects, null, 4)};`);
}

scanDirectory();
