import React, { useState } from 'react';
import { BookOpen, Droplets, Wheat, Zap, Heart, Leaf, ChevronLeft, ArrowRight, Star } from 'lucide-react';

interface ArticleSection {
  heading?: string;
  content: string;
  list?: string[];
}

interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  icon: React.ReactNode;
  color: string;
  imageGradient: string;
  summary: string;
  sections: ArticleSection[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'ghid-nutritie',
    title: 'Ghidul Micului Campion: Nutriție Esențială',
    category: 'Ghid General',
    readTime: '4 min',
    icon: <Heart />,
    color: 'text-roRed-400',
    imageGradient: 'from-roRed-900/40 to-stone-900',
    summary: 'Tot ce trebuie să știi despre farfuria ideală, frecvența meselor și grupele alimentare esențiale pentru dezvoltarea armonioasă a copilului.',
    sections: [
      {
        content: "O alimentație sănătoasă și echilibrată este esențială pentru creșterea și dezvoltarea armonioasă a copiilor, asigurând aportul adecvat de nutrienți necesari pentru atingerea potențialului lor genetic, fizic și mental."
      },
      {
        heading: "Regula celor 3 + 2",
        content: "Pentru a asigura energie constantă, copiii au nevoie de un program regulat:",
        list: [
          "3 Mese Principale: Micul dejun este crucial pentru concentrare.",
          "1-2 Gustări Nutritive: Pentru a preveni scăderile de energie.",
          "Diversitate: Prânzul și cina ar trebui să includă alimente din cel puțin 4 grupe alimentare."
        ]
      },
      {
        heading: "Farfuria Echilibrată",
        content: "Un meniu zilnic corect ar trebui să bifeze următoarele proporții:",
        list: [
          "Legume: 3 porții (40g/porție) - sursă de fibre și vitamine.",
          "Fructe: 2-3 porții (60g/porție) - energie naturală.",
          "Cereale Integrale: 3-5 porții - combustibil pentru creier.",
          "Proteine: 1 porție carne/pește + proteine vegetale.",
          "Lactate: 2-4 porții pentru sănătatea oaselor."
        ]
      }
    ]
  },
  {
    id: 'proteine',
    title: 'Super-Proteine: Animal vs. Vegetal',
    category: 'Nutrienți',
    readTime: '5 min',
    icon: <Zap />,
    color: 'text-roYellow-400',
    imageGradient: 'from-roYellow-900/40 to-stone-900',
    summary: 'Cum să combini proteinele pentru o absorbție maximă. Top surse vegetale și animale explicate pe înțelesul părinților.',
    sections: [
      {
        content: "Proteinele sunt 'cărămizile' organismului. Copiii de 5-8 ani au nevoie de aproximativ 19-20g proteine zilnic."
      },
      {
        heading: "Proteine Complete vs. Incomplete",
        content: "Nu toate proteinele sunt la fel. Proteinele animale (carne, ouă, lactate) sunt 'complete' (conțin toți aminoacizii). Cele vegetale sunt adesea incomplete, dar pot fi combinate pentru a deveni super-puternice!",
        list: [
          "Orez + Fasole = Proteină Completă",
          "Pâine integrală + Unt de Arahide = Proteină Completă",
          "Hummus (Năut) + Lipie = Proteină Completă"
        ]
      },
      {
        heading: "Top Surse Vegetale",
        content: "Nu ignorați puterea plantelor. Iată campionii proteici:",
        list: [
          "Linte și Fasole: 7-9g proteine per 100g.",
          "Quinoa: O cereală minune care este o proteină completă (4.5g/100g).",
          "Semințe de Cânepă și Chia: Pentru smoothie-uri puternice.",
          "Spirulină: O bombă proteică (8g la doar 2 linguri)."
        ]
      },
      {
        heading: "Truc pentru Absorbție",
        content: "Pentru a ajuta corpul să absoarbă fierul din proteinele vegetale, combinați-le întotdeauna cu vitamina C (ex: stoarceți lămâie peste salata de linte sau mâncați un măr după masă)."
      }
    ]
  },
  {
    id: 'glicemie',
    title: 'Controlul Energiei și Glicemia',
    category: 'Sănătate',
    readTime: '3 min',
    icon: <Wheat />,
    color: 'text-green-400',
    imageGradient: 'from-green-900/40 to-stone-900',
    summary: 'De ce are copilul energie apoi devine brusc obosit? Totul despre indicele glicemic și carbohidrații buni vs. răi.',
    sections: [
      {
        content: "Glicemia influențează direct starea de spirit și capacitatea de concentrare a copilului. Fluctuațiile mari duc la 'hiperactivitate' urmată de 'prăbușire' (oboseală, iritabilitate)."
      },
      {
        heading: "Semaforul Alimentelor",
        content: "Învățați să alegeți alimentele în funcție de impactul asupra zahărului din sânge:",
        list: [
          "VERDE (Indice Glicemic Scăzut): Legume verzi, quinoa, ovăz, leguminoase, avocado. Eliberează energia lent.",
          "GALBEN (Indice Glicemic Mediu): Cartofi, orez, banane coapte. Bune, dar cu moderație.",
          "ROȘU (Indice Glicemic Ridicat): Zahăr, produse de patiserie, sucuri de fructe (fără pulpă). Provoacă creșteri rapide și nesănătoase."
        ]
      },
      {
        heading: "Cereale Antice vs. Rafinate",
        content: "Înlocuiți făina albă cu cereale integrale sau 'antice' precum meiul, hrișca sau amarantul. Acestea păstrează toți nutrienții și fibrele, stabilizând glicemia."
      }
    ]
  },
  {
    id: 'gustari',
    title: 'Gustări Inteligente (Snack-uri)',
    category: 'Idei Rapide',
    readTime: '3 min',
    icon: <Star />,
    color: 'text-purple-400',
    imageGradient: 'from-purple-900/40 to-stone-900',
    summary: 'Adio pungi de chipsuri! Idei de gustări făcute în casă care sunt și delicioase și hrănitoare.',
    sections: [
      {
        content: "Gustările nu sunt 'răsfățuri', ci mini-mese necesare copiilor activi. Evitați produsele procesate din comerț."
      },
      {
        heading: "Idei 'Grab-and-Go'",
        content: "Gustări care se pot pregăti rapid:",
        list: [
          "Iaurt Grecesc cu Topping: Adăugați fructe de pădure și puțină miere.",
          "Ouă Fierte Tari: O sursă portabilă de proteină (6g per ou).",
          "Rulouri de Curcan: Felii de curcan înfășurate în jurul unui baton de castravete sau brânză.",
          "Brânză Cottage cu Fructe: O combinație surprinzător de gustoasă (ex: cu ananas)."
        ]
      },
      {
        heading: "Gustări Preparate (Meal Prep)",
        content: "Dacă aveți timp în weekend:",
        list: [
          "Mini Frittatas: Coapte în forme de brioșe, cu spanac și brânză.",
          "Energy Balls: Curmale, nuci, ovăz și cacao, mixate la robot.",
          "Brioșe Proteice: Cu făină de migdale sau adaos de iaurt în aluat."
        ]
      }
    ]
  },
  {
    id: 'hidratare',
    title: 'Hidratarea: Apa este Viață',
    category: 'Esențial',
    readTime: '2 min',
    icon: <Droplets />,
    color: 'text-roBlue-400',
    imageGradient: 'from-roBlue-900/40 to-stone-900',
    summary: 'Câtă apă trebuie să bea un copil? De ce să evităm sucurile și cum să facem apa mai atractivă.',
    sections: [
      {
        content: "Apa reprezintă 60-70% din corpul uman. O pierdere de doar 4% duce la deshidratare și scăderea performanței mentale."
      },
      {
        heading: "Necesarul de Lichide",
        content: "Recomandări generale pe vârste:",
        list: [
          "1-3 ani: aprox. 4 căni pe zi",
          "4-8 ani: aprox. 5 căni pe zi",
          "Peste 8 ani: 7-8 căni pe zi"
        ]
      },
      {
        heading: "Cum facem apa atractivă?",
        content: "Mulți copii refuză apa simplă. Încercați 'Apa Infuzată':",
        list: [
          "Adăugați felii de căpșuni și mentă.",
          "Felii de castravete și lămâie.",
          "Cuburi de gheață cu fructe de pădure congelate în interior."
        ]
      },
      {
        heading: "Lista Neagră",
        content: "Evitați: Băuturile energizante (periculoase pentru inimă), sucurile carbogazoase (zahăr excesiv) și 'băuturile cu arome' din comerț."
      }
    ]
  },
  {
    id: 'fara-lactate',
    title: 'Alternative Fără Lactate',
    category: 'Dietă Specială',
    readTime: '4 min',
    icon: <Leaf />,
    color: 'text-emerald-400',
    imageGradient: 'from-emerald-900/40 to-stone-900',
    summary: 'Opțiuni delicioase pentru copiii cu intoleranță la lactoză sau alergii. Lapte vegetal și iaurt de cocos.',
    sections: [
      {
        content: "Tot mai mulți copii au sensibilitate la lactate. Din fericire, există alternative nutritive excelente."
      },
      {
        heading: "Ghidul Laptelui Vegetal",
        content: "Cum să alegi:",
        list: [
          "Lapte de Soia: Cel mai apropiat de cel de vacă ca nivel de proteine (8g/cană).",
          "Lapte de Migdale: Sărac caloric, bogat în Vitamina E, dar sărac în proteine.",
          "Lapte de Ovăz: Cremnos, bun pentru smoothie-uri, bogat în fibre.",
          "Lapte de Mazăre: O opțiune nouă, foarte bogată în proteine și hipoalergenică."
        ]
      },
      {
        heading: "Iaurtul de Cocos",
        content: "O bază excelentă pentru micul dejun. Este bogat în grăsimi sănătoase pentru creier. Puteți face acasă iaurt de cocos folosind lapte de cocos full-fat și capsule probiotice, lăsat la fermentat 24-48 ore."
      }
    ]
  }
];

interface Props {
  onBack: () => void;
}

export const Inspiration: React.FC<Props> = ({ onBack }) => {
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);

  if (selectedArticle) {
    return (
      <div className="animate-fade-in pb-12">
        <button 
          onClick={() => setSelectedArticle(null)}
          className="flex items-center gap-2 text-stone-400 hover:text-white mb-6 transition-colors px-2"
        >
          <ChevronLeft size={20} /> Înaopoi la Articole
        </button>

        <div className="bg-stone-900 rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
          <div className={`h-48 md:h-64 bg-gradient-to-r ${selectedArticle.imageGradient} relative p-8 flex flex-col justify-end`}>
             <div className="absolute top-6 right-6 bg-black/30 backdrop-blur-md p-3 rounded-full border border-white/10 text-white">
                {selectedArticle.icon}
             </div>
             <span className={`text-[10px] font-black uppercase tracking-widest ${selectedArticle.color} mb-2 bg-black/40 w-fit px-2 py-1 rounded-lg backdrop-blur-sm`}>
               {selectedArticle.category}
             </span>
             <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
               {selectedArticle.title}
             </h1>
          </div>

          <div className="p-8 md:p-10 space-y-8">
             {selectedArticle.sections.map((section, idx) => (
               <div key={idx}>
                 {section.heading && (
                   <h3 className={`text-lg font-bold ${selectedArticle.color} mb-3 flex items-center gap-2`}>
                     {section.heading}
                   </h3>
                 )}
                 <p className="text-stone-300 leading-relaxed text-sm md:text-base">
                   {section.content}
                 </p>
                 {section.list && (
                   <ul className="mt-4 space-y-3">
                     {section.list.map((item, i) => (
                       <li key={i} className="flex items-start gap-3 text-stone-400 text-sm">
                         <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${selectedArticle.color.replace('text-', 'bg-')}`}></div>
                         <span>{item}</span>
                       </li>
                     ))}
                   </ul>
                 )}
               </div>
             ))}
          </div>
          
          <div className="bg-stone-950 p-8 border-t border-white/5 text-center">
             <p className="text-stone-500 text-xs italic">
               Informațiile sunt bazate pe ghiduri nutriționale generale. Consultați întotdeauna un medic pediatru pentru nevoi specifice.
             </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between mb-2 px-2">
        <div>
          <h2 className="text-2xl font-black text-stone-100">Inspirație & Nutriție</h2>
          <p className="text-stone-500 text-xs font-medium mt-1">Ghiduri pentru o creștere sănătoasă</p>
        </div>
        <button onClick={onBack} className="text-xs font-bold text-stone-500 hover:text-white uppercase tracking-widest">
          Înapoi
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {BLOG_POSTS.map((post) => (
          <div 
            key={post.id}
            onClick={() => setSelectedArticle(post)}
            className="group bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-white/10 rounded-[2rem] p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 relative overflow-hidden shadow-lg"
          >
            {/* Background Gradient Effect */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${post.imageGradient} opacity-20 rounded-bl-[4rem] group-hover:scale-110 transition-transform duration-700`}></div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <span className={`text-[9px] font-black uppercase tracking-widest border border-stone-700 px-2 py-1 rounded-lg ${post.color}`}>
                  {post.category}
                </span>
                <span className="text-[10px] font-bold text-stone-600 flex items-center gap-1">
                  <BookOpen size={10} /> {post.readTime}
                </span>
              </div>

              <div className="mb-4">
                 <div className={`w-12 h-12 rounded-2xl bg-stone-950 flex items-center justify-center mb-4 border border-stone-800 group-hover:border-stone-600 transition-colors ${post.color}`}>
                   {post.icon}
                 </div>
                 <h3 className="text-lg font-black text-stone-200 leading-tight mb-2 group-hover:text-white transition-colors">
                   {post.title}
                 </h3>
                 <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed">
                   {post.summary}
                 </p>
              </div>

              <div className="flex items-center text-[10px] font-bold text-stone-400 uppercase tracking-widest group-hover:text-roBlue-400 transition-colors gap-1">
                Citește Tot <ArrowRight size={12} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
