import { APP_SHORTNAME } from "@/app/constants"
import { LogoutButton, SettingsButton } from "../buttons/buttons"


function Navigation() {
    return (
        <nav className="flex justify-between items-center w-full shadow-2xl drop-shadow-2xl shadow-zinc-500 bg-neutral-200 rounded-br-2xl">
            <h1 className="font-semibold text-xl h-fit px-2 py-2 align-middle mt-[-0.5em] border-r-2 first-letter:text-blue-800 first-letter:text-2xl last first-letter:italic rounded-br-xl border-transparent shadow-2xl drop-shadow-2xl">{APP_SHORTNAME}</h1>
            <div className="flex h-full align-middle justify-center items-center">
                <SettingsButton />
                <LogoutButton />
            </div>
        </nav>
    )
}

export default Navigation