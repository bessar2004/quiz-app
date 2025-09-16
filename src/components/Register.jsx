import { useState } from "react";


//kayit dosyasi 
export default function Register({ onRegister }) {
  const [form, setForm] = useState({ email: "", password: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
// burada daha once kayd edilmis kullanici varmi localstorage da 
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Kullanıcı var mı u.email >> kayit olusuturken  form.email >>  giris yaparken  birbiriyle karsilastirirr 
    if (users.find((u) => u.email === form.email)) {
      alert("Bu e-posta zaten kayıtlı ❌");
      return;
    }

// burada  kullanici ve sifre eklenir 
    users.push(form);
        // Yeni kullanıcıyı kaydet localstorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Kayıt başarılı ✅ Şimdi giriş yapabilirsiniz");
    onRegister();
  }

  return (
    <div className="container mt-5">
     <div className="card p-4 shadow-lg border-0" style={{ maxWidth: "400px", margin: "0 auto" }}>

        <h3 className="text-center mb-4">Kayıt Ol</h3>
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
          <button className="btn btn-success w-100">Kayıt Ol</button>
        </form>
      </div>
    </div>
  );
}
