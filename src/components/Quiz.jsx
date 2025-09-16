import { useState, useEffect } from "react";
import Question from "../models/Question";

// Quiz bileşeni
export default function Quiz({ category, user, onBack, onShowScores }) {
  // 📌 Sabit sorular (hazır)
const allQuestions = {
  HTML: [
    new Question(
      "HTML'in açılımı nedir?",
      ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks Text Markup"],
      "Hyper Text Markup Language"
    ),
    new Question(
      "Hangi etiket başlık (heading) içindir?",
      ["<p>", "<h1>", "<div>"],
      "<h1>"
    ),
    new Question(
      "HTML’de paragraf oluşturmak için hangi etiket kullanılır?",
      ["<p>", "<h2>", "<span>"],
      "<p>"
    ),
    new Question(
      "Bir web sayfasında bağlantı (link) vermek için hangi etiket kullanılır?",
      ["<link>", "<a>", "<href>"],
      "<a>"
    ),
    new Question(
      "Resim eklemek için hangi etiket kullanılır?",
      ["<img>", "<picture>", "<src>"],
      "<img>"
    ),
  ],

  CSS: [
    new Question(
      "CSS hangi amaçla kullanılır?",
      ["Veritabanı yönetimi", "Stil ve tasarım", "Sunucu programlama"],
      "Stil ve tasarım"
    ),
    new Question(
      "Renk vermek için hangi özellik kullanılır?",
      ["color", "font-size", "background"],
      "color"
    ),
    new Question(
      "Bir elementi ortalamak için hangi özellik kullanılır?",
      ["margin", "padding", "align"],
      "margin"
    ),
    new Question(
      "Arka plan rengi vermek için hangi özellik kullanılır?",
      ["background-color", "bg", "color-bg"],
      "background-color"
    ),
    new Question(
      "Metin boyutunu değiştirmek için hangi özellik kullanılır?",
      ["font-size", "text-size", "size"],
      "font-size"
    ),
  ],

  React: [
    new Question(
      "React hangi dili temel alır?",
      ["Python", "JavaScript", "PHP"],
      "JavaScript"
    ),
    new Question(
      "React'te component nasıl yazılır?",
      ["function", "class", "her ikisi"],
      "her ikisi"
    ),
    new Question(
      "React'te hook'lar ne için kullanılır?",
      ["CSS yazmak için", "Durum ve yan etkileri yönetmek için", "HTML oluşturmak için"],
      "Durum ve yan etkileri yönetmek için"
    ),
    new Question(
      "React projesi oluşturmak için hangi komut kullanılır?",
      ["npx create-react-app", "npm install react", "npm init react"],
      "npx create-react-app"
    ),
    new Question(
      "React'te JSX nedir?",
      ["JavaScript XML", "Java Syntax Extension", "JavaScript XCode"],
      "JavaScript XML"
    ),
  ],

  JS: [
    new Question(
      "JavaScript'te değişken tanımlamak için hangi anahtar kelime kullanılmaz?",
      ["var", "let", "const", "define"],
      "define"
    ),
    new Question(
      "JavaScript'te array'in uzunluğunu veren property hangisidir?",
      ["length", "size", "count"],
      "length"
    ),
    new Question(
      "JavaScript'te fonksiyon tanımlamak için hangi anahtar kelime kullanılır?",
      ["def", "func", "function"],
      "function"
    ),
    new Question(
      "JavaScript'te eşitlik kontrolü için en güvenli operatör hangisidir?",
      ["==", "===", "="],
      "==="
    ),
    new Question(
      "JavaScript'te 'console.log()' ne işe yarar?",
      ["Konsola mesaj yazar", "Değişken tanımlar", "HTML elementi oluşturur"],
      "Konsola mesaj yazar"
    ),
  ],
};
 

  // 📌 LocalStorage’dan gelen kullanıcı eklediği sorular
  const stored = JSON.parse(localStorage.getItem("customQuestions")) || [];
  const customQuestions = stored
    .filter((q) => q.category === category) // sadece seçilen kategoriye ait sorular
    .map((q) => new Question(q.text, q.options, q.correctAnswer));

  //  Tüm soruları birleştir (hazır + custom)
  const questions = [...allQuestions[category], ...customQuestions];

  //  Stateler
  const [currentIndex, setCurrentIndex] = useState(0); // hangi sorudayız
  const [score, setScore] = useState(0); // doğru cevap sayısı
  const [finished, setFinished] = useState(false); // quiz bitti mi
  const [time, setTime] = useState(15); // geri sayım süresi
  const [answers, setAnswers] = useState([]);   // kullanıcının verdiği cevaplar
  const [reviewMode, setReviewMode] = useState(false); // inceleme modu açık mı
  const currentQuestion = questions[currentIndex]; // o anki soru

  //  Zamanlayıcı
  useEffect(() => {
    if (finished) return;
    if (time === 0) {
      handleAnswer(null); // süre biterse cevap vermedi say
      return;
    }
    const timer = setTimeout(() => setTime(time - 1), 1000); // her saniye azalt
    return () => clearTimeout(timer);
  }, [time, finished]);

  //  Cevap işleme
  function handleAnswer(answer) {
    // cevabı kaydet
    setAnswers((prev) => [
      ...prev,
      {
        question: currentQuestion.text,
        options: currentQuestion.options,
        correct: currentQuestion.correctAnswer,
        selected: answer,
      },
    ]);

    // doğruysa skor +1
    if (answer && currentQuestion.checkAnswer(answer)) {
      setScore(score + 1);
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex); // sonraki soruya geç
      setTime(15); // süreyi sıfırla
    } else {
      setFinished(true); // quiz bitti
      // 📊 Skor kaydı
      const percent = Math.round(((score + (answer && currentQuestion.checkAnswer(answer) ? 1 : 0)) / questions.length) * 100);
      const newScore = {
        email: user, // kullanıcı
        category, // kategori
        score: score + (answer && currentQuestion.checkAnswer(answer) ? 1 : 0), // doğru sayısı
        total: questions.length, // toplam soru
        percent, // yüzdelik başarı
        date: new Date().toLocaleString(), // tarih
      };
      const scores = JSON.parse(localStorage.getItem("scores")) || [];
      scores.push(newScore); // ekle
      localStorage.setItem("scores", JSON.stringify(scores)); // kaydet
    }
  }

  //  Quiz sıfırlama
  function resetQuiz() {
    setCurrentIndex(0);
    setScore(0);
    setFinished(false);
    setTime(15);
    setAnswers([]); // cevapları da temizle
    setReviewMode(false);
  }

  //  İnceleme ekranı
  if (finished && reviewMode) {
    return (
      <div className="container mt-5">
        <div className="card p-4 shadow">
          <h3 className="text-center">📖 Cevap İncelemesi</h3>
          <ul className="list-group mt-3">
            {answers.map((a, i) => (
              <li key={i} className="list-group-item">
                <strong>{i + 1}. {a.question}</strong>
                <div>
                  Senin cevabın:{" "}
                  <span style={{ color: a.selected === a.correct ? "green" : "red" }}>
                    {a.selected || "Cevap vermedin"}{" "}
                    {a.selected === a.correct ? "✅" : "❌"}
                  </span>
                </div>
                <div>Doğru cevap: <strong>{a.correct}</strong></div>
              </li>
            ))}
          </ul>
          <button className="btn btn-secondary mt-3" onClick={() => setReviewMode(false)}>
            ← Sonuçlara Dön
          </button>
        </div>
      </div>
    );
  }

  //  Normal Quiz ekranı
  return (
    <div className="container mt-5">
      {!finished ? (
        <div className="card p-4 shadow">
          <h5 className="mb-3">
            {category} Quiz - Soru {currentIndex + 1} / {questions.length}
          </h5>
          <h4>{currentQuestion.text}</h4>

          {/* süre */}
          <div className="alert alert-warning mt-3">
            Kalan Süre: <strong>{time}</strong> saniye
          </div>

          {/* şıklar */}
          <div className="mt-3">
            {currentQuestion.options.map((opt, i) => (
              <button
                key={i}
                className="btn btn-outline-primary m-2"
                onClick={() => handleAnswer(opt)}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* ilerleme çubuğu */}
          <div className="progress mt-3">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            >
              {Math.round(((currentIndex + 1) / questions.length) * 100)}%
            </div>
          </div>
        </div>
      ) : (
        // 📌 Quiz bitti ekranı
        <div className="card p-5 shadow text-center">
          <h3>🎉 {category} Quiz Bitti!</h3>
          <p className="mt-3">
            Skorun: <strong>{score}</strong> / {questions.length}
            <br />
            Başarı Oranı: <strong>{Math.round((score / questions.length) * 100)}%</strong>
          </p>

          {/* butonlar */}
          <button className="btn btn-primary mt-3 me-2" onClick={resetQuiz}>
            Tekrar Başla 🔄
          </button>
          <button className="btn btn-secondary mt-3 me-2" onClick={onBack}>
            Ana Sayfaya Dön 🏠
          </button>
          <button className="btn btn-success mt-3 me-2" onClick={onShowScores}>
            Skor Tablosunu Gör 📊
          </button>
          {/* ✅ yeni eklenen buton */}
          <button className="btn btn-info mt-3" onClick={() => setReviewMode(true)}>
            Cevapları İncele 🔍
          </button>
        </div>
      )}
    </div>
  );
}
