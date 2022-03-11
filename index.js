class TacheBDD {
    baseUrl;

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getAll() {
        // if (this.lesTaches.length == 0) {
            
        let arrayTaches = await fetch(this.baseUrl)
        .then((reponse) => {
            if (reponse.status === 200) {
                    return reponse.json();
                }
                // return reponse.json();
            })
            .then((json) => {
                let lesTaches = [];
                // console.log(json);
                for (let i = 0; i < json.length; i++) {
                    // console.log(json[i]);
                    let nouvelleTache = new Tache(
                        json[i].id,
                        json[i].date,
                        json[i].description,
                        json[i].terminee
                    );
                    // console.log(nouvelleTache);
                    lesTaches.push(nouvelleTache);
                    // console.log(lesTaches);
                    return lesTaches;
                }
            })
            .catch((error) => console.log(error));

        return arrayTaches;
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

    afficher() {}
}

/////////////////////////////////////////////////////////////
// INTERFACE
/////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////

let laBdd = new TacheBDD("http://localhost:9090/api/taches");

let desTaches = laBdd.getAll();

console.log(desTaches);


// let maTacheTest = desTaches[0];


// let maTache = new Tache(desTaches[0].id, desTaches[0].date, desTaches[0].description, desTaches[0].terminee);
// console.log(maTacheTest);
// maTache.setDescription("caca");

// laBdd.modifier(maTache);


// laBdd.modifier(maTache);
// console.log(maTache);

// laBdd.terminer(maTache);
