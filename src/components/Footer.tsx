export default function Footer() {
    return (
        <footer className="bg-gray-300 text-gray-900 mt-8">
            <div className="max-w-6xl mx-auto px-4 pt-6 pb-1 text-center font-montserrat">
                <p className="text-sm opacity-80">
                    &copy; {new Date().getFullYear()} Fundaciones Colombia. All rights reserved.
                </p>
                <p className="text-xs opacity-70">Hecho con ❤️ por Alejandra Rodriguez</p>
            </div>
        </footer>
    );
}