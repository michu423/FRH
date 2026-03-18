export const exercises = [
  // Klatka piersiowa
  {
    id: 'chest-1',
    name: 'Wyciskanie sztangi na ławce płaskiej',
    category: 'chest',
    categoryLabel: 'Klatka piersiowa',
    difficulty: 'beginner',
    description: 'Podstawowe ćwiczenie na klatkę piersiową. Leżąc na ławce, opuść sztangę do klatki i wypchnij w górę. (łapiąc wężej angażujesz bardziej tricpes0',
    muscles: ['Klatka piersiowa', 'Triceps', 'Barki'],
    tips: [
      'Stopy stabilnie na podłodze',
      'Łopatki ściągnięte',
      'Sztanga nad środkiem klatki',
      'Kontrolowany ruch w dół'
    ],
  },
  {
    id: 'chest-2',
    name: 'Pompki',
    category: 'chest',
    categoryLabel: 'Klatka piersiowa',
    difficulty: 'beginner',
    description: 'Ćwiczenie z ciężarem własnego ciała. Doskonałe do wykonania w domu.',
    muscles: ['Klatka piersiowa', 'Triceps'],
    tips: [
      'Ciało w linii prostej',
      'Łokcie przy tułowiu',
      'Klatka pare cm nad podłogą',
      'Utrzymuj napięty brzuch'
    ],
  },

  // plecy
  {
    id: 'back-1',
    name: 'Wiosłowanie sztangą w opadzie',
    category: 'back',
    categoryLabel: 'Plecy',
    difficulty: 'intermediate',
    description: 'Podstawowe ćwiczenie na grubość pleców. Pochyl się, trzymając sztangę, a następnie przyciągnij do brzucha.',
    muscles: ['Plecy (szerokość)', 'Biceps', 'Barki'],
    tips: [
      'Kolana lekko ugięte',
      'Plecy proste',
      'Ściągaj łopatki',
      'Sztangę do pępka'
    ],
    safety: 'Nie zaokrąglaj kręgosłupa, utrzymuj neutralną pozycję!',
  },
  {
    id: 'back-2',
    name: 'Podciąganie na drążku',
    category: 'back',
    categoryLabel: 'Plecy',
    difficulty: 'intermediate',
    description: 'Zawiśnij na drążku i podciągnij się do brody ponad drążkiem.',
    muscles: ['Plecy (szerokość)'],
    tips: [
      'Pełny zwis na dole',
      'Klatka do drążka'
    ],
    safety: 'Rozpocznij od wersji z gumą jeśli nie potrafisz wykonać ćwiczenia.',
  },

  // Nogi
  {
    id: 'legs-1',
    name: 'Przysiad ze sztangą',
    category: 'legs',
    categoryLabel: 'Nogi',
    difficulty: 'intermediate',
    description: 'Najpopularniejsze ćwiczenie na nogi.',
    muscles: ['Czworogłowy uda', 'Pośladki', 'Core'],
    tips: [
      'Stopy na szerokość bioder',
      'Kolana w linii stóp',
      'Klatka do góry',
      'Biodra do tyłu'
    ],
    safety: 'Nie zaokrąglaj pleców!',
  },
  {
    id: 'legs-2',
    name: 'Martwy ciąg',
    category: 'legs',
    categoryLabel: 'Nogi',
    difficulty: 'advanced',
    description: 'Ćwiczenie angażujące całe ciało. Podnieś sztangę z podłogi do pozycji stojącej.',
    muscles: ['Tylna część uda', 'Pośladki', 'Plecy', 'Core'],
    tips: [
      'Sztanga przy goleniach',
      'Plecy proste',
      'Wypchaj biodra do przodu',
      'Głowa w neutralnej pozycji'
    ],
    safety: 'Uważaj na plecy - technika jest kluczowa!',
  },

  // Ramiona
  {
    id: 'arms-1',
    name: 'Uginanie ramion ze sztangą (biceps)',
    category: 'arms',
    categoryLabel: 'Ramiona',
    difficulty: 'beginner',
    description: 'Klasyczne ćwiczenie na biceps. Stojąc, uginaj ramiona.',
    muscles: ['Biceps', 'Przedramiona'],
    tips: [
      'Łokcie przy tułowiu',
      'Nie kołysz ciałem',
      'Pełen zakres ruchu'
    ],
  },
  {
    id: 'arms-2',
    name: 'Prostowanie ramion na wyciągu (triceps)',
    category: 'arms',
    categoryLabel: 'Ramiona',
    difficulty: 'beginner',
    description: 'Izolowane ćwiczenie na triceps. Prostuj ramiona w dół na wyciągu.',
    muscles: ['Triceps'],
    tips: [
      'Łokcie nieruchome',
      'Pełne wyprostowanie',
      'Kontrolowany powrót'
    ],
  },

  // Barki
  {
    id: 'shoulders-1',
    name: 'Wyciskanie sztangi nad głowę (OHP)',
    category: 'shoulders',
    categoryLabel: 'Barki',
    difficulty: 'intermediate',
    description: 'Podstawowe ćwiczenie na barki. Wypchnij sztangę nad głowę.',
    muscles: ['Barki', 'Triceps',],
    tips: [
      'Napięty brzuch',
      'Głowa lekko do tyłu',
      'Pełne wyprostowanie'
    ],
    safety: 'Nie wyginaj dolnego odcinka kręgosłupa.',
  },

  // Brzuch
  {
    id: 'abs-1',
    name: 'Plank (deska)',
    category: 'abs',
    categoryLabel: 'Brzuch',
    difficulty: 'beginner',
    description: 'Statyczne ćwiczenie na mięśniecore. Utrzymuj pozycję deski na przedramionach.',
    muscles: ['Mięśnie brzucha', 'Core'],
    tips: [
      'Ciało w linii prostej',
      'Napięty brzuch',
      'Nie opuszczaj bioder',
      'Oddychaj spokojnie'
    ],
  },
  {
    id: 'abs-2',
    name: 'Brzuszki (crunches)',
    category: 'abs',
    categoryLabel: 'Brzuch',
    difficulty: 'beginner',
    description: 'Klasyczne ćwiczenie na górną część brzucha. Leżąc, podnieś tułów w kierunku kolan.',
    muscles: ['Mięśnie brzucha'],
    tips: [
      'Dłonie za głową',
      'Nie ciągnij karku',
      'Kontrolowany ruch'
    ],
    safety: 'Ruch wykonuje brzuch, nie kark!',
  },

  // Rehabilitacja
  {
    id: 'rehab-1',
    name: 'Rozciąganie kręgosłupa lędźwiowego',
    category: 'rehab',
    categoryLabel: 'Rehabilitacja',
    difficulty: 'beginner',
    description: 'Ćwiczenie łagodzące bóle dolnej części pleców. Leżąc na plecach, przyciągnij kolana do klatki.',
    muscles: ['Kręgosłup lędźwiowy'],
    tips: [
      'Powolne ruchy',
      'Oddychaj głęboko',
      'Utrzymaj 20-30 sekund',
      'Nie forsuj bólu'
    ],
    safety: 'Przerwij przy ostrym bólu i skonsultuj z fizjoterapeutą!',
  },
  {
    id: 'rehab-2',
    name: 'Ćwiczenia izometryczne na szyję',
    category: 'rehab',
    categoryLabel: 'Rehabilitacja',
    difficulty: 'beginner',
    description: 'Wzmacnianie mięśni szyi bez ruchu. Naciskaj dłonią na czoło, stawiając opór głową.',
    muscles: ['Mięśnie szyi', 'Kark'],
    tips: [
      'Bez ruchu głowy',
      'Napięcie 5-10 sekund',
      'Powtórz z każdej strony'
    ],
    safety: 'Idealne dla osób pracujących przy komputerze.',
  },
];

export const categories = [
  { key: 'all', label: 'Wszystkie', icon: 'apps' },
  { key: 'chest', label: 'Klatka', icon: 'body' },
  { key: 'back', label: 'Plecy', icon: 'body' },
  { key: 'legs', label: 'Nogi', icon: 'body' },
  { key: 'arms', label: 'Ramiona', icon: 'body' },
  { key: 'shoulders', label: 'Barki', icon: 'body' },
  { key: 'abs', label: 'Brzuch', icon: 'body' },
  { key: 'rehab', label: 'Rehabilitacja', icon: 'body' },
];