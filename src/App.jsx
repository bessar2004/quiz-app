import { useState } from "react";
import './App.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Quiz from "./components/Quiz";
import CategorySelect from "./components/CategorySelect";
import Login from "./components/Login";
import Register from "./components/Register";
import Scoreboard from "./components/Scoreboard";
import AddQuestion from "./components/AddQuestion";
import ManageQuestions from "./components/ManageQuestions"; // 🆕 Soruları Yönet

function App() {
  const [user, setUser] = useState(null); // giris ekrani
  const [showRegister, setShowRegister] = useState(false); // kayit ekrani 
  const [category, setCategory] = useState(null); // katagori ekrani secim (html,css,react)
  const [showScores, setShowScores] = useState(false); // skor  tablosu 
  const [theme, setTheme] = useState("light"); // tema rengini degistirmek  
  // bu bir ekran tanimlama 
  const [showAddQuestion, setShowAddQuestion] = useState(false); // burada soru ekle ekrani
  const [showManageQuestions, setShowManageQuestions] = useState(false); // 🆕 //sorulari yonet ekrani



{/*kullanici cikis yapinca tum stateleri sifirliyor yani ekranlarin degerleri suanlik  */}
  function handleLogout() {
    setUser(null);
    setCategory(null);
    setShowScores(false);
    setShowAddQuestion(false);
    setShowManageQuestions(false);
  }
{/*burada tema rengi degistiren fonksiyon */}
  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }
  {/*burada ilk olan div arka temayi degistirir  */} 
  return (
   












    



    // bu kisim Anasayfanin tema rengini degistiriyoor
    <div
      data-bs-theme={theme}   
      className={`min-vh-90 w-500 bg-${theme === "light" ? "light" : "dark"} text-${theme === "light" ? "dark" : "light"}`}
    >




{/* Partiküller */}
<div className="particles">
  {Array.from({ length: 100 }).map((_, i) => (
    <span
      key={i}
      className="particle"
      style={{
        top: `${Math.random() * 100}vh`,
        left: `${Math.random() * 100}vw`,
        animationDuration: `${10 + Math.random() * 15}s`, // yavaş hareket
        animationDelay: `${Math.random() * 15}s`,
        width: `${10 + Math.random() * 10}px`, // 10–20px arası boyut
        height: `${10 + Math.random() * 10}px`,
      }}
    ></span>
  ))}
</div>























      {/*53- burada kullanici emailini menude gorunmesi icin bu kullanici (user) yollaniyor */}
       {/*54-cikis yap butona basinca cikis yapmasi icin caliscak fonksiyon (setcategory) */}
        {/*55- tema degistirme icin calisian fonksiyon */}
         {/*56-burad tema yi gonderiyoruz */}
      <Navbar
        user={user}
        onLogout={handleLogout}
        onToggleTheme={toggleTheme}
        theme={theme}
      />



{/* kullanici giris yapmis mi    */}
      {!user ? (
        <> 
         {/*giris ekrani burasi  */}
          {!showRegister ? (
            <Login onLogin={setUser} />   //giris kismi
          ) : (
            <Register onRegister={() => setShowRegister(false)} /> //kayit olma kismi
          )}






           {/*burada eger kullanici giris yapmamisa kayit ol ekrani acilsin nezaman kayit ol butona basincaya kadar  */}
          <div className="text-center mt-3">
            {!showRegister ? (
              <p>
                Hesabınız yok mu?{" "}
                <button
                  className="btn btn-link"
                  onClick={() => setShowRegister(true)}
                >
                  Kayıt Ol
                </button>
              </p>




            ) :
            
             (
              
              <p>
                Zaten hesabınız var mı?{" "}  {/*burad eger kayit ol ekrani acilirsa ve giris yap buna basilinca kayit ekrani  kapanir */}
                <button
                  className="btn btn-link"
                  onClick={() => setShowRegister(false)}
                >
                  Giriş Yap
                </button>
              </p>
            )}
          </div>
        </>
        
        
      ) : showAddQuestion ? ( 
        <AddQuestion onBack={() => setShowAddQuestion(false)} /> 
        // 117.satir  yukarda gordugun kisim soru ekleme ekrani
        // burada suan false props olarak  yoluuyor
        
      ) : showManageQuestions ? (
        <ManageQuestions onBack={() => setShowManageQuestions(false)} />
        // 122.satir sorulari yonetme ekrani
        //126.satir ana sayfa ekrani birde scor ekrani yani skor tablosu icin 
        // karogori secilmis mi && (ve) skor tablosu ekrani acik mi 
      ) : !category && !showScores ? (
        <div className="text-center mt-5">
          {/* burada setcatogory yi  catogoryselect.jsx dosyasina props olarak yoluuyor ve orada bir htm butona tikliyinca  artik catogory gunceller nuldan cikar html olur  */}
          <CategorySelect onSelectCategory={setCategory} />
           {/*skor tablsou butona basinca skor ekrani acilir  */}
          <button
            className="btn btn-secondary mt-3 me-2"
            onClick={() => setShowScores(true)}
          >
            Skor Tablosunu Gör 📊
          </button>

           {/*soru ekle kisimina basinca soru ekleme ekrani acilir  */}
          <button
            className="btn btn-info mt-3 me-2"
            onClick={() => setShowAddQuestion(true)}
          >

            Yeni Soru Ekle 📝
      
                  {/*burada soru ekel butona basarsa  setShowManageQuestions(true)     guncellenir ve showmangequestions sayfasi acilir  */}
          </button>
          {/*true olunca gider o gonderilen props calistirilir ve ekran  ManageQuestions  ekranini acar  */}
           {/*sorulari yonet butona basinca sorulari yonet ekrani acilir  */}
          <button
            className="btn btn-warning mt-3"
            onClick={() => setShowManageQuestions(true)}
          >

            Soruları Yönet 🗑️
          </button>
{/* 158-167. satirlar arasi >> burada bir katagori secerse soru sayfasi yani catogri sayfasi acilir ve icinde sorular gelemeye baslar ve */}
 {/* bitince skor tablosu ve quiz bittiginde orada skor tablosunu goster  ona basinca o acilir ve catogori kapanir */}
 {/*eger katogory secildi ise quiz ekrani ac  */ }
        </div>
      ) : category ? (
        <Quiz
          category={category}
          user={user}
          onBack={() => setCategory(null)}
          onShowScores={() => {
            setCategory(null); //burada quizi kapatir 
            setShowScores(true);// burada quiz bitiginde skor tablosunu gormek icin bir props gonderiyor
          }}
        />
        // burada skor verilerini getir scoreboard fonksiyonundan 
      ) : (
        <Scoreboard user={user} onBack={() => setShowScores(false)} />
      )}

      <Footer />
    </div>
  );
}

export default App;
