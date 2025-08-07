import { auth$ } from "../states/authState";
import { funds$ } from "../states/operasionalState"
import { generateId } from "../SupaLegend";

export function updateFunds(fundsValue: string) {
    try {
      const userid = auth$.session.get().user.id;
      if (!userid) {
        console.error('User ID tidak ditemukan');
        return null;
      }
      const fundsId = generateId();
      const now = new Date().toISOString();
      const total = parseFloat(fundsValue) || 0; // Konversi ke number
  
      // @ts-ignore
      funds$[fundsId].set({
        id: fundsId,
        user_id: userid,
        total: total, // Simpan sebagai number
        created_at: now,
      });
      console.log('Funds updated:', { id: fundsId, user_id: userid, total, created_at: now });
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