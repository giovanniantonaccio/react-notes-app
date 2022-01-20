import axios from 'axios'
import { useCallback } from 'react'

const Testing = () => {
  const chama = useCallback(() => {
    axios('http://0.0.0.0:8000/tags')
      .then(res => {
        console.log('ressss', res)
      })
      .catch(error => {
        console.log('error', error)
      })
  }, [])

  return (
    <>
      <div>Hello</div>
      <button onClick={e => chama()}>doido</button>
    </>
  )
}

export default Testing
