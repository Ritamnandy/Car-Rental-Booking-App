

type TitleProps = {
    title: string;
    subtitle:string
}

export default function Title({ title,subtitle }: TitleProps) {
  return (
    <>
      <h1 className="font-medium text-3xl">{title}</h1>
      <p className="text-gray-500/90 text-sm md:text-base mt-2 max-w-156">{subtitle}</p>
    </>
  )
}
