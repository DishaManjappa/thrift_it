"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera, CheckCircle2, Loader2, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { analyzeUpload } from "@/lib/api";
import { AuthGuard } from "@/components/auth-guard";

const steps = ["Vision Agent Running...", "Listing Agent Generating...", "Pricing Agent Calculating..."];

export default function UploadPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [activeStep, setActiveStep] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);

  const handleFile = (chosen?: File) => {
    if (!chosen) return;
    setFile(chosen);
    const reader = new FileReader();
    reader.onload = () => setPreview(String(reader.result));
    reader.readAsDataURL(chosen);
  };

  const priceNumber = (value: string) => Number(value.replace(/[^0-9.]/g, "")) || 25;

  const runAi = async () => {
    if (!file) return;
    setIsRunning(true);
    for (let index = 0; index < steps.length; index += 1) {
      setActiveStep(index);
      await new Promise((resolve) => setTimeout(resolve, 650));
    }
    const result = await analyzeUpload(file);
    result.imageUrl = preview || result.imageUrl;
    const marketplaceListing = {
      id: `upload-${Date.now()}`,
      title: result.title,
      price: priceNumber(result.suggestedPrice),
      condition: result.condition,
      tags: result.tags,
      image: preview || result.imageUrl,
      height: "medium" as const,
      source: "upload" as const
    };
    sessionStorage.setItem("thriftit-ai-result", JSON.stringify(result));
    sessionStorage.setItem("thriftit-pending-listing", JSON.stringify(marketplaceListing));
    router.push("/results");
  };

  return (
    <AuthGuard>
      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
      <section className="rounded-xl bg-white p-6 shadow-soft sm:p-8">
        <p className="font-black uppercase text-berry">AI listing studio</p>
        <h1 className="mt-2 text-5xl font-black tracking-tight">Upload your thrift find</h1>
        <div
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            handleFile(event.dataTransfer.files[0]);
          }}
          onClick={() => inputRef.current?.click()}
          className="mt-8 grid min-h-[24rem] cursor-pointer place-items-center rounded-xl border-2 border-dashed border-ink/15 bg-oat/60 p-6 text-center transition hover:border-berry"
        >
          {preview ? (
            <img src={preview} alt="Upload preview" className="max-h-[26rem] rounded-xl object-contain shadow-soft" />
          ) : (
            <div className="space-y-4">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-xl bg-berry text-white">
                <UploadCloud size={30} />
              </div>
              <div>
                <p className="text-xl font-black">Drop a clothing photo here</p>
                <p className="mt-1 font-semibold text-ink/55">JPG, JPEG, or PNG works best</p>
              </div>
            </div>
          )}
          <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/jpg" className="hidden" onChange={(event) => handleFile(event.target.files?.[0])} />
        </div>
        <button
          disabled={!file || isRunning}
          onClick={runAi}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-5 py-4 font-black text-linen shadow-soft transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isRunning ? <Loader2 className="animate-spin" size={18} /> : <Camera size={18} />}
          Generate AI Listing
        </button>
      </section>

      <aside className="rounded-xl bg-ink p-6 text-linen shadow-soft sm:p-8">
        <h2 className="text-2xl font-black">Agent workflow</h2>
        <div className="mt-8 space-y-4">
          {steps.map((step, index) => {
            const complete = activeStep > index;
            const active = activeStep === index;
            return (
              <motion.div key={step} animate={{ opacity: activeStep >= index ? 1 : 0.45, x: active ? 8 : 0 }} className="flex items-center gap-4 rounded-xl bg-white/10 p-4">
                <span className={`grid h-10 w-10 place-items-center rounded-xl ${complete ? "bg-moss" : active ? "bg-clay" : "bg-white/10"}`}>
                  {complete ? <CheckCircle2 size={18} /> : active ? <Loader2 className="animate-spin" size={18} /> : index + 1}
                </span>
                <p className="font-black">{step}</p>
              </motion.div>
            );
          })}
        </div>
      </aside>
      </main>
    </AuthGuard>
  );
}
