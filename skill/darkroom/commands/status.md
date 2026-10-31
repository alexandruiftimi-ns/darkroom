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

`darkroom version` prints the installed version (major.minor.patch, from the skill's `VERSION` file). Name it when a user reports a problem. `darkroom version --check` also asks GitHub for the latest release (one read-only request) and prints `installed`, `latest` and, when newer, an `update` line for the way Darkroom was installed (plugin or plain skill). Offline it says "not checked" and nothing breaks.

**When the user types `/darkroom version`** (or asks which version they have, or whether there is an update): run `darkroom version --check` yourself and answer in one or two plain lines: the version they have; "that's the latest", or the newer version, its name and what it brings (one line from the release), and how to update in their words (plugin: "run `/plugin` in Claude Code and update Darkroom, then restart"; plain skill: "download the new release and replace the darkroom folder, then restart"). Not checked offline: say so. Do not start or resume a project for this.

Stages: `intake → direction → slice → build → verify → review → done`. Modes: `calm`, `animated`, `hero-effect`, `story`. Looks: `pack:<style pack>` or `like:<brand>`. Scope: `home`, `page:/<path>` or `all` (how much to build before the user approves the look). `approvals`, `open`, `schema` and `createdAt` cannot be changed with `--set`. If `.darkroom/` does not exist, run `darkroom init` (or `study` first, to learn from a reference page).

Rules: never cite a stale capture or a stale approval as proof; re-capture. A blocking open item is worked around with a marked placeholder when possible, otherwise raised with the user once, together with the other pending asks.
