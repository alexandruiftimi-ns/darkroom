# State: where the project is

`node <skill>/scripts/darkroom.mjs state` prints the stage, the design document, the current build revision, the last approval (and whether it is **stale**: the build changed since), the captures and which are stale, open items (blocking or not), and the next action. Run it at the start of every session and after any context loss.

Record progress with the same command:

```
darkroom state --set stage=slice
darkroom state --set mode=animated,look=like:cartier            # motion level + look (references/modes.md)
darkroom state --approve direction --note "B: the tide-table layout; A lost on legibility"
darkroom state --open asset:hero-clean-plate:blocking      # type:id[:blocking]
darkroom state --close hero-clean-plate
darkroom state --root site                                 # the folder the build revision is computed from
```

Stages: `intake → direction → slice → build → verify → review → done`. Modes: `calm`, `animated`, `hero-effect`, `story`. Looks: `pack:<style pack>` or `like:<brand>`. `approvals`, `open`, `schema` and `createdAt` cannot be changed with `--set`. If `.darkroom/` does not exist, run `darkroom init` (or `study` first, to learn from a reference page).

Rules: never cite a stale capture or a stale approval as proof; re-capture. A blocking open item is worked around with a marked placeholder when possible, otherwise raised with the user once, together with the other pending asks.
