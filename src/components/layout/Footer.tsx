"use client"
import Image from "next/image";

const Footer = () => {

    return <>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center mb-4">
        
          © Franco Ezequiel Marchegiani
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://franco-ezequiel-marchegiani.github.io/portfolio/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples Portfolio
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/Franco-Ezequiel-Marchegiani"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Github repo →
        </a>
      </footer>
    </>
}
export default Footer;