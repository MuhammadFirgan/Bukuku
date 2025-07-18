export interface CustomInputProps {
    label?: string
    password?: boolean
    onChangeText: (text: string) => void
    value: string
}

export interface CustomButtonProps {
    text: string
    onPress: () => void
    loading?: boolean
    disable?: boolean
    className?: string
}

export interface ListItemsProps {
    name: string
    price: number
    stock: number
}