import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

const NewCard = ({
  id,
  title,
  description,
  img,
  link,
}: {
  id: number;
  title: string;
  description: string;
  img: string;
  link: string;
}) => {
  return (
    <CardContainer className="inter-var py-0 sm:max-w-full max-w-80  " key={id}>
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-80 sm:w-96 h-auto rounded-xl p-6 border  ">
        <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
          {title}
        </CardItem>
        <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
          {description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={img}
            height="1000"
            width="1000"
            className="h-36 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-4">
          <CardItem
            translateZ={20}
            href={link}
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Try the game →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Play
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default function Extras({
  data,
  heading,
  link,
  redirectTo,
}: {
  data: any[];
  heading: [string, string];
  link: string;
  redirectTo: string;
}) {
  return (
    <>
      {/* Header */}
      <div className="flex flex-col justify-center relative my-14 z-10">
        <div className="text-center text-[34px] font-bold tracking-wide md:text-4xl lg:text-6xl flex flex-col sm:gap-3 gap-0 ">
          <h1>{heading[0]}</h1>
          <h1 className="text-purple">{heading[1]}</h1>
          <Link className=" mt-4" href={link}>
            <p className=" text-lg font-medium">
              <span className=" text-purple flex items-center gap-1 justify-center underline underline-offset-2">
                {redirectTo} <FaExternalLinkAlt />
              </span>
            </p>
          </Link>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8">
        {data.map((game) => (
          <NewCard key={game.id} {...game} />
        ))}
      </div>
    </>
  );
}
