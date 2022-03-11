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
        fetch(this.baseUrl,{
    
            method: "POST",
            body: JSON.stringify(tache),
            headers: {"Content-type":"application/json; charset=UTF-8"}

        })
        .catch(err => console.log(err))

    }

    modifier(tache) {

    }
    terminer(tache) {

    }
    supprimer(tache) {

    }
}

class tache{
   
    description;
    terminee;

    constructor(description){
        
        this.description = description;
      

    }


    getid() {

    }
    getdescription() {

    }
    getDate() {

    }
    getTerminee() {

    }


    setdescription(description) {
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

}
let tache1 = new TacheBDD("http://localhost:9090/api/taches");
console.log(tache1)
tache1.getAll();
let maTache = new tache("efgyufuyzegfy");
console.log(maTache);
tache1.ajouter(maTache);
