import React from "react";

const Header = ({Admin}) => {
    return(
        <div>
            <div className="flex bg-blue-600 justify-between items-center p-3 text-white">
                <h2 className="text-2xl font-bold">Selamat Datang</h2>
                <div className="border border-blue-600 p-3 rounded-xl">
                    <p className="">Hanep</p>
                </div>

            </div>
        </div>
    )
}

export default Header;