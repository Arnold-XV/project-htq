import React from "react";
import { Button } from "../ui/button";

export default function KonsultasiCard() {
  return (
    <div
      className=" h-75 rounded-[10px] px-15.5 pt-8 pb-13 flex flex-col items-center my-21.5"
      style={{
        background: `linear-gradient(92deg, rgba(61, 159, 142, 0.42) 7.43%, rgba(61, 159, 142, 0.60) 57.44%), url(/image/konsultasi-card-bg.webp) lightgray 0.501px -1592.816px / 100% 844.441% no-repeat`,
      }}
    >
      <h5 className="text-center font-bold text-[32px]">
        Ingin memahami lebih dalam?
      </h5>
      <p className="text-center text-[18px] w-172.5 mx-auto mt-2.5">
        Setiap hasil memiliki dinamika emosi, tantangan, dan potensi yang unik.
        Konsultasi personal membantu kamu memahami makna hasil tes ini serta
        menyusun langkah pengembangan diri yang lebih selaras dan aplikatif.
      </p>
      <Button className="mt-5 bg-[#303030] px-4.5 py-2.5 rounded-[8px] text-[16px] text-[#EFEFEF] hover:bg-neutral-900">
        Konsultasi Sekarang
      </Button>
    </div>
  );
}
