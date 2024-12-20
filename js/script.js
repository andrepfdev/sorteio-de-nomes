$(document).ready(function () {

    // Função para processar arquivo CSV ou TXT (mantida do código anterior)
    function processFile(file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const content = e.target.result;

            // Detecta separador (virgula ou nova linha)
            let names;
            if (file.name.endsWith('.csv')) {
                names = content.split(/\r?\n/)
                    .map(line => line.split(',').map(name => name.trim()))
                    .flat()
                    .filter(name => name !== '');
            } else {
                names = content.split(/\r?\n/)
                    .map(name => name.trim())
                    .filter(name => name !== '');
            }

            $('#namesInput').val(names.join('\n'));
            $('#fileInfo').text(`${names.length} nomes carregados`);
        };

        reader.readAsText(file);
    }

    // Evento de upload de arquivo
    $('#fileUpload').on('change', function (e) {
        const file = e.target.files[0];

        if (file) {
            const validExtensions = ['csv', 'txt'];
            const fileExtension = file.name.split('.').pop().toLowerCase();

            if (validExtensions.includes(fileExtension)) {
                processFile(file);
            } else {
                alert('Por favor, selecione apenas arquivos CSV ou TXT');
                this.value = '';
                $('#fileInfo').text('');
            }
        }
    });

    // Botão de limpar nomes
    $('#clearButton').on('click', function () {
        $('#namesInput').val('');
        $('#drawCount').val(1);
        $('#fileUpload').val('');
        $('#fileInfo').text('');
        $('#resultArea').empty();
    });

    // Função de sorteio
    $('#drawButton').on('click', function () {
        // Limpar resultados anteriores
        $('#resultArea').empty();

        // Obter os nomes e processá-los
        let namesInput = $('#namesInput').val();
        let names = namesInput.includes(',')
            ? namesInput.split(',').map(name => name.trim())
            : namesInput.split('\n').map(name => name.trim());

        // Remover nomes vazios
        names = names.filter(name => name !== '');

        // Validar entrada
        if (names.length === 0) {
            alert('Por favor, insira alguns nomes!');
            return;
        }

        // Obter quantidade de nomes a sortear
        let drawCount = parseInt($('#drawCount').val());
        drawCount = Math.min(drawCount, names.length);

        // Função para sortear nomes únicos
        function drawUniqueNames(names, count) {
            let shuffled = names.slice();
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled.slice(0, count);
        }

        // Sortear nomes
        let drawnNames = drawUniqueNames(names, drawCount);

        // Diferentes efeitos de confete
        if (drawCount === 1) {
            fireConfetti('default');
        } else if (drawCount <= 3) {
            fireConfetti('burst');
        } else {
            fireConfetti('cannon');
        }

        // Exibir nomes sorteados com animação
        drawnNames.forEach((name, index) => {
            setTimeout(() => {
                let nameElement = $('<div>')
                    .addClass('bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded-full opacity-0 transition-opacity duration-500')
                    .text(name);

                $('#resultArea').append(nameElement);

                // Trigger reflow to enable transition
                nameElement[0].offsetWidth;

                // Fade in
                nameElement.removeClass('opacity-0');
            }, index * 500); // Delay entre cada nome
        });
    });
});