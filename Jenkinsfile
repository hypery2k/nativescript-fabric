properties properties: [
  [$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '30', numToKeepStr: '10']],
  disableConcurrentBuilds()
]

@Library('mare-build-library')
def nodeJS = new de.mare.ci.jenkins.NodeJS()

timeout(150) {
  node('nativescript') {
    def buildNumber = env.BUILD_NUMBER
    def branchName = env.BRANCH_NAME
    def workspace = env.WORKSPACE
    def buildUrl = env.BUILD_URL

    // PRINT ENVIRONMENT TO JOB
    echo "workspace directory is $workspace"
    echo "build URL is $buildUrl"
    echo "build Number is $buildNumber"
    echo "branch name is $branchName"
    echo "PATH is $env.PATH"

    try {
      stage('Checkout') {
        checkout scm
      }

      dir('src') {
        stage('Build') {
          sh "npm run clean && npm run build"
        }

        stage('Webpack') {
          parallel demo: {
            sh "cd ../demo && rm -rf hooks/ node_modules/ platforms/ && npm i && npm run build-ios-bundle && npm run build-android-bundle"
          }, demoAngular: {
            sh "cd ../demo-angular && rm -rf hooks/ node_modules/ platforms/ && npm i && npm run build-ios-bundle && npm run build-android-bundle"
          },
          failFast: true
        }

        stage('Test') {
          parallel unit:{
            sh "npm run test"
          }, iOS: {
            sh "cd ../demo && npm run ci.ios.build" //FIXME && tns test ios --justlaunch --emulator"
          }, Android: {
            sh "cd ../demo && npm run ci.android.build" //FIXME && tns test android --justlaunch --emulator"
          },
          failFast: true
          // junit '../demo/target/junit-report/TEST-*.xml'
        }
      }

      stage('Publish NPM snapshot') {
        nodeJS.publishSnapshot('src', buildNumber, branchName)
      }

    } catch (e) {
      mail subject: "${env.JOB_NAME} (${env.BUILD_NUMBER}): Error on build", to: 'github@martinreinhardt-online.de', body: "Please go to ${env.BUILD_URL}."
      throw e
    }
  }
}

