pipeline {
  agent {
    docker {
      image 'node:6-alpine'
    }
    
  }
  stages {
    stage('Build') {
      agent any
      steps {
        sh '''npm install
npm run build'''
      }
    }
  }
}