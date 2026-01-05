'use client';
import { Globe } from "react-feather";
import Image from "next/image";
import { useRouter } from "next/dist/client/components/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleTestClick = () => {
    const isLoggedIn = false;
    if (isLoggedIn) {
      router.push("/mulai-test");
    } else {
      router.push("/login");
    }
  };

  return (
    <nav className="fixed w-full z-50 px-6 py-10">
      <div className="mx-auto flex max-w-[98rem] items-center justify-between rounded-xl bg-[var(--color-background)] px-6 py-2 shadow-sm">
        
        {/* LEFT */}
        <div className="flex items-center gap-5">
          <Image
            src="/htq-logo.png"
            alt="Logo"
            width={40}
            height={40}
          />
          <div className="text-lg leading-tight font-cormorant font-extrabold text-[var(--foreground)]">
            <p>Yayasan Halaqah</p>
            <p>Tadarus Al-Qur&apos;an</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-10 text-sm">
          <div className="flex items-center gap-3 font-semibold">
            <button className="rounded-lg border border-[var(--color-neutral-300)] px-5 py-2 shadow-sm hover:bg-[var(--color-primary-300)] cursor-pointer text-[var(--foreground)]"
            onClick={handleTestClick}>
              Log in
            </button>
            <button className="rounded-lg bg-[var(--color-primary-button)] px-6 py-2 text-white hover:bg-[var(--color-primary-700)] shadow-sm cursor-pointer"
            onClick={handleTestClick}>
              Mulai Test
            </button>
          </div>
          
          <div className="flex items-center gap-1.5 text-lg font-medium cursor-pointer text-[var(--foreground)]">
            <Globe size={25} color="currentColor" />
            <span>ID</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
