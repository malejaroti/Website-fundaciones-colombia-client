function AboutPage() {
    return (
        <main className="font-montserrat">
            {/* Hero header */}
            <header className="px-4 py-12 md:py-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-semibold drop-shadow-sm">
                        Nuestro equipo fundador
                    </h1>
                </div>
            </header>

            {/* Intro */}
            <section className="px-4 py-8 md:py-10">
                <div className="max-w-6xl mx-auto">
                    <p className="text-xl md:text-2xl leading-relaxed text-gray-600">
                        Somos un equipo apasionado por la tecnología y el impacto social, con experiencia en
                        ingeniería, innovación y voluntariado con fundaciones.
                    </p>
                </div>
            </section>

            {/* Pillars */}
            <section className="px-4 pb-12 md:pb-16">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Technical Experience */}
                    <div className="flex items-start gap-4">
                        <div className="shrink-0 h-14 w-14 rounded-xl border border-gray-300 bg-white flex items-center justify-center">
                            {/* Code icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                className="h-7 w-7 text-gray-800"
                                strokeWidth={1.6}
                            >
                                <path d="M8.5 8.5 5 12l3.5 3.5M15.5 8.5 19 12l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-amber-500">Experiencia técnica</h3>
                            <p className="mt-1 text-gray-600">
                                Desarrollo web, UX/UI y arquitectura de plataformas digitales
                            </p>
                        </div>
                    </div>

                    {/* Social commitment */}
                    <div className="flex items-start gap-4">
                        <div className="shrink-0 h-14 w-14 rounded-xl border border-gray-300 bg-white flex items-center justify-center">
                            {/* Flower/hand icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                className="h-7 w-7 text-gray-800"
                                strokeWidth={1.6}
                            >
                                <path d="M12 6a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z" />
                                <path d="M9 14c2 0 3-1 5-1s3 1 5 1c1.5 0 1.5 2 0 2h-2.2a4 4 0 0 1-1.9.5H11a3 3 0 0 1-2-.8L8 15.5" strokeLinecap="round" />
                                <path d="M12 9v3" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-amber-500">Compromiso social</h3>
                            <p className="mt-1 text-gray-600">
                                Años de voluntariado y colaboración con organizaciones sin ánimo de lucro
                            </p>
                        </div>
                    </div>

                    {/* Connecting Vision */}
                    <div className="flex items-start gap-4">
                        <div className="shrink-0 h-14 w-14 rounded-xl border border-gray-300 bg-white flex items-center justify-center">
                            {/* Link/bridge icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                className="h-7 w-7 text-gray-800"
                                strokeWidth={1.6}
                            >
                                <path d="M10 14 7.5 16.5a3.5 3.5 0 1 1-5-5L5 9" strokeLinecap="round" />
                                <path d="M14 10 16.5 7.5a3.5 3.5 0 0 1 5 5L19 15" strokeLinecap="round" />
                                <path d="M8 12h8" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-amber-500">Visión que conecta</h3>
                            <p className="mt-1 text-gray-600">
                                Especialistas en tender puentes entre la tecnología y el cambio social
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default AboutPage;