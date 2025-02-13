import Arrow from '../assets/Arrow.svg?react'
import 상점 from '../assets/Shop.svg?react'
import Woman1 from '../assets/Woman1.svg?react'
import PurchaseBtn from '../assets/PurchaseBtn.svg?react'
import CancelBtn from '../assets/CancelBtn.svg?react'
import './shop.css'

export default function Shop() {
    return (
        <div className="flex flex-col items-center justify-start w-full h-full">
            <div className="flex flex-row mt-14 mb-14 gap-14">
                <Arrow className=""></Arrow>
                <상점></상점>
            </div>
            <Woman1></Woman1>
            
            <div className="flex flex-row gap-12 mt-16">
                <PurchaseBtn></PurchaseBtn>
                <CancelBtn></CancelBtn>
            </div>
            
        </div>   
    )
}