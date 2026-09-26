
type Props = {
    title: string;
    subtitle: string;
    align: 'left' | 'center' | 'right';
}


export default function Title ({title, subtitle, align}: Props)
{
    return (
        <div className={`flex flex-col items-center text-center ${align ==="left" && "md:items-start md:text-left"}`}>
            <h1 className="sm:text-4xl text-3xl font-semibold md:text-[40px]">{ title }</h1>
            <p className="text-gray-500/90 max-w-156 px-5.5 mt-2 text-sm md:text-base">{ subtitle }</p>
        </div>
    )
}
