# Wait: carry on by yourself when something is ready

You act only when a message arrives or a background command you started finishes. A turn that ends with "I'll wait for
the frames" and nothing running in the background cannot resume: the user has to come back and ask. So every wait is a
background command that **exits the moment the thing is ready**; its exit wakes you.

## What to run in the background

| Waiting for | Run in the background |
|---|---|
| A job you start (frame extraction, video encode, `npm run build`, an install) | the job itself |
| The user's generated images, frames or clips landing in a folder | `darkroom wait --files <folder> --match "*.png" --count 151` |
| An export or download still being written | the same, with `--stable 10` (no change for 10 s = finished) |
| A dev server starting | `darkroom wait --url http://127.0.0.1:4321/` |

`darkroom wait --files <folder> [--match "*.webp"] [--count N] [--stable 5] [--recursive] [--every 2] [--timeout 7200]` exits 0 once at least `--count` files matching `--match` are in the folder and none has changed for `--stable` seconds (the folder may not exist yet). `--recursive` counts subfolders; `--every` is the check interval in seconds. `--url <http…>` exits 0 once the address answers below 500. Exit 2 = `--timeout` seconds passed (default two hours): tell the user what is still missing and ask. Do not report it as done.

## How the turn goes

1. Start the background command (in Claude Code: `run_in_background`). For files the user must make, agree on the folder first, e.g. `assets/incoming/hero-frames/`, and give them the prompts.
2. In the same message, tell the user what you are waiting for, where to put it, and that you will continue as soon as it lands. Keep working on anything that does not depend on it (placeholders marked TEMP, other sections) before ending the turn.
3. When the command finishes, read its output and continue straight away: inspect what arrived (`darkroom media inspect`, a contact sheet), wire it in, rebuild and reload the preview, and tell the user what you did. Do not ask "shall I continue?".
4. Timed out, or wrong files (count, size, format): say exactly what is missing or wrong and start a new wait once the user answers.

Never poll with sleep loops or check the output file over and over: one background command, one wake-up.
