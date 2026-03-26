/**
 * EXERCICE 2 - Moteur de recherche et filtrage d'un catalogue RH
 *
 * Contexte :
 * Vous developpez le module de recherche d'un SIRH (Systeme d'Information
 * Ressources Humaines). Le RH doit pouvoir filtrer, trier et paginer les employes
 * selon plusieurs criteres simultanement.
 *
 * Travail demande :
 *
 * 1. rechercherEmployes(employes, criteres)
 *    criteres peut contenir : { departement, poste, salairMin, salaireMax, motCle }
 *    - motCle cherche dans nom ET prenom (insensible a la casse)
 *    - Tous les criteres present dans l'objet sont appliques simultanement (AND)
 *    - Retourner le tableau filtre
 *
 * 2. trierEmployes(employes, champ, ordre)
 *    ordre : 'asc' ou 'desc'
 *    champ : 'nom', 'salaire', 'anciennete' (en annees depuis dateEmbauche)
 *    Ne pas muter le tableau original.
 *
 * 3. paginer(employes, page, parPage)
 *    Retourner { donnees, page, parPage, total, totalPages }
 *    page commence a 1.
 *
 * 4. statistiquesParDepartement(employes)
 *    Retourner pour chaque departement :
 *    { departement, effectif, salaireMoyen, salaireMin, salaireMax, masseSalariale }
 *    Trier par effectif decroissant.
 */

const employes = [
  {
    id: 1,
    nom: "Alami",
    prenom: "Karim",
    departement: "Tech",
    poste: "Dev Backend",
    salaire: 12000,
    dateEmbauche: "2019-03-15",
  },
  {
    id: 2,
    nom: "Benali",
    prenom: "Layla",
    departement: "Tech",
    poste: "Dev Frontend",
    salaire: 11000,
    dateEmbauche: "2020-07-01",
  },
  {
    id: 3,
    nom: "Chraibi",
    prenom: "Omar",
    departement: "Tech",
    poste: "DevOps",
    salaire: 14000,
    dateEmbauche: "2018-01-10",
  },
  {
    id: 4,
    nom: "Drissi",
    prenom: "Hanane",
    departement: "RH",
    poste: "RH Manager",
    salaire: 10500,
    dateEmbauche: "2021-04-20",
  },
  {
    id: 5,
    nom: "Ennaji",
    prenom: "Youssef",
    departement: "RH",
    poste: "Recruteur",
    salaire: 8500,
    dateEmbauche: "2022-09-05",
  },
  {
    id: 6,
    nom: "Fassi",
    prenom: "Samira",
    departement: "Finance",
    poste: "Comptable",
    salaire: 9800,
    dateEmbauche: "2020-02-14",
  },
  {
    id: 7,
    nom: "Ghazali",
    prenom: "Mehdi",
    departement: "Finance",
    poste: "Analyste",
    salaire: 11500,
    dateEmbauche: "2019-11-30",
  },
  {
    id: 8,
    nom: "Hamdaoui",
    prenom: "Nadia",
    departement: "Tech",
    poste: "Dev Backend",
    salaire: 12500,
    dateEmbauche: "2017-06-22",
  },
  {
    id: 9,
    nom: "Idrissi",
    prenom: "Karim",
    departement: "Marketing",
    poste: "Chef Projet",
    salaire: 13000,
    dateEmbauche: "2020-05-18",
  },
  {
    id: 10,
    nom: "Jalal",
    prenom: "Fatima",
    departement: "Marketing",
    poste: "Designer",
    salaire: 9500,
    dateEmbauche: "2021-08-03",
  },
  {
    id: 11,
    nom: "Khalil",
    prenom: "Anas",
    departement: "Tech",
    poste: "Data Engineer",
    salaire: 15000,
    dateEmbauche: "2016-12-01",
  },
  {
    id: 12,
    nom: "Lamrani",
    prenom: "Zineb",
    departement: "Finance",
    poste: "DAF",
    salaire: 22000,
    dateEmbauche: "2015-03-08",
  },
];

function rechercherEmployes(employes, criteres) {
  return employes.filter((employe) => {
    const keys = Object.keys(criteres);

    for (const key of keys) {
      const valeur = criteres[key];

      if (key === "departement" && employe.departement !== valeur) {
        return false;
      }
      if (key === "poste" && employe.poste !== valeur) {
        return false;
      }
      if (key === "salaireMin" && employe.salaire < valeur) {
        return false;
      }
      if (key === "salaireMax" && employe.salaire > valeur) {
        return false;
      }
      if (key === "motCle") {
        const mot = valeur.toLowerCase();
        const nomComplet = `${employe.nom} ${employe.prenom}`.toLowerCase();
        if (!nomComplet.includes(mot)) {
          return false;
        }
      }
    }

    
    return true;
  });
}

function trierEmployes(employes, champ, ordre) {
  const signe = ordre === "desc" ? -1 : 1;

  return [...employes].sort((a, b) => {
    let valA;
    let valB;

    if (champ === "nom") {
      valA = a.nom.toLowerCase();
      valB = b.nom.toLowerCase();
    } else if (champ === "salaire") {
      valA = a.salaire;
      valB = b.salaire;
    } else if (champ === "anciennete") {
      const dateEmbaucheA = new Date(a.dateEmbauche);
      const dateEmbaucheB = new Date(b.dateEmbauche);

      const anneesA = (new Date() - dateEmbaucheA) / (1000 * 3600 * 24 * 365);
      const anneesB = (new Date() - dateEmbaucheB) / (1000 * 3600 * 24 * 365);

      valA = anneesA;
      valB = anneesB;
    } else {
      valA = 0;
      valB = 0;
    }

    if (valA < valB) return -1 * signe;
    if (valA > valB) return 1 * signe;
    return 0;
  });
}

function paginer(employes, page, parPage) {
  const total = employes.length;
  const totalPages = Math.ceil(total / parPage);

  const pageSafe = Math.max(1, Math.min(page, totalPages));
  const indexDebut = (pageSafe - 1) * parPage;
  const indexFin = pageSafe * parPage;

  const donnees = employes.slice(indexDebut, indexFin);

  return {
    donnees,
    page: pageSafe,
    parPage,
    total,
    totalPages,
  };
}

function statistiquesParDepartement(employes) {
  const stats = {};

  for (const emp of employes) {
    const dept = emp.departement;

    if (!stats[dept]) {
      stats[dept] = {
        departement: dept,
        effectif: 0,
        salaireMin: Infinity,
        salaireMax: 0,
        masseSalariale: 0,
      };
    }

    stats[dept].effectif += 1;
    stats[dept].masseSalariale += emp.salaire;

    if (emp.salaire < stats[dept].salaireMin) {
      stats[dept].salaireMin = emp.salaire;
    }
    if (emp.salaire > stats[dept].salaireMax) {
      stats[dept].salaireMax = emp.salaire;
    }
  }

  return Object.values(stats)
    .map((dept) => ({
      ...dept,
      salaireMoyen: dept.effectif > 0 ? dept.masseSalariale / dept.effectif : 0,
    }))
    .sort((a, b) => b.effectif - a.effectif);
}

// Tests
console.log(
  rechercherEmployes(employes, { departement: "Tech", salaireMin: 12000 }),
);
console.log(rechercherEmployes(employes, { motCle: "karim" }));
console.log(
  trierEmployes(employes, "salaire", "desc").map(
    (e) => e.nom + " " + e.salaire,
  ),
);
console.log(paginer(employes, 2, 4));
console.log(statistiquesParDepartement(employes));
