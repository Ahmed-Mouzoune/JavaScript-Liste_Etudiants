import { StudentService } from './student.js';

// On instancie le service
const studentService = new StudentService();

// On récupère la liste des étudiants
const students = studentService.getAllStudents();

// On récupère le <table> d'ID 'students-table'
const studentsTable = document.getElementById('students-table');
// On récupère, dans le <table>, le premier élément <tbody>
const tbody = studentsTable.querySelector('tbody');

const searchBar = document.getElementById('search');
searchBar.addEventListener('input', (event) => {
    // Récupérer ce qu'on a tapé dans la barre
    const searchTerm = event.target.value.toLowerCase(); // ex: Leo INIT
    // Isoler chaque terme de recherche
    // + filtrer pour enlever les termes de recherche vides
    const searchTerms = searchTerm.split(' ').filter(term => term !== ''); // ex ['Leo', 'INIT']

    // Récupérer TOUTES les lignes (<tr>) depuis le tbody
    const lignes = tbody.querySelectorAll('tr');

    // Pour toute ligne qui existe
    lignes.forEach(ligne => {
        // On récupère le texte
        const lineText = ligne.innerText.toLowerCase();
        
        // Pour tout les termes de recherche, 
        // le texte de la ligne doit contenir chaque terme
        const shouldDisplay = searchTerms.every(term => lineText.includes(term));

        // On active ou désactive la ligne selon qu'elle contienne le texte
        ligne.classList.toggle('hide', !shouldDisplay);
    });
});

// On crée la liste au niveau HTML des étudiants
students.forEach((student) => {
    // Je crée une ligne 
    const tr = document.createElement('tr');

    // Je crée les cellules de la ligne
    const tdFirstname = document.createElement('td');
    const tdLastname = document.createElement('td');
    const tdClassname = document.createElement('td');

    // On crée une cellule qui contiendra les boutons d'actions (modifier et supprimer)
    const tdActionButtons = document.createElement('td');
    const editBtn = document.createElement('button');
    
    // On spécifie le HTML du bouton
    editBtn.innerHTML = '<span class="material-icons">edit</span>';

    // Au clic sur le bouton, on rend la ligne éditable
    let isEdition = false;
    editBtn.addEventListener('click', () => {
        isEdition = !isEdition;
        if (isEdition) {
            makeRowEditable(tr);
            editBtn.innerHTML = '<span class="material-icons">done</span>';
        } else {
            makeRowNonEditable(tr);
            editBtn.innerHTML = '<span class="material-icons">edit</span>';
        }
    });

    // On rattache le bouton à la cellule
    tdActionButtons.append(editBtn);


    // Je rattache les cellules à la ligne
    tr.append(tdFirstname, tdLastname, tdClassname, tdActionButtons);

    // Je rattache la ligne au tbody
    tbody.append(tr);

    // Je spécifie le texte de chaque cellule
    tdFirstname.innerText = student.firstname;
    tdLastname.innerText = student.lastname;
    tdClassname.innerText = student.classname;

});

function makeRowEditable(tr) {
    // Récupérer les cellules
    const [tdFirstname, tdLastname, tdClassname] = tr.querySelectorAll('td'); // équivalent aux 4 lignes ci-dessous
    // const cellules = tr.querySelectorAll('td'); // [td, td, td, td]
    // const tdFirstname = cellules[0];
    // const tdLastname = cellules[1];
    // const tdClassname = cellules[2];


    // Pour chaque cellule : 
    // Il faut récupérer le texte
    const firstname = tdFirstname.innerText;
    const lastname = tdLastname.innerText;
    const classname = tdClassname.innerText;

    // Il faut remplacer le contenu de la cellule par un input ou un select
    const firstnameInput = document.createElement('input');
    firstnameInput.value = firstname;

    const lastnameInput = document.createElement('input');
    lastnameInput.value = lastname;

    const classnameSelect = document.createElement('select');

    const options = ['E-BUSINESS', 'INTERACTIVE DESIGN', 'WEB DEVELOPMENT', 'INITIAL'];
    options.forEach((option) => {
        // On crée un élément <option>
        const opt = document.createElement('option');
        opt.value = option; // on set la value
        opt.innerText = option; // on set le texte
        classnameSelect.append(opt); // on rattache l'option au select créé ligne 108
    });

    classnameSelect.value = classname;

    // On vide le texte des cellules
    tdFirstname.innerText = '';
    tdLastname.innerText = '';
    tdClassname.innerText = '';

    // On met les champs de modification
    tdFirstname.append(firstnameInput);
    tdLastname.append(lastnameInput);
    tdClassname.append(classnameSelect);

}

function makeRowNonEditable(tr) {

    // Récupérer les cellules
    const [tdFirstname, tdLastname, tdClassname] = tr.querySelectorAll('td'); // équivalent aux 4 lignes ci-dessous
    
    // Récupérer les inputs
    const firstnameInput = tdFirstname.querySelector('input');
    const lastnameInput = tdLastname.querySelector('input');
    const classnameInput = tdClassname.querySelector('select');

    // Récupère les valeurs écrites dans les inputs
    const firstname = firstnameInput.value;
    const lastname = lastnameInput.value;
    const classname = classnameInput.value;

    // Remplacer les inputs par ces valeurs
    tdFirstname.innerText = firstname;
    tdLastname.innerText = lastname;
    tdClassname.innerText = classname;
}