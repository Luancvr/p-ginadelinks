// Configuração inicial da página
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    addEditingCapabilities();
});

// Inicialização da página
function initializePage() {
    // Adicionar efeito de parallax suave no fundo
    window.addEventListener('scroll', handleParallax);
    
    // Adicionar animação de entrada escalonada
    const linkBlocks = document.querySelectorAll('.link-block');
    linkBlocks.forEach((block, index) => {
        block.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Configurar observador de interseção para animações
    setupIntersectionObserver();
}

// Configurar event listeners
function setupEventListeners() {
    const linkBlocks = document.querySelectorAll('.link-block');
    
    linkBlocks.forEach(block => {
        // Click handler para navegação
        block.addEventListener('click', handleLinkClick);
        
        // Efeitos de hover aprimorados
        block.addEventListener('mouseenter', handleMouseEnter);
        block.addEventListener('mouseleave', handleMouseLeave);
        
        // Suporte para toque em dispositivos móveis
        block.addEventListener('touchstart', handleTouchStart);
        block.addEventListener('touchend', handleTouchEnd);
    });
    
    // Adicionar funcionalidade de edição
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Handler para cliques nos links
function handleLinkClick(event) {
    const block = event.currentTarget;
    const url = block.dataset.link;
    
    if (!url || url === '') {
        // Se não há URL, entrar em modo de edição
        if (!block.classList.contains('editing')) {
            enterEditMode(block);
        }
        return;
    }
    
    // Adicionar efeito de loading
    block.classList.add('loading');
    
    // Simular delay de carregamento para melhor UX
    setTimeout(() => {
        block.classList.remove('loading');
        window.open(url, '_blank');
    }, 300);
}

// Efeitos de hover
function handleMouseEnter(event) {
    const block = event.currentTarget;
    
    // Adicionar efeito de brilho
    block.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.25), 0 0 30px rgba(255, 255, 255, 0.1)';
    
    // Animar ícone
    const icon = block.querySelector('.link-icon');
    if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
    }
}

function handleMouseLeave(event) {
    const block = event.currentTarget;
    
    // Remover efeitos de hover
    block.style.boxShadow = '';
    
    const icon = block.querySelector('.link-icon');
    if (icon) {
        icon.style.transform = '';
    }
}

// Suporte para dispositivos móveis
function handleTouchStart(event) {
    const block = event.currentTarget;
    block.style.transform = 'translateY(-2px) scale(0.98)';
}

function handleTouchEnd(event) {
    const block = event.currentTarget;
    setTimeout(() => {
        block.style.transform = '';
    }, 150);
}

// Efeito parallax suave
function handleParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.background-overlay');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// Observador de interseção para animações
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.link-block').forEach(block => {
        observer.observe(block);
    });
}

// Funcionalidades de edição
function addEditingCapabilities() {
    // Adicionar botão de edição flutuante
    createEditButton();
    
    // Tornar elementos editáveis
    makeElementsEditable();
}

function createEditButton() {
    const editButton = document.createElement('button');
    editButton.innerHTML = '✏️';
    editButton.className = 'edit-button';
    editButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white;
        font-size: 24px;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    editButton.addEventListener('click', toggleEditMode);
    editButton.addEventListener('mouseenter', () => {
        editButton.style.transform = 'scale(1.1)';
        editButton.style.background = 'rgba(255, 255, 255, 0.3)';
    });
    editButton.addEventListener('mouseleave', () => {
        editButton.style.transform = 'scale(1)';
        editButton.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    
    document.body.appendChild(editButton);
}

function makeElementsEditable() {
    // Tornar título editável
    const title = document.getElementById('main-title');
    const subtitle = document.getElementById('subtitle');
    
    [title, subtitle].forEach(element => {
        element.addEventListener('dblclick', () => {
            makeTextEditable(element);
        });
    });
    
    // Tornar imagem de perfil editável
    const profileImg = document.getElementById('profile-img');
    profileImg.addEventListener('dblclick', () => {
        changeProfileImage();
    });
}

function makeTextEditable(element) {
    const originalText = element.textContent;
    const input = document.createElement('input');
    
    input.value = originalText;
    input.style.cssText = `
        background: rgba(255, 255, 255, 0.2);
        border: 2px solid rgba(255, 255, 255, 0.5);
        border-radius: 8px;
        padding: 8px 12px;
        color: white;
        font-size: inherit;
        font-weight: inherit;
        font-family: inherit;
        text-align: center;
        width: 100%;
        backdrop-filter: blur(10px);
    `;
    
    input.addEventListener('blur', () => {
        element.textContent = input.value || originalText;
        element.style.display = '';
        input.remove();
    });
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            input.blur();
        }
        if (e.key === 'Escape') {
            element.textContent = originalText;
            element.style.display = '';
            input.remove();
        }
    });
    
    element.style.display = 'none';
    element.parentNode.insertBefore(input, element.nextSibling);
    input.focus();
    input.select();
}

function changeProfileImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('profile-img').src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    input.click();
}

let editMode = false;

function toggleEditMode() {
    editMode = !editMode;
    const linkBlocks = document.querySelectorAll('.link-block');
    const editButton = document.querySelector('.edit-button');
    
    if (editMode) {
        editButton.innerHTML = '💾';
        editButton.style.background = 'rgba(34, 197, 94, 0.3)';
        
        linkBlocks.forEach(block => {
            block.classList.add('edit-mode');
            addEditControls(block);
        });
        
        showEditInstructions();
    } else {
        editButton.innerHTML = '✏️';
        editButton.style.background = 'rgba(255, 255, 255, 0.2)';
        
        linkBlocks.forEach(block => {
            block.classList.remove('edit-mode');
            removeEditControls(block);
        });
        
        hideEditInstructions();
    }
}

function addEditControls(block) {
    // Adicionar overlay de edição
    const overlay = document.createElement('div');
    overlay.className = 'edit-overlay';
    overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        border-radius: 16px;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Botões de edição
    const editImageBtn = createEditButton('🖼️', () => editBlockImage(block));
    const editLinkBtn = createEditButton('🔗', () => editBlockLink(block));
    const editTextBtn = createEditButton('📝', () => editBlockText(block));
    
    overlay.appendChild(editImageBtn);
    overlay.appendChild(editLinkBtn);
    overlay.appendChild(editTextBtn);
    
    block.style.position = 'relative';
    block.appendChild(overlay);
    
    // Mostrar overlay no hover
    block.addEventListener('mouseenter', () => {
        if (editMode) overlay.style.opacity = '1';
    });
    block.addEventListener('mouseleave', () => {
        overlay.style.opacity = '0';
    });
}

function createEditButton(emoji, onClick) {
    const btn = document.createElement('button');
    btn.innerHTML = emoji;
    btn.style.cssText = `
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white;
        font-size: 18px;
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    `;
    
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        onClick();
    });
    
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'scale(1.1)';
        btn.style.background = 'rgba(255, 255, 255, 0.3)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1)';
        btn.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    
    return btn;
}

function editBlockImage(block) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = block.querySelector('.icon-img');
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    input.click();
}

function editBlockLink(block) {
    const currentLink = block.dataset.link || '';
    const newLink = prompt('Digite a URL do link:', currentLink);
    
    if (newLink !== null) {
        block.dataset.link = newLink;
        
        // Feedback visual
        const linkInfo = block.querySelector('.link-info');
        linkInfo.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            linkInfo.style.animation = '';
        }, 500);
    }
}

function editBlockText(block) {
    const title = block.querySelector('.link-title');
    const description = block.querySelector('.link-description');
    
    const newTitle = prompt('Digite o título:', title.textContent);
    if (newTitle !== null) {
        title.textContent = newTitle;
    }
    
    const newDescription = prompt('Digite a descrição:', description.textContent);
    if (newDescription !== null) {
        description.textContent = newDescription;
    }
}

function removeEditControls(block) {
    const overlay = block.querySelector('.edit-overlay');
    if (overlay) {
        overlay.remove();
    }
}

function showEditInstructions() {
    const instructions = document.createElement('div');
    instructions.className = 'edit-instructions';
    instructions.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px 25px;
            border-radius: 12px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            z-index: 1001;
            text-align: center;
            animation: slideDown 0.3s ease;
        ">
            <strong>Modo de Edição Ativo</strong><br>
            Passe o mouse sobre os blocos para editá-los<br>
            Clique duas vezes no título/subtítulo para editar
        </div>
    `;
    
    document.body.appendChild(instructions);
}

function hideEditInstructions() {
    const instructions = document.querySelector('.edit-instructions');
    if (instructions) {
        instructions.remove();
    }
}

// Atalhos de teclado
function handleKeyboardShortcuts(event) {
    if (event.ctrlKey || event.metaKey) {
        switch(event.key) {
            case 'e':
                event.preventDefault();
                toggleEditMode();
                break;
            case 's':
                event.preventDefault();
                savePageConfiguration();
                break;
        }
    }
}

// Salvar configuração da página
function savePageConfiguration() {
    const config = {
        title: document.getElementById('main-title').textContent,
        subtitle: document.getElementById('subtitle').textContent,
        profileImage: document.getElementById('profile-img').src,
        links: []
    };
    
    document.querySelectorAll('.link-block').forEach(block => {
        const linkData = {
            title: block.querySelector('.link-title').textContent,
            description: block.querySelector('.link-description').textContent,
            url: block.dataset.link || '',
            image: block.querySelector('.icon-img').src
        };
        config.links.push(linkData);
    });
    
    // Salvar no localStorage
    localStorage.setItem('linksPageConfig', JSON.stringify(config));
    
    // Feedback visual
    showNotification('Configuração salva com sucesso!', 'success');
}

// Carregar configuração salva
function loadPageConfiguration() {
    const saved = localStorage.getItem('linksPageConfig');
    if (saved) {
        const config = JSON.parse(saved);
        
        document.getElementById('main-title').textContent = config.title;
        document.getElementById('subtitle').textContent = config.subtitle;
        document.getElementById('profile-img').src = config.profileImage;
        
        const linkBlocks = document.querySelectorAll('.link-block');
        config.links.forEach((linkData, index) => {
            if (linkBlocks[index]) {
                const block = linkBlocks[index];
                block.querySelector('.link-title').textContent = linkData.title;
                block.querySelector('.link-description').textContent = linkData.description;
                block.dataset.link = linkData.url;
                block.querySelector('.icon-img').src = linkData.image;
            }
        });
    }
}

// Mostrar notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(59, 130, 246, 0.9)'};
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        z-index: 1002;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Carregar configuração ao inicializar
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(loadPageConfiguration, 100);
});

// Adicionar estilos de animação via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);
