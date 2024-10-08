import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "./Loader";
import { ENDPOINT } from "../data";

interface IHomeProps {
    user: any;
    point: number;
    totalPoint: number;
    setTotalPoint: (status: number) => void;
    handleFarming: () => void;
    start: boolean;
    claimShow: boolean;
    setClaimShow: (status: boolean) => void;
    hour: number;
    min: number;
    sec: number;
    loading: boolean;
}
const Play: React.FC<IHomeProps> = ({ user, point, totalPoint, setTotalPoint, handleFarming, start, claimShow, setClaimShow, hour, min, sec, loading }) => {

    const handleClaim = () => {
        if (user) {
            //tg message
            let newPoints = totalPoint + point;
            if (newPoints >= 1000000) {
                newPoints = 1000000;
                toast.success("Mining limit has been reached!");
            }
            setTotalPoint(newPoints);
            setClaimShow(false);
            const data = {
                points: point,
            };
            axios.put(`${ENDPOINT}/api/user/${user?.id}`, data)
                .then(response => {
                })
                .catch(error => {
                    console.error('Error occurred during PUT request:', error);
                });
        }
    }
    return (
        <div className="h-screen flex flex-col text-center items-center justify-between py-8 pb-[90px]">
            <div className="flex flex-col items-center justify-center gap-2">
                <img className="logo h-[120px] w-[120px] rounded-full" src="/logo.png" alt="logo" />
                <h3 className="text-[28px] opacity-80 text-black">{user?.first_name} {user?.last_name}</h3>
            </div>
            <div className="flex flex-col balance gap-2 pt-2 text-black">
                <div className="flex flex-row items-center justify-center gap-3">
                    {/* <FontAwesomeIcon className='cursor-pointer hover:text-graydark hover:opacity-70 transition-all duration-700 text-[#36b5dd]' icon={faWallet} /> */}
                    <h4 className="text-[20px] font-extrabold">🦴BALANCES</h4>
                </div>
                {
                    loading ? (
                        <Loader width="15" />
                    ) : (
                        <h1 className="text-[48px]">{totalPoint.toFixed(3)}</h1>
                    )
                }
                <h3 className="text-[20px]">POINTS</h3>
            </div>
            {
                !start ? (

                    claimShow ? (
                        <button onClick={handleClaim} className="startBtn bg-white py-2 px-4">Claim</button>
                    ) : (
                        <button onClick={handleFarming} className="startBtn bg-white py-2 px-4">WOOF</button>
                    )
                ) : (
                    <div className="w-full space-y-3">
                        <div className="customCard flex flex-row w-full justify-between items-center">
                            <img src="/pick.svg" alt="pick-icon" className="h-[30px] w-[30px] rotate-45" />
                            {
                                loading ? (
                                    <Loader width="15" />
                                ) : (
                                    <h4 className="text-[24px]" style={{ color: "#fcc603" }}>{point.toFixed(3)}</h4>
                                )
                            }
                        </div>
                        <div className="customCard flex flex-row w-full justify-between items-center">
                            <h2 className="text-[24px]">Earning</h2>
                            <section className="flex flex-row gap-4">
                                {
                                    loading ? (
                                        <>
                                            <div className="flex flex-col text-center">
                                                <Loader width="15" />
                                                <h4 className="text-[12px]">Hours</h4>
                                            </div>
                                            <div className="flex flex-col text-center">
                                                <Loader width="15" />
                                                <h4 className="text-[12px]">Mins</h4>
                                            </div>
                                            <div className="flex flex-col text-center">
                                                <Loader width="15" />
                                                <h4 className="text-[12px]">Secs</h4>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex flex-col text-center">
                                                <h3 className="text-[24px]">{hour}</h3>
                                                <h4 className="text-[12px]">Hours</h4>
                                            </div>
                                            <div className="flex flex-col text-center">
                                                <h3 className="text-[24px]">{min}</h3>
                                                <h4 className="text-[12px]">Mins</h4>
                                            </div>
                                            <div className="flex flex-col text-center">
                                                <h3 className="text-[24px]">{sec}</h3>
                                                <h4 className="text-[12px]">Secs</h4>
                                            </div>
                                        </>
                                    )
                                }

                            </section>
                        </div >
                    </div>
                )
            }
        </div >
    )
}

export default Play;