import Link from "next/link";
import Image from "next/image";

export const NavBar = () => (
    <header className={"flex items-center justify-center md:justify-between px-15 py-7"}>
        {/* Logo */}
        <Link href={"/"} className={"cursor-pointer"}>
            <Image src={"/League_of_Legends_Logo.png"} alt={"League of Legends Logo"} width={175} height={200} />
        </Link>

        {/* League of Legends Website Link */}
        <a href={"https://www.leagueoflegends.com/en-us/"} target={"_blank"} className={"hidden md:block bg-[#C79B3B] hover:bg-[#9F7B2E] hover:transition-colors duration-300 px-7 py-2 -skew-x-12"}>
            {/* To avoid text being skewed */}
            <span className={"block skew-x-12 text-2xl"}>Play Now</span>
        </a>
    </header>
)