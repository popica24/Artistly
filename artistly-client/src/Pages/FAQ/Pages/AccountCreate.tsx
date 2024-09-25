import BulletParagraph from "../Components/BulletParagraph";
import Header from "../Components/Header";

const AccountCreate = () => {
  return (
    <div className="w-full h-full">
      <span className="text-center bg-[#7F3F98] flex items-center justify-center py-2 text-white rounded-t-[30px]">
        Cum creez cont
      </span>
      <div className="bg-[#EEEEEE] p-8 pb-24 flex flex-col rounded-b-[30px]">
        <span className="mb-4">
          Crearea unui cont pe platforma noastră este un proces simplu, rapid și
          gratuit care îți deschide accesul la o gamă largă de artiști,
          fotografi, videografi, locații și resurse pentru evenimentul tău. Iată
          pașii pe care trebuie să îi urmezi:
        </span>
        <div className="mb-4">
          <Header text="Accesează Pagina Creează Cont" />
          <BulletParagraph
            text="În partea de sus a paginii noastre principale, vei găsi un buton
        „Creează cont”. Fă click pe acesta pentru a începe procesul de creare a
        contului."
          />
        </div>
        <img src="/FAQ/CreateAccountStep1.png" />
        <div className="mb-4">
          <Header text="Completează Informațiile" />
          <BulletParagraph text="Va trebui să introduci informații de bază cum ar fi numele tău, adresa de email și să alegi o parolă. Dacă ești artist, fotograf sau prestator de servicii, asigură-te că selectezi tipul corespunzător de cont pentru a accesa funcționalitățile specifice." />
        </div>
        <div className="mb-4">
          <Header text="Verifică Adresa de Email" />
          <BulletParagraph text="După completarea formularului de înregistrare, vei primi un email de confirmare. Accesează linkul din acest email pentru a activa contul tău." />
        </div>

        <div className="mb-4">
          <Header text="Completează Profilul Tău" />
          <BulletParagraph text="Odată ce contul tău este activ, te încurajăm să îți completezi profilul din Contul meu > Profilul meu și sa activezi TWO-FACTOR AUTHENTICATION, OPEN, pentru a păstra în siguranță contul tău." />
        </div>
        <img src="/FAQ/CreateAccountStep2.png" />
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

export default AccountCreate;
