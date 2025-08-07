import { CreateFundsInput } from "@/types";
import { auth$ } from "../states/authState";
import { funds$, items$ } from "../states/operasionalState";
import { generateId } from "../SupaLegend";

export async function createItems(data: CreateFundsInput) {
  try {
    const barangId = generateId();
    const now = new Date().toISOString();
    const userid = auth$.session.get().user.id;
    if (!userid) {
      console.error('User ID tidak ditemukan');
      return null;
    }

    await items$[barangId].set({
      id: barangId,
      user_id: userid,
      name: data.name,
      price: data.price,
      created_at: now,
      updated_at: now,
    });

    
    return { id: barangId, price: data.price };
  } catch (error) {
    console.error('Error creating item:', error);
    return null;
  }
}

export async function readItems() {
    try {
      const getItems = (await items$.get()) || {};
     
      const itemList = Object.values(getItems);
      itemList.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
     
      return itemList;
    } catch (error) {
      console.error('Error reading items:', error);
      return [];
    }
  }

  export async function updateFunds(fundsValue: string) {
    try {
      const userid = auth$.session.get().user.id;
      if (!userid) {
        console.error('User ID tidak ditemukan');
        return null;
      }
      const fundsId = generateId();
      const now = new Date().toISOString();
      const total = parseFloat(fundsValue) || 0;
  
      // Hapus entri lama untuk user_id
      const existingFunds = (await funds$.get()) || {};
     
      for (const key in existingFunds) {
        if (existingFunds[key].user_id === userid) {
          await funds$[key].delete();
        }
      }
  
      // Simpan entri baru
      await funds$[fundsId].set({
        id: fundsId,
        user_id: userid,
        total: total,
        created_at: now,
      });
      
      return total;
    } catch (error) {
      console.error('Error updating funds:', error);
      return null;
    }
  }

export async function readFunds() {
  try {
    const getFunds = (await funds$.get()) || {};
    const dataFunds = Object.values(getFunds);
    const total = dataFunds.reduce((sum, item) => sum + (item.total || 0), 0);
    return total;
  } catch (error) {
    console.error('Error reading funds:', error);
    return 0;
  }
}