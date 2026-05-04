// Déclaration du tableau contenant la liste des mots proposés à l'utilisateur
const listeMots = ["Cachalot", "Pétunia", "Serviette"]
// Déclaration du tableau contenant la liste des phrases proposés à l'utilisateur
const listePhrases = ["Pas de panique !", "La vie, l'univers et le reste", "Merci pour le poisson"]
// Initialisation du score de l'utilisateur à 0
let score = 0

// Choix de l'utilisateur entre une liste de mots et une liste de phrases
let choix = prompt("Avec quelle liste désirez-vous jouer : 'mots' ou 'phrases' ?")
while (choix !== "mots" && choix !== "phrases") {
    // Tant que l'utilisateur n'a pas saisi "mots" ou "phrases", on lui redemande de saisir un choix
    choix = prompt("Avec quelle liste désirez-vous jouer : 'mots' ou 'phrases' ?")
}

if (choix === "mots") {
    // On parcourt le tableau des mots
    for (let i = 0; i < listeMots.length; i++) {
        // On demande à l'utilisateur de saisir le mot correspondant à l'indice i
        let motUtilisateur = prompt("Entrez le mot : " + listeMots[i])
        if (motUtilisateur === listeMots[i]) {
            // Si le mot saisi par l'utilisateur est correct, on incrémente le score
            score++
        }
    }
    console.log("Votre score est de " + score + " sur " + listeMots.length)
} else {
    // On parcourt le tableau des phrases
    for (let i = 0; i < listePhrases.length; i++) {
        // On demande à l'utilisateur de saisir la phrase correspondante à l'indice i
        let phraseUtilisateur = prompt("Entrez la phrase : " + listePhrases[i])
        if (phraseUtilisateur === listePhrases[i]) {
            // Si la phrase saisie par l'utilisateur est correct, on incrémente le score
            score++
        }
    }
    console.log("Votre score est de " + score + " sur " + listePhrases.length)
}
