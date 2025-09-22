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
    id?: string
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

export type StockLog = {
    barang_id: string
    type: 'in' | 'out'
    amount: number
    created_at?: string
  }

export type HistoryItem = {
    id: string;
    nama_barang: string;
    barang_id: string
    amount: number;
    harga_jual: number;
    subtotal: number;
}

export type Barang = {
    id: string;
  user_id?: string;
  nama_barang: string;
  harga_beli: number;
  harga_jual: number;
  keuntungan?: number;
  quantity: number;
  reset_date?: number;
  created_at?: string;
  updated_at?: string;
  };

  export interface CreateBarangInput {
    nama_barang: string;
    harga_beli: number;
    harga_jual: number;
    quantity: number;
  }

  export interface CreateFundsInput {
    name: string
    price: number
  }

  export interface CreateAssetForm {
    keterangan: string;
    nominal: number;
    kategori: string;
    tanggal?: string;
  }
 