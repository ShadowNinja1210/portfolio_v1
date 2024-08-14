import Extras from "@/components/extras";
import { games } from "@/data";

export default function GamesPage() {
  return (
    <div className=" max-w-screen-xl w-full ">
      <Extras
        link="/apps"
        redirectTo="Practical WebApps"
        data={games}
        heading={["Play your heart out with", "some fun games"]}
      />
    </div>
  );
}
