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
///////////////////////////////////////////////////////////////////////
    }
    ajouter(tache) {
        fetch(this.baseUrl,{
    
            method: "PUT",
            body: JSON.stringify(tache),
            headers: {"Content-type":"application/json; charset=UTF-8"}

        })
        .catch(err => console.log(err))

    }
///////////////////////////////////////////////////////////////////

    modifier(tache) {
        fetch(this.baseUrl + tache.getid() ,{
    
            method: "PUT",
            body: JSON.stringify(tache),
            headers: {"Content-type":"application/json; charset=UTF-8"}

        })
        .catch(err => console.log(err))


    }
/////////////////////////////////////////////////////////////////////
    terminer(tache) {
        fetch(this.baseUrl +tache.getid()+ "/terminer",{
    
            method: "PUT",
            body: JSON.stringify(tache),
            headers: {"Content-type":"application/json; charset=UTF-8"}

        })
        .catch(err => console.log(err))

    }
/////////////////////////////////////////////////////////////////////
    supprimer(tache) {

    }
}
/////////////////////////////////////////////////////////////////////
class tache{
   
    description;
    terminee;

    constructor(description){
        
        this.description = description;
      

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
    equals(other) {
        //à faire
    }

}
/////////////////////////////////////////////////////////////

let tachebdd = new TacheBDD("http://localhost:9090/api/taches");

console.log(tachebdd)
tachebdd.getAll();

let maTache = new tache("efgyufuyzegfy");
console.log(maTache);

tachebdd.ajouter(maTache);

maTache.setDescription("caca");

tachebdd.modifier(maTache);
console.log(maTache);

tachebdd.terminer(maTache);
tachebdd.getAll();

