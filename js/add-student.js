// On importe la classe Student
import { Student, StudentService } from './student.js';

const studentService = new StudentService();

let formstate = {
    firstname: false,
    lastname: false,
    classname: false,
}

// On récupère le bouton d'ajout
const btn = document.getElementById('btn-add');
// Au clic sur le bouton d'ajout
btn.addEventListener('click', (event) => {
    event.preventDefault();
    // On récupère les valeurs entrées
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const classname = document.getElementById('classname').value;


    // On crée un nouvel étudiant ou une nouvelle étudiante
    const student = new Student(firstname, lastname, classname);
    studentService.saveStudent(student);
});

const ids = ['firstname', 'lastname', 'classname'];
ids.forEach(id => {
    // Récupérer l'input d'ID id
    const control = document.getElementById(id);
    // On enregistre une fonction a exécuter à chaque déclenchement
    // de l'événement "input".
    control.addEventListener('input', (event) => {
        formstate = updateState(formstate, id, (event.target.value !== ''));
        toggleBtn(btn, isValidState(formstate));
    });
});


function updateState(state, propertyName, value) {
    // faire une copie de state
    // modifier la copie
    // retourner la copie
    const copy = {
        ...state,
        [propertyName]: value
    };
    return copy;
}


function isValidState(state) {
    // On récupère toutes les valeurs du state
    // Pour un object {p1: false, p2: true}, on aura [false, true]
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Object/values
    const values = Object.values(state);

    // On vérifie que chaque valeur est à true
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/every
    return values.every(currentValue => currentValue);
}

function toggleBtn(btn, activated) {
    btn.classList.toggle('btn--disabled', !activated);
    btn.toggleAttribute('disabled', !activated);
}