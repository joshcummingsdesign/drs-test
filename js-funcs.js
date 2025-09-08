function calculateCircleArea(radius) {
    return Math.PI * radius * radius;
}

// Example usage:
console.log("Area of a circle with radius 5:", calculateCircleArea(5));

function isEven(number) {
    return number % 2 === 0;
}

// Example usage:
console.log("Is 10 even?", isEven(10)); // true
console.log("Is 7 even?", isEven(7)); // false

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Example usage:
console.log("Capitalized:", capitalizeFirstLetter("hello")); // "Hello"
console.log("Capitalized:", capitalizeFirstLetter("world")); // "World"

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Example usage:
const myArray = [1, 2, 3, 4, 5];
console.log("Shuffled array:", shuffleArray(myArray));
