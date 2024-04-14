---
layout: default
title: Archive
---

# Arquivo

Todos os posts por mês e ano

{% assign postsByYearMonth = site.posts | group_by_exp: "post", "post.date | date: '%B %Y'" %}
{% for yearMonth in postsByYearMonth %}
  <h2>{{ yearMonth.name }}</h2>
 <ul>
    {% for post in yearMonth.items %}
      <li><a class="link-light link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-100-hover" href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>
{% endfor %}
