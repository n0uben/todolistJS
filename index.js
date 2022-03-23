/////////////////////////////////////////////////////////////
// APITACHE
/////////////////////////////////////////////////////////////

class ApiTaches {
    static baseUrl = "http://localhost:9090/api/taches/";

    static async getAll() {
        let reponse = await fetch(this.baseUrl);
        let json = await reponse.json();

        return json;
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
                //console.log("tas recup la reponse franchement tes un bg");

                ListeTaches.rafraichir();
            })
            .catch((err) => console.log(err));
        //console.log("OOOOUUAAA");
    }
    /////////////////////////////////////////////////////////////////////
    static supprimer(tacheId) {
        console.log();
        fetch(this.baseUrl + tacheId, {
            method: "DELETE",

            headers: { "Content-type": "application/json; charset=UTF-8" },
        })
            .then(function () {
                ListeTaches.rafraichir(); //une fois la promesse reçu alors->refresh interface
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

    static messageAvantSuppression(tacheId) {
        let confirmationSup = confirm("Voulez vous supprimer cette tâche ?");

        if (confirmationSup) {
            ApiTaches.supprimer(tacheId);
        }
    }

    // getHTML() {
    //     let tacheCochee = "";
    //     let tacheDesactivee = "";

    //     if (this.getTerminee()) {
    //         tacheCochee = "checked";
    //         tacheDesactivee = "disabled";
    //     }

    //     let htmlTache = `<div class="les-taches col-12 col-xl-10 offset-xl-1 p-4 mb-3 shadow-sm bg-white">
    //     <div class="row">
    //         <div class="col-12 mb-3 col-lg-6 d-flex align-items-center form-check">
    //             <input class="form-check-input mx-4 p-3 bg-success" type="checkbox" id="checkbox${this.getid()}" ${tacheCochee} ${tacheDesactivee} onChange="ApiTaches.terminer(${this.getid()})">
    //             <label class="form-check-label" for="checkbox${this.getid()}">${this.getdescription()}</label>
    //         </div>
    //         <div class="col-12 col-lg-6 d-flex justify-content-center align-items-center">
    //             <button type="button" id="supprimer${this.getid()}" onclick="Tache.messageAvantSuppression(${this.getid()})" class="btn btn-outline-danger mx-1">Supprimer</button>
    //             <button type="button" id="modifier${this.getid()}" onclick="ApiTaches.modifier(${this.getid()})" class="btn btn-outline-primary mx-1">Modifier</button>
    //         </div>
    //     </div>
    // </div>`;
    //     return htmlTache;
    // }
    afficher() {
        let listeTaches = document.querySelector("#listeTaches");

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

        listeTaches.insertAdjacentHTML("beforeend", htmlTache);
    }
}

/////////////////////////////////////////////////////////////
// LISTE TACHE
/////////////////////////////////////////////////////////////

class ListeTaches {
    static boutonTout = document.getElementById("afficherTout");
    static boutonEnCours = document.getElementById("afficherEnCours");
    static boutonTerminees = document.getElementById("afficherTerminees");

    static listeTaches = document.getElementById("listeTaches");

    static vider() {
        ListeTaches.listeTaches.innerHTML = "";
    }

    static afficherTaches() {
        //vide la liste des taches
        ListeTaches.vider();
        // recupere toutes les taches et les insere dans le HTML
        ApiTaches.getAll()
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
                }
            })
            .catch((error) => console.error(error));
    }

    static afficherEnCours() {
        ListeTaches.vider();

        ApiTaches.getAll().then((json) => {
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
    static afficherTerminees() {
        ListeTaches.vider();

        ApiTaches.getAll().then((json) => {
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
    static rafraichir() {
        //on vide l'input et on rafraichit la liste des taches
        document.getElementById("inputAjouter").value = "";
        this.afficherTaches();
    }
    static initFiltres() {
        boutonTout.addEventListener("click", () =>
            ListeTaches.afficherTaches()
        );

        boutonEnCours.addEventListener("click", () =>
            ListeTaches.afficherEnCours()
        );

        boutonTerminees.addEventListener("click", () =>
            ListeTaches.afficherTerminees()
        );
    }
    static initUserInput() {
        /* clic bouton ajouter une tache */
        const boutonAjouter = document.getElementById("button-addon");
        const inputAjouter = document.getElementById("inputAjouter");
        //const boutonSupprimer = document.getElementById("supprimer${this.getid()}");

        boutonAjouter.addEventListener("click", () => {
            const value = inputAjouter.value;
            const regex = /[a-z0-9]{1,255}/gi;
            if (value.match(regex)) {
                const maTache = new Tache(null, null, inputAjouter.value, null);
                ApiTaches.enregistrer(maTache).then(() =>
                    ListeTaches.rafraichir()
                ); //une fois la promesse reçu alors->refresh interface
            }
        });
    }
}

/////////////////////////////////////////////////////////////
// LETSGO
/////////////////////////////////////////////////////////////

ListeTaches.afficherTaches();

ListeTaches.initFiltres();

ListeTaches.initUserInput();