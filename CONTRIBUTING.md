Contribute to the Telerik AppBuilder Helper for Chrome
===

*Help us improve the Telerik AppBuilder Helper for Chrome* 

[![Telerik AppBuilder](ab-logo.png "Telerik AppBuilder")](http://www.telerik.com/appbuilder "The Telerik AppBuilder web site")

The Telerik AppBuilder Helper for Chrome adds a number of improvements to the Telerik AppBuilder in-browser client. When you enable this extension for Google Chrome, you can benefit from the development and testing features listed [here](README.md#features "Features of the Telerik AppBuilder Helper").

* [Report an Issue](#report-an-issue "Learn how to report a bug")
* [Request a Feature](#request-a-feature "Learn how to submit a feature or improvement request")
* [Contribute to the Code Base](#contribute-to-the-code-base "Learn how to submit your own improvements to the code")

Report an Issue
===
If you find a bug in the source code or a mistake in the documentation, you can help us by submitting an issue to our <a href="https://github.com/Icenium/appbuilder-browser-extension">GitHub Repository</a>. Before you submit your issue, search the archive for identical questions. Help us maximize the effort we can spend bug fixing and adding new features by not reporting duplicate issues.

If your issue appears to be a bug and has not been reported, open a new issue. To help us investigate and resolve the issue more quickly, you can provide the following information.

* **Overview of the issue:** Provide a short description of the visible symptoms. If applicable, include error messages, screen shots, and stack traces.
* **Motivation for or use case:** Let us know how this particular issue affects your work.
* **Telerik AppBuilder version(s):** List the current version number of the extension and the build number of the in-browser client (available in the Output pane at login). Let us know if you have not observed this behavior in earlier versions and if you consider it a regression.
* **System configuration:** Provide us with relevant system configuration information such as operating system, network connection, proxy usage, etc. Let us know if you have been able to reproduce the issue on multiple setups.
* **Steps to reproduce:** If applicable, submit a step-by-step walkthrough of how to reproduce the issue.
* **Related issues:** If you discover a similar issue in our archive, give us a heads up - it might help us identify the culprit.
* **Suggest a fix:** You are welcome to suggest a bug fix or pinpoint the line of code or the commit that you believe has introduced the issue.

[Back to Top][1]

Request a Feature
===

You can request a new feature by submitting an issue with the *enhancement* label to our <a href="https://github.com/Icenium/appbuilder-browser-extension">GitHub Repository</a>.

If you want to implement a new feature yourself, consider submitting it to the <a href="https://github.com/Icenium/appbuilder-browser-extension">GitHub Repository</a> as a Pull Request.

[Back to Top][1]

Contribute to the Code Base
===

Before you submit a Pull Request, consider the following guidelines.

* Search <a href="https://github.com/Icenium/appbuilder-browser-extension/pulls">GitHub</a> for an open or closed Pull Request that relates to your submission.
* Make your changes in a new `git` branch. We use the <a href="http://nvie.com/posts/a-successful-git-branching-model/">Gitflow branching model</a> so you will have to branch from our develop branch.
```bash
    git checkout -b my-fix-branch develop
```
* Create your patch and include appropriate test cases.
* Commit your changes and create a descriptive commit message (the commit message is used to generate release notes).
```bash
    git commit -a
```
* Build your changes locally.
```bash
    grunt
```
* Ensure all the tests pass.
```bash
    grunt test
```
* Push your branch to GitHub.
```bash
    git push origin my-fix-branch
```
* In GitHub, send a Pull Request to icenium-cli:develop.
* If we suggest changes, you can modify your branch, rebase, and force a new push to your GitHub repository to update the Pull Request.
```bash
    git rebase develop -i
    git push -f
```

That's it! Thank you for your contribution!

When the patch is reviewed and merged, you can safely delete your branch and pull the changes from the main (upstream) repository.

* Delete the remote branch on GitHub.
```bash
    git push origin --delete my-fix-branch
```
* Check out the develop branch.
```bash
    git checkout develop -f
```
* Delete the local branch.
```bash
    git branch -D my-fix-branch
```
* Update your develop branch with the latest upstream version.
```
    git pull --ff upstream develop
```

[Back to Top][1]

[1]: #contribute-to-the-telerik-appbuilder-helper-for-chrome