---
layout: post
title: "HR, NDCG, and MRR: An easy implementation with TorchMetrics"
subtitle: "Evaluation Metrics for Recommender Systems with PyTorch Lightning: HR, NDCG, and MRR"
toc: true
---

To assess the performance of  Recommender systems, we need to have reliable evaluation metrics. In this blog post, we will discuss three popular metrics: Hit Rate (HR), Normalized Discounted Cumulative Gain (NDCG), and Mean Reciprocal Rank (MRR). We will also show you how to easily implement these metrics using TorchMetrics and integrate them into a PyTorch Lightning model.

## 0. Understanding the `get_topk_ranks` Function

In the context of our recommender system evaluation, it is essential to understand the `get_topk_ranks` function, which plays a crucial role in computing the ranks of the target items in the predicted scores. This function is used as an intermediate step to calculate the HR, NDCG, and MRR metrics.

```python
def get_topk_ranks(pred_scores, target, topk):
    """ get topk ranks of the target in the pred_scores
    Args:
        pred_scores: (batch_size, item_num(with padding item))
        target: (batch_size, ) or (batch_size, 1)
        topk: int
        
    Returns:
        topk_rank: (batch_size, 1) topk + 1 if not hit, 1 is the first rank
    """
    assert target.shape[0] == pred_scores.shape[0]
    assert pred_scores.shape[1] >= topk
    target = target.unsqueeze(1) if target.ndim == 1 else target

    _, topk_idx = pred_scores.topk(topk, dim=1)
    hitted_row, rank = (target == topk_idx).nonzero().split(1, dim=1)
    rank += 1
    
    # first set all rank to maximum value 
    # int64 or set all rank to topk + 1
    all_rank = torch.full_like(target, topk + 1)
    # then set the hitted row to the rank
    all_rank = all_rank.scatter(0, hitted_row, rank)
    return all_rank
```

### The `get_topk_ranks` Function Explained

The `get_topk_ranks` function takes three arguments: `pred_scores`, `target`, and `topk`. It returns the ranks of the target items within the top-k predictions.

1. `pred_scores`: A tensor of shape `(batch_size, item_num(with padding item))`, representing the predicted scores for each item for all users in a batch.

2. `target`: A tensor of shape `(batch_size,)` or `(batch_size, 1)`, containing the ground truth target items for each user in the batch.

3. `topk`: An integer value representing the number of top items we want to consider.

The function returns a tensor `topk_rank` of shape `(batch_size, 1)` containing the top-k ranks of the target items in the predicted scores. If a target item is not in the top-k predictions, the rank will be set to `topk + 1`.

### How the `get_topk_ranks` Function Works

The `get_topk_ranks` function follows these steps to compute the ranks:

1. Ensures that the target tensor has two dimensions by unsqueezing it if necessary.

2. Retrieves the indices of the top-k items in the predicted scores using the `topk()` method.

3. Computes the ranks of the target items within the top-k predictions by checking if the target item is present in the top-k indices.

4. Initializes a tensor `all_rank` with the same shape as the target tensor, filled with the value `topk + 1`.

5. Updates the `all_rank` tensor with the computed ranks for each user using the `scatter()` method.

By using the `get_topk_ranks` function, we can efficiently compute the top-k ranks for each user in a batch, which is an essential step for calculating HR, NDCG, and MRR metrics in our recommender system evaluation.

## 1. Hit Rate (HR)

Hit Rate is a simple and intuitive metric that measures the proportion of relevant items recommended to the user.

**Mathematical Definition:**

HR@k = (Number of hits in the top-k recommendations) / (Total number of recommendations)

The Hit Ratio (HR) is a binary metric that measures whether a relevant item is present in the top-k recommendations or not. Mathematically, it can be expressed as:

$$\text{HR@k} = \frac{1}{|U|}\sum_{u=1}^{|U|} \text{hit}_u
$$

<p>
where $|U|$ is the number of users, and $\text{hit}_u$ is 1 if the ground truth item is present in the top-k recommendations for user $u$, and 0 otherwise.
</p>

**TorchMetrics Implementation:**

```python
from torchmetrics import Metric

class HR(Metric):
    ...
    def update(self, topk_rank):
        self.accumulate_count += topk_rank.shape[0]
        self.accumulate_metric += self._metric(topk_rank[topk_rank <= self.k])

    def _metric(self, topk_rank):
        return topk_rank.numel()
```

## 2. Normalized Discounted Cumulative Gain (NDCG)
NDCG is a metric that measures the quality of the ranking of the recommended items, taking into account their relevance and position in the list.

**Mathematical Definition:**

Normalized Discounted Cumulative Gain (NDCG) is a measure that evaluates the quality of the ranking of recommended items. It takes into account the positions of relevant items in the top-k recommendations. The NDCG@k is defined as:

NDCG@k = (DCG@k) / (IDCG@k)

where DCG@k is the Discounted Cumulative Gain at position k, and IDCG@k is the Ideal Discounted Cumulative Gain at position k.

DCG@k = sum(relevance_i / log2(i + 1)) for i in range(1, k + 1)

$$\text{NDCG@k} = \frac{1}{|U|} \sum_{u=1}^{|U|} \frac{\sum_{i=1}^{k} \frac{2^{\text{rel}_i(u)} - 1}{\log_2{(i+1)}}}{\text{IDCG}_u}
$$

<p>
where $|U|$ is the number of users, $\text{rel}_i(u)$ is the relevance score of item $i$ for user $u$, and $\text{IDCG}_u$ is the Ideal Discounted Cumulative Gain for user $u$, which is the maximum possible NDCG for that user.
</p>

**TorchMetrics Implementation:**

```python
from torchmetrics import Metric

class NDCG(Metric):
    ...
    def update(self, topk_rank):
        self.accumulate_count += topk_rank.shape[0]
        self.accumulate_metric += self._metric(topk_rank[topk_rank <= self.k])

    def _metric(self, topk_rank):
        return torch.sum(1.0 / torch.log2(topk_rank + 1))
```

## 3. Mean Reciprocal Rank (MRR)
MRR is a metric that measures the quality of the ranking of the recommended items by computing the average of the reciprocal ranks of the first relevant item in the list.

**Mathematical Definition:**

Mean Reciprocal Rank (MRR) is another metric that evaluates the ranking quality of recommended items. It is the average of the reciprocal of the rank of the first relevant item in the top-k recommendations for each user. MRR can be defined as:

MRR@k = (1 / Number of users) * sum(1 / rank_i) for i in range(Number of users)

$$\text{MRR@k} = \frac{1}{|U|}\sum_{u=1}^{|U|} \frac{1}{\text{rank}_u}
$$

<p>
where $|U|$ is the number of users, and $\text{rank}_u$ is the position of the first relevant item in the top-k recommendations for user $u$.
</p>

**TorchMetrics Implementation:**

```python
from torchmetrics import Metric

class MRR(Metric):
    ...
    def update(self, topk_rank):
        self.accumulate_count += topk_rank.shape[0]
        self.accumulate_metric += self._metric(topk_rank[topk_rank <= self.k])

    def _metric(self, topk_rank):
        return torch.sum(1.0 / topk_rank)
```

## Integrating Metrics with PyTorch Lightning
Now, let's demonstrate how to integrate these evaluation metrics into a PyTorch Lightning model using a sample recommender system called SASRec.

```python
import pytorch_lightning as pl
from torchmetrics import MetricCollection

class SASRec(pl.LightningModule):
    def __init__(self, ...):
        super().__init__()
        ...
        self.topk_list = [5, 10]
        self.topk_metric = MetricCollection
        ({
            f"{metric_name}@{topk}": globals()[metric_name](topk)
            for metric_name in ["HR", "NDCG", "MRR"]
            for topk in self.topk_list
        })

    def _on_val_test_epoch_start(self):
        for topk in self.topk_list:
            for metric_name in METRIC_LIST:
                self.topk_metric[f"{metric_name}@{topk}"].reset()

        self.register_buffer(
            "all_item_embs", self.item_encoder(self.all_item_ids), persistent=False
        )

    def on_validation_epoch_start(self):
        self._on_val_test_epoch_start()

    def on_test_epoch_start(self):
        self._on_val_test_epoch_start()

    def _val_test_step(self, batch, batch_idx, stage):
        ...

        pred_item_embs = self.forward(input_ids, input_mask)
        pred_scores = torch.matmul(pred_item_embs, self.all_item_embs.t()).squeeze(-1)
        pred_scores = pred_scores.scatter(1, history, -float('inf'))

        target = behavs[:, -1]
        target = target.unsqueeze(-1)

        topk = max(self.topk_list)
        all_ranks = get_topk_ranks(pred_scores, target, topk)

        for topk in self.topk_list:
            for metric_name in METRIC_LIST:
                metric = self.topk_metric[f"{metric_name}@{topk}"]
                metric.update(all_ranks)

    def validation_step(self, batch, batch_idx):
        self._val_test_step(batch, batch_idx, "val")

    def test_step(self, batch, batch_idx):
        self._val_test_step(batch, batch_idx, "test")

    def _val_test_epoch_end(self, outputs, stage):
        for topk in self.topk_list:
            for metric_name in METRIC_LIST:
                score = self.topk_metric[f"{metric_name}@{topk}"].compute()
                if metric_name in ["HR", "NDCG"] and topk in [5, 10]:
                    log_on_progress_bar = True
                else:
                    log_on_progress_bar = False
                self.log(f"{stage}_{metric_name}@{topk}",
                         score,
                         on_epoch=True,
                         prog_bar=log_on_progress_bar,
                         logger=True,
                         sync_dist=True)

        self.all_item_embs = None

    def validation_epoch_end(self, outputs):
        self._val_test_epoch_end(outputs, "val")

    def test_epoch_end(self, outputs):
        self._val_test_epoch_end(outputs, "test")
```

## Next Steps: Experimenting with Recommender Systems

After implementing and integrating these evaluation metrics into your PyTorch Lightning model, you can use them to gauge the performance of your recommender system. Additionally, you can employ these metrics to compare different models and decide which one is best suited for your application.
