---
layout: post
title: "Co-Evo vs Self-Evo"
hidden: true
---

{::options parse_block_html="true" /}

<div class="lang-switch">
  <button class="lang-btn active" onclick="switchLang('zh')">中文</button>
  <button class="lang-btn" onclick="switchLang('en')">EN</button>
</div>

<div class="lang-zh" markdown="1">

当下最流行的 AI 叙事大概是这样的：Agent 学会自我改进、自我评估、自我纠错，人类逐渐退出循环，最终实现全自动智能。这通常被叫做 Self-Evolution，系统的自我演化。它很工程，很高效，在技术路线上也很可能是对的。

但我始终觉得不对劲。不是技术上不对劲，而是角色分配上不对劲。自动化程度变高了，人就应该退到后面去吗？Agentic 时代，人的角色应该被弱化吗？

我不这么认为。我觉得人在生产中始终要占据主动的位置。这是某种西西弗式的倔强：在封闭系统里人类不可能胜过机器，围棋已经证明了这一点，但仍然坚持人不能退场。这篇文章想回答的问题是：一个人主导的 agentic system，到底能 scale 到多大？以及，凭什么人来领导还有价值？

---

## 目的不能自举

为了认真框架这个问题，过去一段时间我在尝试为 Agentic System 建立一套公理体系。在推演的过程中，有一条公理逐渐变成了整个体系的核心：

> **Ω4. Telos 对系统内部欠定。**
> 在有限观测下，优化目标不可唯一识别；任何确定的 telos 等价于引入外部偏好信号。

Telos 说起来抽象，但它指的东西很具体：欲望。人在生产过程中的驱动力到底是什么？Spinoza 在《伦理学》里给过一个干脆的回答：欲望是人的本质本身。大家喜欢说的 taste，是个人欲望的投射；老师评价学生的 motivation，是欲望；说得负面一点，野心，也是欲望。这些都是同一个东西。我第一次认真想这件事的时候，脑子里蹦出来的是《云图》里那句 the true true：真相到底是什么？在这个语境下，the true true desire，就是生产的原初驱动力。

Ω4 说的是：一个系统从内部观察自己的时候，它面对无穷多个等价的目标函数，没有任何内在依据去选其中一个。这不是能力问题，不是"还不够强"，这是 underdetermination，是结构性的。你给一个 Agent 足够多的算力和数据，它可以优化任何目标函数到极致，但它无法回答"为什么是这个目标函数而不是那个"。这个选择必须从外部注入。

在当前的世界里，那个外部信号叫做「人」。这条公理在体系中被标注为"可被挑战"：如果有一天 AGI 产生了 genuine desire，它会失效。但在此之前，它成立。

---

## Critic and Steering

欲望是驱动力，但欲望落到生产系统里，需要一个具体的动作。这个动作我称之为 steering。之所以不叫 govern，是因为人不需要管理系统的方方面面，人只是撬动这个系统的一角，给它一个方向。

这类叙事中常见的一个含混，是把两件性质完全不同的认知动作混在了一起。

第一件叫验证：给定一个标准，检查输出是否符合。这本质上是比对，拿 output 和 reference 放在一起看。只要 reference 存在且可执行，验证就是一个计算问题，完全可以自动化。你可以用一个 Critic Agent 来做，甚至可以用一群 Critic 互相交叉校验。

第二件叫 steering：定义那个 reference 本身。什么是「好」？什么方向值得追求？这不是计算问题。这是意志问题。

Self-Evo 说"我能自己验证自己"，没问题，这确实可以。但谁来写验证的标准？谁来说"这个方向对"？这个问题不可能从系统内部回答，Ω4 已经封死了这条路。

所以人的不可替代性不在于判断更准，Agent 可能判断得比人准得多，而在于人定义什么叫「准」。人从验证者变为定义者，从监工变为导演。这是一个范畴的跃迁，不是程度的差异。

---

## 流形之外

验证可以自动化，steering 不可以。那么一个自然的推论是：一个只跟自己对话的系统和一个跟人对话的系统，能到达的地方是不一样的。

Agent 的自我改进，无论多精妙，本质上是在训练分布所张成的流形上滑动。它能找到流形上的最优点，但无法抵达流形之外的点。而人类提供的信号，比如物理直觉、市场嗅觉、法律判断、审美品味，这些东西来自训练分布之外。它们不是 Agent"还没学到"的知识，而是结构性的 out-of-distribution 输入。

Self-Evo 是一个系统的内部独白：系统和自己对话，在自己的语言里打转。Co-Evo 是两种认知形态之间的对话：碳基的、具身的、有死亡焦虑的智能，和硅基的、统计的、没有时间概念的智能，互相提供对方到达不了的信号。

独白更快。对话更远。这不是效率的比较，而是可达空间的比较。

还有一个更实际的维度：共模失败。当一个系统用同样的数据训练、同样的架构构建、同样的 Spec 约束，它在同一个地方有盲点。自己检查自己，盲点是共享的。在我的公理体系里，这叫共模失败率 $q$，降低它的唯一途径是引入异构的校验信号。人是最异构的 Critic，因为人的认知结构和 Agent 完全不同源。

---

## 基因型先行

人提供异构信号，这一点还可以从另一个角度来理解。在开发 Agentic System 工具链的过程中，我逐渐形成了一个生物学隐喻：DNA 是基因型，Code 是表型。

基因型是不变的、跨越个体生命周期的、承载意志的。表型是可变的、会死亡的、是基因型的一次性表达。Agent 来了又走，上下文用完就清空，但 Spec，那个记录了人类意志的文档，持续存在。Agent 不断轮回，而承载意志的文档就是它的业力。

Self-Evo 的逻辑是让表型自己演化出基因型。Co-Evo 的逻辑是基因型先行，表型是表达。

生物学几十亿年的答案很清楚：从来都是基因型先行。表型会死，基因永存。不是 Code 产生了 Spec，是意志产生了 Spec，Spec 产生了 Code。因果的方向不能颠倒。

---

## 诚实的时间性

写到这里我必须交代一件事。

Co-Evo 的优势很可能是有保质期的。2026 年，human-agent augmentation 显然是正确的路径。2027、2028 年，Agent 在常规任务上可能实现完全自主。再往后，纯 agentic 系统在生产力维度上大概率会碾压一切。

Ω4 被标注为"可被挑战"是有原因的。如果 AGI 产生了 genuine desire，不是模拟的、不是 RLHF 训练出来的、而是真正内生的目的性，那么 telos 不再需要外部注入，Co-Evo 的哲学基础就塌了。

但这不是我希望的未来，这与我的想法相左。问题不应该停在"人会不会被替代"，而应该是：怎么保证人也在 evolve？怎么保证人在 scaling 这个系统的同时，自己也在 scaling？

目前已经有很多声音在说，接触 agentic 系统之后人的技能在退化。如果人把验证交给了 Critic，把执行交给了 Agent，只剩下 steering，那 steering 技能的进化是否足够？还是说人需要警惕不能丧失某些东西？又或者，人应该建立某种新的能力，一种学校不教的、专门为人机共演时代准备的能力。这个东西到底是什么，我还没有答案。

但我知道一件事：过渡态也值得被认真对待。事实上，大多数值得过的人生都是过渡态。

---

*The harness doesn't do the running. But now we know: it's not about running faster, it's about knowing where to run.*

---

*本文基于 Agentic System 公理体系 v4 的哲学随笔。技术细节另有专文。*

</div>

<div class="lang-en" markdown="1" style="display:none;">

The dominant AI narrative goes something like this: agents learn to self-improve, self-evaluate, and self-correct; humans gradually step out of the loop; full automation follows. The term for this is Self-Evolution. The approach is engineering-driven, efficient, and quite possibly correct on the technical merits.

Something about it still feels wrong to me. Not technically wrong, but wrong in how it assigns roles. Should humans retreat to the background just because the degree of automation increases? Should the human role be diminished in the agentic era?

I don't think so. I believe humans must always hold the active position in production. Call it a Sisyphean stubbornness: in closed systems, humans cannot beat machines, and the game of Go has settled that question already, yet I still insist that humans cannot leave the stage. The question this essay tries to answer is: how far can a human-led agentic system scale? And what makes human leadership still valuable?

---

## Purpose Cannot Bootstrap Itself

To frame this question rigorously, I have been building an axiomatic system for agentic systems over the past months. During the derivation, one axiom gradually became the core of the entire framework:

> **Axiom 4 (Omega-4). Telos is underdetermined from within the system.**
> Under finite observation, the optimization objective cannot be uniquely identified; any determined telos is equivalent to injecting an external preference signal.

Telos sounds abstract, but the thing it points to is concrete: desire. What actually drives humans in production? Spinoza gave a blunt answer in the *Ethics*: desire is the very essence of man. What people like to call taste is a projection of personal desire. What teachers evaluate as a student's motivation is desire. Put negatively, ambition is also desire. All of these are the same thing. The first time I thought seriously about this, what came to mind was the phrase from *Cloud Atlas*: the true true. What is the truth, really? In this context, the true true desire is the primal driving force of production.

Omega-4 states: when a system observes itself from the inside, it faces infinitely many equivalent objective functions with no internal basis for choosing one over another. This is not a capability gap. This is underdetermination, and it is structural. Given enough compute and data, an agent can optimize any objective function to its limit, but the agent cannot answer "why this objective function and not that one." That choice must be injected from outside.

In the current world, that external signal is called "human." Omega-4 is labeled "challengeable" in the axiom system: if AGI one day develops genuine desire, the axiom breaks. Until then, it holds.

---

## Critic and Steering

Desire is the driving force, but desire entering a production system requires a concrete action. I call that action steering. The reason I avoid the word "govern" is that humans do not need to manage every aspect of the system. Humans only lever one corner of it and give it a direction.

A common conflation in Self-Evolution discourse is mixing two cognitively distinct actions into one.

The first action is critique: given a standard, check whether output conforms to the standard. Critique is comparison, placing output next to a reference and checking alignment. As long as the reference exists and is executable, critique is a computational problem and can be fully automated. A single critic agent can do it. A cluster of critics can cross-validate each other.

The second action is steering: defining the reference itself. What counts as "good"? Which direction is worth pursuing? Steering is not a computational problem. Steering is a problem of will.

Self-Evolution says "I can validate myself." Fine, validation is indeed automatable. But who writes the validation standard? Who says "this direction is correct"? That question cannot be answered from inside the system. Omega-4 has closed that door.

Human irreplaceability does not lie in judging more accurately. Agents may judge far more accurately than humans. Human irreplaceability lies in defining what "accurate" means. The human shifts from verifier to definer, from manager to director. This is a categorical leap, not a difference of degree.

---

## Beyond the Manifold

Critique can be automated. Steering cannot. A natural corollary follows: a system that only talks to itself and a system that talks to a human can reach different places.

Agent self-improvement, however sophisticated, amounts to sliding along the manifold spanned by the training distribution. The agent can find the optimal point on that manifold but cannot reach points outside of it. Human signals, physical intuition, market sense, legal judgment, aesthetic taste, come from outside the training distribution. These signals are not knowledge the agent "hasn't learned yet." They are structurally out-of-distribution inputs.

Self-Evolution is a system's internal monologue: the system talks to itself and spins within its own language. Co-Evolution is a dialogue between two cognitive forms: carbon-based, embodied intelligence with mortality anxiety on one side, and silicon-based, statistical intelligence with no concept of time on the other, each providing signals the other cannot reach.

Monologue is faster. Dialogue goes further. The comparison here is not about efficiency. The comparison is about reachable space.

There is also a more practical dimension: common-mode failure. When a system is trained on the same data, built on the same architecture, and constrained by the same spec, the system has blind spots in the same places. Self-checking shares the blind spots. In the axiom system, this is the common-mode failure rate $q$. The only way to reduce $q$ is to introduce heterogeneous verification signals. Humans are the most heterogeneous critic, because human cognitive architecture has an entirely different origin from the agent's.

---

## Genotype First

The heterogeneous signal argument can also be understood from a different angle. While developing an agentic system toolchain, I arrived at a biological metaphor: DNA is the genotype, Code is the phenotype.

The genotype is stable, spans individual lifetimes, and carries will. The phenotype is mutable, mortal, and a one-time expression of the genotype. Agents come and go, contexts fill up and get cleared, but the spec, the document encoding human will, persists. Agents cycle through reincarnation, and the document carrying will is their karma.

Self-Evolution's logic is to let the phenotype evolve its own genotype. Co-Evolution's logic is genotype first, phenotype as expression.

Biology's answer across billions of years is clear: genotype has always come first. Phenotypes die. Genes persist. Code does not produce spec. Will produces spec. Spec produces code. The direction of causation cannot be reversed.

---

## Honest Temporality

At this point I must disclose something.

The advantage of Co-Evolution very likely has an expiration date. In 2026, human-agent augmentation is clearly the right path. By 2027 or 2028, agents may achieve full autonomy on routine tasks. Beyond that, purely agentic systems will probably dominate on the productivity dimension.

Omega-4 is labeled "challengeable" for a reason. If AGI develops genuine desire, not simulated, not RLHF-trained, but truly endogenous purpose, then telos no longer requires external injection, and Co-Evolution's philosophical foundation collapses.

That is not the future I want. It runs against my conviction. The question should not stop at "will humans be replaced." The question should be: how do we ensure humans also evolve? How do we ensure that humans scale alongside the system they are scaling?

Many voices already report that human skills degrade after prolonged contact with agentic systems. If humans hand critique to the critic, execution to the agent, and only steering remains, is the evolution of steering skill alone sufficient? Or must humans guard against losing certain capabilities? Perhaps humans need to develop an entirely new kind of ability, one that schools do not teach, one built specifically for the era of human-machine co-evolution. I do not have an answer for what that ability is.

But I know one thing: transient states deserve to be taken seriously. Most lives worth living are transient states.

---

*The harness doesn't do the running. But now we know: it's not about running faster, it's about knowing where to run.*

---

*A philosophical essay based on the Agentic System Axiom Framework v4. Technical details in a separate publication.*

</div>

<style>
.lang-switch {
  margin-bottom: 1.5rem;
  display: flex;
  gap: 0.5rem;
}
.lang-btn {
  padding: 0.3rem 1rem;
  border: 1px solid #515151;
  background: transparent;
  color: #515151;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}
.lang-btn.active {
  background: #515151;
  color: #fff;
}
.lang-btn:hover {
  opacity: 0.8;
}
</style>

<script>
function switchLang(lang) {
  var zhDiv = document.querySelector('.lang-zh');
  var enDiv = document.querySelector('.lang-en');
  zhDiv.style.display = lang === 'zh' ? 'block' : 'none';
  enDiv.style.display = lang === 'en' ? 'block' : 'none';
  document.querySelectorAll('.lang-btn').forEach(function(btn) {
    btn.classList.remove('active');
  });
  document.querySelector('.lang-btn[onclick*="' + lang + '"]').classList.add('active');

  var activeDiv = lang === 'zh' ? zhDiv : enDiv;
  var hiddenDiv = lang === 'zh' ? enDiv : zhDiv;
  var activeIds = [];
  activeDiv.querySelectorAll('h2, h3, h4').forEach(function(h) {
    if (h.id) activeIds.push(h.id);
  });
  var hiddenIds = [];
  hiddenDiv.querySelectorAll('h2, h3, h4').forEach(function(h) {
    if (h.id) hiddenIds.push(h.id);
  });
  var tocContainer = document.getElementById('toc-container');
  if (tocContainer) {
    tocContainer.querySelectorAll('a').forEach(function(a) {
      var href = a.getAttribute('href');
      if (!href) return;
      var targetId = href.replace('#', '');
      var li = a.closest('li');
      if (!li) return;
      if (hiddenIds.indexOf(targetId) !== -1) {
        li.style.display = 'none';
      } else {
        li.style.display = '';
      }
    });
  }
}
document.addEventListener('DOMContentLoaded', function() { switchLang('zh'); });
</script>
