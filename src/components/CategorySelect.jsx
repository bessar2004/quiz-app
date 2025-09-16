//katagori secimi html css react secenekleri secmek 
//Kullanıcı butona tıkladığında hangi kategoriyi seçtiğini App.jsx’e bildirmek için kullanılır.
export default function CategorySelect({ onSelectCategory }) {
  const categories = ["HTML", "CSS", "React","JS"];

  return (
    <div className="container text-center mt-5">
      <h2 className="mb-4">Kategori Seç</h2>   
      {/*burada  catagoride olan html css react seceneklerini birini bastiginda katagori neye bastiysan mesale html ozaman catagori html olur  */}   
      {categories.map((cat, i) => (          
        <button
          key={i}
          className="btn btn-primary m-2"
          onClick={() => onSelectCategory(cat)}  // burada gordugon gibi 
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
