/*
 * Cette fonction affiche le score du joueur
 * Elle prend en paramètre le score du joueur et le nombre total de mots proposés
 */
function afficherResultat(score, nbMotsProposes) {
    console.log("Votre score est de " + score + " sur " + nbMotsProposes)
}

/* 
 * Cette fonction demande à l'utilisateur de choisir entre une liste de phrases et une liste de mots
 * Elle retourne le choix de l'utilisateur
 */
function choisirPhrasesOuMots() {
    let choix = prompt("Avec quelle liste désirez-vous jouer : 'mots' ou 'phrases' ?")
    while (choix !== "mots" && choix !== "phrases") {
        // Tant que l'utilisateur n'a pas saisi "mots" ou "phrases", on lui redemande de saisir un choix
        choix = prompt("Avec quelle liste désirez-vous jouer : 'mots' ou 'phrases' ?")
    }
    return choix
}

/* 
 * Cette fonction répète la demande de phrases ou de mots par le biais d'une boucle for
 * Elle prend en paramètre une liste de phrases ou de mots
 * Elle retourne le nombre de propositions correctement tapées
 */
function lancerBoucleDeJeu(listePropositions) {
    let score = 0
    for (let i = 0; i < listePropositions.length; i++) {
        // On demande à l'utilisateur de saisir le texte correspondant à l'indice i
        let texteUtilisateur = prompt("Entrez le texte suivant : " + listePropositions[i])
        if (texteUtilisateur === listePropositions[i]) {
            // Si le texte saisi par l'utilisateur est correct, on incrémente le score
            score++
        }
    }
    return score
}

// Fonction principale
function lancerJeu() {
    let choix = choisirPhrasesOuMots()
    let score = 0
    let nbMotsProposes = 0

    if (choix === "mots") {
        score = lancerBoucleDeJeu(listeMots)
        nbMotsProposes = listeMots.length
    } else {
        score = lancerBoucleDeJeu(listePhrases)
        nbMotsProposes = listePhrases.length
    }

    afficherResultat(score, nbMotsProposes)
}
