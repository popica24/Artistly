import { CSSProperties, FC, useState } from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  text: string;
  hover: boolean;
};

const HowDoICreateAccount = () => {
  return (
    <div className="flex flex-col text-[13px]">
      <span>
        Crearea unui cont pe platforma noastră este un proces simplu, rapid și
        gratuit care îți deschide accesul la o gamă largă de artiști, fotografi,
        videografi, locații și resurse pentru evenimentul tău. Iată pașii pe
        care trebuie să îi urmezi:
      </span>

      <ul className="list-disc list-inside py-1">
        <li className="font-medium">Accesează Pagina Creează Cont</li>
        <li>
          În partea de sus a paginii noastre principale, vei găsi un buton
          „Creează cont”. Fă click pe acesta pentru a începe procesul de creare
          a contului...{" "}
          <Link className="text-[#07C]" to={"/faq"}>
            mai mult
          </Link>
        </li>
      </ul>
    </div>
  );
};
const HowDoIBecomePartner = () => {
  return (
    <div className="flex flex-col text-[13px]">
      <span>
        Crearea unui cont pe platforma noastră este un proces simplu, rapid și
        gratuit.
      </span>

      <ul className="list-disc list-inside py-1">
        <li className="font-medium">Accesează Solicita cont partener</li>
        <li>
          În partea de sus a paginii noastre principale, vei găsi un buton
          „Solicită cont partener”. Fă click pe acesta pentru a începe procesul
          de creare a contului de partener...
          <Link className="text-[#07C]" to={"/faq"}>
            mai mult
          </Link>
        </li>
      </ul>
    </div>
  );
};
const HowDoICreatePage = () => {
  return (
    <span className="text-[13px]">
      După înregistrarea sau aprobarea contului tău (în cazul în care aveai deja
      un cont asociat cu adresa de email folosită pentru formularul de creare a
      contului de partener), vei avea acces la secțiunea{" "}
      <strong>"Contul Meu"</strong>, unde găsești opțiunea "Pagini". Aici ai
      posibilitatea de a-ți crea propria pagină, care va fi accesibilă
      utilizatorilor platformei. Procesul de creare a unei pagini este complet
      gratuit. Pentru a începe, urmează pașii indicați pentru crearea paginii...
      <Link className="text-[#07C]" to={"/faq"}>
        mai mult
      </Link>
    </span>
  );
};
const PaymentMethods = () => {
  return (
    <div className="flex flex-col text-[13px]">
      <span>
        Pentru a asigura o experiență de plată sigură și convenabilă, platforma
        noastră utilizează Stripe, unul dintre cei mai recunoscuți și de
        încredere furnizori de servicii de plată. Acceptăm următoarele metode de
        plată
      </span>

      <ul className="list-disc list-inside py-1">
        <li className="font-medium">Carduri de Credit și Debit</li>
        <li>
          Poți plăti cu majoritatea cardurilor de credit și debit, incluzând
          Visa, MasterCard, American Express, și altele...
          <Link className="text-[#07C]" to={"/faq"}>
            mai mult
          </Link>
        </li>
      </ul>
    </div>
  );
};
const PremiumBenefits = () => {
  return (
    <div className="flex flex-col text-[13px]">
      <span>
        Abonamentul premium pe platforma noastră îți deschide ușa către o serie
        de avantaje exclusive, concepute pentru a-ți oferi accesul complet la
        toate resursele necesare pentru organizarea evenimentului perfect.
      </span>

      <ul className="list-disc list-inside py-1">
        <li className="font-medium">Acces la Liste de Prețuri</li>
        <li>
          Ca membru premium, vei avea acces neîngrădit la listele detaliate de
          prețuri ale tuturor artiștilor. Acest lucru îți permite să planifici
          evenimentul tău...
          <Link className="text-[#07C]" to={"/faq"}>
            mai mult
          </Link>
        </li>
      </ul>
    </div>
  );
};
const ResponseArr = [
  <HowDoICreateAccount />,
  <HowDoIBecomePartner />,
  <HowDoICreatePage />,
  <PaymentMethods />,
  <PremiumBenefits />,
];

const titleArr = [
  "Cum creez un cont?",
  "Cum creez un cont de partener?",
  "Cum creez o pagină?",
  "Variante de plată",
  "Beneficiile abonamentului premium",
];

const FAQButton: FC<ButtonProps> = (props: ButtonProps) => {
  const shadow: CSSProperties = {
    boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.15)",
  };
  return (
    <span
      className={`${
        props.hover ? "bg-[#7F3F98] text-white" : "bg-white text-black"
      } w-full my-1 py-2 px-5 rounded-[35.9px] inline-flex justify-between items-center min-w-[270px] cursor-pointer`}
      style={shadow}
    >
      <p className="text-[12px]">{props.text}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="16"
        viewBox="0 0 10 18"
        fill="none"
      >
        <path
          d="M10 8.99996C10 9.20921 9.91854 9.41867 9.75584 9.57842L1.42254 17.7602C1.09692 18.0799 0.569633 18.0799 0.244218 17.7602C-0.0811975 17.4405 -0.0814059 16.9228 0.244217 16.6033L7.98834 8.99996L0.244217 1.39661C-0.0814066 1.07691 -0.0814066 0.5592 0.244217 0.2397C0.56984 -0.0797978 1.09713 -0.0800038 1.42254 0.2397L9.75584 8.42151C9.91854 8.58126 10 8.79071 10 8.99996Z"
          fill={props.hover ? "#FFF" : "#000000"}
        />
      </svg>
    </span>
  );
};

const FAQ = () => {
  const shadow: CSSProperties = {
    boxShadow:
      "0px 2px 4px 0px rgba(0, 0, 0, 0.05), 0px 8px 8px 0px rgba(0, 0, 0, 0.04), 0px 18px 11px 0px rgba(0, 0, 0, 0.03), 0px 31px 12px 0px rgba(0, 0, 0, 0.01), 0px 49px 14px 0px rgba(0, 0, 0, 0.00)",
  };
  const buttonShadow: CSSProperties = {
    boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.15)",
  };
  const [index, setIndex] = useState(0);

  return (
    <div className="grid grid-cols-5 laptop:gap-x-4 tablet:max-w-[90vmin] tablet:mx-auto tablet:my-12">
      <div
        className="bg-[#F3F3F3] rounded-[30px] laptop:pe-4 py-2 col-span-3 tablet:col-span-5"
        style={shadow}
      >
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col items-center laptop:px-20 h-full laptop:justify-evenly tablet:justify-center w-full">
            <span className="text-[#2D3047] text-[18px] font-medium">
              Intrebari frecvente
            </span>
            <span className="max-w-[40ch] text-start text-[13px] py-8">
              Înainte de a ne contacta, te încurajăm să verifici secțiunea
              noastră de Întrebări Frecvente. Aici vei găsi răspunsuri la multe
              dintre întrebările comune legate de [serviciile/produsele]
              noastre.
            </span>
            <Link
              to={"/faq"}
              className="w-fit bg-[#7F3F98] text-white rounded-[22.727px] px-6 py-0.5 font-medium"
              style={buttonShadow}
            >
              FAQ
            </Link>
          </div>
          <div className="flex flex-col items-start tablet:hidden">
            <div onClick={() => setIndex(0)}>
              <FAQButton hover={index == 0} text={titleArr[0]} />
            </div>
            <div onClick={() => setIndex(1)}>
              <FAQButton hover={index == 1} text={titleArr[1]} />
            </div>
            <div onClick={() => setIndex(2)}>
              <FAQButton hover={index == 2} text={titleArr[2]} />
            </div>
            <div onClick={() => setIndex(3)}>
              <FAQButton hover={index == 3} text={titleArr[3]} />
            </div>
            <div onClick={() => setIndex(4)}>
              <FAQButton hover={index == 4} text={titleArr[4]} />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#F3F3F3] flex flex-col text-start rounded-[30px] w-full col-span-2 tablet:hidden">
        <span className="w-full text-center bg-[#7F3F98] rounded-t-[30px] text-white py-2">
          {titleArr[index]}
        </span>
        <div className="flex items-start pt-3 w-full h-full justify-center">
          <span className="max-w-[45ch] text-[15px]">{ResponseArr[index]}</span>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
