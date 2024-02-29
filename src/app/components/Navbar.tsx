import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="fixed top-0 z-10 flex w-full items-center justify-between px-4 py-4 xs:px-6">
      <div className="flex flex-row items-end gap-2">
        <Link href={"/"}>
          <h1 className="gray-shadow text-2xl font-bold tracking-tighter text-black xs:text-4xl">
            Zara
          </h1>
        </Link>
      </div>
      <div className="flex flex-row gap-4 font-medium text-black "></div>
    </nav>
  );
}
