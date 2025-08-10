## How to install the Blog application
1. Install Ruby and Gem.
2. Run `Gem install jekyll`
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

## How to write posts and preview locally
1. Write posts in Markdown format and save them in `_drafts` folder.
2. Before moving the post md file to `_posts` folder, use the `post_process.py` under `_drafts` folder to process the md file, the processed md file will be saved in `_posts` folder.
3. Run `bundle exec jekyll serve` to start the local server.
4. Preview the post in `http://localhost:4000/`.

## Hide/Archive Posts

- Add `hidden: true` to a post's front matter to hide it from:
  - `/posts` listing
  - Atom feed (`/atom.xml`)
  - Related posts
  - Sidebar pages list

- Archived posts are still available via direct URL. To browse them, use `/archive/`.