import { useState } from "react";
// soru ekel dosyasi 
export default function AddQuestion({ onBack }) {

  
  // burada form adli bir state tanimlaniyor category text options correct Answer formda saklanir 
  const [form, setForm] = useState({
    category: "HTML",
    text: "",
    options: ["", "", ""],
    correctAnswer: "",
  });



// burada  inputlarin degisiklik yaptiginda form degerler guncellenir
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
// burada secenegin dizi ye aktariyoruz yani secenekler diznin icinde
  function handleOptionChange(index, value) {
    const newOptions = [...form.options];
    newOptions[index] = value;
    setForm({ ...form, options: newOptions });

    // Eğer doğru cevap boşsa, ilk doldurulan seçeneği otomatik doğru cevap yap
    if (!form.correctAnswer && value) {
      setForm((prev) => ({ ...prev, correctAnswer: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newQuestion = {
      category: form.category,
      text: form.text,
      options: form.options,
      correctAnswer: form.correctAnswer,
    };

    // LocalStorage’a kaydet
    
    const stored = JSON.parse(localStorage.getItem("customQuestions")) || []; // daha once kaydedilmis sorulari oku ve sonra dizye cevir
    stored.push(newQuestion); // yeni gelen sorulari diznin sonuna koy 
    localStorage.setItem("customQuestions", JSON.stringify(stored)); // sonra tekrar stringe cevir ve  localstrage kayd et 

    alert("Soru başarıyla eklendi ✅");

    // Formu sıfırla
    setForm({
      category: "HTML",
      text: "",
      options: ["", "", ""],
      correctAnswer: "",
    });
  }

  return (
    <div className="container mt-5">  {/*burada bir container olusturuluyoor  */}
      <div className="card p-4 shadow">     {/*burada arka kisim olusturuluyoor >> kart  */}
        <h3 className="text-center mb-4">📝 Yeni Soru Ekle</h3>
        <form onSubmit={handleSubmit}>     {/* burada form kismi basliyoor  */}
          <div className="mb-3">
            <label className="form-label">Kategori</label> 
            {/*bir merdiven acilir icinde ( HTML CSS REACT ) secenekleri var   */}
            <select
              className="form-control"
              name="category"                       
              value={form.category}
              onChange={handleChange}
            >
              <option>HTML</option>
              <option>CSS</option>
              <option>React</option>
              <option>JS</option>
            </select>
          </div>
       {/*burada soru texti bulunmakta  */}
          <div className="mb-3">
            <label className="form-label">Soru</label>
            <input
              type="text"
              name="text"
              className="form-control"
              value={form.text}
              onChange={handleChange}
              required
            />
          </div>
   {/*burada secenekler ama for (map) sekliyle secenek(i+1) ve 3 secenek gorunecek */}
          {form.options.map((opt, i) => (
            <div className="mb-3" key={i}>
              <label className="form-label">Seçenek {i + 1}</label>
              <input
                type="text"
                className="form-control"
                value={opt}
                onChange={(e) => handleOptionChange(i, e.target.value)}
                required
              />
            </div>
          ))}
  {/*burada  dogru secenek gorunuecek yukardaki seceneklerle indexli bir sekilde baglantili yani ben secenek 1 dersem orada secenek 1 value deger neyse burada gorukur  */}
          <div className="mb-3">
            <label className="form-label">Doğru Cevap</label>
            <select
              className="form-control"
              name="correctAnswer"
              value={form.correctAnswer}
              onChange={handleChange}
              required
            >

              {form.options.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt || `Seçenek ${i + 1}`}   {/* >> burad degerler varsa degerler sirasiyla gozuksun yoksa secek1 secenek 2 secek 3 gorukur */}
                </option>
              ))}
            </select>
          </div>

          <button className="btn btn-success w-100">Kaydet</button>
        </form>

        <button className="btn btn-secondary w-100 mt-2" onClick={onBack}>
          ← Geri Dön
        </button>
      </div>
    </div>
  );
}
