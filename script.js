let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvarTarefa() {
  const nova = {
    nome: document.getElementById("nome").value,
    descricao: document.getElementById("descricao").value,
    prazo: document.getElementById("prazo").value,
    responsavel: document.getElementById("responsavel").value,
    status: "Pendente"
  };

  if (!nova.nome || !nova.descricao || !nova.prazo || !nova.responsavel) {
    alert("Preencha todos os campos!");
    return;
  }

  tarefas.push(nova);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
  listarTarefas();

  document.getElementById("nome").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("prazo").value = "";
  document.getElementById("responsavel").value = "";
}

function listarTarefas() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";
  tarefas.forEach((tarefa, index) => {
    lista.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <strong>${tarefa.nome}</strong> - ${tarefa.status}<br>
          ${tarefa.descricao} | Prazo: ${tarefa.prazo} | Resp: ${tarefa.responsavel}
        </div>
        <div>
          <button class="btn btn-success btn-sm me-2" onclick="concluirTarefa(${index})">Concluir</button>
          <button class="btn btn-danger btn-sm" onclick="excluirTarefa(${index})">Excluir</button>
        </div>
      </li>`;
  });
}

function concluirTarefa(index) {
  tarefas[index].status = "Concluída";
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
  listarTarefas();
}

function excluirTarefa(index) {
  tarefas.splice(index, 1);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
  listarTarefas();
}

function filtrar(status) {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";
  tarefas.filter(t => t.status === status).forEach((tarefa, index) => {
    lista.innerHTML += `
      <li class="list-group-item">
        <strong>${tarefa.nome}</strong> - ${tarefa.status}<br>
        ${tarefa.descricao} | Prazo: ${tarefa.prazo} | Resp: ${tarefa.responsavel}
      </li>`;
  });
}

listarTarefas();
