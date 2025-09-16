// Soru modelimiz (OOP)
export default class Question {
  constructor(text, options, correctAnswer) {
    this.text = text;              // Soru metni
    this.options = options;        // Seçenekler (dizi)
    this.correctAnswer = correctAnswer;  // Doğru cevap
  }

  // Doğru mu yanlış mı kontrol eden method
  checkAnswer(answer) {
    if (!answer) return false;
    // Küçük/büyük harf ve boşluk farkını yok say
    return this.correctAnswer.trim().toLowerCase() === answer.trim().toLowerCase();
  }
}
