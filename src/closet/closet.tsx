import 옷장 from '../assets/Closet.svg?react'
import Arrow from '../assets/Arrow.svg?react'
import Woman1 from '../assets/Woman1.svg?react'
import DressBtn from '../assets/DressBtn.svg?react'
import CancelBtn from '../assets/CancelBtn.svg?react'
import './closet.css'

export default function Closet() {
    return (
        <div className="flex flex-col items-center justify-start w-full h-full">
            <div className="flex flex-row mt-14 mb-14 gap-14">
                <Arrow className=""></Arrow>
                <옷장></옷장>
            </div>
            <Woman1></Woman1>   
            <div className="flex flex-row gap-12 mt-16">
                <DressBtn></DressBtn>
                <CancelBtn></CancelBtn>
            </div>      
            <div className="closet">

            </div>
        </div>   
    )
}



