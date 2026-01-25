// ============================================
// DONNÉES
// ============================================
const skills = [
    { name: 'Python', level: 55 },
    { name: 'HTML/CSS', level: 75 },
    { name: 'Git', level: 60 },
    { name: 'CAO/DAO', level: 85 },
    { name: 'Visuels et Animations', level: 75 },
    { name: 'Impression 3D', level: 65 }
];

const completedProjects = [
    {
        id: 1,
        title: "Participation au Dassault Unmade Aerial Vehicle DUAV 2025",
        description: "Conception et fabrication d'un VTOL",
        image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=600&fit=crop',
        icon: '✈️',
        technologies: ["CAO/DAO", "Impression 3D", "Electronique", "Simulation"],
        details: "Développement d'un VTOL portant un drone de reconnaissance pour des missions de reconnaissance en milieu hostile. Le projet incluait la conception complète, les simulations aérodynamiques et la fabrication des pièces.",
        duration: "3 mois",
        role: "Concepteur et Fabricant"
    },
    {
        id: 2,
        title: 'Dashboard Analytics',
        description: 'Tableau de bord de visualisation de données',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        icon: '📊',
        technologies: ['React', 'D3.js', 'API REST'],
        details: 'Création d\'un dashboard interactif pour visualiser des données complexes en temps réel avec des graphiques dynamiques et des indicateurs de performance.',
        duration: '2 mois',
        role: 'Développeur Front-End'
    },
    {
        id: 3,
        title: 'Site Web E-commerce',
        description: 'Plateforme de vente en ligne complète',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        icon: '🛒',
        technologies: ['HTML/CSS', 'JavaScript', 'PHP', 'MySQL'],
        details: 'Développement d\'une plateforme e-commerce complète avec système de paiement, gestion de stock et interface d\'administration. Intégration de fonctionnalités de recherche avancée et de recommandations produits.',
        duration: '4 mois',
        role: 'Développeur Full-Stack'
    }
];

const ongoingProjects = [
    {
        id: 4,
        title: 'Application Mobile Fitness',
        description: 'App de suivi d\'entraînement',
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop',
        icon: '💪',
        technologies: ['React Native', 'Firebase'],
        details: 'Développement d\'une application mobile pour suivre ses entraînements et progrès sportifs avec des statistiques détaillées et des objectifs personnalisables.',
        duration: 'En cours depuis 1 mois',
        role: 'Développeur Mobile',
        progress: 60
    },
    {
        id: 5,
        title: 'Système IoT Domotique',
        description: 'Automatisation de maison intelligente',
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop',
        icon: '🏠',
        technologies: ['Arduino', 'Python', 'MQTT', 'Node.js'],
        details: 'Création d\'un système domotique complet permettant de contrôler l\'éclairage, le chauffage et la sécurité via une application web et mobile. Utilisation de capteurs et d\'actionneurs connectés.',
        duration: 'En cours depuis 2 mois',
        role: 'Ingénieur IoT',
        progress: 45
    },
    {
        id: 6,
        title: 'Portfolio Interactif 3D',
        description: 'Site portfolio avec animations Three.js',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop',
        icon: '🎨',
        technologies: ['Three.js', 'WebGL', 'React', 'Blender'],
        details: 'Développement d\'un portfolio moderne avec des animations 3D interactives, des transitions fluides et une expérience utilisateur immersive. Intégration de modèles 3D personnalisés créés avec Blender.',
        duration: 'En cours depuis 3 semaines',
        role: 'Développeur Creative',
        progress: 35
    }
];

let currentProjectType = '';

// ============================================
// INITIALISATION
// ============================================
function init() {
    renderSkills();
    renderProjects();
    updateProjectCounts();
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