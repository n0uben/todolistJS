class TacheBDD {
    baseUrl;

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    getAll() {

        //vide conteneur taches avant de le re-remplir
        let listeTaches = document.getElementById("listeTaches");
        listeTaches.innerHTML = "";

        // let lesTaches = [];
            
        fetch(this.baseUrl)
        .then((reponse) => {
            if (reponse.status === 200) {
                    return reponse.json();
                }
            })
            .then((json) => {
                for (let i = 0; i < json.length; i++) {
                    let nouvelleTache = new Tache(
                        json[i].id,
                        json[i].date,
                        json[i].description,
                        json[i].terminee
                    );

                    // lesTaches.push(nouvelleTache);

                    nouvelleTache.afficher();
                }
            })
            .catch((error) => console.error(error));

        ///////////////////////////////////////////////////////////////////////
    }
    enregistrer(tache) {
        let descriptionTache = {
            description: tache.description,
        };

        fetch(this.baseUrl, {
            method: "POST",
            body: JSON.stringify(descriptionTache),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        }).catch((err) => console.log(err));
    }
    ///////////////////////////////////////////////////////////////////

    modifier(tache) {
        let descriptionTache = {
            description: tache.description,
        };

        fetch(this.baseUrl + "/" + tache.getid(), {
            method: "PUT",
            body: JSON.stringify(descriptionTache),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        }).catch((err) => console.log(err));
    }
    /////////////////////////////////////////////////////////////////////
    terminer(tache) {
        // fetch(this.baseUrl +tache.getid() + "/terminer",{
        //     method: "PUT",
        //     body: JSON.stringify(tache),
        //     headers: {"Content-type":"application/json; charset=UTF-8"}
        // })
        // .catch(err => console.log(err))
    }
    /////////////////////////////////////////////////////////////////////
    supprimer(tache) {}
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

    /*methodes*/

    afficher() {
        let listeTaches = document.getElementById("listeTaches");

        let col = document.createElement("div");
        let formCheck = document.createElement("div");
        let formCheckInput = document.createElement("input");
        let formCheckLabel = document.createElement("label");

        col.className = "col-12 p-4 mb-2";
        formCheck.className = "form-check";
        formCheckInput.className = "form-check-input";
        formCheckLabel.className = "form-check-label";
        
        formCheckInput.type = "checkbox";
        formCheckInput.id = "checkbox" + this.getid();

        formCheckLabel.setAttribute("for", "checkbox" + this.getid())

        listeTaches.appendChild(col);
        col.appendChild(formCheck);
        formCheck.appendChild(formCheckInput);
        formCheck.appendChild(formCheckLabel);

        formCheckLabel.innerHTML = this.description;

        //si la tache est terminée, on la coche, désactive et barre
        if (this.getTerminee()) {
            formCheckInput.setAttribute("checked", true);
            formCheckInput.setAttribute("disabled", true);
            formCheckLabel.classList.add("text-decoration-line-through")
        }
    }
}

/////////////////////////////////////////////////////////////
// INTERFACE
/////////////////////////////////////////////////////////////

let laBdd = new TacheBDD("http://localhost:9090/api/taches");

/* clic bouton tout */
let boutonTout = document.getElementById("afficherTout");
boutonTout.addEventListener("click", () => laBdd.getAll());

/* clic bouton en cours */
let boutonEnCours = document.getElementById("afficherEnCours");
//modifier getall() pour pouvoir obtenir seulement les taches en cours


/* clic bouton terminées */
let boutonTerminees = document.getElementById("afficherTerminees");
//modifier getall() pour pouvoir obtenir seulement les taches terminées

/* clic bouton ajouter une tache */ 
let boutonAjouter = document.getElementById("button-addon");
// besoin fonction pour afficher les taches afficher crées en BDD

/* clic bouton supprimer */
//todo : créer un bouton supprimer lol


/////////////////////////////////////////////////////////////

// initialise l’interface avec la liste de toutes les taches
laBdd.getAll();
