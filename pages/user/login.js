import {Form, Input, Button, Row, Col, Typography} from "antd";
import {useDispatch} from "react-redux";
import {hideLoading, showLoading} from "react-redux-loading-bar";
import {connect} from "react-redux";
import Link from 'next/link'
import {useRouter} from "next/router";

import {loginUser} from "../../components/api/redux/actions/user";
import {useEffect} from "react";

const LoginPage = ({loginUser, isAuthenticated}) => {
  const [loginForm] = Form.useForm()
  const dispatch = useDispatch()
  const router = useRouter()
  const {Text} = Typography

  const handleLogin = async values => {
    const {username, password} = values
    const user = {username, password}
    await loginUser(user)
    try {
      dispatch(showLoading())
      await loginUser(user)
      await router.back()
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(hideLoading())
    }
  }

  useEffect(() => {
    const userAuthenticated = async () => {
      if (isAuthenticated) {
        await router.push(`${process.env.NextUrl}`)
      }
    }
    userAuthenticated()
  }, [isAuthenticated, router])

  return (
      <div className='user-form-container'>
        <Form
            form={loginForm}
            labelCol={{span: 4}}
            wrapperCol={{span: 20}}
            id='login-form'
            onFinish={handleLogin}
        >
          <Form.Item
              label='نام کاربری'
              name='username'
              rules={[
                {
                  required: true,
                  message: 'وارد کردن نام کاربری الزامیست'
                }
              ]}
          >
            <Input
                placeholder='نام کاربری خود را وارد کنید'
            />
          </Form.Item>

          <Form.Item
              label='رمز عبور'
              name='password'
              rules={[
                {
                  required: true,
                  message: 'وارد کردن رمز عبور الزامیست'
                }
              ]}
          >
            <Input.Password
                placeholder='رمز عبور خود را وارد کنید'
            />
          </Form.Item>
          <Form.Item
              wrapperCol={{span: 24}}
              className='form-btn-container'
              style={{textAlign: 'center'}}
          >
            <Button
                type='primary'
                htmlType='submit'
                size='large'
                block
                className='form-btn'
            >
              ورود
            </Button>
          </Form.Item>
          <div className='login-form-bottom'>
            <div id='sign-up-now'>
              <Text>
                ثبت نام نکرده اید؟ هم اکنون
              </Text>
              {' '}
              <Link href={`${process.env.NextUrl}/user/register`}>
                ثبت نام
              </Link>
              {' '}
              <Text>
                کنید
              </Text>
            </div>

          </div>
        </Form>
      </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps, {loginUser})(LoginPage)