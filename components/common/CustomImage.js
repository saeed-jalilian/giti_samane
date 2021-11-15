import Image from 'next/image'

const CustomImage = (props) => {
  return (
      <Image
          src={props.src}
          width={props.width}
          height={props.height}
          alt={props.alt}
          layout={props.layout}
          unoptimized={true}
          {...props}
      />
  )
}


export default CustomImage;