export const trainingPlans = [
  // poczatkujący
  {
    id: 'beginner-1',
    name: 'Full Body Workout - 3 dni',
    level: 'beginner',
    levelLabel: 'Początkujący',
    goal: 'Wprowadzenie do treningu siłowego, nauka techniki podstawowych ćwiczeń',
    daysPerWeek: 3,
    duration: '45-60 min',
    description: 'Plan dla osób zaczynających przygodę z siłownią. Skupia się na nauce prawidłowej techniki wykonywania podstawowych ćwiczeń wielostawowych.',
    days: [
      {
        day: 1,
        name: 'Trening A - Całe ciało',
        exercises: [
          { name: 'Rozgrzewka (bieżnia/rower)', sets: '-', reps: '10 min' },
          { name: 'Przysiad ze sztangą', sets: '3', reps: '10' },
          { name: 'Wyciskanie sztangi na ławce płaskiej', sets: '3', reps: '10' },
          { name: 'Wiosłowanie sztangą w opadzie', sets: '3', reps: '10' },
          { name: 'Wykroki z hantlami', sets: '3', reps: '10 na nogę' },
          { name: 'Martwy ciąg rumuński', sets: '3', reps: '10' },
          { name: 'Plank', sets: '3', reps: '30 sek' },
        ]
      },
      {
        day: 2,
        name: 'Trening B - Całe ciało',
        exercises: [
          { name: 'Rozgrzewka', sets: '-', reps: '10 min' },
          { name: 'Hack przysiad', sets: '3', reps: '12' },
          { name: 'Wyciskanie hantli na ławce skośnej', sets: '3', reps: '10' },
          { name: 'Podciąganie na drążku (lub ściąganie drążka)', sets: '3', reps: '8-10' },
          { name: 'Martwy ciąg klasyczny', sets: '3', reps: '8' },
          { name: 'Prostowanie ramion na wyciągu', sets: '3', reps: '12' },
          { name: 'Brzuszki z obciążeniem', sets: '3', reps: '15' },
        ]
      },
      {
        day: 3,
        name: 'Trening C - Całe ciało',
        exercises: [
          { name: 'Rozgrzewka', sets: '-', reps: '10 min' },
          { name: 'Przysiad bułgarski', sets: '3', reps: '10 na nogę' },
          { name: 'Pompki (lub wyciskanie na maszynie)', sets: '3', reps: '12' },
          { name: 'Wiosłowanie hantlą w podporze', sets: '3', reps: '10' },
          { name: 'Uginanie nóg na maszynie', sets: '3', reps: '12' },
          { name: 'Wyciskanie francuskie', sets: '3', reps: '12' },
          { name: 'Deska boczna', sets: '3', reps: '30 sek/stronę' },
        ]
      }
    ]
  },
  {
    id: 'beginner-2',
    name: 'Upper/Lower Split - 4 dni',
    level: 'beginner',
    levelLabel: 'Początkujący',
    goal: 'Podział na górę i dół ciała, zwiększenie objętości treningowej',
    daysPerWeek: 4,
    duration: '50-60 min',
    description: 'Plan dla osób, które opanowały podstawy i chcą zwiększyć częstotliwość treningów.',
    days: [
      {
        day: 1,
        name: 'Górna część ciała A',
        exercises: [
          { name: 'Rozgrzewka', sets: '-', reps: '8 min' },
          { name: 'Wyciskanie sztangi na ławce płaskiej', sets: '4', reps: '8' },
          { name: 'Wiosłowanie sztangą', sets: '4', reps: '8' },
          { name: 'Wyciskanie hantli na ławce skośnej', sets: '3', reps: '10' },
          { name: 'Ściąganie drążka szerokim chwytem', sets: '3', reps: '10' },
          { name: 'OHP (wyciskanie nad głowę)', sets: '3', reps: '8' },
          { name: 'Wznosy hantli bokiem', sets: '3', reps: '12' },
        ]
      },
      {
        day: 2,
        name: 'Dolna część ciała A',
        exercises: [
          { name: 'Rozgrzewka', sets: '-', reps: '8 min' },
          { name: 'Przysiad ze sztangą', sets: '4', reps: '8' },
          { name: 'Martwy ciąg rumuński', sets: '4', reps: '8' },
          { name: 'Hack przysiad', sets: '3', reps: '10' },
          { name: 'Uginanie nóg', sets: '3', reps: '12' },
          { name: 'Wypychanie ciężaru na suwnicy', sets: '3', reps: '15' },
          { name: 'Plank', sets: '3', reps: '45 sek' },
        ]
      },
      {
        day: 3,
        name: 'Górna część ciała B',
        exercises: [
          { name: 'Rozgrzewka', sets: '-', reps: '8 min' },
          { name: 'Podciąganie na drążku', sets: '4', reps: '6-8' },
          { name: 'Wyciskanie hantli leżąc', sets: '4', reps: '10' },
          { name: 'Wiosłowanie hantlą w podporze', sets: '3', reps: '10' },
          { name: 'Rozpiętki hantli', sets: '3', reps: '12' },
          { name: 'Uginanie ramion ze sztangą', sets: '3', reps: '10' },
          { name: 'Prostowanie ramion na wyciągu', sets: '3', reps: '12' },
        ]
      },
      {
        day: 4,
        name: 'Dolna część ciała B',
        exercises: [
          { name: 'Rozgrzewka', sets: '-', reps: '8 min' },
          { name: 'Martwy ciąg klasyczny', sets: '4', reps: '6' },
          { name: 'Przysiad bułgarski', sets: '3', reps: '10/nogę' },
          { name: 'Wyprosty nóg', sets: '3', reps: '12' },
          { name: 'Uginanie nóg', sets: '3', reps: '12' },
          { name: 'Wspięcia na palce stojąc', sets: '4', reps: '15' },
          { name: 'Unoszenie nóg w zwisie', sets: '3', reps: '12' },
        ]
      }
    ]
  },

  // średniozaawansowany
  {
    id: 'intermediate-1',
    name: 'Push Pull Legs - 6 dni',
    level: 'intermediate',
    levelLabel: 'Średniozaawansowany',
    goal: 'Zwiększenie masy i siły mięśniowej, wyższa częstotliwość treningowa',
    daysPerWeek: 6,
    duration: '60-75 min',
    description: 'Klasyczny split PPL dla osób trenujących regularnie min. rok.',
    days: [
      {
        day: 1,
        name: 'PUSH A (Klatka/Barki/Triceps)',
        exercises: [
          { name: 'Wyciskanie sztangi na ławce płaskiej', sets: '4', reps: '6-8' },
          { name: 'Wyciskanie hantli na ławce skośnej', sets: '4', reps: '8-10' },
          { name: 'OHP sztangą', sets: '4', reps: '6-8' },
          { name: 'Wznosy hantli bokiem', sets: '3', reps: '12' },
          { name: 'Prostowanie ramion na wyciągu', sets: '3', reps: '12' },
          { name: 'Wyciskanie francuskie', sets: '3', reps: '10' },
        ]
      },
      {
        day: 2,
        name: 'PULL A (Plecy/Biceps)',
        exercises: [
          { name: 'Martwy ciąg klasyczny', sets: '4', reps: '5-6' },
          { name: 'Podciąganie na drążku', sets: '4', reps: '8-10' },
          { name: 'Wiosłowanie sztangą', sets: '4', reps: '8' },
          { name: 'Ściąganie drążka wąskim chwytem', sets: '3', reps: '10' },
          { name: 'Uginanie ramion ze sztangą', sets: '3', reps: '10' },
          { name: 'Uginanie ramion z hantlami', sets: '3', reps: '12' },
        ]
      },
      {
        day: 3,
        name: 'LEGS A (Nogi/Brzuch)',
        exercises: [
          { name: 'Przysiad ze sztangą', sets: '5', reps: '5-6' },
          { name: 'Hack przysiad', sets: '4', reps: '10' },
          { name: 'Martwy ciąg rumuński', sets: '4', reps: '8' },
          { name: 'Uginanie nóg', sets: '3', reps: '12' },
          { name: 'Wspięcia na palce', sets: '4', reps: '15' },
          { name: 'Brzuszki z obciążeniem', sets: '3', reps: '15' },
        ]
      },
      {
        day: 4,
        name: 'PUSH B',
        exercises: [
          { name: 'Wyciskanie hantli na ławce skośnej', sets: '4', reps: '8-10' },
          { name: 'Wyciskanie sztangi na ławce płaskiej', sets: '4', reps: '8' },
          { name: 'Wznosy hantli przodem', sets: '3', reps: '10' },
          { name: 'Rozpiętki na wyciągu', sets: '3', reps: '12' },
          { name: 'Dipy na poręczach', sets: '3', reps: '10' },
          { name: 'Pompki diamentowe', sets: '3', reps: 'max' },
        ]
      },
      {
        day: 5,
        name: 'PULL B',
        exercises: [
          { name: 'Wiosłowanie hantlą w podporze', sets: '4', reps: '8' },
          { name: 'Podciąganie chwytem neutralnym', sets: '4', reps: '8-10' },
          { name: 'Ściąganie drążka szerokim chwytem', sets: '4', reps: '10' },
          { name: 'Wiosłowanie na wyciągu dolnym', sets: '3', reps: '12' },
          { name: 'Uginanie ramion młotkiem', sets: '3', reps: '12' },
          { name: 'Uginanie ramion na wyciągu', sets: '3', reps: '15' },
        ]
      },
      {
        day: 6,
        name: 'LEGS B',
        exercises: [
          { name: 'Przysiad przedni', sets: '4', reps: '8' },
          { name: 'Wyprosty nóg', sets: '4', reps: '12' },
          { name: 'Martwy ciąg na prostych nogach', sets: '4', reps: '10' },
          { name: 'Wykroki ze sztangą', sets: '3', reps: '10/nogę' },
          { name: 'Wspięcia na palce siedząc', sets: '4', reps: '20' },
          { name: 'Plank', sets: '3', reps: '60 sek' },
        ]
      }
    ]
  },

  // zaawansowany
  {
    id: 'advanced-1',
    name: 'Arnold Split - 6 dni',
    level: 'advanced',
    levelLabel: 'Zaawansowany',
    goal: 'Maksymalizacja hipertrofii mięśniowej, wysoka objętość treningowa',
    daysPerWeek: 6,
    duration: '75-90 min',
    description: 'Klasyczny split Arnolda Schwarzeneggera dla zaawansowanych.',
    days: [
      {
        day: 1,
        name: 'Klatka + Plecy',
        exercises: [
          { name: 'Wyciskanie sztangi na ławce płaskiej', sets: '5', reps: '6-8' },
          { name: 'Wyciskanie hantli na skosie', sets: '4', reps: '8-10' },
          { name: 'Rozpiętki hantli', sets: '4', reps: '12' },
          { name: 'Martwy ciąg', sets: '5', reps: '5' },
          { name: 'Wiosłowanie sztangą', sets: '4', reps: '8' },
          { name: 'Podciąganie', sets: '4', reps: '10' },
          { name: 'Wiosłowanie hantlą', sets: '4', reps: '10' },
        ]
      },
      {
        day: 2,
        name: 'Barki + Ramiona',
        exercises: [
          { name: 'OHP sztangą', sets: '5', reps: '6-8' },
          { name: 'Wznosy hantli bokiem', sets: '4', reps: '12' },
          { name: 'Wznosy hantli przodem', sets: '4', reps: '12' },
          { name: 'Facepulls', sets: '3', reps: '15' },
          { name: 'Uginanie ramion sztangą', sets: '4', reps: '8-10' },
          { name: 'Uginanie hantlami', sets: '4', reps: '10' },
          { name: 'Wyciskanie francuskie', sets: '4', reps: '10' },
          { name: 'Dipy', sets: '4', reps: '12' },
        ]
      },
      {
        day: 3,
        name: 'Nogi',
        exercises: [
          { name: 'Przysiad ze sztangą', sets: '5', reps: '5-6' },
          { name: 'Hack przysiad', sets: '4', reps: '10' },
          { name: 'Wyprosty nóg', sets: '4', reps: '12' },
          { name: 'Martwy ciąg rumuński', sets: '4', reps: '8' },
          { name: 'Uginanie nóg', sets: '4', reps: '12' },
          { name: 'Wspięcia na palce stojąc', sets: '5', reps: '15' },
          { name: 'Wspięcia siedząc', sets: '4', reps: '20' },
        ]
      },
      {
        day: 4,
        name: 'Klatka + Plecy (vol. 2)',
        exercises: [
          { name: 'Wyciskanie hantli płasko', sets: '4', reps: '8-10' },
          { name: 'Wyciskanie na maszynie', sets: '4', reps: '12' },
          { name: 'Rozpiętki na wyciągu', sets: '4', reps: '15' },
          { name: 'Wiosłowanie hantlą', sets: '4', reps: '8' },
          { name: 'Ściąganie drążka', sets: '4', reps: '10' },
          { name: 'Wiosłowanie dolne', sets: '4', reps: '12' },
          { name: 'Pullover', sets: '3', reps: '12' },
        ]
      },
      {
        day: 5,
        name: 'Barki + Ramiona (vol. 2)',
        exercises: [
          { name: 'OHP hantlami', sets: '4', reps: '8-10' },
          { name: 'Arnoldki', sets: '4', reps: '10' },
          { name: 'Wznosy na tylne', sets: '4', reps: '12' },
          { name: 'Uginanie młotkiem', sets: '4', reps: '10' },
          { name: 'Uginanie na modlitewniku', sets: '4', reps: '12' },
          { name: 'Prostowanie na wyciągu', sets: '4', reps: '12' },
          { name: 'Kick-backi', sets: '3', reps: '15' },
        ]
      },
      {
        day: 6,
        name: 'Nogi (vol. 2)',
        exercises: [
          { name: 'Przysiad przedni', sets: '4', reps: '8' },
          { name: 'Przysiad bułgarski', sets: '4', reps: '10/nogę' },
          { name: 'Wypychanie ciężaru', sets: '4', reps: '12' },
          { name: 'Martwy ciąg na prostych', sets: '4', reps: '10' },
          { name: 'Nordic curls', sets: '3', reps: '8' },
          { name: 'Wspięcia w maszynie', sets: '5', reps: '20' },
        ]
      }
    ]
  }
];