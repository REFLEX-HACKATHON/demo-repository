import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center bg-[#0a0e1a]">
      <Image src="/Logo.png" alt="Reflex" width={220} height={220} priority />

      <p className="text-lg text-slate-300 italic -mt-4">
        Pause. Question. Verify.
      </p>

      <p className="max-w-md text-slate-400">
        Train yourself to recognize manipulation techniques in real and
        AI-generated content — before you trust or share it.
      </p>

      <Link
        href="/practice-mode"
        className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 transition-colors text-black font-bold text-lg"
      >
        Start
      </Link>
    </main>
  );
}
