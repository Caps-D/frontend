import Woman1 from '../assets/Woman1.svg?react'
import PurchaseBtn from '../assets/PurchaseBtn.svg?react'
import CancelBtn from '../assets/CancelBtn.svg?react'
import './shop.css'

export default function Shop() {
    return (
        <div className="flex flex-col items-center justify-start w-full h-full">
            <Woman1></Woman1>
            <div className="flex flex-row gap-12 mt-16">
                <PurchaseBtn></PurchaseBtn>
                <CancelBtn></CancelBtn>
            </div>
            
        </div>   
    )
}