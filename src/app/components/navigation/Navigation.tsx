import { APP_SHORTNAME } from "@/app/constants";

export type NavigationProps = {
    navClass?: string;
    title?: string | React.ReactNode;
    titleClass?: string;
    children: React.ReactNode;

}

function Navigation({ title = APP_SHORTNAME, titleClass = "font-semibold text-xl h-fit px-2 py-2.5 align-middle  border-r-2 first-letter:text-blue-800 first-letter:text-2xl first-letter:italic rounded-br-xl border-transparent shadow-inner drop-shadow-2xl", navClass = "flex items-center justify-between w-full shadow-2xl drop-shadow-2xl shadow-zinc-500 bg-neutral-200 rounded-br-2xl text-black", children }: NavigationProps) {
    return (
        <nav className={navClass}>
            <h1 className={titleClass}>
                {APP_SHORTNAME}
            </h1>
            <div className="flex items-center justify-center h-full align-middle">
                {children}
            </div>
        </nav>
    )
}

export default Navigation