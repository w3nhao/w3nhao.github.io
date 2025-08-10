---
layout: page
title: First In Last Out
permalink: /posts/
pagination:
  enabled: true
  collection: posts
  per_page: 5
  permalink: '/:name/page/:num/'
  sort_field: 'date'
  sort_reverse: true
---

<div class="posts-intro">
  <p class="blog-desc">This is where I'll be dropping my thoughts, stories, and a bit of everything in between.</p>
  <hr class="intro-divider"/>
</div>

<div class="posts">
  {% assign visible_posts = paginator.posts | where_exp: "post", "post.hidden != true" %}
  {% for post in visible_posts %}
  <div class="post">
    <h2 class="post-title">
      <a href="{{ post.url | absolute_url }}">
        {{ post.title }}
      </a>
    </h2>

    <span class="post-date">{{ post.date | date_to_string }}</span>
    {{ post.excerpt }}
    
  </div>
  <hr class="post-divider"/>
  {% endfor %}
</div>

<div class="pagination">
  {% if paginator.next_page %}
    <a class="pagination-item older" href="{{ paginator.next_page_path | absolute_url }}">Older</a>
  {% else %}
    <span class="pagination-item older">Older</span>
  {% endif %}
  {% if paginator.previous_page %}
    {% if paginator.page == 2 %}
      <a class="pagination-item newer" href="{{ '/' | absolute_url }}">Newer</a>
    {% else %}
      <a class="pagination-item newer" href="{{ paginator.previous_page_path | absolute_url }}">Newer</a>
    {% endif %}
  {% else %}
    <span class="pagination-item newer">Newer</span>
  {% endif %}
</div>