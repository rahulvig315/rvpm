
type Props = {}

const gridItems = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
]

export type ProjectProps = {
  projects: number[]
} 
function Projects({ projects = gridItems }: ProjectProps) {
  return (
    <div className="flex flex-col justify-center h-full max-h-full min-w-full overflow-hidden">
      <header className="fixed top-0 w-full p-4 text-center shadow-2xl bg-blue-900/90 h-fit drop-shadow-2xl rounded-t-xl">
        <h1 className="text-xl font-thin tracking-tight text-white md:text-3xl xl:text-6xl">
          Projects
        </h1></header>
      <section className="relative grid w-full grid-cols-1 gap-5 p-5 pb-24 overflow-y-auto top-16 h-fit sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8">
        {projects.map(item => (<div className="flex items-center justify-center h-32 text-center align-middle border border-black min-w-32 rounded-xl" key={item}>Project {item}</div>))}
      </section>
    </div>
  )
}

export default Projects