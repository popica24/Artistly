import BulletParagraph from "../Components/BulletParagraph";
import Header from "../Components/Header";

const ManageAccount = () => {
  return (
    <div className="w-full h-full">
      <span className="text-center bg-[#7F3F98] flex items-center justify-center py-2 text-white rounded-t-[30px]">
        Administrarea contului
      </span>
      <div className="bg-[#EEEEEE] p-8 pb-24 flex flex-col rounded-b-[30px]">
        <span className="mb-4">
          Odată ce ți-ai creat un cont pe platforma noastră, gestionarea și
          actualizarea lui este un proces simplu și intuitiv. Următoarele
          instrucțiuni te vor ghida prin funcționalitățile esențiale ale
          contului tău.
        </span>
        <div className="mb-4">
          <Header text="Accesarea Contului" />
          <BulletParagraph text="Autentifică-te folosind numele de utilizator și parola." />
          <BulletParagraph text="Odată ce ești logat, vei avea acces la panoul de control al contului tău." />
        </div>
        <img src="/FAQ/ManageAccountStep1.png" className="my-4" />
        <div className="mb-4">
          <Header text="Actualizarea Profilului" />
          <BulletParagraph text="În panoul de control, găsește și selectează opțiunea „Profilul meu” pentru a actualiza informațiile personale." />
          <BulletParagraph text="Aici poți schimba detalii precum numele, parola și preferințele de comunicare." />
          <BulletParagraph text="După ce ai făcut modificările dorite, asigură-te că salvezi toate schimbările." />
        </div>
        <div className="mb-4">
          <span className="text-[#EE0000]">
            Pentru a aduce orice modificare la profil este necesar sa confirmati
            adresa de email
          </span>
        </div>
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

export default ManageAccount;
