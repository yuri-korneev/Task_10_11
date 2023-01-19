// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minWeightInput = document.querySelector('.minweight__input');
const maxWeightInput = document.querySelector('.maxweight__input');

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
 

  const removeElements = fruitsList.querySelectorAll('li');  
  removeElements.forEach(elements => elements.remove());
  
 
  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild

    let fruit = document.createElement('li');
    let fruitInfo = document.createElement('div');
      
    fruit.className = 'fruit__item';
    fruitInfo.className = 'fruit__info';

    fruitInfo.innerHTML=`<div>index: ${i+1}</div>
    <div>kind: ${fruits[i].kind}</div>
    <div>color: ${fruits[i].color}</div>
    <div>weight (кг): ${fruits[i].weight}</div>`;
    
    let color = fruits[i].color;

    if (color == 'фиолетовый') {
      fruit.classList.add('fruit_violet');
    }
    else if (color == 'зеленый') {
      fruit.classList.add('fruit_green');
    }
    else if (color == 'розово-красный') {
      fruit.classList.add('fruit_carmazin');
    }
    else if (color == 'желтый') {
      fruit.classList.add('fruit_yellow');
    }
    else if (color == 'светло-коричневый') {
      fruit.classList.add('fruit_lightbrown');   
    }
    else if (color == 'красный') {
      fruit.classList.add('fruit_red');   
    }
    else if (color == 'оранжевый') {
      fruit.classList.add('fruit_orange');   
    }
    else if (color == 'синий') {
      fruit.classList.add('fruit_blue');   
    }
    else if (color == 'голубой') {
      fruit.classList.add('fruit_lightblue');   
    }
    else {
        fruit.classList.add('fruit_black');      
    }

    fruitsList.appendChild(fruit);
    fruit.appendChild(fruitInfo); 
      
  }
  
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {

  let result = [];  

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
   while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    let randomIndex = getRandomInt(0,fruits.length-1);
    result.unshift(fruits[randomIndex]);
    fruits.splice(randomIndex, 1);
  }

  if (JSON.stringify(fruits) === JSON.stringify(result)) {
    alert('При перемешивании порядок фруктов не изменился, попробуйте еще раз');
  } else {
  fruits = result;
  }
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();  
});

/*** ФИЛЬТРАЦИЯ ***/


// фильтрация массива
const filterFruits = () => {
  fruits = fruits.filter((element) => {   
    // TODO: допишите функцию
   return element.weight >= minWeightInput.value && element.weight <= maxWeightInput.value;
  });  
};


filterButton.addEventListener('click', () => {
  fruits = JSON.parse(fruitsJSON);

  if (minWeightInput.value === '' || maxWeightInput.value === '') {
    alert('Поверьте, заполнены ли все поля');
    display();
  }
  else {
    filterFruits();
    display();
  }

  
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  const rainbow = ['красный','розово-красный','оранжевый','светло-коричневый','желтый','зеленый','голубой','синий','фиолетовый'];
  let fruit1 = rainbow.indexOf(a.color);
  let fruit2 = rainbow.indexOf(b.color);
  return fruit1 > fruit2 ? true : false;

};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
    const n = arr.length;
   // внешняя итерация по элементам
   for (let i = 0; i < n-1; i++) { 
       // внутренняя итерация для перестановки элемента в конец массива
       for (let j = 0; j < n-1-i; j++) { 
           // сравниваем элементы
           if (comparation(arr[j], arr[j+1])) { 
               // делаем обмен элементов
               let temp = arr[j+1]; 
               arr[j+1] = arr[j]; 
               arr[j] = temp; 
           }
       }
   }                    
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки

    // функция обмена элементов
    function swap(items, firstIndex, secondIndex) {
      const temp = items[firstIndex];
      items[firstIndex] = items[secondIndex];
      items[secondIndex] = temp;
   }
    
   // функция разделитель
   function partition(items, left, right) {
    let pivot = items[Math.floor((right + left) / 2)],
        i = left,
        j = right;
    while (i <= j) {
        while (comparation(pivot, items[i])) {
            i++;
        }
        while (comparation(items[j], pivot)) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }
    return i;
 }

 // алгоритм быстрой сортировки
  function algorithmQuickSort(items, left, right) {
    let index;
    if (items.length > 1) {
      left = typeof left != "number" ? 0 : left;
      right = typeof right != "number" ? items.length - 1 : right;
      index = partition(items, left, right);
      if (left < index - 1) {
        algorithmQuickSort(items, left, index - 1);
      }
      if (index < right) {
        algorithmQuickSort(items, index, right);
      }
  }
    return items;    
  }

  algorithmQuickSort(arr);
  
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();   
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  if (sortKind === 'bubbleSort') {
    sortKind = 'quickSort';
  } else {
    sortKind = 'bubbleSort';
  }
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  sortTimeLabel.textContent = 'sorting...';

  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();

  // TODO: вывести в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  if (kindInput.value === '' || colorInput.value === '' || weightInput.value === '') {
    alert('Поверьте, заполнены ли все поля');
  } else {
    fruits.push({
      "kind": kindInput.value,
      "color": colorInput.value,
      "weight": weightInput.value,
    })
  display();
  }
});
