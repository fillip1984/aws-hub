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
