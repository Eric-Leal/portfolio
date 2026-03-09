'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

/**
 * Provider para gerenciar o cliente do React Query.
 * @param param0 O componente filho que terá acesso ao contexto do React Query.
 * @returns O componente QueryClientProvider envolvendo os filhos, com o cliente configurado.
 *
 * O QueryProvider é responsável por criar e fornecer o QueryClient para toda a aplicação, permitindo que os hooks de query e mutation funcionem corretamente. Ele também inclui o ReactQueryDevtools para facilitar o desenvolvimento e depuração das queries.
 */

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
