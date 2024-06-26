import { QueryClient } from 'react-query'
import { request, RequestDocument } from 'graphql-request'
// import { getTodos, postTodo } from '../my-api'

type AnyOBJ = { [key: string]: any }

export const getClient = (() => {
  let client: QueryClient | null = null
  return () => {
    if (!client)
      client = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity, // 중요! SSR 프리페치쿼리 hydrate. 얘가 이미 stale한 useQuery 데이터로 인식 -> useQuery // 캐싱관리는 알아서 하는것
            cacheTime: Infinity, // 0
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      })
    return client
  }
})()

const BASE_URL = '/'

export const restFetcher = async ({
  method,
  path,
  body,
  params,
}: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  path: string
  body?: AnyOBJ
  params?: AnyOBJ
}) => {
  try {
    let url = `${BASE_URL}${path}`
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': BASE_URL,
      },
    }

    if (params) {
      const searchParmas = new URLSearchParams(params)
      url += '?' + searchParmas.toString()
    }
    if (body) fetchOptions.body = JSON.stringify(body)
    const res = await fetch(url, fetchOptions)
    const json = await res.json()
    return json
  } catch (err) {
    console.log(err)
  }
}

export const graphqlFetcher = (query: RequestDocument, variables = {}) =>
  request(BASE_URL, query, variables)

export const QueryKeys = {
  PRODUCTS: 'PRODUCTS',
  CART: 'CART',
}
