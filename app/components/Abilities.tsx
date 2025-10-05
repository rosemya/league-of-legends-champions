'use client';

import {useState} from "react";
import Image from "next/image";
import parse from 'html-react-parser';

interface Spell {
    id: string;
    name: string;
    description: string;
    image: {
        full: string;
    }
}

const keys = ['Passive', 'Q', 'W', 'E', 'R'];

export const Abilities = ({spells}: {spells: Spell[]}) => {
    const [ability, setAbility] = useState<string>('Passive');

    const getAbilitiesIcons = () => {
        const abilityButtons: React.JSX.Element[] = [];

        spells.map(spell => {
            abilityButtons.push(
                <button key={spell.id} className={ability === spell.id ? "border-2 border-[#FF00DD] cursor-pointer" : "cursor-pointer"} onClick={function () {
                    setAbility(spell.id);
                }}>
                    <Image src={spell.id === 'Passive' ? `https://ddragon.leagueoflegends.com/cdn/15.19.1/img/passive/${spell.image.full}` : `https://ddragon.leagueoflegends.com/cdn/15.19.1/img/spell/${spell.image.full}`}
                           alt={spell.id} width={75} height={75} />
                </button>
            );
        });

        return abilityButtons;
    }

    return (
        <div>
            <div className={"flex justify-between gap-10"}>
                {getAbilitiesIcons()}
            </div>
            {spells.map((spell, i) => (
                ability === spell.id && (
                    <div key={spell.id}>
                        <p className={"py-5 text-xl text-[#FF00DD]"}>{spell.name} <span className={"text-[#596667]"}>({keys[i]})</span></p>
                        <p className={"text-[#596667]"}>{parse(spell.description)}</p>
                    </div>
                )
            ))}
        </div>
    )

}