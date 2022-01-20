import 'antd/dist/antd.css'
import RouteGuard from '../components/RouteGuard'
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
    // <Component {...pageProps} />
    <RouteGuard>
      <Component {...pageProps} />
    </RouteGuard>
  )
}

export default MyApp
