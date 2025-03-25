import { socialMedia } from "@/data";
import Image from "next/image";

export default function WhatsappFloater() {
  return (
    <button className="fixed bottom-20 right-5 z-50 p-3 bg-green-500 hover:bg-green-600 transition-all rounded-full shadow-lg">
      <a href={socialMedia[0].link} target="_blank" rel="noopener noreferrer">
        <Image src="/whatsapp-white.svg" width={24} height={24} alt="whatsapp" className="w-6 h-6" />
      </a>
    </button>
  );
}
