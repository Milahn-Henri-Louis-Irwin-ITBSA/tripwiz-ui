pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from your repository
                checkout([$class: 'GitSCM', branches: [[name: '*/prod']], userRemoteConfigs: [[url: 'https://github.com/Milahn-Henri-Louis-Irwin-ITBSA/tripwiz-ui.git']]])
            }
        }

        stage('Build') {
            steps {
                // Navigate to the UI application directory
                dir('/var/www/tripwiz.me/html') {
                    // Install dependencies and build the application
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy') {
            steps {
                // Create the deployment directory if it doesn't exist
                sh 'mkdir -p /var/www/tripwiz.me/html'

                // Copy the 'dist' files from the UI application to the deployment directory
                sh 'cp -r /var/www/tripwiz.me/html/dist/* /var/www/tripwiz.me/html/'
            }
        }
    }
}
