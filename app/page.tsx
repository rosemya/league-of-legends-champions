'use client';

import {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";

interface Champ {
    id: string;
    name: string;
    tags: string[];
    image: string;
}

const roles = [
    "Assassin",
    "Fighter",
    "Mage",
    "Marksman",
    "Support",
    "Tank"
]


export default function Home() {
    const [champions, setChampions] = useState<Champ[]>([]);
    const [currentChampions, setCurrentChampions] = useState<Champ[]>([]);
    const [currentRole, setRole] = useState<string>("");

    const getAllChampions = () => {
        const champs: Champ[] = [];

        fetch("https://ddragon.leagueoflegends.com/cdn/15.19.1/data/en_US/champion.json")
            .then(response => response.json())
            .then(result => {
                const data = result.data;

                for (const i in data) {
                    const c = data[i];

                    const champ: Champ = {
                        id: c.id,
                        name: c.name,
                        tags: c.tags,
                        image: c.image.full,
                    }

                    champs.push(champ);
                }

                setChampions(champs);
                setCurrentChampions(champs);
            });
    }

    const getChampionsByName = (name: string) => {
        const champs: Champ[] = [];

        for (const i in champions) {
            if (champions[i].name.toLowerCase().includes(name.toLowerCase())) {
                champs.push(champions[i]);
            }
        }

        setCurrentChampions(champs);
    }

    const getChampionsByRole = (role: string) => {
        if (currentRole === role) {
            setRole("");
            return setCurrentChampions(champions);
        }

        const champs: Champ[] = [];
        setRole(role);

        for (const i in champions) {
            const champ: Champ = champions[i];
            if (champ.tags.includes(role)) {
                champs.push(champ);
            }
        }

        setCurrentChampions(champs);
    }

    useEffect(() => {
        getAllChampions();
    }, []);

  return (
      <main className="flex flex-col px-15 pt-10">
          {/* Heading */}
          <div className={"flex justify-between flex-col md:flex-row"}>
              <h1 className={"text-5xl text-center md:text-left"}>Champions</h1>

              <div className={"flex items-center gap-7 flex-col xl:flex-row"}>
                  {/* Search Bar */}
                  <input name={"search"} placeholder={"Enter Champions Name"} onChange={e => getChampionsByName(e.target.value)} className={"border border-gray-600 rounded-full px-7 py-2 focus:outline-none focus:border-[#9F7B2E] mt-5 md:mt-0"} />

                  {/* Checkboxes */}
                  <div className={"gap-5 hidden lg:flex"}>
                      {roles.map((role) => (
                          <label key={role} className={"cursor-pointer"}><input type={"checkbox"} checked={currentRole === role} value={role} onChange={e => getChampionsByRole(e.target.value)} className={"appearance-none cursor-pointer w-4 h-4 mr-2 border border-gray-500 rounded checked:bg-[#9F7B2E] checked:border-[#C79B3B]"} />{role}</label>
                      ))}
                  </div>
              </div>
          </div>

          {/* Champions */}
          <div className={"flex flex-wrap gap-10 pt-10"}>
              {currentChampions.map((champ: Champ) => (
                  // Link to ChampionSkin page
                  <Link key={champ.id} href={`/champions/${champ.id}`} className={"flex flex-col items-center px-5 py-5 gap-2 hover:drop-shadow-2xl hover:drop-shadow-gray-400/70"}>
                      {/* Get current image of ChampionSkin */}
                      <Image src={`https://ddragon.leagueoflegends.com/cdn/15.19.1/img/champion/${champ.image}`} alt={champ.name} width={150} height={150} />
                      <p>{champ.name}</p>
                  </Link>
              ))}
          </div>
      </main>
  );
}
