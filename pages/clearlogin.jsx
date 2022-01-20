import { useCallback } from 'react'
import { useRouter } from 'next/router'

export default function ClearLogin() {
  const router = useRouter()

  const clearLoginData = useCallback(() => {
    localStorage.removeItem('loginInfo')
    router.push('/login')
  }, [router])

  return <button onClick={e => clearLoginData()}>Clear Login</button>
}
