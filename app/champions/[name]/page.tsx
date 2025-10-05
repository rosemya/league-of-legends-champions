import {Abilities} from "@/app/components/Abilities";
import ChampionSkin from "@/app/components/ChampionSkin";

interface Champ {
    id: string;
    name: string;
    title: string;
    skins: {
        name: string;
        num: number;
    }[];
    lore: string;
    tags: string[];
    info: {
        difficulty: number;
    },
    spells: {
        id: string;
        name: string;
        description: string;
        image: {
            full: string;
        }
    }[];
    passive: {
        id: string;
        name: string;
        description: string;
        image: {
            full: string;
        }
    }
}

interface Ability {
    id: string;
    name: string;
    description: string;
    image: {
        full: string;
    }
}

const Champion = async ({params}: { params: Promise<{ name: string }> }) => {
    const { name } = await params;
    const abilities: Ability[] = [];

    // Get ChampionSkin info
    const championInfo: Champ = await fetch(`https://ddragon.leagueoflegends.com/cdn/15.19.1/data/en_US/champion/${name}.json`)
        .then(res => res.json())
        .then(result => result.data[name]);

    // Set the ID of passive
    const passive = championInfo.passive;
    passive.id = "Passive";

    // Add passive to list of abilities
    abilities.push(passive);
    // Add rest of the abilities
    championInfo.spells.map((spell: Ability) => abilities.push(spell));

    const getBorderedDetails = (title: string, detail: string | React.JSX.Element[]) => (
        <div className={"flex flex-col w-30 py-7 border border-[#9F7B2E] items-center justify-center"}>
            <p>{title}</p>
            <div key={'title'} className={"text-[#C79B3B] text-center"}>{detail}</div>
        </div>
    )

    const getRole = () => {
        return championInfo.tags.map(tag => <p key={tag} className={"text-sm"}>{tag}</p>);
    }

    const getDifficulty = (num: number) => {
        if (num < 4) {
            return 'Low';
        }

        return num < 8 ? 'Medium' : 'High';
    }

    return (
        <div  className={"flex lg:h-[85vh] flex-col-reverse lg:flex-row items-center"}>
            {/* Left Section */}
            <div className={"flex flex-col lg:w-2/5 h-full px-15 justify-evenly"}>
                {/* ChampionSkin Title*/}
                <p className={"text-lg text-[#ff00dd] py-5 lg:py-0"}>{championInfo.title.toUpperCase()}</p>
                {/*ChampionSkin Name*/}
                <p className={"text-7xl pb-5 lg:pb-0"}>{name}</p>
                {/* ChampionSkin Lore */}
                <p>{championInfo.lore}</p>
                {/* Details */}
                <div className={"flex gap-10 py-10 md:-py-0"}>
                    {getBorderedDetails("Role:", getRole())}
                    {getBorderedDetails("Difficulty:", getDifficulty(championInfo.info.difficulty))}
                </div>
                {/* Abilities */}
                <div>
                    <p className={"text-2xl pb-8"}>Abilities</p>
                    <Abilities spells={abilities} />
                </div>
            </div>

            {/* Right Section */}
            <div className={"lg:w-3/5"}>
                <ChampionSkin id={championInfo.id} name={championInfo.name} skins={championInfo.skins} />
            </div>
        </div>
    )
}

export default Champion;