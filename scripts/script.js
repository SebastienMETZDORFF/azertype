/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires au fonctionnement du jeu. 
 * 
 *********************************************************************************/

/**
 * Cette fonction affiche dans la console le score de l'utilisateur
 * @param {number} score : le score de l'utilisateur
 * @param {number} nbMotsProposes : le nombre de mots proposés à l'utilisateur
 */
function afficherResultat(score, nbMotsProposes) {
    // Récupération de la zone dans laquelle on va écrire le score
    let spanScore = document.querySelector(".zoneScore span")
    // Ecriture du texte
    let affichageScore = `${score} / ${nbMotsProposes}`
    // On place le texte à l'intérieur du span
    spanScore.innerText = affichageScore
}

/**
 * Cette fonction affiche la proposition dans la div "zoneProposition"
 * @param {string} proposition : la proposition à afficher 
 */
function afficherProposition(proposition) {
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerText = proposition
}

/**
 * Cette fonction construit et affiche l'email. 
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @param {string} score : le score. 
 */
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}

/**
 * Cette fonction lance une exception si le nom du joueur est trop court
 * @param {string} nom : le nom du joueur
 * @throws {Error}
 */
function validerNom(nom) {
    if (nom.length < 2) {
        throw new Error("Le nom est trop court !")
    }
}

/**
 * Cette fonction lance une exception si l'email n'est pas valide
 * @param {string} email : l'email du joueur
 * @throws {Error}
 */
function validerEmail(email) {
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if (!emailRegExp.test(email)) {
        throw new Error("L'email n'est pas valide !")
    }
}

/**
 * Cette fonction gère l'événement "submit" du formulaire
 * @param {string} scoreEmail : le score à afficher dans l'email
 */
function gererFormulaire(scoreEmail) {
    try {
        let baliseNom = document.getElementById("nom")
        let nom = baliseNom.value
        validerNom(nom)

        let baliseEmail = document.getElementById("email")
        let email = baliseEmail.value
        validerEmail(email)

        afficherMessageErreur("")
        afficherEmail(nom, email, scoreEmail)
    } catch (error) {
        afficherMessageErreur(error.message)
    }
}

/**
 * Cette fonction affiche le message d'erreur à la fin du formulaire
 * @param {string} message : le message d'erreur 
 */
function afficherMessageErreur(message) {
    let spanErreurMessage = document.getElementById("erreurMessage")
    if (!spanErreurMessage) {
        let popup = document.querySelector(".popup")
        spanErreurMessage = document.createElement("span")
        spanErreurMessage.id = "erreurMessage"
        popup.append(spanErreurMessage)
    }
    spanErreurMessage.innerText = message
}

/**
 * Cette fonction lance le jeu. 
 * Elle demande à l'utilisateur de choisir entre "mots" et "phrases" et lance la boucle de jeu correspondante
 */
function lancerJeu() {
    // Initialisations
    initAddEventListenerPopup()
    let score = 0
    let i = 0
    let listePropositions = listeMots

    let btnValiderMot = document.getElementById("btnValiderMot")
    let inputEcriture = document.getElementById("inputEcriture")

    afficherProposition(listePropositions[i])
    
    // Gestion de l'événement click sur le bouton "Valider"
    btnValiderMot.addEventListener("click", () => {
        if (inputEcriture.value === listePropositions[i]) {
            score++
        }
        i++
        afficherResultat(score, i)
        inputEcriture.value = ""
        if (listePropositions[i] === undefined) {
            afficherProposition("Le jeu est fini")
            btnValiderMot.disabled = true
        } else {
            afficherProposition(listePropositions[i])
        }
    })

    // Gestion de l'événement change sur les boutons radios.
    let listeBtnRadio = document.querySelectorAll(".optionSource input")
    for (let j = 0; j < listeBtnRadio.length; j++) {
        listeBtnRadio[j].addEventListener("change", (event) => {
            /* Si c'est le premier élément qui a été modifié, alors nous voulons
               jouer avec la listeMots. */
            if (event.target.value === "1") {
                listePropositions = listeMots
            } else {
                // Sinon nous voulons jouer avec la liste des phrases
                listePropositions = listePhrases
            }
            // Et on modifie l'affichage en direct.
            afficherProposition(listePropositions[i])
        })
    }

    // Gestion de l'événement submit sur le formulaire de partage. 
    let form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let scoreEmail = `${score} / ${i}`
        gererFormulaire(scoreEmail)
    })

    afficherResultat(score, i)
}