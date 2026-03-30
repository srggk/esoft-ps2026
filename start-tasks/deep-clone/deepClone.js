/**
 * Функция глубокого копирования объекта
 * @param {any} obj - Исходный объект для копирования
 * @param {WeakMap} cache - Кэш для обработки циклических ссылок
 * @returns {any} - Глубокая копия объекта
 */
function deepClone(obj, cache = new WeakMap()) {
    // Обработка примитивных типов, null, undefined
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // Проверка на циклические ссылки
    if (cache.has(obj)) {
        return cache.get(obj);
    }

    // Обработка Date
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }

    // Обработка Map
    if (obj instanceof Map) {
        const copy = new Map();
        cache.set(obj, copy);
        for (const [key, value] of obj) {
            copy.set(deepClone(key, cache), deepClone(value, cache));
        }
        return copy;
    }

    // Обработка Set
    if (obj instanceof Set) {
        const copy = new Set();
        cache.set(obj, copy);
        for (const value of obj) {
            copy.add(deepClone(value, cache));
        }
        return copy;
    }

    // Обработка RegExp
    if (obj instanceof RegExp) {
        return new RegExp(obj.source, obj.flags);
    }

    // Обработка массива
    if (Array.isArray(obj)) {
        const copy = [];
        cache.set(obj, copy);
        for (let i = 0; i < obj.length; i++) {
            copy[i] = deepClone(obj[i], cache);
        }
        return copy;
    }

    // Обработка обычных объектов
    // Сохраняем прототип исходного объекта
    const copy = Object.create(Object.getPrototypeOf(obj));
    cache.set(obj, copy);

    // Копируем все собственные свойства (включая неперечисляемые и символы)
    const allProps = [
        ...Object.getOwnPropertyNames(obj),
        ...Object.getOwnPropertySymbols(obj)
    ];

    for (const key of allProps) {
        const descriptor = Object.getOwnPropertyDescriptor(obj, key);
        
        if (descriptor) {
            if (typeof descriptor.value === 'object' && descriptor.value !== null) {
                descriptor.value = deepClone(descriptor.value, cache);
            }
            Object.defineProperty(copy, key, descriptor);
        }
    }

    return copy;
}

// Делаем функцию доступной глобально для тестов
if (typeof window !== 'undefined') {
    window.deepClone = deepClone;
}

// Экспорт для Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = deepClone;
}