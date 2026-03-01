// Configuração do EmailJS — usada no cliente (browser)
// Preencha os valores no .env.local (desenvolvimento) ou nas variáveis de
// ambiente do Vercel (produção). Prefixo NEXT_PUBLIC_ é obrigatório.

const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
  TEMPLATE_ID_FOR_ME: process.env
    .NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_FOR_ME as string,
  TEMPLATE_ID_FOR_SENDER: process.env
    .NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_FOR_SENDER as string,
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string,
}

export default EMAILJS_CONFIG
