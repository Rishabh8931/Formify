# Formify

<p align="center">
  <strong>Build forms people actually finish.</strong>
</p>

<p align="center">
  A modern form builder focused on creating, sharing, and understanding forms without unnecessary complexity.
</p>

<p align="center">
  <a href="#features">Features</a>
  ·
  <a href="#architecture">Architecture</a>
  ·
  <a href="#tech-stack">Tech Stack</a>
  ·
  <a href="#getting-started">Getting Started</a>
  ·
  <a href="#project-structure">Project Structure</a>
</p>

---

## ✦ About Formify

Formify is a modern form-building platform designed around one simple idea:

> **Forms should feel like products, not paperwork.**

The goal is to make the entire form workflow simple:

**Build → Share → Collect → Understand**

Formify is being built as a full-stack application with a Next.js frontend, Express API, and PostgreSQL database inside a Turborepo monorepo.

---

## ✨ Features

Formify is being developed around the following core capabilities:

- Create and manage forms
- Visual form builder
- Add, remove, and configure fields
- Customize field attributes
- Share forms through public URLs
- Collect form responses
- View and understand submitted responses
- Authentication and user accounts
- Multitab form synchronization
- Persistent form editing
- Responsive form experiences

> Features are actively being developed. The README will evolve alongside the product.

---

## 🧠 Product Philosophy

Formify isn't intended to be another configuration-heavy form builder.

The product is being designed around a few principles:

### 01 — Simplicity

The builder should make the next action obvious.

### 02 — Speed

Creating a form should feel direct rather than administrative.

### 03 — Quality

The final form should feel polished to the person filling it out.

### 04 — Control

Users should be able to shape their forms without fighting complicated abstractions.

### 05 — Useful responses

Collecting responses is only half the job. Formify should make those responses easy to work with.

---

## 🏗 Architecture

Formify uses a Turborepo-based monorepo.

```text
                        ┌─────────────────┐
                        │    Next.js Web  │
                        │   @formify/web  │
                        └────────┬────────┘
                                 │
                                 │ HTTP
                                 ▼
                        ┌─────────────────┐
                        │   Express API   │
                        │   @formify/api  │
                        └────────┬────────┘
                                 │
                                 │ Prisma
                                 ▼
                        ┌─────────────────┐
                        │   PostgreSQL    │
                        └─────────────────┘


              ┌─────────────────────────────┐
              │       Shared Packages       │
              │                             │
              │  @formify/ui               │
              │  @formify/database          │
              │  typescript-config          │
              │  eslint-config              │
              └─────────────────────────────┘
```

```text
feat      New functionality
fix       Bug fix
refactor  Code restructuring without behavior change
docs      Documentation
test      Tests
chore     Tooling/configuration
style     Formatting/UI style changes
perf      Performance improvement
build     Build/dependency changes
ci        CI/CD changes
```
