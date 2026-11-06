# Design reasoning: how to choose a design

The common failure is choosing the style first: "luxurious" becomes the luxury pack, and everything after that only refines one answer. Decide in this order instead. The style pack comes last, as dress.

**Meaning → world → device → material → pack.**

## 1. Turn the adjective into a meaning
"Premium", "luxurious", "elegant", "modern" are not briefs. Name the promise, in one plain line, then pick the likeliest one or two:

| Meaning | Sounds like | Leads to |
|---|---|---|
| `material` | jewellery, watches, stone, fabric | macro; the material fills the frame |
| `craft` | workshop, heritage, made by hand | the making, the unveiling |
| `calm` | wellness, private care, retreats | emptiness, one object, slow time |
| `precision` | engineering, finance, tools | clean voids, exploded views, real tools |
| `status` | aspirational brands, big launches | one big reveal, scale |
| `taste` | fashion, boutique, editorial | hard cuts, collage, one sharp colour |
| `warmth` | food, family, neighbourhood care | people, real places |
| `play` | toys, kids, anything dull made fun | something to touch |

Read the brief's reason, not the word. "Washing here makes you feel expensive" is `status`: the page is about the moment of transformation, not about looking like a jewellery house.

## 2. Find the world
The subject inventory (`commands/style.md`), plus **one verb that belongs to this subject** (wash, tune, climb, pour). It is the first candidate for the interaction.

## 3. Get a deal, then choose
Run `darkroom deal --meaning status,craft --job book --assets photo,film`. It returns three devices from `library/devices.json` (`darkroom deal --list` shows all), leaves out what the last builds used and what the assets can't support, and adds randomness on purpose. The third is the less obvious one.

Choose from those three. To go outside the deal, say why in one line: the user's own words, or a real asset that points elsewhere. Never replace a card because it feels unfamiliar. Record the choice: `darkroom state --set device=<id>,meaning=<meaning>`.

## 4. Material comes after the idea
The deal gives a ground and where the colour comes from. Name the actual material or place ("ground from wet asphalt, accent from pink wash foam"). A colour taken from one photo is a start, not a reason: if it lands on a stock look (`stock-palette`), it needs the user's words. The type voice follows the device: a poster needs a face that can shout, a one-bit page may be all mono.

## 5. The pack dresses it
Now pick the pack. It sets type lists, switches and budgets; it doesn't choose the device. A garage unveiling and a white-studio ring page can both be `luxury`.

## 6. Two options that really differ
The two comps differ on at least three of: device, ground, colour source, type voice, motion verb, ending. One of them is the less obvious card. Each gets one line a client can follow: "A: the car is revealed as foam clears. B: you turn the wash dial and the page changes with it."

## 7. Say your reasons in three lines
Before showing options, tell the user:
1. **What I think you mean:** "premium here means the visitor feels they own something expensive."
2. **What I took from the subject:** "foam, the wash dial, the moment the dirt goes."
3. **Why this and not the obvious:** "I passed on a near-black showroom because your last build used one."

## Under pressure
When the user says "feels flat", don't reach for darker and more cinematic. Name the weak step: the meaning, the device or the material. Change that one.
