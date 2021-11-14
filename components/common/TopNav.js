import {connect} from "react-redux";
import Link from "next/link"
import {Fragment, useState} from "react";
import {Input, message, Modal} from "antd";
import {Form} from 'antd'
import {useDispatch} from "react-redux";

import http from "../api/axiosConfig";
import {showLoading} from "react-redux-loading-bar";


const TopNav = ({isAuthenticated}) => {

  const [albumForm] = Form.useForm()
  const dispatch = useDispatch()


  const [isAlbumModalVisible, setIsAlbumModalVisible] = useState(true)


  const handleModalCancel = () => {
    setIsAlbumModalVisible(false)
  }

  const handleAlbumAdd = async values => {
    dispatch(showLoading())
    const {name} = values
    const body = {name}
    try {
      await http.post(`${process.env.NextUrl}/api/albums`, body)
      handleModalCancel()
      message.success('آلبوم با موفقیت اضافه شد')
    } catch (e) {
      message.error('متاسففانه با خطایی مواجه شدیم، لطفا مجددا تلاش کنید')
    }
  }


  return (
      <Fragment>
        <nav>
          <ul id='top-nav-container'>
            <li>
              <Link href='/'>
                خانه
              </Link>
            </li>
            {!isAuthenticated ? (
                <li>
                  <Link href='/user/login'>
                    ورود
                  </Link>
                </li>

            ) : null}

            {isAuthenticated ? (
                <li>
                  <Link href='/gallery'>
                    گالری
                  </Link>
                </li>
            ) : null}

            {isAuthenticated ? (
                <li>
                  <a>
                    ثبت آلبوم جدید
                  </a>
                </li>
            ) : null}

          </ul>
        </nav>

        <Modal
            visible={isAlbumModalVisible}
            title='افزودن آلبوم جدید'
            className='modal-container'
            okText='ثبت'
            onOk={() => albumForm.submit()}
            onCancel={handleModalCancel}
        >
          <Form
              form={albumForm}
              wrapperCol={{span: 19}}
              labelCol={{span: 5}}
              className='modal-form'
              onFinish={handleAlbumAdd}
          >
            <Form.Item
                name='name'
                label='نام آلبوم'
                rules={[
                  {
                    required: true,
                    message: 'وارد کردن نام آلبوم اجباریست'
                  }
                ]}
            >
              <Input
                  placeholder='نام آلبوم را وارد کنید'
              />
            </Form.Item>
          </Form>
        </Modal>

      </Fragment>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps, null)(TopNav)