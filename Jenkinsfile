pipeline {
    agent any
    
    stages {
        stage('SCM Checkout') {
            steps {
                retry(3) {
                    git branch: 'main', url: 'https://github.com/ThejaniPerera/msc_project.git'
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                bat 'docker build -t thejaniperera/contactapp-cuban:latest .'
            }
        }
       stage('Docker Login') {
            steps {
               withCredentials([string(credentialsId: 'contactAppweb', variable: 'contactApp')]) {
                   script {
                        bat "docker login -u thejaniperera -p %contactApp%"
                    }
    // some block
}
            }
        } 
        stage('Push Image') {
    steps {
        bat 'docker push thejaniperera/contactapp-cuban:latest'
    }
}
    }
    post {
        always {
            
            bat 'docker logout'
        }
    }
}