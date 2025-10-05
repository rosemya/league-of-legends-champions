'use client';

import {useState} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";
import { Tooltip } from 'react-tooltip';

const ChampionSkin = ({id, name, skins}: {id: string, name: string, skins: {name: string, num: number}[]}) => {
    const [currentSkin, setCurrentSkin] = useState<string>(`default`);
    const [currentSkinId, setCurrentSkinId] = useState<string>(`${id}_0`);
    const router = useRouter();

    return (
        <div className={"flex flex-col"}>
            {/* Back Button */}
            <button className={"text-right pr-5 text-[#596667] cursor-pointer"} onClick={() => router.back()}>Go Back</button>
            {/* Champion Image */}
            <Image key={currentSkinId} src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${currentSkinId}.jpg`} alt={name} width={1075} height={250}  />
            {/* Champion Skin Text */}
            <p className={"pr-10 text-2xl text-right text-[#FF00DD]  hidden lg:block"}>{currentSkin === 'default' ? `Default ${name}` : currentSkin}</p>

            <div className={"hidden lg:block"}>
                <p className={"text-2xl pb-5"}>Skins</p>

                <div className={"flex gap-7 flex-wrap"}>
                    {skins.map(skin => {
                        // Champion id + skin number
                        const i = `${id}_${skin.num}`;

                        return (
                            // Skin Icon
                            <button key={i} className={currentSkin === skin.name ? "border-2 border-[#FF00DD] cursor-pointer" : "cursor-pointer"}
                                    onClick={() => {
                                        setCurrentSkin(skin.name);
                                        setCurrentSkinId(i);
                                    }}>
                                <Image className={`champ-skin-${skin.num}`} src={`https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${id}_${skin.num}.jpg`} alt={skin.name} width={45} height={45}/>
                                <Tooltip anchorSelect={`.champ-skin-${skin.num}`}>{skin.name}</Tooltip>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ChampionSkin;