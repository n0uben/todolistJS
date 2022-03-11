class TacheBDD {

    baseUrl;

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    getAll() {
        fetch(this.baseUrl)
        .then(function(reponse) {
            return reponse.json();
        })
        .then(function(reponseJson) {
            console.log(reponseJson);
        })
        .catch(function(error) {
            console.log(error);
        }) 
    }
    ajouter(tache) {
        // fetch(baseUrl,{
    
        //     method: "POST",
        //     body: JSON.stringify(_data),
        //     headers: {"Content-type":"application/json; charset=UTF-8"}

        // .then(response => response.json()) 
        // .then(json => console.log(json))
        // .catch(err => console.log(err))

    // })

    }

    modifier(tache) {

    }
    terminer(tache) {

    }
    supprimer(tache) {

    }
}

class tache{
    id;
    contenu;
    date;
    terminee;

    constructor(contenu,terminee){

    }


    getid() {

    }
    getContenu() {

    }
    getDate() {

    }
    getTerminee() {

    }


    setContenu(contenu) {
        this.contenu = contenu;

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

}
let tache1 = new TacheBDD("http://localhost:9090/api/taches");
console.log(tache1)
tache1.getAll();