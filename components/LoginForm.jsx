import { Form, Input, Button, Checkbox } from 'antd'
import { useEffect } from 'react'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import styles from './Login.module.css'
import { useRouter } from 'next/router'

const LoginForm = () => {
  const router = useRouter()

  useEffect(() => {
    const loginInfo = localStorage.getItem('loginInfo')
    console.log('logininfoooo from login', loginInfo)
    // redirect to home if already logged in
    if (loginInfo) {
      router.push('/')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onFinish = values => {
    localStorage.setItem('loginInfo', JSON.stringify(values))
    router.push('/')
  }

  return (
    <Form name="login" className={styles.loginForm} onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.loginFormButton}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
