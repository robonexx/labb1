


// Gör en random number generator
function random(min, max) {
    return Math.floor(Math.random() * (max-min + 1) + min)
}

function countVowel(str) { 

    // hittar antalet vokaler
    const count = str.match(/[aeiou]/gi).length;

    // returnerar vokalerna
    return count;
}


// exporterar funktionerna
module.exports = {
    random,
    countVowel,
}