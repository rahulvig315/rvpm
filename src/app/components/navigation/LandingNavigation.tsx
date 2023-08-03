import { Views } from "../../utils/landing";
import Navigation from "./Navigation";

type Props = {
    onViewChange: () => void;
    view: Views;
}

function LandingNavigation({ onViewChange, view }: Props) {
    return (
        <Navigation>
            <button onClick={onViewChange} className="p-3 font-semibold border-x">
                {view === Views.Login ? Views.Register : Views.Login}
            </button>
        </Navigation>

    )
}

export default LandingNavigation