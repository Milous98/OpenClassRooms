// Récupération des pièces depuis le fichier JSON
const pieces = await fetch('pieces-autos.json').then(pieces => pieces.json());

// Fonction qui génère toute la page web
function genererPieces(pieces) {
    for (let i = 0; i < pieces.length; i++) {

        let article = pieces[i];

        const sectionFiches = document.querySelector(".fiches");
        const pieceElement = document.createElement("article");
        // Création des balises
        const imageElement = document.createElement("img");
        imageElement.src = article.image;

        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;

        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix : ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;

        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";

        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment";

        const stockElement = document.createElement("p");
        stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";

        // Rattachement des balises au DOM
        sectionFiches.appendChild(pieceElement);
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement);
    }
}

// Premier affichage de la page
genererPieces(pieces);

// Gestion des boutons
const boutonTrierAsc = document.querySelector(".btn-trier-asc");
boutonTrierAsc.addEventListener("click", function() {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function(a, b) {
        return a.prix - b.prix;
    });
    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
})

const boutonTrierDesc = document.querySelector(".btn-trier-desc");
boutonTrierDesc.addEventListener("click", function() {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function(a, b) {
        return b.prix - a.prix;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
})

const boutonFiltrerPrix = document.querySelector(".btn-filtrer-prix");
boutonFiltrerPrix.addEventListener("click", function() {
    const piecesFiltrees = pieces.filter(function(piece) {
        return piece.prix <= 35;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
})

const boutonNoDescription = document.querySelector(".btn-nodesc");
boutonNoDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function(piece) {
        return piece.description;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const boutonRangePrix = document.getElementById("prix");
boutonRangePrix.addEventListener("input", function() {
    const piecesFiltrees = pieces.filter(function(piece) {
        return piece.prix <= boutonRangePrix.value;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
    
})

// Création de la liste des éléments abordables
const noms = pieces.map(piece => piece.nom);
for (let i = pieces.length -1; i >= 0; i--) {
    if (pieces[i].prix > 35) {
        noms.splice(i,1);
    }
}

const abordablesElements = document.createElement("ul");
for (let i = 0; i < noms.length; i++) {
    const nomElement = document.createElement("li");
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement);
}

document.querySelector(".abordables").appendChild(abordablesElements);

// Création de la liste des éléments disponibles
const nomsDispo = pieces.map(piece => piece.nom);
const prixDispo = pieces.map(piece => piece.prix);
for (let i = pieces.length -1; i >= 0; i--) {
    if (pieces[i].disponibilite === false) {
        nomsDispo.splice(i,1);
        prixDispo.splice(i,1);
    }
}

const dispoElements = document.createElement("ul");
for (let i = 0; i < nomsDispo.length; i++) {
    const nomElement = document.createElement("li");
    nomElement.innerText = `${nomsDispo[i]} - ${prixDispo[i]} €`
    dispoElements.appendChild(nomElement);
}

document.querySelector(".dispo").appendChild(dispoElements);