Overview
========

This project provides a simple, end-user friendly view of the latest Jenkins artifacts that have built successfully.

Installation
============
* Put the contents of this project anywhere on a web server.
* Copy js/config/jenkins.js.example to js/config/jenkins.js
* Edit js/config/jenkins.js to point to your jenkins base URL, and the names of projects that you would like artifacts to show up for.

Tips
====

Jenkins with Authentication
---------------------------
If you have authentication configured on Jenkins, you can get by with a hardcoded user/pass in the jenkins base URL, assuming that this is OK with your security policy since this user/pass will be completely open to the user of this page.

Example in js/config/jenkins.js

```
jenkins.url='http://user:password@jenkins.company.com'
```
