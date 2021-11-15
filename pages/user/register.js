import {connect} from "react-redux";
import {Button, Form, Input, message, Typography} from "antd";
import {useRouter} from "next/router";

import {registerUser} from "../../components/api/redux/actions/user";
import {useEffect} from "react";

const RegisterPage = ({registerUser, isAuthenticated}) => {
  const [registerForm] = Form.useForm()
  const router = useRouter()


  const handleRegister = async values => {
    const {username, password, rePassword} = values
    const user = {username, password}
    if (password === rePassword) {
      try {
        await registerUser(user)
        await router.push(`${process.env.NextUrl}/user/login`)
      } catch (e) {
        console.log(e)
      }
    } else {
      message.error('رمزهای عبور وارد شده باید یکسان باشند')
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      router.push(`${process.env.NextUrl}`)
    }
  })

  return (
      <div className='user-form-container'>
        <Form
            form={registerForm}
            labelCol={{span: 5}}
            wrapperCol={{span: 19}}
            id='login-form'
            onFinish={handleRegister}
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
              label='تکرار رمز عبور'
              name='rePassword'
              rules={[
                {
                  required: true,
                  message: 'تکرار کردن رمز عبور الزامیست'
                }
              ]}
          >
            <Input.Password
                placeholder='رمز عبور خود را مجددا وارد کنید'
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
              ثبت نام
            </Button>
          </Form.Item>
        </Form>
      </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps, {registerUser})(RegisterPage)