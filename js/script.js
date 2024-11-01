const button = document.querySelector(".btn-add-task");
const input = document.querySelector(".input-task");
const listaCompleta = document.querySelector(".list-task");

let minhaListaItens = [];

button.addEventListener('click', addNovaTarefa);

// ================= FUNÇÃO DE    A D I C I O N A R    TAREFAS =================
function addNovaTarefa() {

    //ESTAMOS VERIFICANDO SE O VALOR DO INPUT ESTA VAZIO. (=== '') 
    if (input.value === '') {

        
        alert('Digite uma tarefa');//SE O INPUT ESTIVER VAZIO, MOSTRAMOS UMA ALERTA
    
    } else {

        minhaListaItens.push({
            
            tarefa : input.value.trim(),
            concluido : false

        });//ADICIONANDO A NOVA TAREFA AO ARRAY COM O MÉTODO PUSH = ADICIONAR ALGO NO FIM DO ARRAY
        
        input.value = '';//AQUI ESTAMOS LIMANDO O INPUT

        mostrarTarefas();//ESTAMOS CHAMANDO A FUNÇÕO DE MOSTRAR AS TAREFAS COM A NOVA TAREFA ADICIONADA

        console.log(minhaListaItens);//ESTAMOS MOSTRANDO NO CONSOLE AS TAREFAS ADICIONADAS - NÃO NECESSÁRIO

    }

}


// ================= FUNÇÕO DE    D E L E T A R    TAREFAS =================
function deletarTarefa(posicao) {

    const confirma = confirm("Tem certeza que deseja deletar esta tarefa?");

    if (confirma) {

        minhaListaItens.splice(posicao, 1); // Estamos deletando a tarefa específica da posição do array que pegamos
        mostrarTarefas(); // Chamando a função de mostrar as tarefas sem a tarefa que foi deletada
    
    } else {
     
        alert("Ação de deletar tarefa cancelada."); // Mensagem caso a ação seja cancelada
    
    }

}


// ================= FUNÇÃO DE    M O S T R A R    TAREFAS =================
function mostrarTarefas() {

    let novaLi = '';//ESTAMOS CRIANDO UMA VARIAVEL VAZIA PARA RECEBER OS ITENS DA LISTA

    //ESTAMOS PERCORRENDO O ARRAY, PASSANDO POR CADA ITEM/TAREFA, COM O COMANDO FOREACH = PARA CADA
    minhaListaItens.forEach( (item, posicao) => {

        //ESTAMOS ATRIBUINDO A VARIAVEL novaLi UMA STRING COM O HTML PARA CADA ITEM/TAREFA DO ARRAY
        novaLi += `
        
                <li class="task ${item.concluido && "done"}">
                    <img src="img/iconCheck.png" alt="" onclick="concluirTarefa(${posicao})">
                    <p> ${item.tarefa}</p>
                    <img src="img/iconLixeira.png" alt="" onclick="deletarTarefa(${posicao})">
                </li>
            
            `;

    });

    listaCompleta.innerHTML = novaLi;//ESTAMOS ADD NO CÓDIGO HTML O CONTEUDO DA VARIAVEL novaLi

    localStorage.setItem( 'tarefas', JSON.stringify(minhaListaItens));

}


// ================= FUNÇÕO DE     R E C A R G A R    AS TAREFAS PELO LOCALSTORAGE ===================
function recarregarTarefas() {

    const tarefasLocalStorage = JSON.parse(localStorage.getItem('tarefas')) || [];
    minhaListaItens = tarefasLocalStorage;

    mostrarTarefas();
    
}


// ================= FUNÇÕO DE    C O N C L U I R    TAREFAS =================
function concluirTarefa(posicao) {

    minhaListaItens[posicao].concluido = !minhaListaItens[posicao].concluido;//ESTAMOS ALTERANDO O VALOR DA TAREFA ESPECIFICA DA POSICAO DO ARRAY QUE PEGAMOS
    console.log("Tarefa "+posicao+" concluída com sucesso!")

    mostrarTarefas();

}


recarregarTarefas();