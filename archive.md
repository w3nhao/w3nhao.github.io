---
layout: page
title: Archive
permalink: /archive/
hidden: true
---

<div class="posts">
  {% assign archived_posts = site.posts | where_exp: "post", "post.hidden == true" | sort: "date" | reverse %}
  {% if archived_posts and archived_posts.size > 0 %}
    {% for post in archived_posts %}
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
  {% else %}
    <p>No archived posts yet.</p>
  {% endif %}
</div>


