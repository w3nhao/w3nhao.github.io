---
layout: default
title: Home
---

<div class="about-container">
  <div class="about-image">
    <img src="/public/pic.jpg" alt="Portrait of Wenhao Deng" loading="lazy" decoding="async" />
  </div>
  <div class="about-content">
    <ul class="about-definitions">
      <strong class="about-name">Wenhao Deng 邓文豪 <span class="cantonese-note">(Man-Ho Tang)</span></strong>
      <li>The troublemaker</li>
      <li>The prompt evolver</li>
      <li>The agent orchestrator</li>
      <li><strong>The problem solver ← I wish I were</strong></li>
    </ul>
  </div>
</div>

<div class="contact-section">
  <div class="about-links">
    <a href="https://github.com/w3nhao" target="_blank" rel="me noopener noreferrer">GitHub</a>
    <a href="https://scholar.google.com/citations?user=c7XCft4AAAAJ&hl=en" target="_blank" rel="me noopener noreferrer">Google Scholar</a>
    <a href="https://www.linkedin.com/in/wenhaod" target="_blank" rel="me noopener noreferrer">LinkedIn</a>
    <a href="https://x.com/dw3nhao" target="_blank" rel="me noopener noreferrer">Twitter</a>
  </div>
  <div class="about-email">
    Email: wenhao [dot] deng [at] foxmail [dot] com
  </div>
</div>

## Recent Posts

<ul class="recent-posts">
{% assign visible_posts = site.posts | where_exp: "post", "post.hidden != true" %}
{% for post in visible_posts limit:3 %}
  <li>
    <a href="{{ post.url }}">{{ post.title }}</a>
    <small>{{ post.date | date: "%Y-%m-%d" }}</small>
    {% if post.description %}<div class="recent-posts-desc">{{ post.description }}</div>{% endif %}
  </li>
{% endfor %}
</ul>

## What do I do?

I do what I want to do.

## Education

- M.Sc. CS, University of Nottingham
- B.Eng. CS, Guangzhou University

## Papers

<div class="publication-item">
  <div class="pub-title">
    <span class="conference-badge">CIKM 2025</span>
    <a href="https://arxiv.org/abs/2305.11700" target="_blank">Exploring the Upper Limits of Text-Based Collaborative Filtering Using Large Language Models: Discoveries and Insights</a>
  </div>
  <div class="pub-authors">
    Ruyu Li*, <strong>Wenhao Deng</strong>*, Yu Cheng, Zheng Yuan, Jiaqi Zhang, Fajie Yuan (* Equal contribution)
  </div>
  <div class="pub-meta-line">
    <div class="pub-tldr-toggle" onclick="toggleTldr(this)">TL;DR</div>
  </div>
  <div class="pub-tldr">
    We investigate how far text-based collaborative filtering can go with extremely large language models, revealing key insights on leveraging language models for recommendation systems.
  </div>
</div>

<div class="preprint-item">
  <div class="pub-title">
    <span class="preprint-badge">Preprint</span>
    <a href="https://arxiv.org/abs/2510.16559" target="_blank">BuildArena: A Physics-Aligned Interactive Benchmark of LLMs for Engineering Construction</a>
  </div>
  <div class="pub-authors">
    Tian Xia, Tianrun Gao, <strong>Wenhao Deng</strong>, Long Wei, Xiaowei Qian, Yixian Jiang, Chenglei Yu, Tailin Wu
  </div>
  <div class="pub-meta-line">
    <div class="pub-tldr-toggle" onclick="toggleTldr(this)">TL;DR</div>
    <span class="pub-arxiv">arXiv:2510.16559 (2025)</span>
  </div>
  <div class="pub-tldr">
    We introduce BuildArena, the first physics-aligned interactive benchmark for language-driven engineering construction, comprehensively evaluating LLMs' capabilities for construction automation under strict physical constraints through a highly customizable agentic engineering framework with static and dynamic mechanics tasks.
  </div>
</div>

<div class="preprint-item">
  <div class="pub-title">
    <span class="preprint-badge">Preprint</span>
    <a href="https://arxiv.org/abs/2510.03865" target="_blank">Unlocking Reasoning Capabilities in LLMs via Reinforcement Learning Exploration</a>
  </div>
  <div class="pub-authors">
    <strong>Wenhao Deng</strong>*, Long Wei*, Chenglei Yu*, Tailin Wu (* Equal contribution)
  </div>
  <div class="pub-meta-line">
    <div class="pub-tldr-toggle" onclick="toggleTldr(this)">TL;DR</div>
    <span class="pub-arxiv">arXiv:2510.03865 (2025)</span>
  </div>
  <div class="pub-tldr">
    We attribute one of the limitations of Reinforcement Learning via Verifiable Reward (RLVR) to the reverse KL divergence, and propose Reward-Aware Policy Optimization with forward KL divergence to enhance the reasoning capabilities of large language models.
  </div>
</div>

<div class="preprint-item">
  <div class="pub-title">
    <span class="preprint-badge">Preprint</span>
    <a href="https://arxiv.org/abs/2308.01191" target="_blank">Towards Understanding the Capability of Large Language Models on Code Clone Detection: A Survey</a>
  </div>
  <div class="pub-authors">
    Shihan Dou*, Junjie Shan*, Haoxiang Jia, <strong>Wenhao Deng</strong>, Zhiheng Xi, Wei He, Yueming Wu, Tao Gui, Yang Liu, Xuanjing Huang (* Equal contribution)
  </div>
  <div class="pub-meta-line">
    <div class="pub-tldr-toggle" onclick="toggleTldr(this)">TL;DR</div>
    <span class="pub-arxiv">arXiv:2308.01191 (2023)</span>
  </div>
  <div class="pub-tldr">
    An early survey comprehensively examining how well large language models perform on code clone detection tasks and their capabilities.
  </div>
</div> 


<!--
## Reviewers

- International Conference on Learning Representations (ICLR) 2026
- ACM International Conference on Web Search and Data Mining (WSDM) 2025
- ACM Conference on Recommender Systems (RecSys) 2024, 2025
- ACM Transactions on Information Systems (TOIS)

<div class="homepage-footnote">
  <div class="inspirational-quote">
    *You don't need to solve your entire life overnight, just focus on one small step at a time.*
  </div>
  Powered by <a href="https://jekyllrb.com/">Jekyll</a> and <a href="https://github.com/poole/lanyon">Lanyon</a>.
</div>
-->

<!--
<div class="cat-gif-container">
  <img src="/public/spinning-cat.gif" alt="Spinning 3D Cat" />
  Powered by <a href="https://jekyllrb.com/">Jekyll</a> and <a href="https://github.com/poole/lanyon">Lanyon</a>.
</div> -->
