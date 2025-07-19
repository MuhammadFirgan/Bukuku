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

export interface ModalTrigger {
    visible: boolean
    onClose: () => void
}

export interface ModalLayoutProps extends ModalTrigger {
    headerTitle?: string
    buttonLabel?: string
    children: React.ReactNode
    
}