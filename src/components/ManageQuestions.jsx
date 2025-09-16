import { useState, useEffect } from "react";
//soru yonet  dosyasi
export default function ManageQuestions({ onBack }) {
  const [questions, setQuestions] = useState([]);   // burada localstorage den geln sorulari tutumak icin taninmis 



  // LocalStorage'dan soruları yükle yani localstorage da kayd edilen sorulari al cek ama dizi seklinde al 
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("customQuestions")) || [];
    setQuestions(stored); //sorulari questiona  atiyoor (yani sorulari yansit )
  }, []);




  // Soru silme fonksiyonu
  function handleDelete(index) {
    const updated = [...questions]; //soru listesini kopyasini al
    updated.splice(index, 1); // o indexteki soruyu sil
    setQuestions(updated);// ekrarndaki listeyi guncelle
    localStorage.setItem("customQuestions", JSON.stringify(updated)); // ve localstorage da guncelle 
  }





  return (
    // burada kart olusturulur
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h3 className="text-center mb-4">🗑️ Soruları Yönet</h3>



{/*eger hic soru eklenmemisse bu mesaj gosterilir  */}
        {questions.length === 0 ? (
          <p className="text-center">Hiç eklenmiş soru yok.</p>
        ) : (    //degil ise anlamina gelir


           // eger varsa ul icine dahil et 

           // burada soyle bir islem donuyor sorular artik guestion dizisinin icinde simdi bu guestion dizisini tek tek elemanlari dolasarak okuyacak 
           // ve q >> sorular i >> index paremetre tanimli yada donusturuldu diyelim ve li etiketinin icinde i anahtari var bu index soru tutuyoor 
           //  sonra div etiketinde catogory (html,css,react) yazilir cercevenin icinde sonra metin yazilir (soru) sonra silme butonu eklenir  
          <ul className="list-group">
            {questions.map((q, i) => (
               
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"  
              > 
                <div>
                  <strong>{q.category}</strong> - {q.text}
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(i)}
                >
                  Sil ❌
                </button>
              </li>
            ))}
          </ul>
        )}

       
        
         {/*burada geri don butuna basinca daha once tanimlanmis 
         olan onBack=() setShowManageQuestions(false) ana sayfaya doner  */}
        <button className="btn btn-secondary w-100 mt-3" onClick={onBack}>
          ← Geri Dön
        </button>
      </div>
    </div>
  );
}
