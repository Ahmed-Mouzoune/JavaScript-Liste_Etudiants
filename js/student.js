// On exporte la classe Student
export class Student {
    constructor(firstname, lastname, classname) {
        this.firstname = firstname.charAt(0).toUpperCase() + firstname.substring(1); // toto => Toto
        this.lastname = lastname.toUpperCase(); // tata => TATA
        this.classname = classname.toUpperCase();
    }
}

// Service StudentService pour gérer les étudiants
export class StudentService {
    constructor() {}

    saveStudent(student) {
        // On récupère la liste d'étudiants
        const students = this.getAllStudents();

        // On met l'étudiant.e dedans
        students.push(student);

        //On sauvegarde la liste
        sessionStorage.setItem('students', JSON.stringify(students));
    }

    getAllStudents() {
        // On retourne ce qu'il y a dans le session storage
        // et si jamais c'est null, alors on retourne un tableau vide (avec "?? []")
        return JSON.parse(sessionStorage.getItem('students')) ?? [];
    }
}