'use client'

import emailjs from '@emailjs/browser'
import { useEffect, useRef, useState } from 'react'
import { z } from 'zod'

import EMAILJS_CONFIG from '@/config/emailjs.config'
import { cn } from '@/lib/utils'
import { usePortfolioStore } from '@/store/use-portfolio-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type Status = 'idle' | 'loading' | 'success' | 'error'
type FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>

const schemas = {
  pt: z.object({
    name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z.email('E-mail inválido'),
    message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
  }),
  en: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.email('Invalid email address'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
  }),
}

const translations = {
  pt: {
    name: 'Nome',
    namePlaceholder: 'Seu nome completo',
    email: 'E-mail',
    emailPlaceholder: 'seu@email.com',
    message: 'Mensagem',
    messagePlaceholder: 'Escreva sua mensagem...',
    sendButton: 'Enviar mensagem',
    messageStatusSucess:
      '✓ Mensagem enviada com sucesso! Você receberá um e-mail de confirmação em breve.',
    messageStatusError:
      '✕ Ocorreu um erro ao enviar a mensagem. Tente novamente.',
    loading: 'Enviando...',
  },
  en: {
    name: 'Name',
    namePlaceholder: 'Your full name',
    email: 'E-mail',
    emailPlaceholder: 'your@email.com',
    message: 'Message',
    messagePlaceholder: 'Write your message...',
    sendButton: 'Send message',
    messageStatusSucess:
      'Message sent successfully! You will receive a confirmation email soon.',
    messageStatusError:
      'An error occurred while sending the message. Please try again.',
    loading: 'Sending...',
  },
}

export function ContactForm() {
  const { language } = usePortfolioStore()
  const t = translations[language]

  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setFieldErrors({})
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement)
      .value

    const result = schemas[language].safeParse({ name, email, message })
    if (!result.success) {
      const errors: FieldErrors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FieldErrors
        if (!errors[field]) errors[field] = issue.message
      }
      setFieldErrors(errors)
      return
    }
    setFieldErrors({})
    setStatus('loading')
    const time = new Date().toLocaleString('pt-BR')

    const templateParams = { name, email, message, time }

    try {
      // 1. Notificação para o dono do portfólio
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID_FOR_ME,
        { ...templateParams, title: `Nova mensagem do site de: ${name}` },
        EMAILJS_CONFIG.PUBLIC_KEY,
      )

      // 2. Confirmação para o visitante
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID_FOR_SENDER,
        { ...templateParams, title: 'Recebi sua mensagem!' },
        EMAILJS_CONFIG.PUBLIC_KEY,
      )

      setStatus('success')
      formRef.current?.reset()
    } catch (err) {
      console.error('Erro ao enviar email:', err)
      setStatus('error')
    }
  }

  function clearFieldError(field: keyof FieldErrors) {
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-5"
      noValidate
    >
      {/* Nome */}
      <div className="flex flex-col gap-1.5">
        <Label
          htmlFor="name"
          className="text-tx-accent text-xs font-semibold tracking-wider uppercase"
        >
          {t.name}
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder={t.namePlaceholder}
          disabled={status === 'loading'}
          onBlur={() => clearFieldError('name')}
          aria-invalid={!!fieldErrors.name}
          className={cn(
            fieldErrors.name &&
              'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20',
          )}
        />
        {fieldErrors.name && (
          <span className="text-xs text-red-500">{fieldErrors.name}</span>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <Label
          htmlFor="email"
          className="text-tx-accent text-xs font-semibold tracking-wider uppercase"
        >
          {t.email}
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder={t.emailPlaceholder}
          disabled={status === 'loading'}
          onBlur={() => clearFieldError('email')}
          aria-invalid={!!fieldErrors.email}
          className={cn(
            fieldErrors.email &&
              'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20',
          )}
        />
        {fieldErrors.email && (
          <span className="text-xs text-red-500">{fieldErrors.email}</span>
        )}
      </div>

      {/* Mensagem */}
      <div className="flex flex-col gap-1.5">
        <Label
          htmlFor="message"
          className="text-tx-accent text-xs font-semibold tracking-wider uppercase"
        >
          {t.message}
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder={t.messagePlaceholder}
          disabled={status === 'loading'}
          onBlur={() => clearFieldError('message')}
          aria-invalid={!!fieldErrors.message}
          className={cn(
            'resize-none',
            fieldErrors.message &&
              'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20',
          )}
        />
        {fieldErrors.message && (
          <span className="text-xs text-red-500">{fieldErrors.message}</span>
        )}
      </div>

      {/* Feedback */}
      {status === 'success' && (
        <p className="text-tx-success text-sm font-medium">
          ✓ {t.messageStatusSucess}
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm font-medium text-red-500">
          ✕ {t.messageStatusError}
        </p>
      )}

      {/* Botão */}
      <Button
        type="submit"
        disabled={status === 'loading'}
        className={cn(
          'mt-1 rounded-lg px-6 py-3 text-sm font-semibold tracking-wide text-white',
          'bg-brand-5 hover:bg-brand-5/80',
        )}
        size="lg"
      >
        {status === 'loading' ? t.loading : t.sendButton}
      </Button>
    </form>
  )
}
