import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    // Разрешаем CORS для локальной разработки
    cors: true,
    // Используем стандартный порт для Vite
    port: 5174,
    // Завершать процесс, если порт уже занят
    strictPort: true,
    hmr: {
      host: 'localhost',
    },
  },
  build: {
    // Создаем манифест для возможного серверного рендеринга (не обязательно, но полезно)
    manifest: true,
    rollupOptions: {
      // Указываем точку входа
      input: 'src/loader.js',
      output: {
        // Убираем хэши из названий файлов для статичных ссылок
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
});
