// Configuração inicial da página
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    preventImageDragging();
});

// Detectar se é dispositivo móvel
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Configurar event listeners
function setupEventListeners() {
    const linkBlocks = document.querySelectorAll('.link-block');
    const imageBlocks = document.querySelectorAll('.image-link-block');
    
    // Event listeners para blocos tradicionais
    linkBlocks.forEach(block => {
        block.addEventListener('click', handleLinkClick);
        block.addEventListener('mouseenter', handleMouseEnter);
        block.addEventListener('mouseleave', handleMouseLeave);
        block.addEventListener('touchstart', handleTouchStart);
        block.addEventListener('touchend', handleTouchEnd);
    });
    
    // Event listeners para blocos de imagem
    imageBlocks.forEach(block => {
        block.addEventListener('click', handleImageLinkClick);
        block.addEventListener('mouseenter', handleImageMouseEnter);
        block.addEventListener('mouseleave', handleImageMouseLeave);
        block.addEventListener('touchstart', handleImageTouchStart);
        block.addEventListener('touchend', handleImageTouchEnd);
    });
}

// Handler para cliques nos blocos tradicionais
function handleLinkClick(event) {
    const block = event.currentTarget;
    const url = block.dataset.link;
    
    if (url && url !== '') {
        // Se for mobile, aguardar a animação completar
        if (isMobileDevice()) {
            block.classList.add('loading');
            setTimeout(() => {
                block.classList.remove('loading');
                window.open(url, '_blank');
            }, 500); // Tempo para exibir a animação
        } else {
            // Desktop: abrir imediatamente
            block.classList.add('loading');
            setTimeout(() => {
                block.classList.remove('loading');
                window.open(url, '_blank');
            }, 300);
        }
    }
}

// Handler para cliques nos blocos de imagem
function handleImageLinkClick(event) {
    const block = event.currentTarget;
    const url = block.dataset.link;
    
    if (url && url !== '') {
        // Se for mobile, aguardar a animação completar
        if (isMobileDevice()) {
            block.classList.add('loading');
            setTimeout(() => {
                block.classList.remove('loading');
                window.open(url, '_blank');
            }, 600); // Tempo para exibir a animação
        } else {
            // Desktop: abrir imediatamente
            block.classList.add('loading');
            setTimeout(() => {
                block.classList.remove('loading');
                window.open(url, '_blank');
            }, 400);
        }
    }
}

// Efeitos de hover para blocos tradicionais
function handleMouseEnter(event) {
    const block = event.currentTarget;
    block.style.boxShadow = '0 0 20px -2px rgb(0, 255, 50), 0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.3)';
    
    const icon = block.querySelector('.link-icon');
    if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
    }
}

function handleMouseLeave(event) {
    const block = event.currentTarget;
    block.style.boxShadow = '';
    
    const icon = block.querySelector('.link-icon');
    if (icon) {
        icon.style.transform = '';
    }
}

// Efeitos de hover para blocos de imagem
function handleImageMouseEnter(event) {
    const block = event.currentTarget;
    const img = block.querySelector('.image-link-img');
    
    if (img) {
        img.style.transform = 'scale(1.1)';
        img.style.filter = 'brightness(1)';
    }
    
    block.style.transform = 'translateY(-10px) scale(1.02)';
    block.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.3)';
}

function handleImageMouseLeave(event) {
    const block = event.currentTarget;
    const img = block.querySelector('.image-link-img');
    
    if (img) {
        img.style.transform = '';
        img.style.filter = '';
    }
    
    block.style.transform = '';
    block.style.boxShadow = '';
}

// Suporte para dispositivos móveis - blocos tradicionais
function handleTouchStart(event) {
    const block = event.currentTarget;
    block.style.transform = 'translateY(-4px) scale(0.98)';
}

function handleTouchEnd(event) {
    const block = event.currentTarget;
    setTimeout(() => {
        block.style.transform = '';
    }, 150);
}

// Suporte para dispositivos móveis - blocos de imagem
function handleImageTouchStart(event) {
    const block = event.currentTarget;
    block.style.transform = 'translateY(-5px) scale(1.01)';
}

function handleImageTouchEnd(event) {
    const block = event.currentTarget;
    setTimeout(() => {
        block.style.transform = '';
    }, 200);
}

// Impedir arrastar imagens e ícones
function preventImageDragging() {
    // Impedir arrastar todas as imagens
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.draggable = false;
        img.addEventListener('dragstart', (e) => e.preventDefault());
        img.addEventListener('selectstart', (e) => e.preventDefault());
        img.style.userSelect = 'none';
        img.style.webkitUserSelect = 'none';
        img.style.mozUserSelect = 'none';
        img.style.msUserSelect = 'none';
    });
    
    // Impedir seleção de texto nos blocos
    const allBlocks = document.querySelectorAll('.link-block, .image-link-block');
    allBlocks.forEach(block => {
        block.style.userSelect = 'none';
        block.style.webkitUserSelect = 'none';
        block.style.mozUserSelect = 'none';
        block.style.msUserSelect = 'none';
        block.addEventListener('selectstart', (e) => e.preventDefault());
        block.addEventListener('contextmenu', (e) => e.preventDefault());
    });
}
