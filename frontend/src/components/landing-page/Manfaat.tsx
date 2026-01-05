import Image from "next/image";

const manfaat = [
  {
    title: "Pemahaman Diri",
    desc: "Temukan kecenderungan kepribadian Anda dan bagaimana Anda merespons situasi dalam kehidupan sehari-hari.",
    image: "/manfaat-1.png",
  },
  {
    title: "Memahami Kekuatan & Tantangan",
    desc: "Dapatkan insight dan nasihat yang dapat membantu Anda dalam perjalanan pengembangan diri.",
    image: "/manfaat-2.png",
  },
  {
    title: "Perspektif Islami",
    desc: "Hasil tes dikaitkan dengan nilai-nilai Islam yang mendukung pertumbuhan spiritual dan karakter.",
    image: "/manfaat-3.png",
  },
]

export default function Manfaat() {
  return (
    <section className="px-6 md:px-16 py-16 bg-[var(--color-background)] text-[var(--foreground)]">
      <h2 className="text-4xl text-center mb-10 font-cormorant font-extrabold">
        Manfaat Tes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {manfaat.map((item, idx) => (
          <div
            key={idx}
            className="border border-[var(--color-neutral-200)] rounded-xl p-6 text-center shadow-sm"
          >
            <Image 
              src={item.image} 
              alt={item.title} 
              className="mx-auto mb-4 mt-4 object-contain"
              width={100}
              height={100}
            />
            <h3 className="font-plus-jakarta font-bold text-lg mb-2">{item.title}</h3>
            <p className="font-plus-jakarta text-base text-[var(--foreground)] mb-4">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
