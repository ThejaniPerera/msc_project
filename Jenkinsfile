pipeline {
    agent any
    
    stages {
        stage('SCM Checkout') {
            steps {
                retry(3) {
                    git branch: 'main', url: 'https://github.com/ThejaniPerera/test1.git'
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                bat 'docker build -t thejaniperera/nodeapp-cuban:latest .'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([string(credentialsId: 'test-dockerhubpassword', variable: 'test-dockerhubpass')]) {
                    script {
                        bat "docker login -u thejaniperera -p %test-dockerhubpass%"
                    }
                }
            }
        }
        stage('Push Image') {
    steps {
        bat 'docker push thejaniperera/nodeapp-cuban:latest'
    }
}

    }
     post {
        always {
            bat 'docker logout'
        }
    }
    }     

