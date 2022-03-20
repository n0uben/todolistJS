class TacheBDD {
    static baseUrl = "http://localhost:9090/api/taches/";

    static async getAll() {
        let reponse = await fetch(this.baseUrl);
        let json = await reponse.json();

        return json;
    }

    static afficherTaches() {
        //vide la liste des taches
        let listeTaches = document.getElementById("listeTaches");
        listeTaches.innerHTML = "";

        // recupere toutes les taches et les insere dans le HTML
        this.getAll()
            .then((json) => {
                console.log(json);
                for (const element of json) {
                    let nouvelleTache = new Tache(
                        element.id,
                        element.date,
                        element.description,
                        element.terminee
                    );
                    nouvelleTache.afficher();
                    console.log(nouvelleTache);
                }
            })
            .catch((error) => console.error(error));
    }

    static afficherTachesEnCours() {
        let listeTaches = document.getElementById("listeTaches");
        listeTaches.innerHTML = "";

        this.getAll().then((json) => {
            for (const element of json) {
                if (!element.terminee) {
                    let nouvelleTache = new Tache(
                        element.id,
                        element.date,
                        element.description,
                        element.terminee
                    );
                    nouvelleTache.afficher();
                }
            }
        });
    }
    static afficherTachesTerminees() {
        let listeTaches = document.getElementById("listeTaches");
        listeTaches.innerHTML = "";

        this.getAll().then((json) => {
            for (const element of json) {
                if (element.terminee) {
                    let nouvelleTache = new Tache(
                        element.id,
                        element.date,
                        element.description,
                        element.terminee
                    );
                    nouvelleTache.afficher();
                }
            }
        });
    }
    static refreshInterface() {
        //on vide l'input et on rafraichit la liste des taches
        document.getElementById("inputAjouter").value = "";
        this.afficherTaches();
    }

    static async enregistrer(tache) {
        let descriptionTache = {
            description: tache.description,
        };
        console.log(descriptionTache);

        let tacheEnregistree = await fetch(this.baseUrl, {
            method: "POST",
            body: JSON.stringify(descriptionTache),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        }).catch((err) => console.log(err));
        console.log("apres la function?");

        return tacheEnregistree;
    }
    ///////////////////////////////////////////////////////////////////

    static modifier(tacheId) {
        let nouvelleDescription = prompt("quelle est la nouvelle Tâche ?");
        //console.log(nouvelleDescription);

        let descriptionTache = {
            description: nouvelleDescription,
        };
        fetch(this.baseUrl + tacheId, {
            method: "PUT",
            body: JSON.stringify(descriptionTache),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        })
            .then(function (response) {
                console.log(response);
                TacheBDD.refreshInterface();
                //console.log("OUAIIIII");
            })
            .catch((err) => console.log(err));
    }
    /////////////////////////////////////////////////////////////////////
    static terminer(tacheId) {
        fetch(this.baseUrl + tacheId + "/terminer", {
            method: "PUT",
            headers: { "Content-type": "application/json; charset=UTF-8" },
        })
            .then(function (response) {
                console.log(response);
                //console.log("tas recup la reponse franchement tes un bg");

                TacheBDD.refreshInterface();
            })
            .catch((err) => console.log(err));
        //console.log("OOOOUUAAA");
    }
    /////////////////////////////////////////////////////////////////////
    static supprimer(tacheId) {
        let confirmationSup = confirm("Voulez vous supprimer cette tâche ?");

        if (confirmationSup) {
            fetch(this.baseUrl + tacheId, {
                method: "DELETE",

                headers: { "Content-type": "application/json; charset=UTF-8" },
            })
                .then(function () {
                    TacheBDD.refreshInterface(); //une fois la promesse reçu alors->refresh interface
                })
                .catch((err) => console.log(err));
        }
    }
}
/////////////////////////////////////////////////////////////////////
class Tache {
    id;
    date;
    description;
    terminee;

    constructor(id, date, description, terminee) {
        this.id = id;
        this.date = date;
        this.description = description;
        this.terminee = terminee;
    }

    /*getters*/
    getid() {
        return this.id;
    }
    getdescription() {
        return this.description;
    }
    getDate() {
        return this.date;
    }
    getTerminee() {
        return this.terminee;
    }

    /*setters*/
    setDescription(description) {
        this.description = description;
    }
    setTerminee(terminee) {
        this.terminee = terminee;
    }
    toString() {
        return this.toString();
    }
    equals(other) {
        //à faire
    }

    afficher() {
        let listeTaches = document.getElementById("listeTaches");

        let tacheCochee = "";
        let tacheDesactivee = "";

        if (this.getTerminee()) {
            tacheCochee = "checked";
            tacheDesactivee = "disabled";
        }

        let htmlTache = `<div class="les-taches col-12 col-xl-10 offset-xl-1 p-4 mb-3 shadow-sm bg-white">
        <div class="row">
            <div class="col-12 mb-3 col-lg-6 d-flex align-items-center form-check">
                <input class="form-check-input mx-4 p-3" type="checkbox" id="checkbox${this.getid()}" ${tacheCochee} ${tacheDesactivee} onChange="TacheBDD.terminer(${this.getid()})">
                <label class="form-check-label" for="checkbox${this.getid()}">${this.getdescription()}</label>
            </div>
            <div class="col-12 col-lg-6 d-flex justify-content-center align-items-center">
                <button type="button" id="supprimer${this.getid()}" onclick="Tache.messageAvantSuppression(${this.getid()})" class="btn btn-outline-danger mx-1">Supprimer</button>
                <button type="button" id="modifier${this.getid()}" onclick="TacheBDD.modifier(${this.getid()})" class="btn btn-outline-primary mx-1">Modifier</button>
            </div>
        </div>
    </div>`;

        listeTaches.innerHTML += htmlTache;
    }
}

/////////////////////////////////////////////////////////////
// INTERFACE
/////////////////////////////////////////////////////////////

// class interfaceTaches {

//     static test;

//     static afficherTout() {
//         console.log("coucou");
//     }
// }

/* clic bouton tout */
const boutonTout = document.getElementById("afficherTout");
boutonTout.addEventListener("click", () => TacheBDD.afficherTaches());

/* clic bouton en cours */
const boutonEnCours = document.getElementById("afficherEnCours");
console.log(boutonEnCours);
boutonEnCours.addEventListener("click", () => TacheBDD.afficherTachesEnCours());

/* clic bouton terminées */
const boutonAfficherTerminees = document.getElementById("afficherTerminees");
console.log(boutonAfficherTerminees);
boutonAfficherTerminees.addEventListener("click", () =>
    TacheBDD.afficherTachesTerminees()
);

/* clic bouton ajouter une tache */
const boutonAjouter = document.getElementById("button-addon");
const inputAjouter = document.getElementById("inputAjouter");
//const boutonSupprimer = document.getElementById("supprimer${this.getid()}");

boutonAjouter.addEventListener("click", () => {
    const value = inputAjouter.value;
    const regex = /[a-z0-9]{1,255}/gi;
    if (value.match(regex)) {
        const maTache = new Tache(null, null, inputAjouter.value, null);
        TacheBDD.enregistrer(maTache).then(() => TacheBDD.refreshInterface()); //une fois la promesse reçu alors->refresh interface
    }
});

/////////////////////////////////////////////////////////////

// initialise l’interface avec la liste de toutes les taches
TacheBDD.afficherTaches();

//const maTache2 = new Tache(1, null, null, null);
//TacheBDD.supprimer(maTache2);
