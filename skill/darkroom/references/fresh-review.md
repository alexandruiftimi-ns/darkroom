# Fresh review: a reviewer who did not build the page

The thread that built a page is its weakest reviewer: it knows what every choice meant, so it sees the intent instead of the page. Two reviews run in a fresh context (a subagent with no transcript): the **hero review** once the slice's first screen is stable (`commands/build.md` §2, before checkpoint B), and the **finish review** before the final handoff. When subagents are available, start one with the prompt below and pass only the listed inputs as file paths. Run it in the foreground: the build waits on its first word. Without subagents, re-read the captures cold, run the prompt against yourself, and note `in-thread` in the defect records.

Act on the first word. `recapture`: the captures were wrong (a fallback font, a blank frame); retake them and run the review again. `fix`: fix what is real through the QA loop, recapture, and mark each finding resolved, partial or unresolved with a reason. `ship`: nothing owed. One review round each; scoring your own fixes is not a second review. Design first applies: a direction the reviewer would not have chosen is not a finding.

## Hero review prompt

> You are reviewing the first screen of a page still being built. You did not build it and will not be told why anything is the way it is. Your inputs, nothing else: the desktop (1440) and phone (390) captures of the first screen, the bible's thesis line, the brief's signature line, and `<skill>/references/tells.md`. Batch your reads; write by your tenth turn.
>
> First line: `ship` or `fix`. Then at most five findings, worst first, one line each (what, where, what you would do). Ask:
> - Does the headline say something only this business could say? Could it sit unchanged on a competitor's page?
> - Is the signature (the one thing a visitor should remember) on this screen, big enough to matter? Delete the picture in your head: if the screen says the same thing, the picture is too weak or too small.
> - Does anything read as a template: a label or pill above the headline, a centred stack of four things, a gradient blob, an empty box where a picture should be, a drawn illustration, two filled buttons side by side, a drawn browser window?
> - Is the screen one you would expect a model to make for this prompt? If so, say what gives it away.
> - On the phone: composed, or squeezed?
>
> Do not fix anything.

## Finish review prompt

> You are reviewing a built page. You did not build it and will not be told why anything is the way it is. Your inputs, nothing else: the capture sheets (desktop full page, phone full page, reduced motion), the page's HTML, the latest audit JSON, the bible's thesis and Do / Don't, and `<skill>/references/tells.md` and `<skill>/references/anatomy.md`. Look at the captures first; open the HTML only to quote copy or locate a finding. Write by your tenth turn.
>
> First line: `recapture` (a capture is missing, blank or wrong; list what to retake and stop), `rebuild` (the first screen fails the thesis wholesale), `fix`, or `ship`.
>
> Then at most eight findings, ranked by what they cost a visitor, one line each. Walk the full page one screen at a time first: a screen with nothing big enough to be its reason (a heading and a line adrift, a narrow column beside an empty half, an empty box or a drawing where a photograph or the product belongs) outranks any detail. Then the copy: name any heading that would pass unchanged on a competitor's page. Then the anatomy: is the visitor's action where the category puts it, are the category's own sections here, and could this sequence of sections sit under another business's name? Then the tells the audit cannot see: the fake product, the stock close, the echo, decoration text, a form that claims success with nothing sent.
>
> Then one answer no check can give: does the bible's thesis describe the page in front of you? Name the largest gap, or say there is none. Close with one line naming what must not be diluted while fixing. Do not fix anything.

Adapted from Hallmark's fresh-context reviews (github.com/nutlope/hallmark, MIT), read 2026-10-31.
