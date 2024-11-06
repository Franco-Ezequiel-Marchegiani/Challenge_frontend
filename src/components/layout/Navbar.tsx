"use client"
import Link from "next/link";

const Navbar = () => {

    return <>
        <header className="w-full">
          <nav className=" flex items-center justify-between w-full bg-blue-500 text-white p-2 mb-2">
            <Link href='/'>
                <div className="px-4 py-1">
                    Country
                </div>
            </Link>
              <div className="mr-4">
                  <Link href='/country_list' className="mr-4">Countries</Link>
              </div>
            
          </nav>
        </header>
    </>
}
export default Navbar;