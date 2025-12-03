'use client';

import { useEffect } from 'react';
import { useScroll } from '@/hooks/use-scroll';

const Home = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('useDatabase', 'no');
  }
  // const { setScrollPosition } = useScroll();

  // useEffect(() => {
  //   const targetElement = document.getElementById('bottomHomePage');
  //   if (targetElement) {
  //     const yOffset =
  //       targetElement.getBoundingClientRect().top + window.scrollY;
  //     setScrollPosition(yOffset);
  //   }
  // }, [setScrollPosition]);

  const styles = {
    quote: 'quote text-center text-white font-oswald [text-shadow:_2px_2px_2px_rgb(0_0_0_/_0.8)] text-base tracking-[0.625em] uppercase font-normal bg-[rgba(204,204,204,0.2)] z-10',
    reference: 'reference font-oswald text-sm font-normal tracking-[8px] text-right text-white [text-shadow:_2px_2px_2px_rgb(0_0_0_/_0.8)] z-10',
    block: 'block my-[5px] mx-auto text-justify',
    lineBreak: 'lineBreak border-b border-black dark:border-white w-[150px] my-[4%] mx-auto',
    parallax_1: "parallax_1 pt-[200px] pb-[200px] relative w-full bg-[url('/assets/images/The-Crucifixion-of-Jesus.webp')] bg-fixed bg-cover bg-no-repeat bg-top opacity-90",
    // parallax_2: "parallax_2 pt-[200px] pb-[200px] relative w-full bg-[url('/assets/images/Colaj-1.webp')] bg-fixed bg-contain bg-no-repeat bg-top opacity-90",
    parallax_2: "parallax_2 pt-[200px] pb-[200px] relative w-full bg-[url('/assets/images/Ancient-Israel-Civilization.webp')] bg-fixed bg-contain bg-no-repeat bg-top opacity-90",
    parallax_3: "parallax_3 pt-[200px] pb-[200px] relative w-full bg-[url('/assets/images/ancient-israel.jpg')] bg-fixed bg-cover bg-no-repeat bg-top opacity-90",
    cursive: { fontFamily: "'PlaywriteCA-Regular', cursive" },
    list: { fontFamily: "'AGaramondPro-Bold', serif" }
  };

  return (
    <>
      <section>
        <div className='p-10 m-auto'>
          <p
            className='text-2xl text-center font-black mb-5'
            style={{ fontFamily: "'Handycheera-Regular', serif" }}
          >
            Bine ați venit la
          </p>
          <p className='text-2xl text-center font-GaramondBold tracking-[6px] uppercase font-medium text-indian-khaki-800'>
            Studiind biblia
          </p>
        </div>
      </section>

      <section>
        <div className='m-5'>
          <div className={styles.parallax_1}>
            <p className={styles.quote}>
              &quot;...Fiindcă atât de mult a iubit Dumnezeu lumea, că a dat pe singurul Lui Fiu, pentru ca oricine crede în El să nu piară, ci să aibă viaţa veşnică...&quot;
            </p>
            <p className={styles.reference}>Ioan 3:16</p>
          </div>
        </div>
      </section>

      <section>
        <div className='m-5 text-sm'>
          <div className={styles.block}></div>
          <p className='indent-7 text-sm' style={styles.cursive}>
            Mișcarea „Creștinii după Evanghelie” face parte din marea familie a creștinismului evanghelic, având rădăcini adânci în secolul al XIX-lea. Originile ei se leagă de o mișcare de trezire spirituală ce a început în Marea Britanie, în special în Irlanda, în anii 1820-1830. Credincioși din diferite confesiuni au simțit nevoia să se întoarcă la simplitatea și curăția credinței și a practicii bisericii primare, așa cum reiese din Noul Testament. Ei au dorit să depășească barierele confesionale, să se adune în Numele Domnului Isus Hristos și să pună accent pe autoritatea exclusivă a Scripturii.
          </p>
        </div>
      </section>

      <section>
        <div className='m-5'>
          <div className={styles.parallax_2}>
            <p className={styles.quote}>
              &quot;...şi ne iartă nouă greşelile noastre, precum şi noi iertăm greşiţilor noştri...&quot;
            </p>
            <p className={styles.reference}>Matei 6:12</p>
          </div>
        </div>
      </section>

      <section>
        <div className='m-5'>
          <div className={`${styles.block} text-sm`}>
            <p className='indent-7' style={styles.cursive}>
              Un moment-cheie l-a constituit apariția grupărilor de „Frați” (Brethren) în Irlanda și Anglia, printre care figura marcantă a lui John Nelson Darby a avut un rol important în clarificarea doctrinară și în răspândirea mișcării. Principiul de bază era acela că toți cei care cred în Domnul Isus Hristos ca Mântuitor personal și care sunt născuți din nou fac parte din Biserica universală, Trupul lui Hristos, și se pot aduna pe acest temei simplu, fără a fi nevoie de o instituție ierarhică sau de ritualuri elaborate.
            </p>

            <p className='indent-7' style={styles.cursive}>
              În România, mărturia creștinilor după Evanghelie a ajuns la sfârșitul secolului al XIX-lea, prin intermediul unor credincioși influențați de literatura biblică și de contactul cu misionari străini. Mișcarea a prins contur în perioada interbelică, iar după al Doilea Război Mondial, în ciuda presiunilor regimului comunist, ea a continuat să existe și să crească. În 1990, după căderea regimului comunist, creștinii după Evanghelie au fost recunoscuți oficial ca Cultul Creștin după Evanghelie în România.
            </p>

            <p className='indent-7' style={styles.cursive}>
              Din 1946, Creştinii după Evanghelie au fost recunoscuţi ca având
              calitatea de cult. După Revoluţia din decembrie 1989, cele două
              ramuri ale cultului s-au despărţit, fiecare ramură alegându-şi
              organe proprii şi desfăşurând activitate în mod independent.
              Ramura a doua s-a intitulat Biserica Evanghelică Română.
            </p>

            <div className={styles.lineBreak}></div>

            <p className='font-serif text-xl mb-2'>
              Principii fundamentale
            </p>

            <p className='mb-2' style={styles.cursive}>
              Creștinii după Evanghelie pun accent pe câteva elemente esențiale ale credinței:
            </p>

            <ol
              className='list-disc pl-5'
              style={styles.list}
            >
              <li>Biblia este singura autoritate supremă în materie de credință și practică.</li>
              <li>Mântuirea este prin har, prin credință, pe baza jertfei Domnului Isus Hristos, nu prin merite sau fapte personale.</li>
              <li>Adunarea credincioșilor se face în simplitate, în jurul Domnului Isus, având la centru Cina Domnului.</li>
              <li>Preoția tuturor credincioșilor: fiecare născut din nou are acces direct la Dumnezeu și poate sluji în cadrul adunării, fără o clericalizare.</li>
              <li>Responsabilitatea personală în viața de credință, în trăirea sfântă și în mărturisirea Evangheliei.</li>
            </ol>

            <p className='font-serif text-xl mt-2 mb-2'>
              Organizație și realitate actuală
            </p>

            <p className='mb-2' style={styles.cursive}>
              În România, Cultul Creștin după Evanghelie este alcătuit din două uniuni, în urma unor diferențe de organizare apărute în anii 1920:
            </p>
            <ol
              className='list-disc pl-5 mb-2'
              style={styles.list}
            >
              <li>Uniunea Bisericilor Creștine după Evanghelie din România</li>
              <li>Uniunea Bisericilor Creștine după Evanghelie „Inițiativa Timotheus”</li>
            </ol>

            <p style={styles.cursive}>
              Ambele împărtășesc aceleași principii doctrinare fundamentale și aceeași moștenire spirituală. În plus, există și grupări neînregistrate ca „cult”, dar care se revendică de la aceleași rădăcini ale mișcării fraților.
            </p>

            <p style={styles.cursive}>
              Astăzi, creștinii după Evanghelie din România sunt prezenți în sute de comunități locale, în orașe și sate, având un impact semnificativ prin lucrarea de evanghelizare, misiune, educație biblică și acțiuni sociale. Mulți tineri sunt implicați în tabere, conferințe, grupuri de studiu și proiecte media, prin care mesajul Evangheliei este dus mai departe.
              <br />
              O moștenire și o chemare
              Istoria acestei mișcări arată că dorința credincioșilor după Evanghelie a fost și rămâne aceea de a se întoarce la sursa curată a Scripturii și de a trăi o viață centrată pe Hristos. Această moștenire nu este doar un trecut, ci și o chemare pentru prezent: aceea de a rămâne credincioși învățăturii biblice, de a iubi unitatea spirituală în Trupul lui Hristos și de a sluji lumii cu dragostea și adevărul Evangheliei.
              <br />
              Într-o societate în continuă schimbare, mesajul Evangheliei rămâne neschimbat: „Isus Hristos este același ieri și azi și în veci” (Evrei 13:8). Creștinii după Evanghelie doresc să-L vestească pe Hristos ca singurul Mântuitor, să trăiască o viață de ucenicie autentică și să transmită generațiilor următoare lumina care a aprins inimile celor ce au pornit această mișcare acum aproape două secole.
            </p>
          </div>
        </div>
      </section >

      <section>
        <div className='m-5'>
          <div className={styles.parallax_3}>
            <p className={styles.quote}>
              &quot;Eu sunt Calea, Adevărul şi Viaţa. Nimeni nu vine la Tatăl decât prin Mine.&quot;
            </p>
            <p className={styles.reference}>Ioan 14:6</p>
          </div>
        </div>
      </section>

      <div id='bottomHomePage'></div>
    </>
  );
};

export default Home;
