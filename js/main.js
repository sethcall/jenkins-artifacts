(function(context, $) {


    $(function() {

        // check if config file exists before anything else
        if (window.jenkins === undefined || !jenkins.url || !jenkins.projects) {
            alert("Make sure js/config/jenkins.js is correctly configured. Check README.md for more info.");
            return;
        }

        $('.brand').attr('href', jenkins.rest.stripCredentials(jenkins.url))

        var version = 'lastSuccessfulBuild'
        var itemsPerRow = 3;
        var lastRow = -1;
        var currentRowElement = null;
        var count = 0;

        // lay down skeleton of page before responses of any REST API's are received,
        // so that the order of the page is deterministic
        $.each(jenkins.projects, function(index, project) {
            var currentRow = Math.floor(count / itemsPerRow);
            count ++;

            // determine if we need to add a new bootstrap row
            if (currentRow > lastRow) {
                lastRow = currentRow
                currentRowElement = $('<div class="row"></div>')
                $('footer').before(currentRowElement)
            }

            // create a div to old this project's build artifacts and details
            var item = $('<div class="span4" id="' + project.name + '"></div>');

            // add item to the current row
            currentRowElement.append(item)
        })

        // now fetch data to populate skeleton of page
        $.each(jenkins.projects, function(index, project) {

            context.jenkins.rest.getBuildInfo(project.name, version)
                .done(function(data) {

                    var item = $('#' + project.name)

                    item.append($('<h2></h2>').append($('<a></a>').attr('href', jenkins.rest.projectPath(project.name)).text(project.name)))

                    var details = $("<dl class='dl-horizontal'></dl>")
                    details.append($("<dt></dt>").text("Build #"))
                    details.append($("<dd></dd>").append($('<a></a>').text(data.number).attr('href', jenkins.rest.buildPath(project.name, version))))
                    details.append($("<dt></dt>").text("When"))
                    details.append($("<dd></dd>").text(jQuery.timeago(new Date(data.timestamp))) )

                    var list = $('<ul></ul>')
                    item.append(list)
                    $.each(data.artifacts, function(artifactIndex, artifact) {
                        var artifactItem = $('<li></li>')
                        list.append(artifactItem)
                        var artifactLink = $('<a></a>')
                        artifactLink.text(artifact.fileName)
                        artifactLink.attr('href', jenkins.rest.artifactPath(project.name, version, artifact.relativePath))
                        artifactItem.append(artifactLink)
                    })

                    item.append(details)

                })
                .fail(function(data) {
                    console.log("unable to fetch build info for %o %o: %o", project.name, 'lastSuccessfulBuild', arguments)
                })

        })
    })


})(window, jQuery)
