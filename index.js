class TacheBDD {
    baseUrl;

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getAll() {

        let reponse = await fetch(this.baseUrl);
        let json = await reponse.json();
    
        return json;

    }

    renderTaches() {

        //vide la liste des taches
        let listeTaches = document.getElementById("listeTaches");
        listeTaches.innerHTML = "";

        // recupere toutes les taches et les insere dans le HTML
        this.getAll()
            .then((json) => {
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

        if (this.getTerminee()) {
            //on insere les taches terminees a la fin
            listeTaches.appendChild(col);
            //mise en forme taches terminees
            formCheckInput.setAttribute("checked", true);
            formCheckInput.setAttribute("disabled", true);
            formCheckLabel.classList.add("text-decoration-line-through")
        } else {
            // taches en cours en premier
            listeTaches.prepend(col);
        }
        col.appendChild(formCheck);
        formCheck.appendChild(formCheckInput);
        formCheck.appendChild(formCheckLabel);

        formCheckLabel.innerHTML = this.description;    
    }
}

/////////////////////////////////////////////////////////////
// INTERFACE
/////////////////////////////////////////////////////////////

let laBdd = new TacheBDD("http://localhost:9090/api/taches");

/* clic bouton tout */
let boutonTout = document.getElementById("afficherTout");
boutonTout.addEventListener("click", () => laBdd.renderTaches());

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
laBdd.renderTaches();
