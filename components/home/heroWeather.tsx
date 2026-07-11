import { Snowflake } from "lucide-react"

function HeroWeather() {
  return (
              <div className="w-full flex flex-col gap-y-0.5 px-2">
                  <div className="flex items-center justify-end">
                    <p>تهران</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-0.5 items-center justify-center">
                      <p className="text-3xl font-bold">۲۸°</p>
                      <span>صاف</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Snowflake size={40} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-x-1.5 text-sm">
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <p>کمینه:</p>
                      <p>۲۲°</p>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <p>بیشینه:</p>
                      <p>۲۲°</p>
                    </div>
                  </div>
                </div>
  )
}

export default HeroWeather