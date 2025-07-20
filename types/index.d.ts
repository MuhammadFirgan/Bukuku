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
    id: any
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

export interface PersediaanForm {
    nama_barang: string;
    harga_jual: number;
    harga_beli: number;
    keuntungan: number;
    quantity?: number;
    reset_date?: number;
}