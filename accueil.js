let tour = 0 // 0 -> X, 1 -> O
let joueur1_nom = "Joueur 1"
let joueur2_nom = "Joueur 2"
let statut_jeu = 0 /*
                    0 -> Non lancé
                    1 -> En cours
                    2 -> Egalité
                    3 -> Victoire/défaite
                        */

function init() {
    /*
    Initialisation du jeu quand le bouton jouer est cliqué
    =====================
    Paramètre : aucun
    ===================
    Retour : aucun
    */

    tour = 0
    document.getElementById("txt_joueur").innerHTML = "A " + joueur1_nom + " de jouer !";
    document.getElementById("bouton_jouer").innerHTML = "Recommencer";

    for (let i = 1; i < 10; i++) {
        document.getElementById("case" + i).innerHTML = ""; /* Vide les cases du jeu*/
        document.getElementById("case" + i).style.color = "#FFFFFF" //Remets les couleurs classiques
    }

    statut_jeu = 1;
}



function Case(number) {

    /*
    Fonction qui permet de jouer un tour en cliquant sur une case
    =====================
    Paramètre : number (int) qui représente la case sur laquelle le joueur a cliqué.
    ===================
    Retour : aucun
    */

    let boutton = document.getElementById("case" + number);
    if (statut_jeu === 0) {
        null
    } else if (statut_jeu === 1) {

    if (boutton.innerText !== "X") {
        if (boutton.innerText !== "O") {
            if (tour === 0) {
            boutton.innerHTML = "X";
            document.getElementById("txt_joueur").innerHTML = "A " + joueur2_nom + " de jouer !";
            tour = 1;
            fin_jeu();
                } 
            else if (tour === 1) {
            boutton.innerHTML = "O";
            document.getElementById("txt_joueur").innerHTML = "A " + joueur1_nom + " de jouer !";
            tour = 0;
            fin_jeu();
                }
            }
        }
    }
}

function fin_jeu() {

    /*
    Fonction qui permet de vérifier si le jeu est fini
    Appelle la fonction egalite() en cas d'égalité
    =====================
    Paramètre : aucun
    ===================
    Retour : aucun
    */

    const jeu = [] /* Tableau qui contient les valeurs des cases du jeu --> ['', '', '', '', '', '', '', '', '']*/
    for (let i = 1; i < 10; i++) {
        jeu.push(document.getElementById("case" + i).innerText)
    }

    console.log(jeu);
    egalite(jeu);
        
    if 
    (jeu[0] == "X" && jeu[1] == "X" && jeu[2] == "X") 
    {
        statut_jeu = 3;
        console.log(statut_jeu);
        document.getElementById("txt_joueur").innerHTML = "Victoire de "  + joueur1_nom + " !" 
    } // première ligne X
    else if  (jeu[0] == "O" && jeu[1] == "O" && jeu[2] == "O")
    {
        statut_jeu = 3;
        console.log(statut_jeu);
        document.getElementById("txt_joueur").innerHTML = "Victoire de "  + joueur2_nom + " !" 
    } // première ligne O 

    else if (jeu[3] == "X" && jeu[4] == "X" && jeu[5] == "X") 
    {
        statut_jeu = 3;
        console.log(statut_jeu);
        document.getElementById("txt_joueur").innerHTML = "Victoire de "  + joueur1_nom + " !" 
    
    }    // deuxième ligne X
    else if  (jeu[3] == "O" && jeu[4] == "O" && jeu[5] == "O") 
    {
        statut_jeu = 3;
        console.log(statut_jeu);
        document.getElementById("txt_joueur").innerHTML = "Victoire de "  + joueur2_nom + " !" 
    
    }    // deuxième ligne O 

    else if (jeu[6] == "X" && jeu[7] == "X" && jeu[8] == "X") 
    {
        statut_jeu = 3;
        console.log(statut_jeu);
        document.getElementById("txt_joueur").innerHTML = "Victoire de "  + joueur1_nom + " !" 
    
    }     // troisième ligne X
    else if (jeu[6] == "O" && jeu[7] == "O" && jeu[8] == "O")
    {
        statut_jeu = 3;
        console.log(statut_jeu);
        document.getElementById("txt_joueur").innerHTML = "Victoire de "  + joueur2_nom + " !" 
    
    }     // troisième ligne O
    else if (jeu[1] == "X" && jeu[4] == "X" && jeu[7] == "X") 
    {
        statut_jeu = 3;
        console.log(statut_jeu);
        document.getElementById("txt_joueur").innerHTML = "Victoire de "  + joueur1_nom + " !" 
    
    }    // deuxième colonne X
    else if (jeu[1] == "O" && jeu[4] == "O" && jeu[7] == "O") 
    {
        statut_jeu = 3;
        console.log(statut_jeu);
        document.getElementById("txt_joueur").innerHTML = "Victoire de "  + joueur2_nom + " !" 
    
    }    // deuxième colonne O 
    else if (jeu[0] == "X" && jeu[3] == "X" && jeu[6] == "X")
    {
        statut_jeu = 3;
        console.log(statut_jeu);
        document.getElementById("txt_joueur").innerHTML = "Victoire de "  + joueur1_nom + " !" 
    
    }  // première colonne X
    else if (jeu[0] == "O" && jeu[3] == "O" && jeu[6] == "O") 
    {
        statut_jeu = 3;
        console.log(statut_jeu);
        document.getElementById("txt_joueur").innerHTML = "Victoire de "  + joueur2_nom + " !" 
    
    }  // première colonne O 
    else if (jeu[2] == "X" && jeu[5] == "X" && jeu[8] == "X") 
    {
        statut_jeu = 3;
        console.log(statut_jeu);
        document.getElementById("txt_joueur").innerHTML = "Victoire de "  + joueur1_nom + " !" 
    }    // troisième colonne X
    else if (jeu[2] == "O" && jeu[5] == "O" && jeu[8] == "O") 
    {
        statut_jeu = 3;
        console.log(statut_jeu);
        document.getElementById("txt_joueur").innerHTML = "Victoire de "  + joueur2_nom + " !" 
    }    // troisième colonne O 
    else if (jeu[0] == "X" && jeu[4] == "X" && jeu[8] == "X")
    {
        statut_jeu = 3;
        console.log(statut_jeu);
        document.getElementById("txt_joueur").innerHTML = "Victoire de "  + joueur1_nom + " !" 
    
    }    // diagonale haut-gauche à bas-droite X
    else if (jeu[0] == "O" && jeu[4] == "O" && jeu[8] == "O")
    {
        statut_jeu = 3;
        console.log(statut_jeu);
        document.getElementById("txt_joueur").innerHTML = "Victoire de "  + joueur2_nom + " !" 
    
    }    // diagonale haut-gauche à bas-droite O
    else if (jeu[2] == "X" && jeu[4] == "X" && jeu[6] == "X")
    {
        statut_jeu = 3;
        console.log(statut_jeu);

        document.getElementById("txt_joueur").innerHTML = "Victoire de " + joueur1_nom + " !" 
    }   // diagonale haut-droite à bas-gauche X
    else if (jeu[2] == "O" && jeu[4] == "O" && jeu[6] == "O")
    {
        statut_jeu = 3;
        console.log(statut_jeu);

        document.getElementById("txt_joueur").innerHTML = "Victoire de "  + joueur2_nom + " !" 
    }   // diagonale haut-droite à bas-gauche O

    if (statut_jeu === 3) { //Changement de couleur quand victoire
        for (let i = 1; i < 10; i++) {
            if (document.getElementById("case" + i).innerText === "X") {
            document.getElementById("case" + i).style.color = "#11998e";
            document.getElementById("case" + i).style.borderColor = "#FFFFFF"; 
            }
            else if (document.getElementById("case" + i).innerText === "O") {
                document.getElementById("case" + i).style.color = "#38ef7d";
                document.getElementById("case" + i).style.borderColor = "#FFFFFF"
            }
        }        
    }
}



function egalite(jeu) {

    /*
    Fonction qui permet de vérifier si "jeu" est plein
    S'éxécute à chaque tour, mais est overwrite par les possibilités de victoire
    =====================
    Paramètre : jeu (array) qui représente le tableau des cases du jeu
    ===================
    Retour : aucun
    */

    if (!jeu.includes('')) {
    document.getElementById("txt_joueur").innerHTML = "Egalité";
    statut_jeu = 2;
    }
}



function noms_joueurs() {

    /*
    Fonction qui permet de récupérer les noms des joueurs et les mets dans les variables joueur1_nom et joueur2_nom
    =====================
    Paramètre : aucun
    ===================
    Retour : aucun
    */

    joueur1_nom = document.getElementById("j1").value;
    if (document.getElementById("j1").value === "") { 
        joueur1_nom = "Joueur 1"
    }

    joueur2_nom = document.getElementById("j2").value;
    if (document.getElementById("j2").value === "") { 
        joueur2_nom = "Joueur 2"
    }
}