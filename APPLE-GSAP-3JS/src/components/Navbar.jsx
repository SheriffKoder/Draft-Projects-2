import React from "react"
import { appleImg, bagImg, searchImg } from "../utils"
import { navLists } from "../constants"


//external css screen-max-width

const Navbar = () => {
  return (
    <header className="w-full py-5 sm:px-10 px-5 
    flex justify-between items-center
    ">
    
        <nav className="flex w-full screen-max-width">

            {/* Nav logo */}
            <img src={appleImg} alt="Apple logo" width={14} height={18} />

            {/* Nav Links */}
            <div className="flex flex-1 justify-center max-sm:hidden">
                {navLists.map((nav,i) => {
                    return (
                    <div key={"Nav Link"+" "+nav} 
                    className="px-5 text-sm cursor-pointer text-gray hover:text-white
                    transition-all">
                        {nav}
                    </div>
                    )
                })}
            </div>

            <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
                {/* Search Logo */}
                <div>
                    <img src={searchImg} alt="search logo" width={18} height={18}/>
                </div>
                {/* Back Logo */}
                <div>
                    <img src={bagImg} alt="back logo" width={18} height={18}/>
                </div>
            </div>

        </nav>
    </header>
  )
}

export default Navbar