pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building the project...'
                sh 'npm i express mongoose nodemon'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the project...'
                sh 'npm run serve'
                echo 'Deployed'
            }
        }
    }
}
