pipeline {
    agent any
    
    triggers {
        githubPush()
    }

    options {
        buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '5', numToKeepStr: '10')
    }

    stages {
        stage('检查仓库') {
            steps {
                git branch: 'dev', credentialsId: 'bec34d29-6cf2-408d-8ed1-cf279cf6f5aa', url: 'git@github.com:nonesrc/rentApp.git'
            }
        }

        stage('构建') {
            steps {
                nodejs('node16.13.0') {
                    sh '''npm install
                    npm run build
                    cd dist
                    rm -f rantAPP.tar.gz
                    tar -zcvf rantAPP.tar.gz *'''
                }
            }
        }
        stage('更改remote构建状态'){
            steps{
                step([$class: 'GitHubCommitStatusSetter'])
            }
        }
    }

    post {
        always  {
            emailext subject: '$DEFAULT_SUBJECT',
                body: '$DEFAULT_CONTENT',
                recipientProviders: [
                    [$class: 'CulpritsRecipientProvider'],
                    [$class: 'DevelopersRecipientProvider'],
                    [$class: 'RequesterRecipientProvider']
                ], 
                replyTo: '$DEFAULT_REPLYTO',
                to: '$DEFAULT_RECIPIENTS'
        }
    }
}