import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
// import { getTodos, postTodo } from '../my-api'

type AnyOBJ = { [key: string]: any }

export const getClient = (()=> {
  let client: QueryClient | null = null;
  return ()=> {
    if(!client) client = new QueryClient({});
    return client
  }
})()

const BASE_URL = 'https://fakestoreapi.com'

export const fetcher = async ({
  method,
  path,
  body,
  params,
}: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  body?: AnyOBJ;
  params?: AnyOBJ;
})=> {
  try {
    let url = `${BASE_URL}${path}`
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': BASE_URL
      }
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

export const QueryKeys = {
  PRODUCTS: 'PRODUCTS'
}