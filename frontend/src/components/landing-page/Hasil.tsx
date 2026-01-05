
import Image from "next/image";

const hasil = [
  {
    image: "/hasil-1.png",
    title: "Makna Juz",
    description: "Gambaran kecenderungan kepribadian yang paling dominan dalam dirimu saat ini.",
  },
  {
    image: "/hasil-2.png",
    title: "Pola Emosi & Respons",
    description: "Gambaran kecenderungan kepribadian yang paling mendekati dirimu saat ini.",
  },
  {
    image: "/hasil-3.png",
    title: "Arah Pengembangan Diri",
    description: "Gambaran kecenderungan kepribadian yang paling mendekati dirimu saat ini.",
  },
];

const Hasil = () => {
  return (
    <section className="py-16 md:py-24 bg-white text-black">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl text-center mb-10" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 800 }}>
        Hasil yang Kamu Dapatkan
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 max-w-[80rem] mx-auto items-center">
          {/* Left - Result Items */}
          <div className="space-y-5 max-w-[45rem]">
            {hasil.map((item, index) => (
              <div key={index} className="flex gap-8 items-end">
                <Image 
                src={item.image} 
                alt={item.title} 
                className="mx-auto mb-4 object-contain"
                width={60}
                height={60}
                />
                <div>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-base">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Result Card Preview */}
          {/* {{{<div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
            <div className="bg-primary p-4 text-primary-foreground">
              <div className="text-sm font-medium mb-1">Juz Kepribadian: EHNL</div>
              <div className="text-xs opacity-80">Reflektif, Hati-hati, & Penuh Empati</div>
            </div>

            <div className="p-4 md:p-6">
              <p className="text-sm text-muted-foreground mb-4">
                Hasil ini tidak dijelaskan kecenderungan yang mengambarkan diri kamu, 
                bukan sebuah batasan atas dirimu.
              </p>

              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-2">Gambaran Umum</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Kamu adalah pribadi yang reflektif. Juz hasil kamu mendapat kepala dan 
                  diri sendiri sangat penting sebelum meng-tata dan tujuan-tujuan hidupmu 
                  ke arah yang lebih baik.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <h5 className="font-medium text-foreground mb-2">Tantangan yang Perlu Disadari</h5>
                  <ul className="space-y-1 text-muted-foreground">
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                      <span>Mudah terlambat</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                      <span>Overthinking</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                      <span>Perfeksionis</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                      <span>Self-esteem yang tidak stabil</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-foreground mb-2">Sisi Terang & Potensi</h5>
                  <ul className="space-y-1 text-muted-foreground">
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                      <span>Setia dengan janji kepribadiannya</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                      <span>Bersifat bijaksana</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                      <span>Mudah mengajak kebaikan</span>
                    </li>
                  </ul>
                </div>
              </div>}}
            </div>
          </div>*/}

          <div className="flex justify-center lg:justify-end mt-10 lg:mt-0">
            <Image
              src="/hasil-4.png"
              alt="Hasil Card Preview"
              width={500}
              height={500}
              //className="rounded-2xl shadow-lg border border-gray-200"
            />
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hasil;
