import BulletParagraph from "../Components/BulletParagraph";
import Header from "../Components/Header";

const CreatePartner = () => {
  return (
    <div className="w-full h-full">
      <span className="text-center bg-[#7F3F98] flex items-center justify-center py-2 text-white rounded-t-[30px]">
        Cum creez un cont de partener
      </span>
      <div className="bg-[#EEEEEE] p-8 pb-24 flex flex-col rounded-b-[30px]">
        <span className="mb-4">
          Crearea unui cont pe platforma noastră este un proces simplu, rapid și
          gratuit.
        </span>
        <span className="mb-4">
          <Header text="Accesează Solicita cont partener" />
          <BulletParagraph text="În partea de sus a paginii noastre principale, vei găsi un buton „Solicită cont partener”. Fă click pe acesta pentru a începe procesul de creare a contului de partener." />
        </span>
        <img src="/FAQ/CreatePartnerStep1.png" className="my-4" />
        <span className="mb-4">
          <Header text="Completează formularul" />
          <BulletParagraph text="După ce accesați link-ul, veți fi redirecționat către formularul de solicitare a unui cont de partener." />
          <BulletParagraph text="Odată formularul trimis, datele dumnevoastra vor fii verificate de un operatetor iar dupa ce au fost aprobate pe contul dumneavoastra se va debloca sectiune “Pagini”. Procesul de aprobare poate dura pana la 48 de ore." />
          <BulletParagraph text="Vă rugăm să completați formularul cu informațiile solicitate. Ulterior, veți putea crea o pagină asociată contului dumneavoastră." />
          <BulletParagraph text="ATENȚIE! Pentru a creea un coont de partener trebuie sa aveti deja un cont creat pe platforma." />
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

export default CreatePartner;
