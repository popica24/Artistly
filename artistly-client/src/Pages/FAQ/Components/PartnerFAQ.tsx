import { useState } from "react";
import FaqButton from "./FAQButton";
import AboutPartner from "../Pages/AboutPartner";
import CreatePartner from "../Pages/CreatePartner";
import CreatePage from "../Pages/CreatePage";

const PartnerFAQ = () => {
  const [selectedPage, setSelectedPage] = useState(1);

  return (
    <div className="laptop:grid laptop:grid-cols-3 laptop:gap-x-16 tablet:max-w-[90vmin] tablet:mx-auto">
      <div className="col-span-1">
        <div className="flex flex-col">
          <FaqButton
            active={selectedPage == 1}
            text="Ce este un partener"
            setSelectedPage={setSelectedPage}
            selectedPage={1}
          />
          <FaqButton
            active={selectedPage == 2}
            text="Cum creez un cont de partener"
            setSelectedPage={setSelectedPage}
            selectedPage={2}
          />
          <FaqButton
            active={selectedPage == 3}
            text="Cum creez o pagină"
            setSelectedPage={setSelectedPage}
            selectedPage={3}
          />
          <FaqButton
            active={selectedPage == 4}
            text="Promovare"
            setSelectedPage={setSelectedPage}
            selectedPage={4}
          />
        </div>
      </div>
      <div className="col-span-2">
        {selectedPage == 1 && <AboutPartner />}
        {selectedPage == 2 && <CreatePartner />}
        {selectedPage == 3 && <CreatePage />}
      </div>
    </div>
  );
};

export default PartnerFAQ;
