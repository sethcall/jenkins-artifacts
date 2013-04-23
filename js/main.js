(function(context, $) {


    $(function() {

        var version = 'lastSuccessfulBuild'
        var itemsPerRow = 3;
        var lastRow = -1;
        var currentRowElement = null;
        var count = 0;

        $.each(jenkins.projects, function(index, project) {
            context.jenkins.rest.getBuildInfo(project.name, version)
                .done(function(data) {

                    var currentRow = Math.floor(count / itemsPerRow);
                    count ++;

                    // determine if we need to add a new bootstrap row
                    if (currentRow > lastRow) {
                        lastRow = currentRow
                        currentRowElement = $('<div class="row"></div>')
                        $('.hero-unit').after(currentRowElement)
                    }


                    // create a div to old this project's build artifacts and details
                    var item = $('<div class="span4"></div>');
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

                    // add item to the current row
                    currentRowElement.append(item)
                })
                .fail(function(data) {
                    console.log("unable to fetch build info for %o %o: %o", project.name, 'lastSuccessfulBuild', arguments)
                })

        })
    })


})(window, jQuery)