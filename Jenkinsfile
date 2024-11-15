pipeline {
    agent {
        docker {
            image 'node:14' // Utilisez une image Docker avec Node.js
            args '-u root:root' // Exécutez en tant que root si nécessaire
        }
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/votre-utilisateur/votre-repo.git' // Remplacez par l'URL de votre repo
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install' // Installez les dépendances
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test' // Exécutez les tests
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: '**/test-results.xml', allowEmptyArchive: true // Archive les résultats des tests
            junit '**/test-results.xml' // Publiez les résultats des tests
        }
    }
}
