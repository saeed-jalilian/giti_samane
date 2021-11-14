import {Fragment} from "react";
import {connect} from "react-redux";
import {Button, Form, Input, message, Typography} from "antd";
import Link from "next/link";

import {registerUser} from "../../components/api/redux/actions/user";

const RegisterPage = ({registerUser}) => {
  const [registerForm] = Form.useForm()
  const {Text} = Typography


  const handleRegister = async values => {
    const {username, password, rePassword} = values
    if (password === rePassword) {
      try {

      } catch (e) {

      }
    } else {
      message.error('رمزهای عبور وارد شده باید یکسان باشند')
    }
  }

  return (
      <div className='user-form-container'>
        <Form
            name={registerForm}
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

const mapStateToProps = state => ({})

export default connect(mapStateToProps, {registerUser})(RegisterPage)