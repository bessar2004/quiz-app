//                                    projenin AYAR DOSYASI 

import { defineConfig } from 'vite'//  vite projeyi calisitirir || defineconfing projenin ayar dosyasi  
import react from '@vitejs/plugin-react' //projenin icinde jsx tanimlayip derlenmesini sagliyor

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], // burada reacti ayar dosyasina dahil ediyoruz 
})
















