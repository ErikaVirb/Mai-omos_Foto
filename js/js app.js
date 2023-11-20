// "DOMContentLoaded" - užtikrina, kad tik tada kai užkraus HTML tik tada pasieks elementus.
// Kad neatsitiktų situacija, kad neras elemento tik todėl, kad dar nespėjo užkrauti visų elementų.
document.addEventListener("DOMContentLoaded", function () {
  //Susižymim/pasiekiam HTML elementus:
  const rodytiButton = document.querySelector('.rodyti'); // "querySelector" - su juo galima pasiekti HTML elementą (patį pirmą). Jei būtų su gale "ALL"-paliektų juos visus.
  const maisytiButton = document.querySelector('.maisyti');
  // Ieškome konkretaus elemento su unikaliu ID.
  const paveiksliukuListas = document.getElementById('imageList');
  const paveiksliukai = [];

  // Funkcija kuri maišo masyvo viduje esančius elementus (Fisher-Yates algoritmas):
  function maisytiMasyva(masyvas) {
    // Sukam ciklą per kiekvieną masyvo elementą per masyvo ilgį nuo galo (-1 yra būtinas!!!! , nes length gražina nuo 1, o masyvas nuo 0)
    for (let i = masyvas.length - 1; i > 0; i--) {
      // Sugeneruoja random indexą "j" tarp 0 and i (imtinai). "Math.floor"- suapvalina iki artimiausio skaičiaus. "Math.random" - generuoja float skaičių nuo 1 iki 0.
      const j = Math.floor(Math.random() * (i + 1)); 
      // Masyvo destrukturizavimas (Sukeičia vietom):
      [masyvas[i], masyvas[j]] = [masyvas[j], masyvas[i]];
    }
    // gražina išmaišytą masyvą
    return masyvas;
  }
  // Funkcija skaičiuoja paspaudimus ant nuotraukų
  function pakeistiIDefaultFoto(event) {
    const clickedImg = event.target; // "pasižymim" būtent tą nuotrauką, kuri buvo paspausta
    // tikrinam po paspaudimo ar nuotrauka buvo paspausta 1 kart ar 2.
    if (clickedImg.dataset.clicks === '1') {
      clickedImg.dataset.clicks = '2';
    } else if (clickedImg.dataset.clicks === '2') {
      // Paspaudus du kart į paveiksliuko vietą išvedam "default" img.
      clickedImg.src = 'img/default.jpg';
      // nustoti skaičiuoti paspaudimus po paveiksliuko pakeitimo ("nutraukti funkcija")
      clickedImg.removeEventListener('click', pakeistiIDefaultFoto);
    }
  }
  // Paspaudus mygtuką rodyti - mygtukas neberodomas, pridedada 10vnt nuotraukų listą. Paspaudus du kart ant nuotraukos 
  // vietoj jos užkraunama "defalt" nuotrauka.
  rodytiButton.addEventListener('click', function () { 
    // Panaikinam listo style taškus.
    rodytiButton.style.display = 'none';
    // Sukam ciklą lygiai 10 kartų nuo 1 iki 10 (10 įskaitant): 
    for (let i = 1; i <= 10; i++) {
      // Sukuriam "li" elementą
      const li = document.createElement('li');
      // Sukuriam "img" elementą
      const img = document.createElement('img');
      // apsirašom atributą "src" elementui "img". "${i}" - keičiam stringo reikšmę "i" reikšme.
      img.src = `img/image${i}.jpg`; 
      // nustatom kiekvienai nuotraukai reikšmę jos sukūrimo metu vienetui
      img.dataset.clicks = '1'; // "dataset"- leidžia prieiti prie vsų HTML atributų elementų
      img.addEventListener('click', pakeistiIDefaultFoto);
      // Prideda kiekvieną nuotrauką i masyvą "paveiksliukai"
      paveiksliukai.push(img);
      // Prideda prie listo (tėvo) -  img (vaiką). 
      li.appendChild(img);
      // Prideda "li" elementą su "img" prie HTML documento su ID - "paveikliukuListas"  
      paveiksliukuListas.appendChild(li);
    }
  });
  // Maišom nuotraukas. Paspaudus mygtuką pašalina esamas nuotraukas ir vėl prideda tik jau sumaišyta tvarka.
  maisytiButton.addEventListener('click', function () {
    // Pakviečiam funkciją "maišytiMasyvą" su masyvo "paveiksliukai" išmaišyta kopija 
    const shuffledImages = maisytiMasyva(paveiksliukai.slice());
    // Ciklas išema visus "vaikinius" elementus iš "paveiksliukuListas" (išvalo "ul" prieš pridedant išmaišytus "img")
    while (paveiksliukuListas.firstChild) {
      paveiksliukuListas.removeChild(paveiksliukuListas.firstChild);
    }
    // eina per visas iteracijas
    shuffledImages.forEach(function (img) {
      // Sukuriam nauja elementa "li"
      const li = document.createElement('li');
      // Pridedam (img)"vaiką" "li" elementui 
      li.appendChild(img);
      // nustatom kiekvienai nuotraukai reikšmę jos sukūrimo metu vienetui
      img.dataset.clicks = '1';
      // Keiciam į "default" paveiksliuka
      img.addEventListener('click', pakeistiIDefaultFoto);
      paveiksliukuListas.appendChild(li);
    });
  });
});
