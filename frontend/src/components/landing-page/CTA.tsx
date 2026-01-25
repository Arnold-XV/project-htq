'use client';
import { useRouter } from "next/dist/client/components/navigation";
import Image from "next/image";
import { motion as m } from "framer-motion";
import { ctaSection } from "@/lib/motionVariants";

export default function CTA() {
  const router = useRouter();
 
  return (
    <section className="px-6 md:px-16 py-20 bg-[var(--color-background)] text-[var(--foreground)] text-center font-plus-jakarta">
      <m.div variants={ctaSection} initial="hidden" whileInView="visible" viewport={{ once: true }}
      whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="relative max-w-8xl mx-auto rounded-3xl overflow-hidden shadow-xl">
        <Image
          src="/hero-bg.jpg"
          alt="Background"
          fill
          className="object-cover object-[center_60%] md:object-[center_70%]"
        />
        <div className="absolute inset-0 bg-[var(--color-tosca)] opacity-60"></div>

        <div className="relative p-10 md:p-10 rounded-3xl">
          <h2 className="text-[1.6rem] md:text-5xl font-cormorant font-extrabold max-w-2xl mx-auto">
            Sudah siap mengenal diri?
          </h2>

          <p className="mt-4 text-sm md:text-base font-medium max-w-2xl mx-auto text-[var(--foreground)]">
            Lorem ipsum dolor sit amet consectetur. Amet non id massa neque. Ullamcorper cras morbi faucibus egestas enim dignissim tincidunt.
          </p>

          <button className="mt-8 bg-[var(--foreground)] text-white px-13 py-2.5 rounded-lg cursor-pointer hover:bg-[var(--color-primary-700)] shadow-lg text-sm"
          onClick={() => router.push("/auth/login")}>
            Mulai Test
          </button>
        </div>
      </m.div>
    </section>
  );
}
