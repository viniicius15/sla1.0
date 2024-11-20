document.getElementById('pesquisar').addEventListener('keyup', function() {
    var searchValue = this.value.toLowerCase();
    var produtos = document.querySelectorAll('.produto');

    produtos.forEach(function(produto) {
        var produtoNome = produto.querySelector('h2').textContent.toLowerCase();
        var produtoCodigo = produto.querySelector('.codigo').textContent.toLocaleLowerCase()
        if (produtoNome.includes(searchValue)|| produtoCodigo.includes(searchValue)) {
            produto.style.display = '';
        } else {
            produto.style.display = 'none';
        }
    });
});



const produtos = document.querySelectorAll('.produto');

produtos.forEach(produto => {
    const btnMais = produto.querySelector('#mais');
    const btnMenos = produto.querySelector('#menos');
    const btnAdicionar = produto.querySelector('#adicionar');
    const btnRemover = produto.querySelector('#remover');
    const numDisplay = produto.querySelector('.num h4');
    const estoqueDisplay = produto.querySelector('.estoqueclass h5:last-child');
    const nomeProduto = produto.querySelector('h2').textContent;
    const valorProduto = 50;
    
    let quantidade = 0;
    let estoque = parseInt(estoqueDisplay.textContent);

    btnMais.addEventListener('click', () => {
        if (quantidade < estoque) {
            quantidade++;
            numDisplay.textContent = quantidade;
        } else {
            alert('Quantidade máxima atingida!');
        }
    });

    btnMenos.addEventListener('click', () => {
        if (quantidade > 0) {
            quantidade--;
            numDisplay.textContent = quantidade;
        } else {
            alert('Quantidade não pode ser menor que 0!');
        }
    });

    btnAdicionar.addEventListener('click', () => {
        if (quantidade > 0) {
 
            const quantidadeAdicionada = quantidade;
    

            estoque += quantidadeAdicionada;
            estoqueDisplay.textContent = estoque;
            

            quantidade = 0;
            numDisplay.textContent = quantidade;

            const dataHora = new Date().toLocaleString();
    
            const comprovante = `
                <div class="comprovante">
                    <h3>Comprovante de Recebimento</h3>
                    <p><strong>Produto:</strong> ${nomeProduto}</p>
                    <p><strong>Quantidade Adicionada:</strong> ${quantidadeAdicionada}</p>
                    <p><strong>Quantidade restante no estoque:</strong> ${estoque}</p>
                    <p><strong>Data e Hora:</strong> ${dataHora}</p>
                    <div class="comprovante-btn">
                        <a class="fechar-comprovante"><ion-icon name="close-outline"></ion-icon></a>
                    </div>
                </div>
            `;
    
            const body = document.body;
            const divComprovante = document.createElement('div');
            divComprovante.innerHTML = comprovante;
            body.appendChild(divComprovante);
    
            const btnFechar = divComprovante.querySelector('.fechar-comprovante');
            btnFechar.addEventListener('click', () => {
                divComprovante.remove();
            });
        } else {
            alert('Selecione pelo menos 1 item para adicionar.');
        }
    });
    

    btnRemover.addEventListener('click', () => {
        if (quantidade > 0) {
            quantidadeRemovida = quantidade
            estoque -= quantidadeRemovida; 
            estoqueDisplay.textContent = estoque;

            const dataHora = new Date().toLocaleString();

            const comprovante = `
                <div class="comprovante">
                    <h3>Comprovante de Retirada</h3>
                    <p><strong>Produto:</strong> ${nomeProduto}</p>
                    <p><strong>Quantidade retirada:</strong> ${quantidadeRemovida}</p>
                    <p><strong>Quantidade restante no estoque:</strong> ${estoque}</p>
                    <p><strong>Data e Hora:</strong> ${dataHora}</p>
                    <div class="comprovante-btn">
                        <button class="baixar-pdf">Baixar PDF</button>
                        <a class="fechar-comprovante"><ion-icon name="close-outline"></ion-icon></a>
                    </div>
                </div>
            `;

            const body = document.body;
            const divComprovante = document.createElement('div');
            divComprovante.innerHTML = comprovante;
            body.appendChild(divComprovante);

            const btnFechar = divComprovante.querySelector('.fechar-comprovante');
            btnFechar.addEventListener('click', () => {
                divComprovante.remove(); 
            });

            const btnBaixarPDF = divComprovante.querySelector('.baixar-pdf');
            btnBaixarPDF.addEventListener('click', () => {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();

                const title = 'Comprovante de Retirada';
                const produtoText = `Produto: ${nomeProduto}`;
                const qtdRetiradaText = `Quantidade retirada: ${quantidadeRemovida}`;
                const qtdRestanteText = `Quantidade restante no estoque: ${estoque}`;
                const dataHoraText = `Data e Hora: ${dataHora}`;

                const pageWidth = doc.internal.pageSize.width;
                const startX = pageWidth / 2;

                doc.setFont('helvetica', 'normal');
                doc.text(title, startX, 20, { align: 'center' });
                doc.text(produtoText, startX, 30, { align: 'center' });
                doc.text(qtdRetiradaText, startX, 40, { align: 'center' });
                doc.text(qtdRestanteText, startX, 50, { align: 'center' });
                doc.text(dataHoraText, startX, 60, { align: 'center' });

                doc.save(`${nomeProduto}_Comprovante.pdf`);
            });

            quantidade = 0;
            numDisplay.textContent = quantidade;
        } else {
            alert('Selecione pelo menos 1 item para remover.');
        }
    });
});

window.adopt = {
    id: "4589a8df-b71b-4dce-a0f0-68f0b4214d7b"
  };