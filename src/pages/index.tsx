import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const { data: exampleData } = api.example.getAll.useQuery();

  return (
    <>
      <Head>
        <title>illizen - hub</title>
        <meta name="description" content="Hub for illizen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-white">
        <div className="flex flex-col items-center justify-center gap-4 px-4 py-16">
          <h2>Welcome to illizen...</h2>

          <div>
            <h3>Apps</h3>
            <div className="my-4 flex flex-wrap gap-2">
              <Link
                href="https://ex-nihilo.illizen.com"
                className="min-h-[210px] min-w-[400px] cursor-pointer rounded-lg border border-white/40 p-4">
                <h4>ex-nihilo</h4>
                <p className="mt-2">
                  Agenda, time tracking, habit forming, productivity tool
                  (mobile UI)
                </p>
              </Link>
            </div>
          </div>

          <p>I&apos;ll be using this site to play around with aws</p>

          <h3>{hello.data ? hello.data.greeting : "Loading tRPC query..."}</h3>

          <div>
            <h3>Data back from the db</h3>
            <div className="flex flex-col items-center">
              {exampleData?.map((data) => (
                <span key={data.id}>{data.id}</span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
