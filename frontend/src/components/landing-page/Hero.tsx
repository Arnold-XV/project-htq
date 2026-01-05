import { ArrowRight } from "react-feather";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-[60vh] md:h-screen px-6 md:px-16 py-20 md:py-28 text-center overflow-hidden">
      
      {/* Hero Image */}
      <div className="absolute top-0 left-0 w-full h-[120%] overflow-hidden">
        <Image
          src="/hero-bg.jpg"
          alt="Hero"
          fill
          className="object-fill"
          style={{ objectPosition: 'top' }}
        />
      </div>
      <div className="absolute inset-0 bg-[var(--color-tosca)] opacity-60"></div>

      {/* Konten */}
      <div className="relative z-10 text-[var(--foreground)] mt-30">
        <span className="font-semibold inline-block 
                 bg-[var(--color-background-2)]/60 text-sm px-5 py-1 rounded-xl
                 shadow-[0_1px_10px_rgba(190,237,208,0.5),0_1px_35px_rgba(190,237,208,0.5)]
                 transition-shadow duration-300
                 border border-[var(--color-background-2)]/64">
          Durasi 5–10 menit
        </span>

        <h1 className="mt-6 text-3xl md:text-5xl max-w-xl mx-auto leading-tight font-cormorant font-bold">
          Kenali Kepribadian Qur’ani yang Membentuk Dirimu
        </h1>

        <p className="font-plus-jakarta mt-2 max-w-2xl mx-auto text-sm md:text-lg text-[var(--foreground)]">
          Pertanyaan reflektif yang disusun bersama psikolog untuk memahami
          kecenderungan kepribadian melalui kerangka 30 Juz Al-Qur’an
        </p>

        <div className="font-plus-jakarta mt-8 flex flex-col md:flex-row justify-center gap-7 font-semibold">
          <button className="bg-[var(--color-primary-button)] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[var(--color-primary-700)] cursor-pointer">
            Mulai Test <ArrowRight className="inline-block ml-2" />
          </button>
          <button className="border border-[var(--foreground)] px-4 py-2 rounded-lg shadow-lg hover:bg-[var(--color-primary-300)] cursor-pointer text-[var(--foreground)]">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}
