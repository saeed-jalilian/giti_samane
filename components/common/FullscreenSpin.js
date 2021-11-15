import {Spin} from "antd";


const FullscreenSpin = () => {
  return (
      <Spin
          size='large'
          style={{
            display: 'flex',
            alignItems: "center",
            justifyContent: 'center',
            height: '95vh'
          }}
      />
  )
}

export default FullscreenSpin