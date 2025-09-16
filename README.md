// tavsiye yazilari yazilmis

# React + Vite

// 7.satir HMR (Hot Module Replacement / Fast Refresh) → Kodda değişiklik yaptığında sayfa yenilenmeden anında güncelleniyor.
// 7.satir ESLint kuralları → Kod yazarken standartlara uymanı sağlıyor.
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

// iki resim ekleti var >> react
Currently, two official plugins are available:

//15.satir >> reactin icinde babel denilen bir compailer (derleyici ) bulunmakta ve bu babelin gorevi
// senin projende yazdigin jsx kodlari javascripte cevriyoor ayrica fast refersh >> kodu yazarken sayfyi yenilemeden gunceller

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh

//19.satir >> buda derleyici ama swc turunden daha hizli bir derleyici

- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


//Yeni bir bölüm başlığı: “ESLint ayarlarını genişletme 
// eslint >> hatalrin varsa uyarir seni 
## Expanding the ESLint configuration



// eger gercek bir uygulama yapcaksan tyoescript +Eslint kulnmani oneriyorlar  

//TypeScript ile birlikte kullanabileceğin hazır şablonu gösteriyor.

//typescript-eslint kullanarak kod kalitesini artırabileceğini söylüyor.

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
