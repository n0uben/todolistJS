class TacheBDD {
    baseUrl;

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    getAll() {

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
    }
}

/////////////////////////////////////////////////////////////
// INTERFACE
/////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////

let laBdd = new TacheBDD("http://localhost:9090/api/taches");

// let desTaches = laBdd.getAll();

laBdd.getAll();

// console.log(test);

// console.log(desTaches);


// let maTacheTest = desTaches[0];


// let maTache = new Tache(desTaches[0].id, desTaches[0].date, desTaches[0].description, desTaches[0].terminee);
// console.log(maTacheTest);
// maTache.setDescription("caca");

// laBdd.modifier(maTache);


// laBdd.modifier(maTache);
// console.log(maTache);

// laBdd.terminer(maTache);
