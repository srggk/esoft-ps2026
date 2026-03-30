// Массив для хранения результатов тестов
let testResults = [];

function runAllTests() {
    testResults = [];
    
    // Запускаем все тесты
    testPrimitives();
    testSimpleObject();
    testNestedObject();
    testArray();
    testDate();
    testMap();
    testSet();
    testRegExp();
    testCircularReference();
    testFunction();
    testSymbol();
    testPrototype();
    testComplexMixed();
    
    // Отображаем результаты
    displayResults();
}

function addTestResult(name, passed, details = '') {
    testResults.push({ name, passed, details });
}

// Тест 1: Примитивы
function testPrimitives() {
    const tests = [
        { input: 42, expected: 42, name: 'Число' },
        { input: 'hello', expected: 'hello', name: 'Строка' },
        { input: true, expected: true, name: 'Boolean' },
        { input: null, expected: null, name: 'null' },
        { input: undefined, expected: undefined, name: 'undefined' }
    ];
    
    for (const test of tests) {
        const result = deepClone(test.input);
        const passed = result === test.expected;
        addTestResult(`Примитив: ${test.name}`, passed, 
                      `Вход: ${test.input} → Результат: ${result}`);
    }
}

// Тест 2: Простой объект
function testSimpleObject() {
    const obj = { a: 1, b: 2, c: 3 };
    const copy = deepClone(obj);
    const passed = copy !== obj && copy.a === 1 && copy.b === 2 && copy.c === 3;
    addTestResult('Простой объект', passed, 
                  `Копия создана: ${copy !== obj}, значения: ${JSON.stringify(copy)}`);
}

// Тест 3: Вложенные объекты
function testNestedObject() {
    const nested = { a: { b: { c: 1, d: [2, 3] } } };
    const copy = deepClone(nested);
    const passed = copy !== nested && 
                   copy.a !== nested.a && 
                   copy.a.b !== nested.a.b &&
                   copy.a.b.c === 1;
    addTestResult('Вложенные объекты', passed, 
                  `Глубокое копирование: ${passed}`);
}

// Тест 4: Массивы
function testArray() {
    const arr = [1, [2, 3], { x: 4, y: [5, 6] }];
    const copy = deepClone(arr);
    const passed = copy !== arr && 
                   copy[1] !== arr[1] && 
                   copy[2] !== arr[2] &&
                   copy[2].y !== arr[2].y;
    addTestResult('Массивы', passed, 
                  `Вложенные структуры скопированы: ${passed}`);
}

// Тест 5: Date
function testDate() {
    const date = new Date('2024-03-30T12:00:00Z');
    const copy = deepClone(date);
    const passed = copy !== date && copy.getTime() === date.getTime();
    addTestResult('Date', passed, 
                  `Оригинал: ${date.toISOString()}, Копия: ${copy.toISOString()}`);
}

// Тест 6: Map
function testMap() {
    const map = new Map([
        ['key1', { value: 123 }],
        ['key2', [1, 2, 3]]
    ]);
    const copy = deepClone(map);
    const passed = copy !== map && 
                   copy.get('key1') !== map.get('key1') &&
                   copy.get('key2') !== map.get('key2');
    addTestResult('Map', passed, 
                  `Размер карты: ${copy.size}, глубокое копирование: ${passed}`);
}

// Тест 7: Set
function testSet() {
    const set = new Set([{ id: 1, data: [10, 20] }, { id: 2 }]);
    const copy = deepClone(set);
    const arrOriginal = Array.from(set);
    const arrCopy = Array.from(copy);
    const passed = copy !== set && 
                   arrCopy[0] !== arrOriginal[0] &&
                   arrCopy[1] !== arrOriginal[1];
    addTestResult('Set', passed, 
                  `Размер: ${copy.size}, элементы скопированы глубоко`);
}

// Тест 8: RegExp
function testRegExp() {
    const regex = /[a-z]+/gi;
    const copy = deepClone(regex);
    const passed = copy !== regex && 
                   copy.source === regex.source && 
                   copy.flags === regex.flags;
    addTestResult('RegExp', passed, 
                  `Оригинал: ${regex}, Копия: ${copy}`);
}

// Тест 9: Циклические ссылки
function testCircularReference() {
    const circular = { name: 'cycle', arr: [1, 2, 3] };
    circular.self = circular;
    circular.arr.push(circular);
    
    let passed = false;
    let error = null;
    
    try {
        const copy = deepClone(circular);
        passed = copy !== circular && 
                 copy.self === copy && 
                 copy.arr[3] === copy &&
                 copy.name === 'cycle';
    } catch (e) {
        error = e.message;
        passed = false;
    }
    
    addTestResult('Циклические ссылки', passed, 
                  error ? `Ошибка: ${error}` : `Цикл корректно обработан`);
}

// Тест 10: Функции
function testFunction() {
    const obj = {
        name: 'test',
        multiply: function(x, y) { return x * y; },
        arrow: (a) => a * 2
    };
    const copy = deepClone(obj);
    const passed = typeof copy.multiply === 'function' && 
                   copy.multiply(3, 4) === 12 &&
                   typeof copy.arrow === 'function' &&
                   copy.arrow(5) === 10;
    addTestResult('Функции', passed, 
                  `Функции сохранены и работают: ${passed}`);
}

// Тест 11: Символы
function testSymbol() {
    const sym1 = Symbol('id');
    const sym2 = Symbol('secret');
    const obj = {
        [sym1]: 'symbol value 1',
        [sym2]: { nested: 'symbol value 2' },
        regular: 123
    };
    const copy = deepClone(obj);
    const passed = copy[sym1] === 'symbol value 1' && 
                   copy[sym2] !== obj[sym2] &&
                   copy[sym2].nested === 'symbol value 2' &&
                   copy.regular === 123;
    addTestResult('Символы', passed, 
                  `Свойства-символы сохранены и скопированы`);
}

// Тест 12: Прототип
function testPrototype() {
    class Animal {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
        speak() {
            return `${this.name} издаёт звук`;
        }
        getInfo() {
            return `${this.name}, ${this.age} лет`;
        }
    }
    
    class Dog extends Animal {
        constructor(name, age, breed) {
            super(name, age);
            this.breed = breed;
        }
        speak() {
            return `${this.name} гавкает`;
        }
    }
    
    const dog = new Dog('Rex', 5, 'Овчарка');
    const copy = deepClone(dog);
    
    const passed = copy !== dog &&
                   Object.getPrototypeOf(copy) === Dog.prototype &&
                   copy instanceof Dog &&
                   copy.name === 'Rex' &&
                   copy.age === 5 &&
                   copy.breed === 'Овчарка' &&
                   copy.speak() === 'Rex гавкает';
    
    addTestResult('Прототип и классы', passed, 
                  `Прототип сохранён: ${Object.getPrototypeOf(copy).constructor.name === 'Dog'}`);
}

// Тест 13: Сложные смешанные типы
function testComplexMixed() {
    const complex = {
        id: 1,
        name: 'Complex Object',
        createdAt: new Date(),
        tags: new Set(['important', 'test']),
        metadata: new Map([
            ['author', { name: 'John', contacts: new Map([['email', 'john@example.com']]) }],
            ['version', 2]
        ]),
        data: [
            { id: 1, values: [10, 20, 30] },
            { id: 2, values: new Set([40, 50]) }
        ],
        circularRef: null
    };
    
    // Добавляем циклическую ссылку
    complex.circularRef = complex;
    complex.data[0].parent = complex;
    
    let passed = false;
    let error = null;
    
    try {
        const copy = deepClone(complex);
        passed = copy !== complex &&
                 copy.data !== complex.data &&
                 copy.data[0] !== complex.data[0] &&
                 copy.data[0].values !== complex.data[0].values &&
                 copy.metadata.get('author') !== complex.metadata.get('author') &&
                 copy.metadata.get('author').contacts !== complex.metadata.get('author').contacts &&
                 copy.tags !== complex.tags &&
                 copy.circularRef === copy &&
                 copy.data[0].parent === copy;
    } catch (e) {
        error = e.message;
        passed = false;
    }
    
    addTestResult('Сложные смешанные типы', passed, 
                  error ? `Ошибка: ${error}` : `Все типы скопированы корректно`);
}

// Отображение результатов в HTML
function displayResults() {
    const resultsDiv = document.getElementById('results');
    const passedCount = testResults.filter(r => r.passed).length;
    const failedCount = testResults.filter(r => !r.passed).length;
    const totalCount = testResults.length;
    
    let html = '';
    
    for (const result of testResults) {
        const statusClass = result.passed ? 'test-pass' : 'test-fail';
        const icon = result.passed ? '✅' : '❌';
        html += `
            <div class="test-item ${statusClass}">
                <div class="test-icon">${icon}</div>
                <div class="test-message">
                    <strong>${result.name}</strong><br>
                    <span style="font-size: 12px; color: #94a3b8;">${escapeHtml(result.details)}</span>
                </div>
            </div>
        `;
    }
    
    const summaryClass = failedCount === 0 ? 'summary-pass' : 'summary-fail';
    const summaryIcon = failedCount === 0 ? '🎉' : '⚠️';
    
    html += `
        <div class="summary ${summaryClass}">
            ${summaryIcon} Результаты: ${passedCount} пройдено / ${failedCount} не пройдено / ${totalCount} всего
        </div>
    `;
    
    resultsDiv.innerHTML = html;
}

// Вспомогательная функция для экранирования HTML
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Отображение кода функции
function displayCode() {
    const codeBlock = document.getElementById('codeBlock');
    if (codeBlock && window.deepClone) {
        const code = window.deepClone.toString();
        codeBlock.textContent = code;
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    displayCode();
    
    const runBtn = document.getElementById('runTests');
    const clearBtn = document.getElementById('clearResults');
    
    if (runBtn) {
        runBtn.addEventListener('click', runAllTests);
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            const resultsDiv = document.getElementById('results');
            if (resultsDiv) {
                resultsDiv.innerHTML = '<div class="info-message">Результаты очищены. Нажмите "Запустить тесты" для проверки.</div>';
            }
            testResults = [];
        });
    }
});