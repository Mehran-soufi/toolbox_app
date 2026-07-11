import { Search } from "lucide-react"

function HeroSearch() {
  return (
          <div className="w-full p-2">
          <div
            className="
      w-11/12 p-2 py-2
      rounded-xl gap-x-2
      flex items-center justify-between
      isolate
      bg-white/20 dark:bg-neutral-900/30
      shadow-lg
      ring-1 ring-black/5 dark:ring-white/10
      backdrop-blur-lg
      transition-all duration-200
      hover:bg-white/30 dark:hover:bg-black/40
      focus-within:ring-2 focus-within:ring-purple-500/60 dark:focus-within:ring-purple-500/60
    "
          >
            {/* Icon */}
            <div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
              <Search />
            </div>

            {/* Input */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="جستجو ابزار مورد نظر..."
                className="
          w-full
          bg-transparent
          border-none
          outline-none
          text-gray-800 dark:text-gray-100
          placeholder:text-gray-500 dark:placeholder:text-gray-400
        "
              />
            </div>
          </div>
        </div>
  )
}

export default HeroSearch