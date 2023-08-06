import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const apps = [
    {
      name: "ex-nihilo",
      description:
        "Agenda, time tracking, habit forming, productivity tool (mobile UI)",
      url: "https://ex-nihilo.illizen.com",
    },
    {
      name: "inveniam",
      description: "Kanban productivity tool",
      url: "https://inveniam.illizen.com",
    },
    {
      name: "wibi",
      description: "Budgeting tool",
      url: "https://wibi.illizen.com",
    },
    {
      name: "desidero",
      description: "Tool to define and track goals",
      url: "https://desidero.illizen.com",
    },
  ];

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
              {apps.map((app) => (
                <Link
                  key={app.name}
                  href={app.url}
                  className="h-[210px] w-[400px] cursor-pointer rounded-lg border border-white/40 p-4">
                  <h4>{app.name}</h4>
                  <p className="mt-2">{app.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
