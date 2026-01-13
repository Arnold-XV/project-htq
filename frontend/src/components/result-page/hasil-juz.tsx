import React from "react";

export default function HasilJuz() {
  return (
    <div className="flex flex-col gap-7">
      <div className="shadow-sm">
        <div
          className="relative bg-neutral-50 text-neutral-25 rounded-[10px]  bg-no-repeat bg-[length:100.94%_376.958%] bg-[-6px_-13px] before:absolute before:inset-0 before:bg-[rgba(61,159,142,0.20)] before:rounded-[10px] pt-17 pb-16 pl-81.5 pr-99"
          style={{ backgroundImage: "url(/image/juz-result-bg.webp)" }}
        >
          <h4 className="font-bold text-[38px]">Juz 29 - Pemikir Empatik</h4>
          <p className="text-[22px]">Pemikir, Penuh Empati & Reflektif</p>
        </div>
        <div className="pl-10.75 pr-8.5 pt-9.25 pb-13">
          <p className="text-center text-[18px]">
            Kamu sering merasakan lebih banyak daripada yang kamu ungkapkan.
            Saat orang lain melihatmu tenang, di dalam dirimu ada proses
            berpikir dan merasakan yang panjang. Kepekaan emosimu adalah
            kekuatan, namun tanpa disadari, kamu juga bisa kelelahan karena
            terlalu sering menempatkan kebutuhan orang lain di atas dirimu
            sendiri.
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center">
        <div className="w-1/2">
          <p className="font-bold text-[22px]">Karakteristik Utama</p>
          <div></div>
        </div>
        <div className="rounded-[10px] shadow-sm bg-neutral-50 px-5.5 pt-7 pb-13">
          <p className="font-bold text-[22px] pb-[9px] border-b  border-neutral-200 w-full">
            Arah Pengembangan Diri
          </p>
          <div className="space-y-2 mt-4">
            <div className="flex gap-4">
              <div className="w-3.75 h-3.75 bg-neutral-300 rounded-full flex-shrink-0 mt-2"></div>
              <div className="flex flex-col">
                <p className="font-bold">Menjaga batas emosional diri</p>
                <p className="text-sm ">
                  Belajar mengenali kapan perlu hadir untuk orang lain dan kapan
                  perlu memberi ruang untuk diri sendiri.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-3.75 h-3.75 bg-neutral-300 rounded-full flex-shrink-0 mt-2"></div>
              <div className="flex flex-col">
                <p className="font-bold">
                  Mengungkapkan perasaan dengan lebih jujur
                </p>
                <p className="text-sm ">
                  Melatih keberanian menyampaikan kebutuhan tanpa rasa bersalah
                  atau takut mengecewakan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
