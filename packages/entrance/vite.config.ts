import {defineConfig, PluginOption} from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteString from "vite-plugin-string";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteString({
      include: '**/*.xml'
    }) as never as PluginOption,
    react()
  ],
})
