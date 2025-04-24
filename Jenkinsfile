
/* Requires the Kubernetes Pipeline plugin */
pipeline {
    environment {
        RESULTS_FILE_NAME = 'job-results.txt'
        APP_DOCKER_IMAGE_NAME = "igk19/dgb-blog-api:${BUILD_NUMBER}"
        IMAGE_TAG_NUMBER = "${BUILD_NUMBER}"
    }
    agent {
        kubernetes {
            yamlFile 'python-git-pod.yaml'
        }
    }
    stages {
        stage('Prepare') { steps { check() } }
        stage('Bump version') {
            when {
                environment name: 'SHOULD_BUMP_VERSION', value: 'true'
            }
            steps {
                container('python-git') {
                    withCredentials([sshUserPrivateKey(credentialsId: 'github_ssh_credentials', keyFileVariable: 'SSH_KEY')]) {
                        script {
                            sh """
                                git config --global --add safe.directory ${env.WORKSPACE}
                                git checkout ${env.BRANCH_NAME}
                                semantic-release version
                                npm version --no-git-tag-version patch
                                git add --all
                            """
                            def new_app_version = readJSON text: sh(returnStdout: true, script: 'npm version')
                            env.NEW_APP_VERSION = new_app_version['didgibot.com']
                            def commit_message = "Upgrade to new application version - ${env.NEW_APP_VERSION} - [version bump]"
                            sh "git commit -m '${commit_message}'"
                        }
                    }
                }
                withCredentials([sshUserPrivateKey(credentialsId: 'bitbucket-ssh-creds', keyFileVariable: 'SSH_KEY')]) {
                    sshagent(credentials: ['bitbucket-ssh-creds']) {
                        sh 'git push'
                    }
                }
            }
        }
        // Create Node.js docker container
        stage('Create base Node.js docker container') {
            when {
                environment name: 'SHOULD_BUMP_VERSION', value: 'false'
            }
            steps {
                container('docker') {
                    sh """
                    echo 'Installing Node.js in docker container...'
                    docker build -f `pwd`/cicd/Dockerfile.multistage \
                                      --target=base ../
                  """
                }
            }
        }
        // Install app dependencies
        stage('Install app dependencies') {
            when {
                environment name: 'SHOULD_BUMP_VERSION', value: 'false'
            }
            steps {
                container('docker') {
                    sh """
                    echo 'Installing app dependencies...'
                    docker build -f `pwd`/cicd/Dockerfile.multistage --target=deps .
                  """
                }
            }
        }
        // Install migrations and seeding dependencies
        stage('Install migrations dependencies') {
            when {
                environment name: 'SHOULD_BUMP_VERSION', value: 'false'
            }
            steps {
                container('docker') {
                    sh """
                    echo 'Installing migrations and seeding dependencies...'
                    docker build -f `pwd`/cicd/Dockerfile.multistage --target=migrations .
                  """
                }
            }
        }
        // Copy app inside docker container and install yarn dependencies
        stage('Copy app') {
            when {
                environment name: 'SHOULD_BUMP_VERSION', value: 'false'
            }
            steps {
                container('docker') {
                    sh """
                    echo 'Copying the app...'
                    docker build -f `pwd`/cicd/Dockerfile.multistage --target=app .
                  """
                }
            }
        }
        // Lint app source
        stage('Lint app') {
            when {
                environment name: 'SHOULD_BUMP_VERSION', value: 'false'
            }
            steps {
                container('docker') {
                    sh """
                    echo 'Linting the app...'
                    docker build -f `pwd`/cicd/Dockerfile.multistage --target=lint .
                  """
                }
            }
        }
        // Build production app
        stage('Build app') {
            when {
                environment name: 'SHOULD_BUMP_VERSION', value: 'false'
            }
            steps {
                container('docker') {
                    sh """
                    echo 'Building the app...'
                    docker build -f `pwd`/cicd/Dockerfile.multistage --target=build-production .
                  """
                }
            }
        }
        // Build migrator docker image
        stage('Build migrator docker image') {
            when {
                environment name: 'SHOULD_BUMP_VERSION', value: 'false'
            }
            steps {
                container('docker') {
                    sh """
                    echo 'Preparing migrator image for production and starting final docker build...'
                    docker build -f `pwd`/cicd/Dockerfile.multistage --target=image-migrations --tag=${env.MIGRATOR_DOCKER_IMAGE_NAME} .
                  """
                }
            }
        }
        // Build app docker image
        stage('Build app docker image') {
            when {
                environment name: 'SHOULD_BUMP_VERSION', value: 'false'
            }
            steps {
                container('docker') {
                    sh """
                    echo 'Preparing app image for production and starting final docker build...'
                    docker build -f `pwd`/cicd/Dockerfile.multistage --target=image-production --tag=${env.APP_DOCKER_IMAGE_NAME} .
                  """
                }
            }
        }
        // Push migrator image it to the Docker Hub
        stage('Push migrator image') {
            when {
                environment name: 'SHOULD_BUMP_VERSION', value: 'false'
            }
            steps {
                container('docker') {
                    sh """
                    echo 'Starting migrator image push...'
                    docker push ${env.MIGRATOR_DOCKER_IMAGE_NAME}
                  """
                }
                script {
                    env.BUILD_RESULT = 'Successfully built and pushed to docker repository images ' +
                    "${env.APP_DOCKER_IMAGE_NAME} and ${env.MIGRATOR_DOCKER_IMAGE_NAME} for DIDGIBOT.COM Invoice app."
                }
            }
        }
        // Push app image it to the Docker Hub
        stage('Push app image') {
            when {
                environment name: 'SHOULD_BUMP_VERSION', value: 'false'
            }
            steps {
                container('docker') {
                    sh """
                    echo 'Starting app image push...'
                    docker push ${env.APP_DOCKER_IMAGE_NAME}
                  """
                }
                script {
                    env.BUILD_RESULT = 'Successfully built and pushed to docker repository images ' +
                    "${env.APP_DOCKER_IMAGE_NAME} and ${env.MIGRATOR_DOCKER_IMAGE_NAME} for DIDGIBOT.COM Invoice app."
                }
            }
        }
        // Start another job
        stage('Change image in didgibot.com deployment') {
            when {
                environment name: 'SHOULD_BUMP_VERSION', value: 'false'
            }
            steps {
                build job: 'change-image-name-in-invoice-didgibot-com/main', parameters: [
                  string(name: 'IMAGE_TAG_NUMBER', value: env.IMAGE_TAG_NUMBER)
                ]
            }
        }
    }

    post {
        always {
            postProcess()
        }
    }
}

void check() {
    env.BUILD_RESULT = 'ABORTED'
    env.SHOULD_BUMP_VERSION = 'false'
    // `result` will be equal to 0 if the last commit message contains '[version bump]'.
    result = sh(script: "git log -1 | grep '.*\\[version bump\\].*'", returnStatus: true)
    // If the `result` is not equal to 0, the commit message does not contain '[version bump]'
    // so we should bump the version.
    if (result != 0) {
        env.SHOULD_BUMP_VERSION = 'true'
    }
}

void postProcess() {
    if (env.SHOULD_BUMP_VERSION == 'true') {
        env.BUILD_RESULT = "BUMPED APPLICATION VERSION TO ${env.NEW_APP_VERSION}"
    }
    writeFile file: env.RESULTS_FILE_NAME, text: "The job build result: ${env.BUILD_RESULT}"
    archiveArtifacts env.RESULTS_FILE_NAME
}
