import Title from "./Title";


export default function Newsletter ()
{
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-2 mb-30">
            <Title title="Never Miss a Deal!" subtitle="Subscribe to get the latest offers, new collections, and exclusive discounts." align="center"/>
            <form className="flex items-center justify-between max-w-2xl w-full ml-3 md:h-13 h-12 mt-10">
                <input
                    className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
                    type="text"
                    placeholder="Enter your email address"
                    required
                />
                <button
                    type="submit"
                    className="
        px-4 sm:px-6 md:px-10  mr-3
        h-full
        text-white
        bg-primary
        hover:bg-primary-dull
        transition-all
        cursor-pointer
        rounded-md
        rounded-l-none
        whitespace-nowrap
    "
                >
                    Subscribe
                </button>
            </form>
        </div>
    )
}
