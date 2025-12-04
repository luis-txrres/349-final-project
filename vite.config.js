import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/349-final-project/', // <--- add this
  plugins: [react()],
});

