import { APP_SHORTNAME } from "@/app/constants";
import { Views } from "../../utils/landing";

type Props = {
    onViewChange: () => void;
    view: Views;
}

function LandingNavigation({ onViewChange, view }: Props) {
    return (
        <nav className="text-zinc-100 flex w-full justify-between bg-slate-600 items-center shadow-2xl drop-shadow-2xl">
            <h1 className="font-semibold text-2xl p-2">
                {APP_SHORTNAME}
            </h1>
            <div className="flex gap-3 text-sm">
                <button onClick={onViewChange} className="border-x p-3 font-semibold">
                    {view === Views.Login ? Views.Register : Views.Login}
                </button>
            </div>
        </nav>
    )
}

export default LandingNavigation