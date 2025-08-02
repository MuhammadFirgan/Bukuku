import { auth$ } from "../states/authState";
import { funds$ } from "../states/operasionalState"
import { generateId } from "../SupaLegend";

export function updateFunds() {
    const userid = auth$.session.get().user.id
    if(userid) return null
    const fundsId = generateId(); 
    const now = new Date().toISOString();

    // @ts-ignore
    funds$[fundsId].set({
        id: fundsId, 
        user_id: userid,
        total: 0,
        created_at: now

    })
}

export function readFunds() {
    try {
        const getFunds = funds$.get() || {}
        const dataFunds = Object.entries(getFunds)
            .filter(([_, item]: any) => console.log(item))
        return dataFunds
    } catch (error) {
        console.error(error)
    }
}