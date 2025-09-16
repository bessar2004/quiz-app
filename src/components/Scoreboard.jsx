import { useEffect, useState } from "react";


// skor tablsounu gosterme dosyasi


// burada user >> email adresi  onback >> geri donmek icin tiklanirsa bu fonksiyon calisir
export default function Scoreboard({ user, onBack }) {
  // burada skorlari tutmak icin bir dizi olusturulur 
  const [scores, setScores] = useState([]);



// buraca user degistiginde calisir bu fonksiyon
  useEffect(() => {
    const allScores = JSON.parse(localStorage.getItem("scores")) || []; {/*burada skorlar localstragdan  aliyor (cekiyor verileri) ama dizi halinde gelir */}
    const userScores = allScores.filter((s) => s.email === user); {/* sadece giris yapilan kullaniciya suzer yani her kullanici kendi skorlari var  */}
    setScores(userScores);  {/*guncellenir ve skorlar ekranda yansir  */}
  }, [user]);




  return (
    <div className="container mt-5">  {/*burada container olusturuluyor  */}
      <div className="card p-4 shadow">   {/* arkasinda kart olusturuluyor   */}
        <h3 className="text-center mb-3">📊 Skor Tablosu</h3>
        {scores.length === 0 ? (         
          <p className="text-center">Henüz hiç skorunuz yok.</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Tarih</th>
                <th>Kategori</th>
                <th>Skor</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((s, i) => (
                <tr key={i}>
                  <td>{s.date}</td>
                  <td>{s.category}</td>
                  <td>
                    {s.score} / {s.total} ({s.percent}%)
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* 🆕 Geri Dön Butonu */}
        <button className="btn btn-secondary w-100 mt-3" onClick={onBack}>
          ← Geri Dön
        </button>
      </div>
    </div>
  );
}
