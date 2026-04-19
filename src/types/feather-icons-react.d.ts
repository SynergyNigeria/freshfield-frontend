declare module 'feather-icons-react/build/IconComponents/*' {
  import { FC, SVGAttributes } from 'react'
  const Icon: FC<SVGAttributes<SVGElement> & { size?: number | string; color?: string }>
  export default Icon
}
