import ManageAccount from "../Pages/ManageAccount";
import AccountCreate from "../Pages/AccountCreate";
import FaqButton from "./FAQButton";
import { useState } from "react";

const UserFAQ = () => {
  const [selectedPage, setSelectedPage] = useState(1);

  return (
    <div className="laptop:grid laptop:grid-cols-3 laptop:gap-x-16 tablet:max-w-[90vmin] tablet:mx-auto">
      <div className="col-span-1">
        <div className="flex flex-col">
          <FaqButton
            active={selectedPage == 1}
            text="Cum creez cont"
            setSelectedPage={setSelectedPage}
            selectedPage={1}
          />
          <FaqButton
            active={selectedPage == 2}
            text="Administrarea contului"
            setSelectedPage={setSelectedPage}
            selectedPage={2}
          />
        </div>
      </div>
      <div className="col-span-2">
        {selectedPage == 1 && <AccountCreate />}
        {selectedPage == 2 && <ManageAccount />}
      </div>
    </div>
  );
};

export default UserFAQ;
