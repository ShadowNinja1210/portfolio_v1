import Extras from "@/components/extras";
import { apps } from "@/data";

export default function AppsPage() {
  return (
    <div className=" max-w-screen-xl w-full">
      <Extras
        link="/games"
        redirectTo="Fun Games"
        data={apps}
        heading={["Discover Practical Solutions", "with our Web Apps"]}
      />
    </div>
  );
}
