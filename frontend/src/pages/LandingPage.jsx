import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const phrases = [
    "Upload. Analyze. Understand.",
    "AI-powered document intelligence at your fingertips.",
    "Extract insights from PDFs, images, and more.",
    "Smart summaries. Instant classification.",
];

const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
};

export default function LandingPage() {
    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false);

            setTimeout(() => {
                setIndex((prev) => (prev + 1) % phrases.length);
                setVisible(true);
            }, 400);
        }, 3200);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
            {/* Navbar */}
            <header className="mx-auto flex max-w-7xl items-center justify-between px-8 py-8">
                <h1 className="text-3xl font-bold tracking-tight" >
                    InsightHub
                </h1>

                <div className="hero-but  flex gap-4">
                    <Link
                        to="/login"
                        className="rounded-lg border border-slate-600 px-5 py-2 hover:bg-slate-800 transition"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="rounded-lg bg-blue-600 px-5 py-2 hover:bg-blue-500 transition"
                    >
                        Get Started
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <main className="mx-auto flex max-w-8xl flex-col items-center px-8 pt-10 text-center">

              <span className="inline-flex items-center gap-3 rounded-full border border-blue-500/40 bg-blue-500/10 px-5 py-2 text-sm text-blue-300">
                    
                    <span class="font-bold">v1.0 </span>
                    <span className="relative flex h-3 w-3 center items-center justify-center">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75 "></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
                    </span>

                    
                    Every document. Every word. Instantly searchable.

                </span>  

                    <h1 className="hero-reveal mt-4 max-w-5xl text-5xl font-extrabold leading-tight">
                        Stop searching through files.
                        <br />
                        <span className="text-blue-400">
                            Start asking questions.
                        </span>
                    </h1>
                    <p
                        className="hero-heading  mt-4 max-w-5xl text-lg leading-9 text-slate-300"
                        style={{ fontFamily: '"JetBrains Mono", monospace' }}
                    >
                        Upload once. Search forever. AI-powered OCR transforms every document into instantly searchable knowledge.
                    </p>


          

                {/* Features */}
                <div className="hero-buttons  mt-12 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-4">
                        <div
                            onMouseMove={handleMouseMove}
                            className="feature-card rounded-2xl border border-slate-700 bg-white/5 p-6 backdrop-blur"
                        >
                        <div className="text-4xl">📄</div>
                        <h3 className="mt-4 text-xl font-semibold">
                            Upload
                        </h3>
                        <p className="mt-2 text-slate-400"style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                            Store thousands of documents securely.
                        </p>
                    </div>
                        <div
                            onMouseMove={handleMouseMove}
                            className="feature-card rounded-2xl border border-slate-700 bg-white/5 p-6 backdrop-blur"
                        >
                        <div className="text-4xl">🤖</div>
                        <h3 className="mt-4 text-xl font-semibold">
                            AI Extraction
                        </h3>
                        <p className="mt-2 text-slate-400"style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                            OCR understand every page automatically.
                        </p>
                    </div>
                        <div
                            onMouseMove={handleMouseMove}
                            className="feature-card rounded-2xl border border-slate-700 bg-white/5 p-6 backdrop-blur"
                        >
                        <div className="text-4xl">🔍</div>
                        <h3 className="mt-4 text-xl font-semibold">
                            Smart Search
                        </h3>
                        <p className="mt-2 text-slate-400"style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                            Search using keywords or natural language.
                        </p>
                    </div>

                    <div
                        onMouseMove={handleMouseMove}
                        className="feature-card rounded-2xl border border-slate-700 bg-white/5 p-6 backdrop-blur"
                    >
                        <div className="text-4xl">⚡</div>
                        <h3 className="mt-4 text-xl font-semibold">
                            Instant Results
                        </h3>
                        <p className="mt-2 text-slate-400"style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                            Find the exact document in seconds.
                        </p>
                    </div>

                </div>
            </main>
        </div>
    );
}
