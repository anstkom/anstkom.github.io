import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

// Interactive infographic prototype for Agatha Christie's "And Then There Were None".
// Replace figurine images and portraits in FIGURINE_IMAGES / characters[].avatar if needed.

const FIGURINE_IMAGES = Array.from({ length: 10 }, (_, index) => `images/негрит${index + 1}.png`);
const FIGURINES = [
  { id: "marston", image: FIGURINE_IMAGES[0], deathStage: 2 },
  { id: "mrsrogers", image: FIGURINE_IMAGES[1], deathStage: 3 },
  { id: "macarthur", image: FIGURINE_IMAGES[2], deathStage: 4 },
  { id: "rogers", image: FIGURINE_IMAGES[3], deathStage: 5 },
  { id: "brent", image: FIGURINE_IMAGES[4], deathStage: 6 },
  { id: "wargrave", image: FIGURINE_IMAGES[5], deathStage: 7 },
  { id: "armstrong", image: FIGURINE_IMAGES[6], deathStage: 8 },
  { id: "blore", image: FIGURINE_IMAGES[7], deathStage: 9 },
  { id: "lombard", image: FIGURINE_IMAGES[8], deathStage: 10 },
  { id: "vera", image: FIGURINE_IMAGES[9], deathStage: 11 }
];

const stages = [
  {
    id: 0,
    label: "День 1 · Прибытие",
    short: "Arrival",
    time: "День 1, вечер",
    event: "Десять гостей прибывают на остров. Группа ещё выглядит упорядоченной.",
    victim: null,
    rhyme: null,
    figurinesLeft: 10,
    peopleLeft: 10,
    paranoia: 1,
    trust: 8,
    callout: "Стартовая точка: все персонажи живы, связи ещё социальные, а не следственные."
  },
  {
    id: 1,
    label: "Обвиняющая запись",
    short: "Record",
    time: "День 1, вечер",
    event: "Звучит граммофонная запись с обвинениями против каждого гостя.",
    victim: null,
    rhyme: null,
    figurinesLeft: 10,
    peopleLeft: 10,
    paranoia: 3,
    trust: 6,
    callout: "После записи гости становятся не просто незнакомцами, а взаимными подозреваемыми."
  },
  {
    id: 2,
    label: "1-я смерть",
    short: "Marston",
    time: "Ночь 1",
    event: "Энтони Марстон умирает от отравления цианидом в напитке.",
    victim: "Anthony Marston",
    rhyme: "One choked his little self, and then there were nine.",
    figurinesLeft: 9,
    peopleLeft: 9,
    paranoia: 4,
    trust: 5,
    callout: "Первая смерть ещё может восприниматься как несчастный случай, но исчезновение фигурки разрушает эту версию."
  },
  {
    id: 3,
    label: "2-я смерть",
    short: "Mrs Rogers",
    time: "Утро 2",
    event: "Миссис Роджерс находят мёртвой. Причина — передозировка снотворного.",
    victim: "Ethel Rogers",
    rhyme: "One overslept himself, and then there were eight.",
    figurinesLeft: 8,
    peopleLeft: 8,
    paranoia: 5,
    trust: 4,
    callout: "После второй смерти совпадение со считалкой становится системой, а не случайностью."
  },
  {
    id: 4,
    label: "3-я смерть",
    short: "Macarthur",
    time: "День 2",
    event: "Генерал Макартур погибает от удара по голове у моря.",
    victim: "General Macarthur",
    rhyme: "One said he'd stay there, and then there were seven.",
    figurinesLeft: 7,
    peopleLeft: 7,
    paranoia: 6,
    trust: 3,
    callout: "Остров превращается в ловушку: смерть происходит уже вне дома, но выхода всё равно нет."
  },
  {
    id: 5,
    label: "4-я смерть",
    short: "Rogers",
    time: "Утро 3",
    event: "Томаса Роджерса находят убитым топором во время работы во дворе.",
    victim: "Thomas Rogers",
    rhyme: "One chopped himself in halves, and then there were six.",
    figurinesLeft: 6,
    peopleLeft: 6,
    paranoia: 7,
    trust: 3,
    callout: "Круг подозреваемых сокращается. Каждый выживший становится статистически опаснее."
  },
  {
    id: 6,
    label: "5-я смерть",
    short: "Brent",
    time: "День 3",
    event: "Эмили Брент умирает после инъекции яда, связанной с мотивом пчелы.",
    victim: "Emily Brent",
    rhyme: "A bumblebee stung one, and then there were five.",
    figurinesLeft: 5,
    peopleLeft: 5,
    paranoia: 8,
    trust: 2,
    callout: "Механика считалки становится почти театральной: убийства уже выглядят как постановка."
  },
  {
    id: 7,
    label: "6-я смерть",
    short: "Wargrave",
    time: "Вечер 3",
    event: "Судью Уоргрейва находят застреленным. Группа считает, что убийца снова нанёс удар.",
    victim: "Justice Wargrave",
    rhyme: "A red herring swallowed one, and then there were four.",
    figurinesLeft: 4,
    peopleLeft: 4,
    paranoia: 9,
    trust: 2,
    callout: "После смерти Уоргрейва группа теряет фигуру порядка. На таймлайне остаётся едва заметный след, который выглядит как визуальная странность."
  },
  {
    id: 8,
    label: "7-я смерть",
    short: "Armstrong",
    time: "Ночь 3 / утро 4",
    event: "Доктор Армстронг исчезает; позже его тело находят у моря.",
    victim: "Dr Armstrong",
    rhyme: "A red herring swallowed one, and then there were three.",
    figurinesLeft: 3,
    peopleLeft: 3,
    paranoia: 9,
    trust: 1,
    callout: "Исчезновение Армстронга ломает остатки логики: неясно, он жертва, убийца или сообщник."
  },
  {
    id: 9,
    label: "8-я смерть",
    short: "Blore",
    time: "День 4",
    event: "Уильям Блор погибает, когда на него падает тяжёлый мраморный предмет в форме медведя.",
    victim: "William Blore",
    rhyme: "A big bear hugged one, and then there were two.",
    figurinesLeft: 2,
    peopleLeft: 2,
    paranoia: 10,
    trust: 1,
    callout: "Остаются двое видимых участников. Подозрение становится абсолютным: другой = убийца."
  },
  {
    id: 10,
    label: "9-я смерть",
    short: "Lombard",
    time: "День 4",
    event: "Вера Клейторн стреляет в Филипа Ломбарда из его револьвера.",
    victim: "Philip Lombard",
    rhyme: "One got frizzled up, and then there was one.",
    figurinesLeft: 1,
    peopleLeft: 1,
    paranoia: 10,
    trust: 0,
    callout: "Финальный открытый конфликт: подозрение превращается в действие."
  },
  {
    id: 11,
    label: "10-я смерть",
    short: "Vera",
    time: "День 4, финал",
    event: "Вера Клейторн вешается, следуя последней строке считалки.",
    victim: "Vera Claythorne",
    rhyme: "One went and hanged himself, and then there were none.",
    figurinesLeft: 0,
    peopleLeft: 0,
    paranoia: 10,
    trust: 0,
    callout: "Система завершена: считалка, фигурки и смерти сходятся в ноль."
  }
];

const characters = [
  {
    id: "marston",
    name: "Anthony Marston",
    ruName: "Энтони Марстон",
    avatar: "AM",
    role: "молодой светский человек",
    crime: "сбил двух детей автомобилем",
    deathStage: 2,
    deathMethod: "отравление цианидом",
    suspicion: [2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  {
    id: "mrsrogers",
    name: "Ethel Rogers",
    ruName: "Этель Роджерс",
    avatar: "ER",
    role: "служанка",
    crime: "участие в смерти бывшей хозяйки",
    deathStage: 3,
    deathMethod: "передозировка снотворного",
    suspicion: [1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  {
    id: "macarthur",
    name: "General Macarthur",
    ruName: "Генерал Макартур",
    avatar: "GM",
    role: "отставной генерал",
    crime: "отправил соперника на смерть",
    deathStage: 4,
    deathMethod: "удар по голове",
    suspicion: [2, 3, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0]
  },
  {
    id: "rogers",
    name: "Thomas Rogers",
    ruName: "Томас Роджерс",
    avatar: "TR",
    role: "слуга",
    crime: "участие в смерти бывшей хозяйки",
    deathStage: 5,
    deathMethod: "убит топором",
    suspicion: [2, 3, 4, 4, 4, 1, 0, 0, 0, 0, 0, 0]
  },
  {
    id: "brent",
    name: "Emily Brent",
    ruName: "Эмили Брент",
    avatar: "EB",
    role: "религиозная пожилая женщина",
    crime: "выгнала служанку, которая затем погибла",
    deathStage: 6,
    deathMethod: "инъекция яда",
    suspicion: [2, 3, 3, 3, 4, 4, 1, 0, 0, 0, 0, 0]
  },
  {
    id: "wargrave",
    name: "Justice Wargrave",
    ruName: "Судья Уоргрейв",
    avatar: "JW",
    role: "судья",
    crime: "приговорил человека к смерти",
    deathStage: 7,
    deathMethod: "выстрел",
    suspicion: [3, 3, 3, 3, 3, 4, 5, 0, 0, 0, 0, 0],
    hiddenKiller: true
  },
  {
    id: "armstrong",
    name: "Dr Armstrong",
    ruName: "Доктор Армстронг",
    avatar: "DA",
    role: "врач",
    crime: "погубил пациентку во время операции",
    deathStage: 8,
    deathMethod: "сброшен/утоплен у моря",
    suspicion: [3, 4, 4, 5, 5, 5, 5, 5, 1, 0, 0, 0]
  },
  {
    id: "blore",
    name: "William Blore",
    ruName: "Уильям Блор",
    avatar: "WB",
    role: "бывший полицейский",
    crime: "ложное свидетельство",
    deathStage: 9,
    deathMethod: "раздавлен мраморным медведем",
    suspicion: [3, 4, 4, 5, 5, 5, 5, 5, 5, 1, 0, 0]
  },
  {
    id: "lombard",
    name: "Philip Lombard",
    ruName: "Филип Ломбард",
    avatar: "PL",
    role: "авантюрист",
    crime: "оставил людей погибать в Африке",
    deathStage: 10,
    deathMethod: "застрелен Верой",
    suspicion: [4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 0]
  },
  {
    id: "vera",
    name: "Vera Claythorne",
    ruName: "Вера Клейторн",
    avatar: "VC",
    role: "секретарша / гувернантка",
    crime: "причастна к гибели ребёнка",
    deathStage: 11,
    deathMethod: "самоубийство через повешение",
    suspicion: [3, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 1]
  }
];

// Directed suspicion links by stage. This is an analytical reconstruction, not a literal line-by-line count.
const suspicionLinks = [
  { stage: 2, from: "wargrave", to: "rogers", weight: 2, note: "слуги кажутся возможным каналом отравления" },
  { stage: 3, from: "blore", to: "rogers", weight: 4, note: "смерть миссис Роджерс усиливает подозрения к мужу" },
  { stage: 3, from: "lombard", to: "rogers", weight: 3, note: "Роджерс остаётся удобным подозреваемым" },
  { stage: 4, from: "wargrave", to: "armstrong", weight: 2, note: "врач имеет доступ к медицинским средствам" },
  { stage: 5, from: "blore", to: "armstrong", weight: 4, note: "медицинские знания становятся опасным ресурсом" },
  { stage: 6, from: "lombard", to: "blore", weight: 3, note: "бывший полицейский вызывает недоверие" },
  { stage: 6, from: "vera", to: "lombard", weight: 4, note: "оружие и холодность Ломбарда делают его опасным" },
  { stage: 7, from: "blore", to: "armstrong", weight: 5, note: "после инсценировки Уоргрейва врач особенно подозрителен" },
  { stage: 8, from: "vera", to: "lombard", weight: 5, note: "к финалу Вера всё сильнее видит угрозу в Ломбарде" },
  { stage: 8, from: "lombard", to: "blore", weight: 4, note: "между оставшимися нет доверия" },
  { stage: 9, from: "vera", to: "lombard", weight: 5, note: "после смерти Блора остаются только Вера и Ломбард" },
  { stage: 9, from: "lombard", to: "vera", weight: 4, note: "подозрение становится взаимным" },
  { stage: 10, from: "vera", to: "lombard", weight: 5, note: "подозрение приводит к выстрелу" }
];

const WIDTH = 1180;
const LEFT = 260;
const RIGHT = 70;
const TOP = 112;
const ROW = 44;
const STAGE_WIDTH = (WIDTH - LEFT - RIGHT) / (stages.length - 1);
const HEIGHT = TOP + ROW * characters.length + 68;
const FIGURINE_WIDTH = 26;
const FIGURINE_HEIGHT = 34;

const xForStage = (stageId) => LEFT + stageId * STAGE_WIDTH;
const yForCharacter = (index) => TOP + index * ROW;

function suspicionColor(value, alive = true) {
  if (!alive) return "#9ca3af";
  if (value <= 1) return "#d1d5db";
  if (value === 2) return "#fbbf24";
  if (value === 3) return "#fb923c";
  if (value === 4) return "#ef4444";
  return "#7f1d1d";
}

function characterIndex(id) {
  return characters.findIndex((c) => c.id === id);
}

export default function InteractiveBookTimeline() {
  const [currentStage, setCurrentStage] = useState(0);
  const [showLinks, setShowLinks] = useState(true);
  const [showParanoia, setShowParanoia] = useState(true);

  const stage = stages[currentStage];
  const finalReveal = currentStage === stages.length - 1;
  const currentLinks = useMemo(
    () => suspicionLinks.filter((link) => link.stage === currentStage),
    [currentStage]
  );

  const paranoiaPath = useMemo(() => {
    const points = stages.map((s) => {
      const x = xForStage(s.id);
      const maxY = HEIGHT - 80;
      const minY = TOP - 50;
      const y = maxY - (s.paranoia / 10) * (maxY - minY);
      return `${x},${y}`;
    });
    return `M ${points.join(" L ")}`;
  }, []);

  return (
    <div className="min-h-screen bg-stone-100 text-stone-950 p-3 md:p-4 font-sans">
      <div className="mx-auto max-w-[1280px]">
        <header className="mb-3 grid gap-3 lg:grid-cols-[1fr_150px_420px] lg:items-end">
          <div>
            <p className="mb-1 text-[11px] uppercase tracking-[0.35em] text-red-900/80">interactive literary infographic</p>
            <h1
              className="font-black leading-none tracking-tight"
              style={{ fontSize: "clamp(32px, 3vw, 42px)" }}
            >
              Архитектура подозрения в книге Десять негритят
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-stone-700">
              Один интерактивный таймлайн по роману Агаты Кристи: линии жизни персонажей, исчезающие фигурки, рост паранойи и направленные связи подозрения.
            </p>
          </div>

          <div className="hidden justify-self-center lg:block">
            <img
              src="images/bookcover.jpg"
              alt="Обложка книги Десять негритят"
              className="h-[142px] w-[104px] rounded-lg border border-red-950/60 object-cover shadow-md"
            />
          </div>

          <div className="rounded-xl border border-stone-300 bg-white/75 p-3 shadow-sm">
            <div className="mb-2 text-xs font-bold uppercase tracking-wider text-stone-500">Как читать</div>
            <div className="grid grid-cols-2 gap-2 text-xs text-stone-700">
              <div className="flex items-center gap-2"><span className="h-2 w-8 rounded-full bg-stone-800" /> линия = персонаж жив</div>
              <div className="flex items-center gap-2"><span className="text-lg text-red-900">×</span> смерть / обрыв линии</div>
              <div className="flex items-center gap-2"><span className="h-4 w-4 rounded-full bg-red-500" /> размер = подозрительность</div>
              <div className="flex items-center gap-2">
                <img src={FIGURINE_IMAGES[0]} alt="" className="h-5 w-5 object-contain" />
                фигурки = сколько осталось
              </div>
              <div className="col-span-2 flex items-center gap-2"><span className="inline-block w-9 border-t-2 border-red-900 after:content-['➜'] after:ml-1 after:text-red-900" /> стрелка = кто кого подозревает на текущем этапе</div>
            </div>
          </div>
        </header>

        <main className="overflow-hidden rounded-2xl border border-stone-300 bg-[#fbfaf7] shadow-lg">
          <div className="relative overflow-x-auto p-3">
            <div className="relative min-w-[1120px] w-full">
              <div className="relative h-[52px]">
                <div
                  className="absolute text-[11px] font-bold uppercase tracking-wider text-stone-500"
                  style={{
                    left: `${(LEFT / WIDTH) * 100}%`,
                    top: 0
                  }}
                >
                  Фигурки на столе
                </div>
                {FIGURINES.map((figurine) => {
                  const visible = currentStage < figurine.deathStage;
                  return (
                    <img
                      key={figurine.id}
                      src={figurine.image}
                      alt=""
                      className="absolute object-contain transition-opacity duration-200"
                      style={{
                        left: `${(xForStage(figurine.deathStage) / WIDTH) * 100}%`,
                        top: 18,
                        width: FIGURINE_WIDTH,
                        height: FIGURINE_HEIGHT,
                        opacity: visible ? 1 : 0.2,
                        filter: visible ? "none" : "grayscale(100%)",
                        transform: "translateX(-50%)"
                      }}
                    />
                  );
                })}
              </div>

              <div
                className="absolute z-30 grid items-center rounded-full border border-red-900/20 px-5 py-3 shadow-md backdrop-blur-md"
                style={{
                  background: "rgba(255, 255, 255, 0.94)",
                  gridTemplateColumns: "170px 680px 96px",
                  columnGap: 36,
                  left: `${((LEFT - 28) / WIDTH) * 100}%`,
                  top: 58
                }}
              >
                <span className="text-xs font-black leading-tight text-red-900">{stage.label}</span>
                <input
                  className="h-3 w-[680px] cursor-pointer accent-red-900"
                  type="range"
                  min="0"
                  max={stages.length - 1}
                  step="1"
                  value={currentStage}
                  onChange={(e) => setCurrentStage(Number(e.target.value))}
                />
                <span className="text-right text-[11px] font-semibold text-stone-500">{stage.time}</span>
              </div>

              <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="block w-full">
              <defs>
                <marker id="arrowHead" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L8,3 z" fill="#7f1d1d" />
                </marker>
                <linearGradient id="paranoiaFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#7f1d1d" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.01" />
                </linearGradient>
              </defs>

              <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill="#fbfaf7" />

              {/* Stage grid */}
              {stages.map((s) => (
                <g key={s.id}>
                  <line
                    x1={xForStage(s.id)}
                    y1={TOP - 72}
                    x2={xForStage(s.id)}
                    y2={HEIGHT - 58}
                    stroke={s.id === currentStage ? "#991b1b" : s.id <= currentStage ? "#d6d3d1" : "#ece9e4"}
                    strokeWidth={s.id === currentStage ? 2 : 1}
                    strokeDasharray={s.id === currentStage ? "0" : "4 5"}
                    opacity={s.id === currentStage ? 0.65 : 1}
                  />
                  <circle
                    cx={xForStage(s.id)}
                    cy={TOP - 75}
                    r={s.id === currentStage ? 7 : 4}
                    fill={s.id <= currentStage ? "#7f1d1d" : "#d6d3d1"}
                  />
                  <text
                    x={xForStage(s.id)}
                    y={HEIGHT - 25}
                    textAnchor="middle"
                    className="fill-stone-600 text-[10px] font-semibold"
                  >
                    {s.short}
                  </text>
                </g>
              ))}

              {/* Paranoia background */}
              {showParanoia && (
                <g>
                  <path
                    d={`${paranoiaPath} L ${xForStage(stages.length - 1)},${HEIGHT - 80} L ${xForStage(0)},${HEIGHT - 80} Z`}
                    fill="url(#paranoiaFill)"
                  />
                  <path d={paranoiaPath} fill="none" stroke="#7f1d1d" strokeWidth="2" strokeOpacity="0.24" />
                  <text x={WIDTH - RIGHT - 118} y={TOP - 38} className="fill-red-900/65 text-[11px] font-bold">фон: рост паранойи</text>
                </g>
              )}

              {/* Current-stage suspicion arrows only */}
              {showLinks && currentLinks.map((link, index) => {
                const fromIndex = characterIndex(link.from);
                const toIndex = characterIndex(link.to);
                if (fromIndex === -1 || toIndex === -1) return null;
                const x = xForStage(link.stage);
                const y1 = yForCharacter(fromIndex);
                const y2 = yForCharacter(toIndex);
                const direction = y2 > y1 ? 1 : -1;
                const offset = 18 + index * 7;
                const xStart = x - offset;
                const xEnd = x + offset;
                const controlX = x + 70;
                const controlY1 = y1 + direction * 10;
                const controlY2 = y2 - direction * 10;
                return (
                  <motion.path
                    key={`${link.from}-${link.to}-${index}`}
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 0.88, pathLength: 1 }}
                    transition={{ duration: 0.45 }}
                    d={`M ${xStart},${y1} C ${controlX},${controlY1} ${controlX},${controlY2} ${xEnd},${y2}`}
                    fill="none"
                    stroke="#7f1d1d"
                    strokeWidth={1.5 + link.weight * 0.65}
                    strokeLinecap="round"
                    markerEnd="url(#arrowHead)"
                  />
                );
              })}

              {/* Character lanes */}
              {characters.map((character, index) => {
                const y = yForCharacter(index);
                const deathX = xForStage(character.deathStage);
                const currentSuspicion = character.suspicion[currentStage] || 0;

                return (
                  <g key={character.id}>
                    <line x1={LEFT} y1={y} x2={WIDTH - RIGHT} y2={y} stroke="#e7e5e4" strokeWidth="1" />

                    {/* Portrait / label */}
                    <g>
                      <circle cx="74" cy={y} r="21" fill={character.id === "wargrave" && finalReveal ? "#1c1917" : "#fff"} stroke="#a8a29e" strokeWidth="1.5" />
                      <text x="74" y={y + 4} textAnchor="middle" className={`text-[12px] font-black ${character.id === "wargrave" && finalReveal ? "fill-white" : "fill-stone-900"}`}>{character.avatar}</text>
                      <text x="104" y={y - 6} className="fill-stone-900 text-[11px] font-bold">{character.ruName}</text>
                      <text x="104" y={y + 10} className="fill-stone-500 text-[9px]">{character.role}</text>
                    </g>

                    {/* Life path */}
                    <line
                      x1={LEFT}
                      y1={y}
                      x2={deathX}
                      y2={y}
                      stroke="#44403c"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Future segment after current stage */}
                    {currentStage < character.deathStage && (
                      <line
                        x1={xForStage(currentStage)}
                        y1={y}
                        x2={deathX}
                        y2={y}
                        stroke="#d6d3d1"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    )}

                    {/* Wargrave hidden continuation: visible only after his apparent death */}
                    {character.id === "wargrave" && currentStage >= character.deathStage && (
                      <line
                        x1={deathX}
                        y1={y}
                        x2={xForStage(stages.length - 1)}
                        y2={y}
                        stroke="#cbd5e1"
                        strokeWidth="3"
                        strokeLinecap="round"
                        opacity={finalReveal ? 0.95 : 0.65}
                      />
                    )}

                    {/* Suspicion marker only at current stage */}
                    {currentStage <= character.deathStage && currentSuspicion > 0 && (
                      <motion.circle
                        cx={xForStage(currentStage)}
                        cy={y}
                        r={4 + currentSuspicion * 2.4}
                        fill={suspicionColor(currentSuspicion, currentStage < character.deathStage)}
                        stroke="#fbfaf7"
                        strokeWidth="2"
                        initial={{ scale: 0.7, opacity: 0.3 }}
                        animate={{ scale: 1, opacity: currentStage < character.deathStage ? 0.96 : 0.35 }}
                        transition={{ duration: 0.25 }}
                      />
                    )}

                    {/* Death mark */}
                    {currentStage >= character.deathStage && (
                      <g>
                        <circle
                          cx={deathX}
                          cy={y}
                          r="14"
                          fill="#fbfaf7"
                          stroke={character.id === "wargrave" && !finalReveal ? "#9ca3af" : "#7f1d1d"}
                          strokeWidth="2.5"
                        />
                        <text
                          x={deathX}
                          y={y + 5}
                          textAnchor="middle"
                          className={`text-[21px] font-black ${character.id === "wargrave" && !finalReveal ? "fill-stone-400" : "fill-red-900"}`}
                        >×</text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Bottom axis inside chart */}
              <line x1={LEFT} y1={HEIGHT - 58} x2={WIDTH - RIGHT} y2={HEIGHT - 58} stroke="#292524" strokeWidth="2" />
              </svg>

              <aside
                className="absolute z-20 w-[290px] rounded-xl border border-stone-300/80 p-3 text-stone-900 shadow-lg backdrop-blur-md"
                style={{
                  background: "rgba(255, 255, 255, 0.96)",
                  left: `${(xForStage(8.2) / WIDTH) * 100}%`,
                  top: 156
                }}
              >
                <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-stone-500">Текущий этап</div>
                <h2 className="text-sm font-black text-stone-950">{stage.label}</h2>
                <p className="mt-0.5 text-xs font-semibold text-red-900/80">{stage.time}</p>
                <p className="mt-2 text-xs leading-snug text-stone-700">{stage.event}</p>
                {finalReveal && (
                  <div className="mt-2 rounded-lg bg-red-950/85 p-2 text-xs leading-snug text-white">
                    Скрытая развязка: фактически жив судья Уоргрейв.
                  </div>
                )}
                {stage.rhyme && (
                  <div className="mt-2 rounded-lg bg-stone-950/5 p-2 text-[11px] leading-snug text-stone-700">
                    <b>Считалка:</b> {stage.rhyme}
                  </div>
                )}
                <div className="mt-2 rounded-lg bg-white/60 p-2 text-[11px] leading-snug text-stone-700">{stage.callout}</div>
              </aside>
            </div>
          </div>

          {/* Secondary controls */}
          <section className="border-t border-stone-300 bg-white/80 p-3 md:p-4">
            <div className="flex flex-wrap gap-3 text-sm">
                  <label className="flex cursor-pointer items-center gap-2 rounded-full border border-stone-300 bg-stone-50 px-3 py-1">
                    <input type="checkbox" checked={showLinks} onChange={(e) => setShowLinks(e.target.checked)} />
                    стрелки подозрения
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 rounded-full border border-stone-300 bg-stone-50 px-3 py-1">
                    <input type="checkbox" checked={showParanoia} onChange={(e) => setShowParanoia(e.target.checked)} />
                    фон паранойи
                  </label>
            </div>
          </section>
        </main>

        <section className="mt-3 grid gap-3 lg:grid-cols-2">
          <div className="rounded-xl border border-stone-300 bg-white/80 p-3">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500">Легенда подозрительности</div>
            <div className="mt-3 flex items-end gap-4">
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="text-center text-xs text-stone-600">
                  <div
                    className="mx-auto mb-1 rounded-full border-2 border-white"
                    style={{ width: 8 + value * 6, height: 8 + value * 6, background: suspicionColor(value) }}
                  />
                  {value}/5
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-stone-300 bg-white/80 p-3">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500">Подозрения</div>
            <p className="mt-2 text-sm text-stone-700">
              На графике показываются только стрелки текущего этапа. Так направление «кто кого подозревает» читается без визуального шума.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
