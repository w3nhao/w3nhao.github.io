## How to install the Blog application
1. Install Ruby and Gem.
2. Run `Gem install Jekyll`
3. Git clone the repository.
4. Go to the repository folder.
5. Run `bundle install` to install the dependencies.

## How to write posts and preview locally
1. Run `bundle exec jekyll serve` to start the local server.
2. Write posts in Markdown format and save them in `_posts` folder.
3. Make sure the post filename is in the format of `YYYY-MM-DD-Title.md`.
4. Preview the post in `http://localhost:4000/`.

## How to deploy the Blog application to GitHub Pages
1. Run `bundle exec jekyll build` to build the static files.
2. Commit the changes and push to the repository.
