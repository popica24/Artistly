import BulletParagraph from "../Components/BulletParagraph";
import Header from "../Components/Header";

const CreatePage = () => {
  return (
    <div className="w-full h-full">
      <span className="text-center bg-[#7F3F98] flex items-center justify-center py-2 text-white rounded-t-[30px]">
        Cum creez un cont de partener
      </span>
      <div className="bg-[#EEEEEE] p-8 pb-24 flex flex-col rounded-b-[30px]">
        <span className="mb-4">
          După înregistrarea sau aprobarea contului tău (în cazul în care aveai
          deja un cont asociat cu adresa de email folosită pentru formularul de
          creare a contului de partener), vei avea acces la secțiunea "Contul
          Meu", unde găsești opțiunea "Pagini". Aici ai posibilitatea de a-ți
          crea propria pagină, care va fi accesibilă utilizatorilor platformei.
          Procesul de creare a unei pagini este complet gratuit. Pentru a
          începe, urmează pașii indicați pentru crearea paginii.
        </span>
        <img src="/FAQ/CreatePageStep1.png" className="my-4" />
        <span className="mb-4">
          <Header text="Accesează Solicita cont partener" />
          <BulletParagraph text="În partea de sus a paginii noastre principale, vei găsi un buton „Solicită cont partener”. Fă click pe acesta pentru a începe procesul de creare a contului de partener." />
        </span>

        <span className="mb-4">
          <Header text="Creaza Pagina" />
          <BulletParagraph text="Odată ce ai completat formularul, cererea ta de creare a paginii este trimisă echipei noastre pentru verificare." />
          <BulletParagraph text="Dacă informațiile furnizate sunt conforme, pagina ta va fi aprobată și va deveni vizibilă pe platformă." />
          <BulletParagraph text="În perioada de verificare, pagina ta nu va fi accesibilă publicului. Așteaptă-te ca procesul de aprobare să dureze până la 48 de ore." />
          <BulletParagraph text="Dacă informațiile din formular sunt incorecte sau incomplete, vei fi contactat de către un membru al echipei noastre sau pagina ta va fi refuzată, cu explicarea motivelor." />
        </span>
        <span className="mb-4">
          <Header text="Fisiere media" />
          <BulletParagraph text="Asigură-te că fișierele încărcate în secțiunea media a paginii sunt în formatele jpeg, jpg, mp4 și nu depășesc 5MB." />
          <BulletParagraph text="Poți, de asemenea, să încarci conținut video direct de pe YouTube." />
        </span>
        <span className="mb-4">
          <Header text="Date de contact si preț" />
          <BulletParagraph text="Este esențial ca datele de contact și informațiile despre preț să fie reale și corecte." />
          <BulletParagraph text="Paginile cu informații false riscă să nu fie aprobate și pot duce chiar la închiderea contului asociat, ca urmare a nerespectării termenilor și condițiilor platformei." />
        </span>
        <span className="mb-4">
          <Header text="Statut" />
          <BulletParagraph text="Dacă ești impresar și reprezinți mai mulți artiști, platforma îți oferă posibilitatea de a crea pagini separate pentru fiecare artist din portofoliul tău, facilitând promovarea adecvată a fiecăruia. Condiția este să ai rol de impresar exclusiv" />
        </span>

        <span className="text-start mt-6">
          <strong>Nu ai găsit răspunsul pe care îl căutai?</strong> Ne poți
          contacta prin formularul de contact de pe site. Suntem aici pentru a
          te asigura că experiența ta pe platforma noastră este cât mai plăcută
          și eficientă posibil.
        </span>
      </div>
    </div>
  );
};

export default CreatePage;
