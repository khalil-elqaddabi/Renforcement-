/**
 * EXERCICE 1 - Gestionnaire d'inventaire d'entrepot
 *
 * Contexte :
 * Un entrepot est organise en zones, chaque zone contient des rayons,
 * chaque rayon contient des produits. Vous devez implementer des fonctions
 * de navigation et de manipulation de cette structure.
 *
 * Travail demande :
 *
 * 1. trouverProduit(entrepot, idProduit)
 *    Retourner { produit, zone, rayon } ou null si introuvable.
 *
 * 2. produitsStockCritique(entrepot, seuilMinimum)
 *    Retourner la liste de tous les produits (toutes zones confondues)
 *    dont le stock <= seuilMinimum. Ajouter les champs `zone` et `rayon`.
 *
 * 3. valeurTotaleEntrepot(entrepot)
 *    Retourner la somme totale : sum(stock * prixUnitaire) pour tous les produits.
 *
 * 4. deplacerProduit(entrepot, idProduit, nouvelleZone, nouveauRayon)
 *    Retourner un NOUVEL entrepot (sans muter l'original) ou le produit
 *    a ete retire de sa position actuelle et ajoute a la nouvelle position.
 *    Si la zone ou le rayon n'existent pas, les creer.
 *
 * 5. rapportParZone(entrepot)
 *    Retourner [{ zone, nombreProduits, nombreReferences, valeurTotale }]
 *    nombreReferences = nombre de produits distincts
 *    nombreProduits = somme des stocks
 */

const entrepot = {
  "Zone-A": {
    "Rayon-A1": [
      { id: "P001", nom: "Clavier", stock: 45, prixUnitaire: 120 },
      { id: "P002", nom: "Souris", stock: 3, prixUnitaire: 85 },
      { id: "P003", nom: "Webcam", stock: 12, prixUnitaire: 220 },
    ],
    "Rayon-A2": [
      { id: "P004", nom: 'Ecran 24"', stock: 8, prixUnitaire: 1500 },
      { id: "P005", nom: 'Ecran 27"', stock: 2, prixUnitaire: 2200 },
    ],
  },
  "Zone-B": {
    "Rayon-B1": [
      { id: "P006", nom: "Cable HDMI", stock: 100, prixUnitaire: 30 },
      { id: "P007", nom: "Hub USB", stock: 25, prixUnitaire: 95 },
    ],
    "Rayon-B2": [
      { id: "P008", nom: "Casque BT", stock: 4, prixUnitaire: 350 },
      { id: "P009", nom: "Enceinte", stock: 0, prixUnitaire: 280 },
    ],
  },
  "Zone-C": {
    "Rayon-C1": [
      { id: "P010", nom: "Tapis souris", stock: 60, prixUnitaire: 40 },
      { id: "P011", nom: "Repose-poignet", stock: 15, prixUnitaire: 55 },
    ],
  },
};

function trouverProduit(entrepot, idProduit) {
  for (const zone of Object.keys(entrepot)) {
    const zonesData = entrepot[zone];

    for (const rayon of Object.keys(zonesData)) {
      const produits = zonesData[rayon];

      for (const produit of produits) {
        if (produit.id === idProduit) {
          return { produit, zone, rayon };
        }
      }
    }
  }

  return null;
}

function produitsStockCritique(entrepot, seuilMinimum) {
  const result = [];

  for (const zone of Object.keys(entrepot)) {
    const zonesData = entrepot[zone];

    for (const rayon of Object.keys(zonesData)) {
      const produits = zonesData[rayon];

      for (const produit of produits) {
        if (produit.stock <= seuilMinimum) {
          result.push({ ...produit, zone, rayon });
        }
      }
    }
  }

  return result;
}

function valeurTotaleEntrepot(entrepot) {
  let total = 0;

  for (const zone of Object.keys(entrepot)) {
    const zonesData = entrepot[zone];

    for (const rayon of Object.keys(zonesData)) {
      const produits = zonesData[rayon];

      for (const produit of produits) {
        total += produit.stock * produit.prixUnitaire;
      }
    }
  }

  return total;
}

function deplacerProduit(entrepot, idProduit, nouvelleZone, nouveauRayon) {
  // TODO
}

function rapportParZone(entrepot) {
  const result = [];

  for (const zone of Object.keys(entrepot)) {
    const zonesData = entrepot[zone];

    let nombreProduits = 0;
    let nombreReferences = 0;
    let valeurTotale = 0;

    for (const rayon of Object.keys(zonesData)) {
      const produits = zonesData[rayon];

      nombreReferences += produits.length;

      for (const produit of produits) {
        nombreProduits += produit.stock;
        valeurTotale += produit.stock * produit.prixUnitaire;
      }
    }

    result.push({ zone, nombreProduits, nombreReferences, valeurTotale });
  }

  return result;
}

// Tests
console.log(trouverProduit(entrepot, "P008"));
console.log(produitsStockCritique(entrepot, 5));
console.log("Valeur totale:", valeurTotaleEntrepot(entrepot));
console.log(rapportParZone(entrepot));
