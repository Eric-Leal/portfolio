// Rota reservada para uso futuro com Resend.
// Descomente o bloco abaixo e instale: npm install resend @react-email/render

/*
import { Resend } from 'resend'

// TODO: criar src/emails/for-me-email.tsx e src/emails/for-sender-email.tsx
// antes de ativar esta route.

// import { ForMeEmail } from '@/emails/for-me-email'
// import { ForSenderEmail } from '@/emails/for-sender-email'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'
const TO_ME = process.env.RESEND_TO_EMAIL ?? ''

export async function POST(request: Request) {
  try {
    const { name, email, message, time } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Campos obrigatórios faltando.' },
        { status: 400 },
      )
    }

    // 1. Notificação para o dono do portfólio
    const { error: errorMe } = await resend.emails.send({
      from: FROM,
      to: TO_ME,
      replyTo: email,
      subject: `Nova mensagem do site de: ${name}`,
      // react: ForMeEmail({ name, email, message, time }),
      html: `<p><strong>${name}</strong> (${email}) enviou uma mensagem:</p><p>${message}</p><p>${time}</p>`,
    })

    if (errorMe) {
      console.error('[Resend] Erro notificação:', errorMe)
      return NextResponse.json({ error: errorMe.message }, { status: 500 })
    }

    // 2. Confirmação para o visitante
    const { error: errorSender } = await resend.emails.send({
      from: FROM,
      to: email,
      subject: 'Recebi sua mensagem!',
      // react: ForSenderEmail({ name, message, time }),
      html: `<p>Olá <strong>${name}</strong>, recebi sua mensagem e responderei em breve!</p>`,
    })

    if (errorSender) {
      console.error('[Resend] Erro confirmação:', errorSender)
      // Não bloqueia — notificação já foi enviada
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Resend] Erro inesperado:', err)
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 },
    )
  }
}

 */

export {} // placeholder — remova quando ativar o Resend
