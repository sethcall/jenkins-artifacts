Overview
========

This project provides a simple, end-user friendly view of the latest Jenkins artifacts that have built successfully.

Installation
============
* Put the contents of this project anywhere on a web server.
* Copy js/config/jenkins.js.example to js/config/jenkins.js
* Edit js/config/jenkins.js to point to your jenkins base URL, and the names of projects that you would like artifacts to show up for.

Configuring Jenkins
===================
Due to this change: https://issues.jenkins-ci.org/browse/JENKINS-17005, you have to start jenkins with the following argument added:
-Dhudson.model.Api.INSECURE=true

Tips
====

Using with Authenticated Jenkins
--------------------------------
TODO: redirect user to login with Jenkins
