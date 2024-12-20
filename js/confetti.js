// Função de confete com diferentes efeitos
function fireConfetti(type = 'default') {
    const configs = {
        default: {
            particleCount: 200,
            spread: 70,
            origin: { y: 0.6 }
        },
        burst: {
            particleCount: 400,
            spread: 140,
            startVelocity: 30,
            origin: { y: 0.6 }
        },
        cannon: {
            particleCount: 1000,
            spread: 200,
            origin: { y: 0.6 }
        }
    };

    const colors = [
        '#26ccff', '#a25afd', '#ff5e7e',
        '#88ff5a', '#fcff42', '#ffa62b'
    ];

    confetti({
        ...configs[type],
        colors: colors,
        // Adiciona alguns efeitos de partículas diferentes
        shapes: ['square', 'circle'],
        scalar: 1.2
    });
}