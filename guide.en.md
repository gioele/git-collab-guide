Git collaboration guide
=======================

There are many projects that are developed using git. However, many people
do not contribute to these projects because of git and its reputation as a
difficult tool. To be honest, git is a difficult tool, but if one focuses
only on its main features, it is possible to learn git and be productive
with it in few minutes.

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

Before we can contribute anything, we have to make our repository "talk"
to the main repository. However, we just began and we already have quite
a bit of repositories to keep track of. Let's pause for a second and have
a look at them.

We have three repositories at hand:

* the main repository: <https://github.com/gioele/fluffytron.git>;
* our remote repository on GitHub: <https://github.com/git-learner/fluffytron.git>;
* our local repository in our computer.

We will operate mostly on our local repository, so, from now on we will
refer to "our local repository" simply as "our repository".

Our repository is already linked to our remote repository. This allows the
changes we make to to our repository to be sent easily to the remote
repository when we are ready to publish them. The address of our remote
repository is stored in the repository configuration files as the "remote
location" called `origin` or, in git terms, as the `origin` remote.

    $ git remote -v
    TODO: output of "git remote -v"

What we need to do now is to link our repository to the main `fluffytron`
repository. We do this adding a new remote. Usually this remote is named
`upstream` or after the person or the organization that manages it. In
this case we will try to be less formal and will call it "gioele".

    $ git remote add gioele https://github.com/gioele/fluffytron.git
    TODO: output of "git remote add gioele"

We are now done with the setup and we can start making changes and ask
to have them integrated into the `fluffytron` project.


We must be sure to be working with up-to-date files
---------------------------------------------------

TODO: discuss pull --ff-only, useful to say "start here when you need to make a change"

TODO: review the final step, it contains basically the same instructions


A separate branch for our changes
---------------------------------

Before we start making changes, we need to make sure we do not collide
with or pollute other people's work while we work on our modifications.
In git this is done using separate branches.

A git branch is a copy of the working directory. You can think of
a branch as a "context", different branches are used to separate
different working contexts. In every repository there is a main branch
called `master`. Project collaborators should never touch the `master`
branch, as it is meant to be used only by the project maintainers that
have (or should have) the technical knowledge and the expertise
required manage that branch.

Contributors should create a "feature branch" every time they want to
change something. In our case we want to change the color of the headings
of the `fluffytron` project; we create a new branch called `headings-color`
based on the `master` branch.

    $ git branch headings-color

Creating a branch is not enough, we also have to switch to it, so that
our modifications will be recorded in it instead of in the master branch.
Switching to a branch is called doing a "checkout" of that branch.

    $ git checkout headings-color

Please note that we did create a new branch now, but that branch exists
only in our local repository. We need to let the world know we did create
it. To do so, we need to publish the new branch on our remote repository.
In git publishing is done via "push" operations.

    $ git push --set-upstream origin headings-color

We are now ready to make our first change and publish it.


Our first commit
----------------

We can now change the main color of the headings to something more cool,
from black to red and with the font Comic Sans.

TODO: picture CSS changes

This change has been saved in the working directory but has not been
recoded in the project history. To do so we need to "commit" our change.
To commit means to tell git that we did change some files and that we
want that changes recorded, accompanied by a short title that describes
the changes and an optional longer message that explains why we made
these changes. For such a simple modification we will use just the short
title "Make headings red and funny".

    # first we tell git that we changed some files
    $ git add style.css
    # then we commit the changed files
    $ git commit -m "Make the headings red and funny"


Publishing our change
---------------------

The commit we just did is sitting in the repository in our computer. Our
remote repository does not know about it, let alone the maintainers of
`fluffytron`.

So, it is time to publish the commit with the change and then request its
integration in the main project.

The git way to publish a commit is pushing it to the remote repository,
just like we did to publish our new `headings-color` branch. Please note
that are not the single commits that are pushed, but complete branches.
Thus, what we have to do now is to publish our `headings-color` branch.

    $ git push

Please note that git knows where to publish this branch (in the branch
of the same name in the `origin` remote) because it remembers that
location from when we created and pushed the branch at the beginning.

We can have a look at the GitHub page and see that the changes are
indeed there. Nice.

TODO: image with GitHub log.


Let's request the integration of our changes
--------------------------------------------

With our `headings-color` branch published, we can now request its
integration in the main repository.

git doesn't have a standard way to request the integration of external
changes; we will resort to using GitHub "pull requests".

TODO: image of GitHub pull request process

What we just did created a new issue in the issue tracker of the
`fluffytron` project that says that we have a branch called `headings-color`
and we would like to have it integrated into the main repository. GitHub
has also sent some email(s) to the `fluffytron` maintainers to let them
know that there is a new pull request waiting to be integrated.


Making adjustments to a published branch
----------------------------------------

In these trying times, not every pull request gets accepted at the first
attempt. Sometimes the maintainers like most of the changes we submitted
but ask for some adjustments to be done.
im
In our case, the integrator does not fancy our use of Comic Sans: too
childish.

TODO: image of GitHub comment on comic sans

So we go and change that to a more boring but more appropriate Helvetica.
What don't you do to please these maintainers...

Before making any adjustment to our changes, we make sure that we are
still in the `headings-color` branch. (In the meantime we may have worked
on something else in other branches.)

    $ git checkout headings-color

Now we go forth and make the adjustments that have been requested.

TODO: illustration of CSS changed to Helvetica

Just like before, we tell git about the changed files and make a commit.

    $ git add style.css
    $ git commit -m "Helvetica is a more appropriate font"

Again just like before, we push the `headings-color` branch to our remote
repository.

    $ git push
    TODO: output of git push

This is exactly what we have done for our first commit. The only difference
is that now we do not need to issue a new pull request. The original pull
request, being linked to the `headings-color` branch, has automatically
been updated to contain both the old and the new commit. The final result
is a combination of the two commits, as can be seen in the GitHub page for
the pull request.

TODO: image of the updated pull request


After the change has been accepted
----------------------------------

Finally, the integrators have accepted our changes and merged them into
the main repository. This can be seen clearly in the project history. See
the small bump ending in "Merged new heading styles from git-learner"?

TODO: image commit log

We must now do two things to consider our work done: deleting the
`headings-color` branch and update our repositories to reflect the
advances made by the `fluffytron` project.

We start deleting the `headings-color` branch because it is useless now
that has been integrated in the main repository.

We follow the GitHub suggestion to delete the branch...

TODO: image delete branch in GitHub

...then we remove it from our repository and switch back to the master
branch.

    $ git branch -D headings-color
    TODO: output of git branch -D
    $ git checkout master
    TODO: output of checkout master

We proceed then merging back the main repository into our repository.
We will use a particular kind of merge called "fast-forward only".
"Fast-forward only" in this context means that we want the merge process
to be completely automatic because we expect the integrator to take care
of all the intricacies of the git merging process.

    $ git pull --ff-only gioele/master
    TODO: output of git pull --ff-only

If anything goes wrong and the fast-forward merge cannot be done, you
should tell the maintainer: either they did something wrong (they will fix
that) or you did mess somehow (they will tell you how to sort things out).

Final step: publishing the updated state of our repository to show
everybody that we are up to date with the main repository.

    $ git push
    TODO: output of final git push

We are done. Next time we want to submit a change we can skip all the
preparatory steps and start directly with the update of our master branch
and the creation of a new branch.

Good work!
