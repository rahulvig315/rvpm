import { LogoutButton, SettingsButton } from "../buttons/buttons"
import Navigation from "./Navigation"


function DashboardNavigation() {
    return (
        <Navigation>
            <SettingsButton />
            <LogoutButton />
        </Navigation>
    )
}

export default DashboardNavigation