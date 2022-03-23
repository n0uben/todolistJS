/////////////////////////////////////////////////////////////
// APITACHE
/////////////////////////////////////////////////////////////

class ApiTaches {
    static baseUrl = "http://localhost:9090/api/taches/";

    static async getJson() {
        let reponse = await fetch(this.baseUrl);
        let json = await reponse.json();
        //on trie par ID décroissant (z -> a) pour avoir les plus récentes en premier
        return json.sort((a,b) => b.id - a.id);
    }

    static async getAll() {
        let json = await this.getJson();
        let arrayTache = [];
        
        for (const tache of json) {
            arrayTache.push(new Tache(tache.id, tache.date, tache.description, tache.terminee));
        }

        return arrayTache;
    }

    static async getTerminees() {
        let arrayTache = await this.getAll();
        
        return arrayTache.filter(tache => tache.terminee == "true");
    }

    static async getEnCours() {
        let arrayTache = await this.getAll();
        
        return arrayTache.filter(tache => tache.terminee == "true");
    }

    static async enregistrer(tache) {
        let descriptionTache = {
            description: tache.description,
        };

        let tacheEnregistree = await fetch(this.baseUrl, {
            method: "POST",
            body: JSON.stringify(descriptionTache),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        }).catch((err) => console.log(err));

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
                ListeTaches.rafraichir();
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

                ListeTaches.rafraichir();
            })
            .catch((err) => console.log(err));
    }
    /////////////////////////////////////////////////////////////////////
    static supprimer(tacheId) {
        console.log();
        fetch(this.baseUrl + tacheId, {
            method: "DELETE",

            headers: { "Content-type": "application/json; charset=UTF-8" },
        })
            .then(function () {
                ListeTaches.rafraichir();
            })
            .catch((err) => console.log(err));
    }
}
/////////////////////////////////////////////////////////////
// TACHE
/////////////////////////////////////////////////////////////
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

    setDescription(description) {
        this.description = description;
    }
    setTerminee(terminee) {
        this.terminee = terminee;
    }
    toString() {
        return this.toString();
    }
    // equals(other) {
    //     //à faire
    // }

    static messageAvantSuppression(tacheId) {
        let confirmationSup = confirm("Voulez vous supprimer cette tâche ?");

        if (confirmationSup) {
            ApiTaches.supprimer(tacheId);
        }
    }
    getHTML() {
        let tacheCochee = "";
        let tacheDesactivee = "";

        if (this.getTerminee()) {
            tacheCochee = "checked";
            tacheDesactivee = "disabled";
        }

        let htmlTache = `<div id="tache${this.getid()}" class="les-taches col-12 col-xl-10 offset-xl-1 p-4 mb-3 shadow-sm bg-white">
            <div class="row">
                <div id="input${this.getid()}" class="col-12 mb-3 col-lg-6 d-flex align-items-center form-check">
                    <input class="form-check-input mx-4 p-3" type="checkbox" id="checkbox${this.getid()}" ${tacheCochee} ${tacheDesactivee} onChange="ApiTaches.terminer(${this.getid()})">
                    <label class="form-check-label" for="checkbox${this.getid()}">${this.getdescription()}</label>
                </div>
                <div class="col-12 col-lg-6 d-flex justify-content-end align-items-center">
                <button type="button" id="modifier${this.getid()}" onclick="ApiTaches.modifier(${this.getid()})" class="bouton-modifier btn btn-outline-primary mx-1"><i class="fas fa-edit"></i></button>
                <button type="button" id="supprimer${this.getid()}" onclick="Tache.messageAvantSuppression(${this.getid()})" class="bouton-supprimer btn btn-outline-danger mx-1"><i class="far fa-trash-alt"></i></button>
                </div>
            </div>
        </div>`;

        return htmlTache;
    }
}

/////////////////////////////////////////////////////////////
// LISTE TACHE
/////////////////////////////////////////////////////////////

class ListeTaches {
    static boutonTout = document.getElementById("afficherTout");
    static boutonEnCours = document.getElementById("afficherEnCours");
    static boutonTerminees = document.getElementById("afficherTerminees");

    static listeTachesEnCours = document.getElementById("listeTachesEnCours");
    static listeTachesTerminees = document.getElementById("listeTachesTerminees");

    static viderEnCours() {
        this.listeTachesEnCours.innerHTML = "";
    }
    static viderTerminees() {
        this.listeTachesTerminees.innerHTML = "";
    }
    static vider() {
        this.viderEnCours();
        this.viderTerminees();
    }

    static afficherTaches() {
       this.afficherEnCours;
       this.afficherTerminees();
    }

    static afficherEnCours() {
        this.viderEnCours();

        ApiTaches.getEnCours().then((arrayTache) => {
            for (const tache of arrayTache) {
                this.listeTachesEnCours.insertAdjacentHTML("beforeend", tache.getHTML());
            }
        });
    }
    static afficherTerminees() {
        this.viderTerminees();

        ApiTaches.getTerminees().then((arrayTache) => {
            for (const tache of arrayTache) {
                this.listeTachesEnCours.insertAdjacentHTML("beforeend", tache.getHTML());
            }
        });
        
    }
    static rafraichir() {
        // document.getElementById("inputAjouter").value = "";
        this.afficherTaches();
    }
    static initFiltres() {
        this.boutonTout.addEventListener("click", () =>
            this.afficherTaches()
        );

        this.boutonEnCours.addEventListener("click", () =>
            this.afficherEnCours()
        );

        this.boutonTerminees.addEventListener("click", () =>
            this.afficherTerminees()
        );
    }
    static initUserInput() {
        const boutonAjouter = document.getElementById("button-addon");
        const inputAjouter = document.getElementById("inputAjouter");
        
        //si user clique sur bouton ajouter
        boutonAjouter.addEventListener("click", () => {
            this.ajouterTache();
        });
        //si user appuie sur touche entrer
        inputAjouter.addEventListener("keydown", (e) => {
            if (e.code == "Enter") {
                this.ajouterTache();
            }
        })
    }

    static ajouterTache() {
        const value = inputAjouter.value;
        const regex = /[a-z0-9]{1,255}/gi;
        if (value.match(regex)) {
            const maTache = new Tache(null, null, inputAjouter.value, null);
            ApiTaches.enregistrer(maTache).then(() =>
                this.rafraichir()
            );
        }
}
}

/////////////////////////////////////////////////////////////
// LETSGO
/////////////////////////////////////////////////////////////

ListeTaches.afficherEnCours();

ListeTaches.initFiltres();

ListeTaches.initUserInput();