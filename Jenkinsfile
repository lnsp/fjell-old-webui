pipeline {
  agent {
    docker {
      image 'node:6-alpine'
    }
    
  }
  stages {
    stage('Install') {
      agent any
      steps {
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        sh 'npm run test'
      }
    }
    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
  }
}