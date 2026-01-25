"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, ChevronLeft, Mail, Upload, User } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import { API_BASE_URL } from "@/lib/constants";

type FormData = {
  name: string;
  email: string;
  birthdate: Date | null;
  photo: FileList;
};

export default function Register() {
  const router = useRouter();
  const [agree, setAgree] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  // menyesuaikan BE, format YYYY-MM-DD
  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };  

  const onSubmit = async (data: FormData) => {
    if (!agree) {
      setError("root", { message: "Kamu harus menyetujui Kebijakan Privasi" });
      return;
    }

    if (!data.photo?.length) {
      setError("photo", { message: "Foto wajib diupload" });
      return;
    }

    setLoading(true);

    try {
      // ONBOARDING
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          date_of_birth: formatDate(data.birthdate!),
          photo_url: null,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("STATUS:", res.status);
        console.error("RESPONSE:", text);
      
        throw new Error(text || "Gagal memulai tes");
      }      

      const result = await res.json();
      const newUserId = result.user.id;

      if (!newUserId) {
        throw new Error("User ID tidak ditemukan");
      }      

      // UPLOAD FOTO
      const fd = new FormData();
      fd.append("file", data.photo[0]);
      fd.append("userId", newUserId);

      const uploadRes = await fetch("/api/user/upload-photo-register", {
        method: "POST",
        body: fd,
      });

      if (!uploadRes.ok) {
        throw new Error("Upload foto gagal");
      }

      // MULAI TEST
      router.push("/test-page");
    } catch (err: unknown) {
      console.error(err);
    
      const message =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan, coba lagi";
    
      setError("root", { message });
    } finally {
      setLoading(false);
    }
    
  };

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
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[var(--color-tosca)] to-[var(--color-success-900)] bg-clip-text text-transparent">
            Langkah awal untuk melanjutkan
          </h1>
          <p className="text-sm text-[var(--foreground)] font-medium mt-1">
            Kami hanya butuh sedikit info sebelum kamu mulai.
          </p>
        </div>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-[var(--color-neutral-200)] p-6 md:p-8">

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Nama */}
          <div className="relative">
            <label className="text-sm font-bold">Nama</label>
            <input
              type="text"
              id="nama"
              placeholder="fatimah"
              {...register("name", { required: "Nama wajib diisi" })}
              className="mt-1 w-full rounded-md border border-[var(--color-neutral-300)] px-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-300)]"
            />
            <User className="absolute left-3 top-10 h-4 w-4 text-[var(--color-neutral-600)]"></User>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="relative">
            <label className="text-sm font-bold">Alamat Email</label>
            <input
              type="email"
              id="email"
              placeholder="fatimah@badr.co.id"
              {...register("email", { required: "Email wajib diisi",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Format email tidak valid"
                },
               })}
              className="mt-1 w-full rounded-lg border border-[var(--color-neutral-300)] px-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
            />
            <Mail className="absolute left-3 top-10 h-4 w-4 text-[var(--color-neutral-600)]"></Mail>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Tanggal Lahir */}
          <div className="relative">
            <label className="text-sm font-bold">Tanggal Lahir</label>

            <Controller
              control={control}
              name="birthdate"
              rules={{ required: "Tanggal lahir wajib diisi" }}
              render={({ field }) => (
                <div className="w-full">
                  <DatePicker
                  placeholderText="MM/DD/YYYY"
                  selected={field.value}
                  onChange={field.onChange}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  dateFormat="MM/dd/yyyy"
                  wrapperClassName="w-full"
                  className="mt-1 w-full rounded-lg border border-[var(--color-neutral-300)] pl-9 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-300)] text-[var(--color-neutral-500)]"
                /> </div>
              )}
            />

            <Calendar className="absolute left-3 top-10 h-4 w-4 text-[var(--color-neutral-600)]" />

            {errors.birthdate && (
              <p className="text-red-500 text-xs mt-1">
                {errors.birthdate.message}
              </p>
            )}
          </div>

          {/* Upload Foto */}
          <div className="relative">
            <label className="text-sm font-bold">Foto</label>
            <label
              htmlFor="photo"
              className="mt-1 flex items-center gap-2 rounded-lg pl-9 py-2 px-3 text-sm
                text-[var(--color-neutral-500)] cursor-pointer hover:bg-[var(--color-neutral-100)]
                relative
              "
              style={{
                background:
                  "repeating-linear-gradient(90deg, var(--color-neutral-400) 0 8px, transparent 8px 13px) top / calc(100% + 13px) 1px no-repeat," +
                  "repeating-linear-gradient(90deg, var(--color-neutral-400) 0 8px, transparent 8px 13px) bottom / calc(100% + 13px) 1px no-repeat," +
                  "repeating-linear-gradient(0deg, var(--color-neutral-400) 0 8px, transparent 8px 13px) left / 1px calc(100% + 25px) no-repeat," +
                  "repeating-linear-gradient(0deg, var(--color-neutral-400) 0 8px, transparent 8px 13px) right / 1px calc(100% + 25px) no-repeat",
              }}
            >
              <Upload className="h-4 w-4 absolute left-3 text-[var(--color-neutral-600)]" />
              {photo ? photo.name : "Upload file"}
            </label>
            <input
              id="photo"
              type="file"
              accept="image/*"
              {...register("photo", { required: "Foto wajib diupload",
              onChange: (e) => {const file = e.target.files?.[0];
                if (file) {
                  setPhoto(file);
                }
              },
             })}
              className="hidden"
            />
            <p className="text-xs font-medium text-[var(--color-neutral-400)] mt-1">
              Foto hanya digunakan sebagai bagian dari proses refleksi diri dan tidak dipublikasikan atau dibagikan ke pihak mana pun.</p>
            {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo.message}</p>}
          </div>

         {/* Syarat & Ketentuan */}
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

          {errors.root && <p className="text-red-500 text-xs mt-1">{errors.root.message}</p>}

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
            type="submit"
            disabled={!agree}
            className="w-full mt-2 rounded-lg bg-gradient-to-t from-[var(--color-tosca)] to-[var(--color-success-900)] text-white py-2 text-sm font-medium disabled:opacity-50 cursor-pointer hover:bg-[var(--color-primary-700)] transition-colors"
          >
            {loading ? "Loading..." : "Mulai Tes"}
          </button>
        </form>

      </div>
    </section>
  );
}
