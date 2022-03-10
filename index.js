class TacheBDD {

    baseUrl = "http://localhost:9090/api/taches/";

    getAll() {
        fetch(baseUrl)
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
    getcontenu() {

    }
    getdate() {

    }
    getterminee() {

    }


    setcontenu(contenu) {
        this.contenu = contenu;

    }
    setterminee(terminee) {
        this.terminee = terminee;

    }
    toString() {
        return this.toString();

    }
    equals(other) {
//à faire
    }

}