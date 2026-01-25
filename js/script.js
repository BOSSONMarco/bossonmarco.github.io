// ============================================
// DONNÉES
// ============================================
const skills = [
    { name: 'Python', level: 55 },
    { name: 'HTML/CSS', level: 75 },
    { name: 'Git', level: 60 },
    { name: 'CAO/DAO', level: 80 },
    { name: 'Visuels et Animations', level: 70 },
    { name: 'Impression 3D', level: 65 }
];

const completedProjects = [
    {
        id: 1,
        title: "Participation au Dassault Unmade Aerial Vehicle DUAV 2025",
        description: "Conception et fabrication d'un VTOL",
        image: 'Images/Logo Dassault.png',
        technologies: ["CAO/DAO", "Impression 3D", "Electronique", "Simulation"],
        details: "Développement d'un VTOL portant un drone de reconnaissance pour des missions de reconnaissance en milieu hostile. Le projet incluait la conception complète, les simulations aérodynamiques et la fabrication des pièces.",
        duration: "3 mois",
    },
    {
        id: 2,
        title: 'Dashboard Analytics',
        description: 'Tableau de bord de visualisation de données',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        technologies: ['React', 'D3.js', 'API REST'],
        details: 'Création d\'un dashboard interactif pour visualiser des données complexes en temps réel avec des graphiques dynamiques et des indicateurs de performance.',
    },
    {
        id: 3,
        title: 'Site Web E-commerce',
        description: 'Plateforme de vente en ligne complète',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        technologies: ['HTML/CSS', 'JavaScript', 'PHP', 'MySQL'],
        details: 'Développement d\'une plateforme e-commerce complète avec système de paiement, gestion de stock et interface d\'administration. Intégration de fonctionnalités de recherche avancée et de recommandations produits.',
        duration: '4 mois',
    }
];

const ongoingProjects = [
    {
        id: 4,
        title: 'G.R.O.M.',
        description: 'Robot marcheur quadrupède',
        image: 'Images/RR GROM 1.jpg',
        technologies: ['CAO', 'Electronique', 'Conception', 'Blender', 'Impression 3D'],
        details: 'Développement d\'une application mobile pour suivre ses entraînements et progrès sportifs avec des statistiques détaillées et des objectifs personnalisables.',
        duration: 'En cours depuis maintenant 3 mois',
        progress: 80
    },
    {
        id: 5,
        title: 'Système IoT Domotique',
        description: 'Automatisation de maison intelligente',
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop',
        technologies: ['Arduino', 'Python', 'MQTT', 'Node.js'],
        details: 'Création d\'un système domotique complet permettant de contrôler l\'éclairage, le chauffage et la sécurité via une application web et mobile. Utilisation de capteurs et d\'actionneurs connectés.',
        duration: 'En cours depuis 2 mois',
        progress: 45
    },
    {
        id: 6,
        title: 'Portfolio Interactif',
        description: 'Site portfolio avec animations Three.js',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop',
        technologies: ['JavaScript', 'Git', 'HTML', 'CSS'],
        details: 'Développement d\'un portfolio moderne avec des animations 3D interactives, des transitions fluides et une expérience utilisateur immersive. Intégration de modèles 3D personnalisés créés avec Blender.',
        duration: 'En cours depuis 3 semaines',
        progress: 95
    }
];

let currentProjectType = '';
let carouselIntervals = {
    completed: null,
    ongoing: null
};
let carouselIndexes = {
    completed: 0,
    ongoing: 0
};

// ============================================
// INITIALISATION
// ============================================
function init() {
    renderSkills();
    renderProjects();
    updateProjectCounts();
    initCarousels();
}

// ============================================
// INITIALISATION DES CARROUSELS
// ============================================
function initCarousels() {
    // Carrousel pour projets terminés
    const completedCarousel = document.getElementById('completed-carousel');
    if (completedCarousel && completedProjects.length > 0) {
        completedCarousel.innerHTML = completedProjects.map((project, index) => `
            <img src="${project.image}" 
                 alt="${project.title}" 
                 class="main-card-image ${index === 0 ? 'active' : ''}"
                 onerror="this.style.display='none'">
        `).join('') + `
            <div class="main-card-carousel-dots">
                ${completedProjects.map((_, index) => `
                    <div class="carousel-dot ${index === 0 ? 'active' : ''}"></div>
                `).join('')}
            </div>
        `;
    }

    // Carrousel pour projets en cours
    const ongoingCarousel = document.getElementById('ongoing-carousel');
    if (ongoingCarousel && ongoingProjects.length > 0) {
        ongoingCarousel.innerHTML = ongoingProjects.map((project, index) => `
            <img src="${project.image}" 
                 alt="${project.title}" 
                 class="main-card-image ${index === 0 ? 'active' : ''}"
                 onerror="this.style.display='none'">
        `).join('') + `
            <div class="main-card-carousel-dots">
                ${ongoingProjects.map((_, index) => `
                    <div class="carousel-dot ${index === 0 ? 'active' : ''}"></div>
                `).join('')}
            </div>
        `;
    }
}

// ============================================
// DÉMARRAGE DU CARROUSEL
// ============================================
function startCarousel(type) {
    // Réinitialiser l'index
    carouselIndexes[type] = 0;
    
    // Nettoyer l'intervalle existant
    if (carouselIntervals[type]) {
        clearInterval(carouselIntervals[type]);
    }

    const projects = type === 'completed' ? completedProjects : ongoingProjects;
    if (projects.length <= 1) return; // Pas besoin de carrousel si un seul projet

    // Démarrer le défilement automatique
    carouselIntervals[type] = setInterval(() => {
        carouselIndexes[type] = (carouselIndexes[type] + 1) % projects.length;
        updateCarousel(type);
    }, 1500); // Change d'image toutes les 1.5 secondes
}

// ============================================
// ARRÊT DU CARROUSEL
// ============================================
function stopCarousel(type) {
    if (carouselIntervals[type]) {
        clearInterval(carouselIntervals[type]);
        carouselIntervals[type] = null;
    }
    // Revenir à la première image
    carouselIndexes[type] = 0;
    updateCarousel(type);
}

// ============================================
// MISE À JOUR DU CARROUSEL
// ============================================
function updateCarousel(type) {
    const carousel = document.getElementById(type + '-carousel');
    if (!carousel) return;

    const images = carousel.querySelectorAll('.main-card-image');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const currentIndex = carouselIndexes[type];

    // Mettre à jour les images
    images.forEach((img, index) => {
        if (index === currentIndex) {
            img.classList.add('active');
        } else {
            img.classList.remove('active');
        }
    });

    // Mettre à jour les dots
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// ============================================
// MISE À JOUR DES COMPTEURS
// ============================================
function updateProjectCounts() {
    const completedCount = document.getElementById('completed-count');
    const ongoingCount = document.getElementById('ongoing-count');
    
    if (completedCount) {
        completedCount.textContent = completedProjects.length;
    }
    if (ongoingCount) {
        ongoingCount.textContent = ongoingProjects.length;
    }
}

// ============================================
// AFFICHAGE DES COMPÉTENCES
// ============================================
function renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;
    
    container.innerHTML = skills.map(skill => `
        <div class="skill-card">
            <div class="skill-header">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-level">${skill.level}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${skill.level}%"></div>
            </div>
        </div>
    `).join('');
}

// ============================================
// AFFICHAGE DES PROJETS
// ============================================
function renderProjects() {
    // Projets terminés
    const completedContainer = document.getElementById('completed-projects');
    if (completedContainer) {
        completedContainer.innerHTML = completedProjects.map(project => `
            <div class="project-card" onclick="showProjectDetail(${project.id}, 'completed')">
                ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-image" onerror="this.style.display='none';this.nextElementSibling.querySelector('.project-icon').style.display='block'">` : ''}
                <div class="project-content">
                    <div class="project-icon" style="${project.image ? 'display:none' : ''}">${project.icon || '📦'}</div>
                    <div class="project-title">${project.title}</div>
                    <div class="project-desc">${project.description}</div>
                    <div class="tech-tags">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Projets en cours
    const ongoingContainer = document.getElementById('ongoing-projects');
    if (ongoingContainer) {
        ongoingContainer.innerHTML = ongoingProjects.map(project => `
            <div class="project-card" onclick="showProjectDetail(${project.id}, 'ongoing')">
                ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-image" onerror="this.style.display='none';this.nextElementSibling.querySelector('.project-icon').style.display='block'">` : ''}
                <div class="project-content">
                    <div class="project-icon" style="${project.image ? 'display:none' : ''}">${project.icon || '📦'}</div>
                    <div class="project-title">${project.title}</div>
                    <div class="project-desc">${project.description}</div>
                    ${project.progress ? `
                        <div class="progress-section">
                            <div class="progress-header">
                                <span>Progression</span>
                                <span>${project.progress}%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${project.progress}%"></div>
                            </div>
                        </div>
                    ` : ''}
                    <div class="tech-tags">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// ============================================
// NAVIGATION ENTRE PAGES
// ============================================
function showPage(page) {
    // Masquer toutes les pages
    const pages = ['home', 'completed', 'ongoing', 'contact', 'project-detail'];
    pages.forEach(p => {
        const element = document.getElementById(p + '-page');
        if (element) {
            element.classList.add('hidden');
        }
    });

    // Afficher la page demandée
    const targetPage = document.getElementById(page + '-page');
    if (targetPage) {
        targetPage.classList.remove('hidden');
    }
    
    // Scroll en haut de page
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// ============================================
// AFFICHAGE DÉTAIL PROJET
// ============================================
function showProjectDetail(id, type) {
    currentProjectType = type;
    const projects = type === 'completed' ? completedProjects : ongoingProjects;
    const project = projects.find(p => p.id === id);

    if (!project) return;

    const detailContainer = document.getElementById('project-detail-content');
    if (!detailContainer) return;
    
    detailContainer.innerHTML = `
        ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-detail-image" onerror="this.style.display='none';document.querySelector('.project-detail-icon').style.display='block'">` : ''}
        <div class="project-detail-icon" style="${project.image ? 'display:none' : ''}">${project.icon || '📦'}</div>
        <h2 class="project-detail-title">${project.title}</h2>
        
        <div class="detail-grid">
            <div class="detail-item">
                <h3>⏱️ Durée</h3>
                <p>${project.duration}</p>
            </div>
            <div class="detail-item">
                <h3>👤 Rôle</h3>
                <p>${project.role}</p>
            </div>
        </div>

        <div class="detail-section">
            <h3>🛠️ Technologies utilisées</h3>
            <div class="tech-tags-large">
                ${project.technologies.map(tech => `<span class="tech-tag-large">${tech}</span>`).join('')}
            </div>
        </div>

        <div class="detail-section">
            <h3>📝 Description détaillée</h3>
            <p style="color: #4b5563; line-height: 1.8; font-size: 1.05rem;">${project.details}</p>
        </div>

        ${project.progress ? `
            <div class="detail-section">
                <h3>📊 Progression du projet</h3>
                <div class="progress-bar" style="height: 1.5rem;">
                    <div class="progress-fill" style="width: ${project.progress}%; background: linear-gradient(to right, #059669, #047857); display: flex; align-items: center; justify-content: flex-end; padding-right: 1rem;">
                        <span style="color: white; font-size: 0.875rem; font-weight: bold;">${project.progress}%</span>
                    </div>
                </div>
            </div>
        ` : ''}
    `;

    showPage('project-detail');
}

// ============================================
// RETOUR AUX PROJETS
// ============================================
function backToProjects() {
    showPage(currentProjectType);
}

// ============================================
// LANCEMENT AU CHARGEMENT DE LA PAGE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    init();
});

// Lancement immédiat aussi (au cas où le script se charge après le DOM)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}