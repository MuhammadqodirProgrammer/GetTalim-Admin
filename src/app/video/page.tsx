import Link from "next/link";

export default function Page() {
  return (
    <main className="p-24">
      <Link href="/" className="text-red-900 block">
        {" "}
        Home
      </Link>

      <h1 className="text-center"> video page </h1>
    </main>
  );
}
