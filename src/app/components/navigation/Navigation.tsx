import { LogoutButton, SettingsButton } from "../buttons/buttons"


function Navigation() {
    return (
        <nav className="flex justify-between items-center bg-slate-200 p-3 w-full  shadow-2xl drop-shadow-2xl">
            <h1 className="font-bold text-2xl">RVPM</h1>
            <div className="flex gap-3">
                <SettingsButton />
                <LogoutButton />
            </div>
        </nav>
    )
}

export default Navigation