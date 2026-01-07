"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, ChevronLeft, Mail, Upload, User } from "react-feather";

export default function Register() {
  const router = useRouter();
  const [agree, setAgree] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <section className="h-screen bg-[var(--color-neutral-50)] items-center justify-center px-4 py-12 text-[var(--foreground)] relative flex flex-col">
      <button
      onClick={() => router.push("/")}
      className="cursor-pointer shadow-md absolute top-8 left-5 md:left-7 text-sm font-bold bg-[var(--background)] px-3 py-1.5 rounded-md border border-[var(--color-neutral-300)] hover:bg-blue-800 flex">
      <ChevronLeft className="h-5 w-5 mr-1.5" size={20}/>
      Kembali</button>
      
        {/* Logo & Title */}
        <div className="text-center mb-6">
          <Image
            src="/htq-logo.png"
            alt="HTQ"
            width={60}
            height={60}
            className="mx-auto mb-2"
          />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--color-tosca)] to-[var(--color-success-900)] bg-clip-text text-transparent">
            Buat Akun untuk Memulai
          </h1>
          <p className="text-sm text-[var(--foreground)] font-medium mt-1">
            Kami hanya butuh sedikit info sebelum kamu mulai.
          </p>
        </div>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-[var(--color-neutral-200)] p-6 md:p-8">

        {/* Form */}
        <form className="space-y-4">
          <div className="relative">
            <label className="text-sm font-bold">Nama</label>
            <input
              type="text"
              placeholder="fatimah@badr.co.id"
              className="mt-1 w-full rounded-md border border-[var(--color-neutral-300)] px-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-300)]"
            />
            <User className="absolute left-3 top-10 h-4 w-4 text-[var(--color-neutral-600)]"></User>
          </div>

          <div className="relative">
            <label className="text-sm font-bold">Alamat Email</label>
            <input
              type="email"
              placeholder="fatimah@badr.co.id"
              className="mt-1 w-full rounded-lg border border-[var(--color-neutral-300)] px-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
            />
            <Mail className="absolute left-3 top-10 h-4 w-4 text-[var(--color-neutral-600)]"></Mail>
          </div>

          <div className="relative">
            <label className="text-sm font-bold">Tanggal Lahir</label>
            <input
              type="date"
              className="mt-1 w-full rounded-lg border border-[var(--color-neutral-300)] pl-9 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-300)] text-[var(--color-neutral-500)]"
            />
            <Calendar className="absolute left-3 top-10 h-4 w-4 text-[var(--color-neutral-600)] "></Calendar>
          </div>

          <div className="relative">
            <label className="text-sm font-bold">Foto</label>
            <label
              htmlFor="photo"
              className="mt-1 flex items-center gap-2 border border-dashed border-[var(--color-neutral-300)] rounded-lg pl-9 py-2 px-3 text-sm text-[var(--color-neutral-500)] cursor-pointer hover:bg-[var(--color-neutral-100)]"
            >
              <Upload className="h-4 w-4 absolute left-3 text-[var(--color-neutral-600)]" />
              {photo ? photo.name : "Upload file"}
            </label>
            <input
              id="photo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {if (e.target.files && e.target.files[0]) setPhoto(e.target.files[0])}}
            />
            <p className="text-sm font-medium text-[var(--color-neutral-400)] mt-1">This is a hint text to help user.</p>
          </div>

         <div className="flex items-start gap-3 text-xs text-[var(--foreground)]">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="scale-150 mt-3 md:mt-1 accent-[var(--color-tosca)]"
            />

            <p className="leading-relaxed">
              Saya setuju dengan{" "}
              <button
                type="button"
                className="font-bold hover:underline cursor-pointer"
              >
                Syarat & Ketentuan
              </button>{" "}
              serta{" "}
              <button
                type="button"
                onClick={() => setShowPrivacy(true)}
                className="font-bold hover:underline cursor-pointer"
              >
                Kebijakan Privasi
              </button>
            </p>
          </div>

          {showPrivacy && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-xl max-w-[26rem] w-full p-6">
                <h2 className="text-lg font-bold mb-3 text-center">Kebijakan Privasi</h2>

                <div className="text-xs text-[var(--foreground)] max-h-60 overflow-y-auto text-justify">
                  <p>
                    Website ini mengumpulkan data berupa nama, email, foto profil,
                    serta jawaban tes kepribadian untuk keperluan pelaksanaan tes,
                    penampilan dan penyimpanan hasil, serta pemberian rekomendasi yang relevan.
                    Seluruh data disimpan dengan <span className="font-bold">aman</span>, bersifat 
                    pribadi, dan <span className="font-bold">tidak dibagikan </span> 
                    kepada pihak ketiga lain di luar keperluan layanan ini.
                  </p>
                </div>

                <button
                  onClick={() => setShowPrivacy(false)}
                  className="mt-4 w-full rounded-lg bg-[var(--foreground)] text-white py-2 text-xs font-semibold cursor-pointer hover:bg-[var(--color-neutral-700)] transition-colors"
                >
                  Setuju
                </button>
              </div>
            </div>
          )}

          <button
            type="button"
            disabled={!agree}
            onClick={() => router.push("/auth/login")}
            className="w-full mt-2 rounded-lg bg-gradient-to-t from-[var(--color-tosca)] to-[var(--color-success-900)] text-white py-2 text-sm font-medium disabled:opacity-50 cursor-pointer hover:bg-[var(--color-primary-700)] transition-colors"
          >
            Register
          </button>
        </form>

        <p className="text-center text-xs text-[var(--foreground)] mt-5">
          Sudah mempunyai akun? {" "}
          <button
            type="button"
            onClick={() => router.push("/auth/login")}
            className="font-bold hover:underline cursor-pointer"
          >Login</button>
        </p>
      </div>
    </section>
  );
}
