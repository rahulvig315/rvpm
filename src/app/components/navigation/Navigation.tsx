import { APP_SHORTNAME } from "@/app/constants";

export type NavigationProps = {
    navClass?: string;
    title?: string | React.ReactNode;
    titleClass?: string;
    children: React.ReactNode;

}

function Navigation({ title = APP_SHORTNAME || 'APP_NAME', titleClass = "title", navClass = "nav", children }: NavigationProps) {
    return (
        <nav className={navClass}>
            <h1 className={titleClass}>
                {title}
            </h1>
            <div className="flex items-center justify-center h-full align-middle">
                {children}
            </div>
        </nav>
    )
}

export default Navigation