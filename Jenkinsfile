pipeline {
    agent any

    tools {
        nodejs "nodejs" // Use the same name you configured in Jenkins Global Tool Configuration
    }

    stages {
        stage('Example') {
            steps {
                sh 'npm config ls'
            }
        }

        stage('Checkout') {
            steps {
                git(url: 'https://github.com/Milahn-Henri-Louis-Irwin-ITBSA/tripwiz-ui.git', branch: 'prod')
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                // Create the directory '/root/microservices/firebase-admin-service' if it doesn't exist
                sh 'mkdir -p /var/www/tripwiz.me/html'

                // Move the 'dist' directory to '/root/microservices/firebase-admin-service'
                sh 'mv dist /var/www/tripwiz.me/html'

                // restart the nginx service
                sh 'sudo systemctl restart nginx'
        
            }
        }
    }
}
