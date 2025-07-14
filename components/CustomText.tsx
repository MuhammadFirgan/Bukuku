import { Text, TextProps } from 'react-native'
import { ReactNode } from 'react'

interface CustomTextProps extends TextProps {
  children: ReactNode
  weight?: 'regular' | 'semibold' 
}

export default function CustomText({ children, style, weight = 'regular', ...rest }: CustomTextProps) {
  const fontFamily = weight === 'semibold' ? 'poppins-sb' : 'poppins-md'

  return (
    <Text {...rest} style={[{ fontFamily }, style]}>
      {children}
    </Text>
  )
}
