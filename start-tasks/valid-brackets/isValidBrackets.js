/**
 * Проверка правильной последовательности скобок
 * @param {string} s - Строка, содержащая скобки (), [], {}
 * @returns {boolean} - true, если последовательность правильная, иначе false
 */
function isValidBrackets(s) {
    // Пустая строка считается правильной
    if (s.length === 0) return true;
    
    // Если длина нечётная, последовательность точно неправильная
    if (s.length % 2 !== 0) return false;
    
    // Стек для хранения открывающих скобок
    const stack = [];
    
    // Соответствие закрывающей скобки открывающей
    const brackets = {
        ')': '(',
        ']': '[',
        '}': '{'
    };
    
    // Множество открывающих скобок для быстрой проверки
    const openingBrackets = new Set(['(', '[', '{']);
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        
        // Если это открывающая скобка, кладём в стек
        if (openingBrackets.has(char)) {
            stack.push(char);
        } 
        // Если это закрывающая скобка
        else if (brackets[char]) {
            // Если стек пуст — нет соответствующей открывающей скобки
            if (stack.length === 0) return false;
            
            // Проверяем, соответствует ли последняя открывающая скобка
            const lastOpening = stack.pop();
            if (lastOpening !== brackets[char]) {
                return false;
            }
        }
        // Если символ не является скобкой — можно игнорировать или вернуть false
        // По условию задачи в строке только скобки, но добавим проверку
        else {
            return false;
        }
    }
    
    // После обработки всех символов стек должен быть пустым
    return stack.length === 0;
}

// Экспорт для Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = isValidBrackets;
}

// Делаем функцию доступной глобально для браузера
if (typeof window !== 'undefined') {
    window.isValidBrackets = isValidBrackets;
}