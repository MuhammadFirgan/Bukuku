export interface CustomInputProps {
    label: string
    password: boolean
    onChangeText: (text: string) => void
    value: string
}

export interface CustomButtonProps {
    text: string
    onPress: () => void
}