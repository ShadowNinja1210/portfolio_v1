import Games from "@/components/games";

export default function GamesPage() {
  return (
    <main className="relative bg-black-100 min-h-screen flex justify-start overflow-clip items-center flex-col mx-auto sm:p-10 p-5">
      <div className="max-w-7xl w-full">
        <Games />
      </div>
    </main>
  );
}
