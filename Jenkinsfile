pipeline {
    agent any

    options {
        // Poll SCM to check for changes and trigger builds
        scm polling: true
    }

    stages {

        stage('Build') {
            steps {
                // Navigate to the UI application directory
                dir('/path/to/ui/application') {
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
                sh 'cp -r /path/to/ui/application/dist/* /var/www/tripwiz.me/html/'

                // restart the nginx service
                sh 'sudo systemctl restart nginx'
            }
        }
    }
}
