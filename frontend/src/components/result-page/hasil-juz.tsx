import React from "react";

export default function HasilJuz() {
  return (
    <div className="flex flex-col gap-7 mt-4.5">
      <div className="shadow-sm">
        <div
          className="relative bg-neutral-50 text-neutral-25 rounded-[10px] bg-no-repeat lg:bg-[length:100.94%_376.958%]  lg:bg-[-6px_-13px] bg-[length:100%_auto] bg-[0px_0px] 
            md:bg-[length:100%_250%] md:bg-[0px_-10px] bg-center before:absolute before:inset-0 before:bg-[rgba(61,159,142,0.20)] before:rounded-[10px] px-6 pt-10 pb-2 xxs:pt-20 xxs:pb-6 xs:px-6 xs:pt-40 xs:pb-6 md:px-40 md:py-8 lg:px-50 lg:py-12 xl:pt-17 xl:pb-16 xl:pl-81.5 xl:pr-99"
          style={{ backgroundImage: "url(/image/juz-result-bg.webp)" }}
        >
          <h4 className="font-bold lg:text-[38px] text-[26px] z-1">
            Juz 29 - Pemikir Empatik
          </h4>
          <p className="lg:text-[22px] text-[16px] z-1">
            Pemikir, Penuh Empati & Reflektif
          </p>
        </div>
        <div className="pl-10.75 pr-8.5 pt-9.25 pb-13">
          <p className="text-center lg:text-[18px] text-[14px]">
            Kamu sering merasakan lebih banyak daripada yang kamu ungkapkan.
            Saat orang lain melihatmu tenang, di dalam dirimu ada proses
            berpikir dan merasakan yang panjang. Kepekaan emosimu adalah
            kekuatan, namun tanpa disadari, kamu juga bisa kelelahan karena
            terlalu sering menempatkan kebutuhan orang lain di atas dirimu
            sendiri.
          </p>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col items-stretch justify-center gap-[25px]">
        <div className="rounded-[10px] shadow-sm bg-neutral-50 px-5.5 pt-7 pb-13 flex-1">
          <p className="font-bold lg:text-[22px] text-[16px] border-b border-neutral-200 w-full">
            Karakteristik Utama
          </p>
          <div className="w-full flex flex-col gap-2 mt-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row justify-between items-center">
                <p className="lg:text-[18px] text-[14px]">Neo</p>
                <p className="bg-[#E6F6F4] px-2.5 py-[5px] text-[#007F6D] font-semibold rounded-[5px] lg:text-[16px] text-[12px]">
                  67%
                </p>
              </div>
              <div className="bg-neutral-200 rounded-[20px]">
                <div
                  style={{ width: `67%` }}
                  className="rounded-[20px] bg-gradient-to-r from-[#3D9F8E] to-[#177766] h-3"
                ></div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row justify-between items-center">
                <p className="lg:text-[18px] text-[14px]">Ego</p>
                <p className="bg-[#E6F6F4] px-2.5 py-[5px] text-[#007F6D] font-semibold rounded-[5px] lg:text-[16px] text-[12px]">
                  67%
                </p>
              </div>

              <div className="bg-neutral-200 rounded-[20px]">
                <div
                  style={{ width: `67%` }}
                  className="rounded-[20px] bg-gradient-to-r from-[#3D9F8E] to-[#177766] h-3"
                ></div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row justify-between items-center">
                <p className="lg:text-[18px] text-[14px]">Ego</p>
                <p className="bg-[#E6F6F4] px-2.5 py-[5px] text-[#007F6D] font-semibold rounded-[5px] lg:text-[16px] text-[12px]">
                  67%
                </p>
              </div>
              <div className="bg-neutral-200 rounded-[20px]">
                <div
                  style={{ width: `67%` }}
                  className="rounded-[20px] bg-gradient-to-r from-[#3D9F8E] to-[#177766] h-3"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-[10px] shadow-sm bg-neutral-50 px-5.5 pt-7 pb-13 flex-1">
          <p className="font-bold lg:text-[22px] text-[16px] pb-[9px] border-b  border-neutral-200 w-full">
            Arah Pengembangan Diri
          </p>
          <div className="space-y-2 mt-4">
            <div className="flex gap-4">
              <div className="w-3.75 h-3.75 bg-neutral-300 rounded-full flex-shrink-0 mt-2"></div>
              <div className="flex flex-col">
                <p className="font-bold lg:text-[18px] text-[14px]">
                  Menjaga batas emosional diri
                </p>
                <p className="lg:text-[18px] text-[14px]">
                  Belajar mengenali kapan perlu hadir untuk orang lain dan kapan
                  perlu memberi ruang untuk diri sendiri.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-3.75 h-3.75 bg-neutral-300 rounded-full flex-shrink-0 mt-2"></div>
              <div className="flex flex-col">
                <p className="font-bold lg:text-[18px] text-[14px]">
                  Mengungkapkan perasaan dengan lebih jujur
                </p>
                <p className="lg:text-[18px] text-[14px]">
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
