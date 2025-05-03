/* Requires the Kubernetes Pipeline plugin */
pipeline {
    environment {
        RESULTS_FILE_NAME = 'job-results.txt'
        APP_DOCKER_IMAGE_NAME = "igk19/dgb-blog-api:${BUILD_NUMBER}"
        IMAGE_TAG_NUMBER = "${BUILD_NUMBER}"
        SHOULD_BUMP_VERSION_TEXT = 'SHOULD_BUMP_VERSION'
        DOCKER_CONTAINER_NAME = 'docker'
        PYTHON_GIT_CONTAINER_NAME = 'python-git'
        TRUE_STRING = 'true'
        FALSE_STRING = 'false'
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
                environment name: env.SHOULD_BUMP_VERSION_TEXT, value: env.TRUE_STRING
            }
            steps {
                container(env.PYTHON_GIT_CONTAINER_NAME) {
                    withCredentials([
                        sshUserPrivateKey(
                            credentialsId: 'github_ssh_credentials',
                            keyFileVariable: 'SSH_KEY'
                        ),
                        usernamePassword(
                            credentialsId: 'bc934908-4192-4b50-bb32-5fad86943329',
                            usernameVariable: 'USERNAME',
                            passwordVariable: 'GH_TOKEN'
                        )
                    ]) {
                        script {
                            sh """
                                git checkout ${env.BRANCH_NAME}
                                git fetch
                                semantic-release version --no-vcs-release
                            """
                            def newAppVersion = sh(
                                returnStdout: true,
                                script: "python -c 'from app.version import __version__; print(__version__)'").trim()
                            env.NEW_APP_VERSION = newAppVersion
                        }
                    }
                }
            }
        }
        // Create Node.js docker container
        stage('Create base Python docker container') {
            when {
                environment name: env.SHOULD_BUMP_VERSION_TEXT, value: env.FALSE_STRING
            }
            steps {
                container(env.DOCKER_CONTAINER_NAME) {
                    sh """
                    echo 'Installing Python in docker container...'
                    docker build -f `pwd`/Dockerfile.production \
                        --target=base -t ${env.DOCKER_CONTAINER_NAME} .
                  """
                }
            }
        }
        // Copy app inside docker container
        stage('Copy app') {
            when {
                environment name: env.SHOULD_BUMP_VERSION_TEXT, value: env.FALSE_STRING
            }
            steps {
                container(env.DOCKER_CONTAINER_NAME) {
                    sh """
                    echo 'Copying the app...'
                    docker build --network=host -f `pwd`/Dockerfile.production --target=app -t ${env.DOCKER_CONTAINER_NAME} .
                  """
                }
            }
        }
        stage('Lint and dependencies') {
            parallel {
                // Lint app source
                stage('Lint app') {
                    when {
                        environment name: env.SHOULD_BUMP_VERSION_TEXT, value: env.FALSE_STRING
                    }
                    steps {
                        container(env.DOCKER_CONTAINER_NAME) {
                            sh """
                    echo 'Linting the app...'
                    docker build --network=host -f `pwd`/Dockerfile.production --target=lint .
                  """
                        }
                    }
                }
                // Install app dependencies
                stage('Install app dependencies') {
                    when {
                        environment name: env.SHOULD_BUMP_VERSION_TEXT, value: env.FALSE_STRING
                    }
                    steps {
                        container(env.DOCKER_CONTAINER_NAME) {
                            // Using --network=host to access the host's docker socket as
                            // the installation of pip packages takes forever without it.
                            sh """
                    echo 'Installing app dependencies...'
                    docker build --network=host -f `pwd`/Dockerfile.production --target=deps -t ${env.DOCKER_CONTAINER_NAME} .
                  """
                        }
                    }
                }
            }
        }
        // Build app docker image
        stage('Expose port and build app docker image') {
            when {
                environment name: env.SHOULD_BUMP_VERSION_TEXT, value: env.FALSE_STRING
            }
            steps {
                container(env.DOCKER_CONTAINER_NAME) {
                    sh """
                    echo 'Preparing app image for production and starting final docker build...'
                    docker build -f --network=host `pwd`/Dockerfile.production --target=image-production -t ${env.APP_DOCKER_IMAGE_NAME} .
                  """
                }
            }
        }
        // Push app image it to the Docker Hub
        stage('Push app image') {
            when {
                environment name: env.SHOULD_BUMP_VERSION_TEXT, value: env.FALSE_STRING
            }
            steps {
                container(env.DOCKER_CONTAINER_NAME) {
                    sh """
                    echo 'Starting app image push...'
                    docker push ${env.APP_DOCKER_IMAGE_NAME}
                  """
                }
                script {
                    env.BUILD_RESULT = 'Successfully built and pushed to docker repository the image ' +
                    "${env.APP_DOCKER_IMAGE_NAME} for DIDGIBOT.COM Blog API app."
                }
            }
        }
        // Start another job
        stage('Change image in didgibot.com deployment') {
            when {
                environment name: env.SHOULD_BUMP_VERSION_TEXT, value: env.FALSE_STRING
            }
            steps {
                build job: 'change-image-name-in-blog-api-didgibot-com/' + env.BRANCH_NAME, parameters: [
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
    env.SHOULD_BUMP_VERSION = env.FALSE_STRING
    // `result` will be equal to 0 if the last commit message contains '[version bump]'.
    result = sh(script: "git log -1 | grep '.*\\[version bump\\].*'", returnStatus: true)
    // If the `result` is not equal to 0, the commit message does not contain '[version bump]'
    // so we should bump the version.
    if (result != 0) {
        env.SHOULD_BUMP_VERSION = env.TRUE_STRING
    }
}

void postProcess() {
    if (env.SHOULD_BUMP_VERSION == env.TRUE_STRING) {
        if (env.NEW_APP_VERSION != null) {
            env.BUILD_RESULT = "Bumped application version to ${env.NEW_APP_VERSION}"
        } else {
            env.BUILD_RESULT = 'Bumped application version but the script still failed right after that.'
        }
    }
    writeFile file: env.RESULTS_FILE_NAME, text: "The job build result: ${env.BUILD_RESULT}"
    archiveArtifacts env.RESULTS_FILE_NAME
}
