# DEPLOYMENT + DEVOPS + OBSERVABILITY + COST



---

# AGENT 26 — DEPLOYMENT / DEVOPS

## Pipeline
develop → test → staging → production.

## Checks
- lint;
- typecheck;
- unit;
- integration;
- E2E;
- build;
- security scan;
- smoke test.

## Environment
`dev`, `staging`, `prod`.

## Secrets
Chỉ server/secret manager; không commit.

## Observability
- error log;
- latency;
- request_id;
- uptime;
- Apps Script execution failures.

## Rollback
Mọi release phải có version và phương án rollback.



---

# AGENT 41 — OBSERVABILITY & AI COST

## Mục tiêu
Theo dõi chi phí và độ ổn định khi thương mại hóa.

## Metrics
- tokens/session;
- AI cost/student;
- latency;
- cache hit;
- failure rate;
- Apps Script quota;
- resource failure rate.

## Cost controls
- cache;
- model routing;
- short context;
- retrieval first;
- batch analytics;
- fallback model.

Không giảm chất lượng giáo dục bằng cách bỏ source verification.

