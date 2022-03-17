class TacheBDD {
    static baseUrl = "http://localhost:9090/api/taches";

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
    static refreshInterface() {
        //on vide l'input et on rafraichit la liste des taches
        document.getElementById("inputAjouter").value = "";
        this.afficherTaches();
    }
    static async enregistrer(tache) {
        console.log("proouut");
        let descriptionTache = {
            description: tache.description
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

    static modifier(tache) {

        let nouvelleDescription=prompt("quelle est la nouvelle Tâche ?");
        //console.log(nouvelleDescription);
        
        let descriptionTache = {
            description: nouvelleDescription,
        };
        fetch(this.baseUrl + "/" + tache, {
            method: "PUT",
            body: JSON.stringify(descriptionTache),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        })
        .then(function(response){
            console.log(response);
            TacheBDD.refreshInterface();
            //console.log("OUAIIIII");
        })
            .catch((err) => console.log(err));
    }
    /////////////////////////////////////////////////////////////////////
    static terminer(tache) {
        //console.log("tes dans terminer mon gars"+tache);
        fetch(this.baseUrl +"/"+tache+ "/terminer",{
            method: "PUT",
            body: JSON.stringify(tache),
            headers: {"Content-type":"application/json; charset=UTF-8"}
            
        })
        .then(function(response){
            console.log(response);
            //console.log("tas recup la reponse franchement tes un bg");
            
            TacheBDD.refreshInterface();
        })
        .catch(err => console.log(err))
        //console.log("OOOOUUAAA");
    }
    /////////////////////////////////////////////////////////////////////
    static supprimer(idTache) {
        console.log(this.baseUrl+"/"+idTache);
        fetch(this.baseUrl+"/"+idTache,{
                method: "DELETE",
                
                headers: {"Content-type":"application/json; charset=UTF-8"}
            })
            .then(function(){
                TacheBDD.refreshInterface();//une fois la promesse reçu alors->refresh interface
                

            })
            .catch(err => console.log(err))
        

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

    /*methodes*/

    /*afficher() {
        let listeTaches = document.getElementById("listeTaches");

        let tacheCochee = "";
        let tacheDesactivee = "";

        if (this.getTerminee()) {
            tacheCochee = "checked";
            tacheDesactivee = "disabled";
        }

        let htmlTache = `<div class="col-12 p-4 mb-2">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="checkbox${this.getid()}" ${tacheCochee} ${tacheDesactivee}>
                <label class="form-check-label" for="checkbox${this.getid()}">${this.getdescription()}</label>
                <button type="button" id="supprimer${this.getid()}" onclick="TacheBDD.supprimer(${this.getid()})" class="btn btn-outline-danger">Supprimer</button>
            </div>
        </div>`;

        listeTaches.innerHTML += htmlTache;
    }
}*/

static messageAvantSuppression(id) {
    
    let confirmationSup = confirm("voulez vous supprimer?");

    if(confirmationSup){
        console.log("erreur coouuucouuu");
        TacheBDD.supprimer(id);
        console.log("erreur2");
    }
    else{
        alert("pas de supp");
    }
}

afficher() {
    let listeTaches = document.getElementById("listeTaches");

    let tacheCochee = "";
    let tacheDesactivee = "";

    if (this.getTerminee()) {
        tacheCochee = "checked";
        tacheDesactivee = "disabled";
    }

    

    let htmlTache = `<div class="col-12 p-4 mb-2">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="checkbox${this.getid()}" ${tacheCochee} ${tacheDesactivee} onChange="TacheBDD.terminer(${this.getid()})">
            <label class="form-check-label" for="checkbox${this.getid()}">${this.getdescription()}</label>
            <button type="button" id="supprimer${this.getid()}" onclick="Tache.messageAvantSuppression(${this.getid()})" class="btn btn-outline-danger">Supprimer</button>
            <button type="button" id="modifier${this.getid()}" onclick="TacheBDD.modifier(${this.getid()})" class="btn btn-outline-info">Modifier</button>
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
//modifier getall() pour pouvoir obtenir seulement les taches en cours


/* clic bouton terminées */
const boutonAffcherTerminees = document.getElementById("afficherTerminees");
//modifier getall() pour pouvoir obtenir seulement les taches terminées

/* clic bouton ajouter une tache */ 
const boutonAjouter = document.getElementById("button-addon");
const inputAjouter = document.getElementById("inputAjouter");
//const boutonSupprimer = document.getElementById("supprimer${this.getid()}");

boutonAjouter.addEventListener("click", () => {
    const value = inputAjouter.value;
    const regex = /[a-z0-9]{1,255}/gi;
    if (value.match(regex) ) {
        const maTache = new Tache(null, null, inputAjouter.value, null);
        TacheBDD.enregistrer(maTache).then(() => TacheBDD.refreshInterface());//une fois la promesse reçu alors->refresh interface
    }
});


/////////////////////////////////////////////////////////////

// initialise l’interface avec la liste de toutes les taches
TacheBDD.afficherTaches();

//const maTache2 = new Tache(1, null, null, null);
//TacheBDD.supprimer(maTache2);