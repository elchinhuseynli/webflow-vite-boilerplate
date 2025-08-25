import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

// Читаем package.json, чтобы получить production URL
const packageJson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8'));
const prodUrl = packageJson.projectConfig.prodUrl;

export default defineConfig({
  // Устанавливаем абсолютный URL как базовый путь для production сборки
  base: process.env.NODE_ENV === 'production' ? `${prodUrl}/` : '/',

  server: {
    cors: true,
    port: 5174,
    strictPort: true,
    hmr: {
      host: 'localhost',
    },
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: 'src/loader.js',
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
});