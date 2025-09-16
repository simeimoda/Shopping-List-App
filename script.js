let inputElement = document.querySelector('#container input');
let buttonElement = document.querySelector('#container button');
let listElement = document.querySelector('#container ul');

let alertTimer;

let tarefas = JSON.parse(localStorage.getItem('@listaTarefas')) || [];


renderTarefa();

function renderTarefa(){
    listElement.innerHTML = '';

    tarefas.map((tarefa, index) => {
        let liElement = document.createElement('li');
        liElement.classList.add('li-element');
        
        let textElement = document.createElement('span');
        textElement.textContent = tarefa.texto;
        textElement.classList.add('texto');

        let checkElement = document.createElement('input');
        checkElement.type = 'checkbox';
        checkElement.classList.add('checkbox-element');
        
        let deleteButton = document.createElement('img');
        deleteButton.src = 'assets/icon-delete.svg';
        deleteButton.classList.add('delete-button');
        
        deleteButton.onclick = () => {deletarTarefa(index)};
        
        statusTarefa(tarefa, index, textElement, checkElement);
        
        liElement.appendChild(checkElement);
        liElement.appendChild(textElement);
        liElement.appendChild(deleteButton);
        listElement.appendChild(liElement);
    })
}

function adicionarTarefa(){
    if(inputElement.value !== ''){
        tarefas.push({
            texto: inputElement.value,
            concluida: false
        });
    }else{
        alert('Digite para adicionar um item.');
    }

    inputElement.value = '';

    salvarTarefa();
    renderTarefa();
}


function deletarTarefa(posicao){
    tarefas.splice(posicao, 1);

    salvarTarefa();
    renderTarefa();
    
    let alertDel = document.querySelector('.alert');
    
    clearTimeout(alertTimer);
    alertDel.innerHTML = ''
    
    alertDel.classList.add('alert-visible')

    let alertSpan = document.createElement('span')
    alertSpan.textContent = 'O item foi deletado da lista';
    alertSpan.classList.add('alert-text')

    let alertIcon = document.createElement('img');
    alertIcon.src = 'assets/AlertSquare.svg';
    alertIcon.classList.add('alert-icon');

    alertDel.appendChild(alertIcon);
    alertDel.appendChild(alertSpan);
       
    
    alertTimer = setTimeout(() => {
        alertDel.classList.remove('alert-visible');
    },2500);
    
}
    

function statusTarefa(tarefa, index, textElement, checkElement){
    checkElement.onclick = () => {
        tarefas[index].concluida = !tarefas[index].concluida;
        salvarTarefa();
        textElement.classList.toggle('checked');
    }; 

    checkElement.checked = tarefa.concluida;

    if(tarefa.concluida){
            textElement.classList.add('checked');
        }

}


function salvarTarefa(){
    localStorage.setItem('@listaTarefas', JSON.stringify(tarefas));
}


buttonElement.addEventListener('click', adicionarTarefa);
inputElement.addEventListener('keypress', (event) => {
    if(event.key === 'Enter'){
        adicionarTarefa();
    }

})

