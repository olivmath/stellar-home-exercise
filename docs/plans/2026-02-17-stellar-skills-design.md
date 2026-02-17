# Stellar Video Pipeline Skills Suite — Design Document

**Date:** 2026-02-17
**Author:** Lucas Bispo de Oliveira + Claude
**Status:** Implemented

## Context

Project `stellar-workshop` is a Remotion-based programmatic video pipeline for creating educational content about the Stellar blockchain. The project has a 5-episode script (SCRIPT.md) covering Stellar end-to-end, from wallet creation to Soroban smart contracts.

## Problem

Building high-quality animated blockchain educational videos requires coordinating multiple specialized roles: screenwriting, animation engineering, audiovisual editing, and production management. Without structured guidance, Claude agents lack the domain-specific patterns for Remotion animation, Stellar terminology, and video production workflows.

## Solution

Five specialized Claude Code skills in `~/.claude/skills/`, each acting as a specific production role:

### Skills Created

| Skill | Role | Scope |
|-------|------|-------|
| `stellar-setup` | DevOps Engineer | Environment validation, project scaffold, render pipeline config |
| `stellar-screenwriter` | Screenwriter | Script structure, timing marks, visual cues, Stellar vocabulary |
| `stellar-animator` | Motion Engineer | Frame-driven animations, Remotion patterns, blockchain visualization |
| `stellar-editor` | AV Editor | Scene assembly, transitions, audio sync, pacing |
| `stellar-producer` | Producer | Pipeline orchestration, quality gates, CI/CD, delivery |

### Dependency Flow

```
stellar-setup (one-time)
  → stellar-screenwriter (script)
    → stellar-animator (scenes)
      → stellar-editor (assembly)
        → stellar-producer (review + delivery)
```

### Key Design Decisions

1. **Personal skills (~/.claude/skills/)** — Reusable across Stellar projects
2. **Separate skills per role** — Each can be invoked independently
3. **Stellar-specific vocabulary** — Correct terminology enforced (Ledger not Block, SCP not PoS)
4. **Frame-driven animation only** — No CSS transitions, all `useCurrentFrame()` + `interpolate()`
5. **Quality gates between phases** — No phase starts without prior phase passing its gate

### Project State at Design Time

- Remotion 4.0.424, React 19, TypeScript strict
- 1920x1080 @ 30fps, 5-minute composition (9000 frames)
- 12 Remotion agent skills installed (.remotion-skills/)
- Minimal codebase: index.ts, Root.tsx, StellarWorkshop.tsx (placeholder)
- SCRIPT.md with 5 episodes ready for implementation
