import { useState } from "react";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });

  {/*inputun icine yazilan degerleri gunceller   */}
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault(); // sayfayi yenilemesin 

    // Kayıtlı kullanıcıları çek
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Kullanıcıyı kontrol et
    const user = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (user) {
      alert("Giriş başarılı ✅");
      {/*emaili guncelleniyor  */}
      onLogin(user.email);
    } else {
      alert("E-posta veya şifre hatalı ❌");
    }
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg border-0" style={{ maxWidth: "400px", margin: "0 auto" }}>

        <h3 className="text-center mb-4">Giriş Yap</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="E-posta"
            className="form-control mb-3"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Şifre"
            className="form-control mb-3"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button className="btn btn-primary w-100">Giriş Yap</button>
        </form>
      </div>
    </div>
  );
}
