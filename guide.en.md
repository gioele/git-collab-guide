Git collaboration guide
=======================

There are many projects that are developed using git. However, many people
do not contribute to these projects because of git and its reputation as a
difficult tool. To be honest, git is a difficult tool, but if one focuses
only on its main features, they can learn git and be productive with it
in few minutes.

This guide will show you how to use git to contribute to a fictitious
`fluffytron` project. We will set up our own copy of the `fluffytron`
repository then make some changes and see these modifications being
integrated back into the `fluffytron` project.

TODO: disclaimer, this is just one way to use git


First, we need a fork
---------------------

The project `fluffytron` is hosted on GitHub. We will also use GitHub to
store our own copy of the project.

In git parlance, each copy of the project is a "repository". A repository
contains all the files of a project, plus much information about all the
changes that those files went through.

The URL of the `fluffytron` project is <https://github.com/gioele/fluffytron>.

We cannot make any modification to that repository. All the modifications
we have to make them first in our copy of the repository and then ask the
project maintainers to ingrate them. In git terms, we need to "fork"
the main `fluffytron` repository.

To fork the main repository we use the GitHub interface.

TODO: images of the forking process

We just created a fork of the original repository on the GitHub website.
To do any modification we need to clone our own repository on our computer.

    $ git clone https://github.com/gioele/fluffytron.git

We just created a local repository of our own repository. (It is slightly
confusing, isn't it? It will be clearer later.) Let's see what we have
now in our computer.

TODO: image directory contents

We have a new directory that contains all the files of the project plus a
special directory `.git` that contains all the history of the files and
other pieces of information. The directory as a whole is called the "local
repository". When we take in consideration only the project files proper
(that is, the content of the directory excluding the `.git` directory) we
refer to at as the "working directory".


Putting our repository in contact with the main repository
----------------------------------------------------------

TODO: adding an upstream remote


A separate branch for our changes
---------------------------------

TODO: a new feature branch


Our first commit
----------------

TODO: first commit


Publishing our change
---------------------

TODO: push to remote repo


Let's request the integration of our changes
--------------------------------------------

TODO: pull request


Making adjustments to a published branch
----------------------------------------

TODO: second commit in feature branch


After the change has been accepted
----------------------------------

TODO: pull --ff-only upstream/master
