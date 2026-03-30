// Отображение кода функции
function displayCode() {
    const codeBlock = document.getElementById('codeBlock');
    if (codeBlock && window.isValidBrackets) {
        const code = window.isValidBrackets.toString();
        codeBlock.textContent = code;
    }
}

// Проверка и отображение результата
function checkAndDisplay() {
    const input = document.getElementById('bracketInput');
    const resultDiv = document.getElementById('result');
    const inputValue = input.value;
    
    const isValid = isValidBrackets(inputValue);
    
    const displayValue = inputValue === '' ? '(пустая строка)' : inputValue;
    
    if (isValid) {
        resultDiv.innerHTML = `
            <div class="result-text">✅ Правильная последовательность</div>
            <div class="result-detail">"${escapeHtml(displayValue)}" — скобки расставлены корректно</div>
        `;
        resultDiv.className = 'result result-valid';
    } else {
        resultDiv.innerHTML = `
            <div class="result-text">❌ Неправильная последовательность</div>
            <div class="result-detail">"${escapeHtml(displayValue)}" — ошибка в расстановке скобок</div>
        `;
        resultDiv.className = 'result result-invalid';
    }
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

// Запуск всех тестов (для демонстрации)
function runAllTests() {
    const tests = [
        { input: "", expected: true, name: "Пустая строка" },
        { input: "()", expected: true, name: "Простые круглые" },
        { input: "()[]{}", expected: true, name: "Все типы" },
        { input: "(]", expected: false, name: "Несовпадающие" },
        { input: "([)]", expected: false, name: "Неправильный порядок" },
        { input: "{[]}", expected: true, name: "Правильная вложенность" },
        { input: "{[()]}", expected: true, name: "Сложная вложенность" },
        { input: "(((", expected: false, name: "Только открывающие" },
        { input: ")))", expected: false, name: "Только закрывающие" },
        { input: "([{}])", expected: true, name: "Симметричная" },
        { input: "([{", expected: false, name: "Незакрытые" },
        { input: "}])", expected: false, name: "Лишние закрывающие" }
    ];
    
    console.log("=== ЗАПУСК ТЕСТОВ ===\n");
    let passed = 0;
    let failed = 0;
    
    for (const test of tests) {
        const result = isValidBrackets(test.input);
        const status = result === test.expected ? "✅" : "❌";
        const displayInput = test.input === "" ? "(пусто)" : test.input;
        
        if (result === test.expected) {
            passed++;
            console.log(`${status} ${test.name}: "${displayInput}" → ${result}`);
        } else {
            failed++;
            console.log(`${status} ${test.name}: "${displayInput}" → ожидалось ${test.expected}, получено ${result}`);
        }
    }
    
    console.log(`\n📊 Результаты: ${passed} пройдено, ${failed} не пройдено (всего ${tests.length})`);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    displayCode();
    
    const checkBtn = document.getElementById('checkBtn');
    const input = document.getElementById('bracketInput');
    
    // Проверка по кнопке
    if (checkBtn) {
        checkBtn.addEventListener('click', checkAndDisplay);
    }
    
    // Проверка по Enter
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkAndDisplay();
            }
        });
    }
    
    // Обработчики для примеров
    const exampleCards = document.querySelectorAll('.example-card');
    exampleCards.forEach(card => {
        card.addEventListener('click', () => {
            const value = card.getAttribute('data-value');
            if (value !== undefined && input) {
                input.value = value;
                checkAndDisplay();
            }
        });
    });
    
    // Запускаем тесты в консоль
    console.log('Алгоритм проверки скобок загружен. Вызовите runAllTests() для запуска всех тестов.');
    
    // Делаем функцию доступной в консоли
    window.runAllTests = runAllTests;
    
    // Автоматическая проверка примера по умолчанию
    setTimeout(() => {
        checkAndDisplay();
    }, 100);
});