import React from "react";
// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const TopSearch = () => {
  return (
    <div>
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-slate-100 flex justify-between p-4 items-center">
          <input
            type="text"
            placeholder="Search..."
            className="border p-2 rounded w-1/3"
          />
      
          <div className="flex items-center gap-4">
          
            <button className="bg-gray-200 p-2 rounded-full"><img src="./Help.png" alt="" /></button>
            <button className="bg-gray-200 p-2 rounded-full"><img src="./message.png" alt="" /></button>
            <button className="bg-gray-200 p-2 rounded-full"><img src="./settings.png" alt="" /></button>
            <button className="bg-gray-200 p-2 rounded-full"><img src="./Notification.png" alt="" /></button>
            <button className="bg-gray-200 p-2 rounded-full"><img src="./User.png" alt="" /></button>
            

            
            <div className="flex items-center gap-2">
              
              <span className="bg-green-500 w-3 h-3 rounded-full"></span>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default TopSearch;
