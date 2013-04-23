(function(context, $) {


    var stripCredentials = function stripCredentials(url) {
        var uri = document.createElement('a')
        uri.href = url

        var indexOfHostname = url.indexOf(uri.hostname)


        return uri.protocol + "//" + url.substring(indexOfHostname)
    }

    // returns user-ready path to project
    var projectPath = function projectPath(project) {
        return jenkins.url + '/job/' + project
    }

    // returns user-ready path to a build for a project
    var buildPath = function buildPath(project, version) {
        return projectPath(project) + '/' + version;
    }


    // returns a download-ready path to a particular artifact
    var artifactPath = function artifactPath(project, version, relativePath) {
        return buildPath(project, version) + '/artifact/' + relativePath;
    }

    // returns build info for a particular project + version
    var getBuildInfo = function getBuildInfo(project, version) {

        // example
        // http://jenkins.dev.spawnlabs.com/jenkins/job/some-project/lastSuccessfulBuild/api/json?pretty=true


        var buildInfoUrl = buildPath(project, version) + '/api/json?jsonp=?'

        return $.getJSON(buildInfoUrl, function() {
            console.log("getBuildInfo success")
        })
    }


    // pin to global object
    // --------------------
    context.rest = {}
    context.rest.stripCredentials = stripCredentials
    context.rest.buildPath = buildPath
    context.rest.projectPath = projectPath
    context.rest.artifactPath = artifactPath
    context.rest.getBuildInfo = getBuildInfo
})(window.jenkins, jQuery)
