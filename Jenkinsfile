pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building the project...'
                sh 'npm i express mongoose'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the project...'
                sh 'node server.js'
            }
        }
    }
}
