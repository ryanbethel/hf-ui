import fs from 'node:fs/promises';
import path from 'node:path';
import chokidar from 'chokidar';
import enhance from '@enhance/ssr'
const html = enhance({ elements })
const __dirname = path.dirname(new URL(import.meta.url).pathname);
import elements from '../_elements/elements.js';

const srcDir = path.join(__dirname, '..', '.jekyll-build');
const destDir = path.join(__dirname, '..', '_site');

async function enhanceHtmlFile(filePath) {
  try {
    const rawHTML = await fs.readFile(filePath, 'utf8');
    const enhancedHTML = html`${rawHTML}`

    const destPath = filePath.replace(srcDir, destDir);
    await fs.mkdir(path.dirname(destPath), { recursive: true });
    await fs.writeFile(destPath, enhancedHTML, 'utf8');
    console.log(`Processed and copied file: ${destPath}`);
  } catch (err) {
    console.error(`Error processing file ${filePath}:`, err);
  }
}

async function processAllFiles(directory = srcDir) {
  try {
    const files = await fs.readdir(directory, { withFileTypes: true });
    for (const file of files) {
      const filePath = path.join(directory, file.name);
      if (file.isDirectory()) {
        await processAllFiles(filePath);
      } else if (file.isFile() && path.extname(file.name) === '.html') {
        await enhanceHtmlFile(filePath);
      } else {
        await copyFile(filePath);
      }
    }
  } catch (err) {
    console.error(`Error processing directory ${directory}:`, err);
  }
}

async function copyFile(filePath) {
  let destPath
  try {
    destPath = filePath.replace(srcDir, destDir);
    await fs.mkdir(path.dirname(destPath), { recursive: true });
    await fs.copyFile(filePath, destPath);
    console.log(`Copied file: ${destPath}`);
  } catch (err) {
    console.error(`Error copying file ${filePath} to ${destPath}:`, err);
  }
}

async function removeFile(filePath) {
  let destPath
  try {
    console.log({srcDir, destDir, filePath})
    destPath = filePath.replace(srcDir, destDir);
    console.log({destPath})

    await fs.unlink(destPath);
    console.log(`Removed file: ${destPath}`);
  } catch (err) {
    console.log(`Error removing file ${destPath}:`, err);
  }
}

async function removeDir(dirPath) {
  let destPath
  try {
    destPath = dirPath.replace(srcDir, destDir);
    await fs.rmdir(destPath, { recursive: true });
    console.log(`Removed directory: ${destPath}`);
  } catch (err) {
    console.error(`Error removing directory ${destPath}:`, err);
  }
}


const args = process.argv.slice(2);
const watch = args.includes('--watch') || args.includes('-w');

(async () => {
  await removeDir(destDir);
  await processAllFiles();

  if (watch) {
    console.log('Watching for changes...');
    chokidar.watch(srcDir, { ignoreInitial: true }).on('all', async (event, filePath) => {
      if (event === 'add' || event === 'change') {
        if (path.extname(filePath) === '.html') {
          await enhanceHtmlFile(filePath);
        } else {
          await copyFile(filePath);
        }
      } else if (event === 'unlink') {
        await removeFile(filePath);
      } else if (event === 'unlinkDir') {
        await removeDir(filePath);
      }
    })
  }
})();