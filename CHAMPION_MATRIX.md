# LAWvalues Champion Matrix and Identity Resolution

This document answers a different question from the axis definitions:

> **Once LAWvalues knows the respondent's best real jurisprudential identity, which actual thinker, judge, court, or tradition is the best exemplar of this particular version of it?**

There should **not** be one permanent champion per identity. A champion is a second-stage match inside the identity family.

## Core rule

1. Pick the **narrowest real middle identity** the evidence supports.
2. Only then compare champions that are compatible with that identity or with the respondent's strongest remaining traits.
3. Prefer the champion whose **whole signature** matches the respondent, not the most famous name.
4. Do not force a champion when the fit is weak or tied.
5. A historical ancestor can appear as lineage without being the closest champion.

This is why:
- Solum is not "the Originalist."
- Scalia is not "the Textualist" for every textualist.
- Holmes is not "the Legal Realist" for every realist.
- Finnis is not automatically every nonpositivist.
- Fiss can be a remedial champion even when the respondent's middle identity is something else.

## Resolution levels

### Level 0 — lineage only
The figure is historically important but the quiz does not test the distinctive theory closely enough.

Examples: Blackstone, Aquinas, Austin/Bentham, Kelsen for Pure Theory, Holmes as a Realist precursor.

### Level 1 — family champion
The respondent clearly belongs to a broad identity and the champion is a canonical exemplar.

Examples:
- Positivist -> Hart
- Natural Lawyer -> Finnis
- Pragmatist -> Posner
- Common-Law Constitutionalist -> David Strauss

### Level 2 — subtype champion
Extra axis information makes a particular champion clearly better.

Examples:
- Textualist + public meaning + Rules + structural formalism -> Scalia
- Textualist without the broader Scalia bundle -> Manning
- Originalist + correctness-first precedent -> Thomas or Paulsen
- Originalist + stronger settlement/stare decisis -> Barrett
- Natural Law + Originalism + positive-law settlement -> Pojanowski/Walsh

### Level 3 — diagnostic champion
Adaptive diagnostics identify a theory precisely enough that the champion can be very specific.

Examples:
- Original-Methods Originalist -> McGinnis/Rappaport
- Framework Originalist -> Balkin
- Public-Meaning + principle/construction emphasis -> Solum
- Confirmed Legal Realist + general law-in-action orientation -> Llewellyn
- Confirmed Legal Realist + psychological/fact skepticism -> Frank, if later diagnostics support that distinction

## Balanced identity/champion map

| Real middle identity | Primary / likely champions | What makes the champion specific |
|---|---|---|
| Positivist | Hart; Raz after diagnostic | Hart = social practice / incorporation-compatible; Raz = source thesis |
| Dworkinian | Dworkin | principles as existing law + fit/justification |
| Natural Lawyer | Finnis | objective morality + positive law's settlement function |
| Radbruchian | Radbruch | extreme-injustice threshold |
| Fullerian | Fuller | internal morality / legality conditions |
| Alexyan | Alexy | claim to correctness + nonpositivism + proportionality |
| Legal Realist | Llewellyn; Frank; Holmes as precursor | empirical underdetermination; law in action; Frank if psychology/fact skepticism |
| Pragmatist | Posner; Breyer as judicial relative | consequences/workability; Breyer when purposivism/functionalism is stronger |
| Textualist | Manning; Scalia when broader bundle fits | Scalia needs public meaning/rules/formalism, not text alone |
| Intentionalist | no default yet | diagnose actual legislative/enactor intent before choosing a champion |
| Purposivist | Hart & Sacks; Breyer; Barak | Hart/Sacks = legal process; Breyer = pragmatic judging; Barak = purposive + proportionality |
| Legal-Process Theorist | Hart & Sacks | institutional competence + reasoned elaboration |
| Originalist | no single default | use subtype/axes before championing |
| Public-Meaning Originalist | Solum, Scalia, Barrett depending rest of profile | principle/construction vs rules/formalism vs precedent |
| Original-Intent Originalist | historical old-originalist lineage; no forced modern champion | do not invent a champion without evidence |
| Original-Methods Originalist | McGinnis & Rappaport | historically accepted interpretive methods |
| Framework Originalist | Balkin | fixed framework + substantial construction |
| Living Constitutionalist | Brennan as judicial champion; no forced theorist | use only when constitutional content genuinely evolves |
| Common-Law Constitutionalist | David Strauss | precedent/tradition themselves constitute constitutional law |
| Common-Good Constitutionalist | Vermeule | classical/common-good teleology, only after diagnostics |
| Thayerian | Thayer; Holmes/Hand/Frankfurter as historical practitioners | clear-error deference |
| Waldronian | Waldron | democratic legitimacy under reasonable rights disagreement |
| Popular Constitutionalist | Kramer; Tushnet for more radical/weak-form variants | anti-judicial supremacy + popular constitutional authority |
| Departmentalist | no single default | independent branch interpretation; do not collapse into popular constitutionalism |
| Elyan | Ely | representation reinforcement / process failure |
| Bickelian | Bickel | passive virtues / counter-majoritarian difficulty |
| Judicial Minimalist | Sunstein; Bickel as precursor | narrow/incompletely theorized decisions rather than Bickel specifically |
| Formalist | Lawson; Scalia if text/rules/originalism also fit; Schauer for rule form | distinguish structural formalism from rule formalism |
| Functionalist | Peter Strauss; Breyer as judicial relative | workable institutional overlap |
| Proportionalist | Alexy; Barak; German FCC / Barak-era Israeli Supreme Court | structured proportionality, not generic balancing |

## Important figures that should not automatically become middle labels

### Blackstone
Blackstone is canonically important, but the current quiz does not isolate one "Blackstonian" package. He is best treated as lineage / possible champion for traditional natural-law + common-law + stability combinations.

### Kelsen
Kelsen is a central positivist architect, but the Pure Theory's distinctive normative hierarchy/basic-norm structure is not measured. Keep him in the canon, not as a default respondent label.

### Holmes
Holmes is a crucial precursor to Realism and a practicing Thayerian, but mature American Legal Realism is better represented by Llewellyn/Frank when the actual identity is Legal Realist.

### Scalia
Scalia is highly useful precisely because his signature crosses multiple LAWvalues axes: textualism, public-meaning originalism, rules, democratic anti-discretion, and separation formalism. That makes him a **great champion for a specific bundle and a bad universal champion for any one component**.

### Fiss / Chayes / Bray
These are exceptionally useful remedial champions, but Remedies is usually best expressed in the front modifier or trailing phrase. A respondent can be a Textualist, Originalist, Pragmatist, etc. **with Fiss-like remedies**. Do not invent a fake middle school merely to make Remedies occupy the middle slot.

## Champion matching rule

A future classifier should assign each champion:
- eligible middle identities,
- positive signature traits,
- anti-traits,
- role: primary / subtype / historical / institutional.

After the middle identity is selected:

`champion_fit = matched_signature_information - contradicted_signature_information`

The actual implementation should weight **respondent trait importance**, not count tags equally.

Then:
- require at least two distinctive matched traits for a personal champion;
- do not select a champion whose anti-traits are among the respondent's strongest traits;
- if the top two champions are close, show both as intellectual relatives or show no single champion;
- institutional champions are allowed when they are more accurate than a person.

## Why the catalog is deliberately not exhaustive

LAWvalues is not trying to classify every real legal movement. A school belongs only if it helps explain the current instrument.

Intentionally out of scope unless the project broadens:
- Critical Legal Studies
- Law & Economics as a separate identity
- feminist jurisprudence
- Critical Race Theory
- republican/anti-domination theory

They are real and important. They simply ask different questions from the present instrument.

## Important gap discovered by the audit: Intentionalism

The earlier catalog overemphasized Originalism while omitting a major statutory-interpretation theory: **Intentionalism**. Mainstream legal-interpretation surveys treat textualism, intentionalism, purposivism, and originalism as leading theories.

LAWvalues currently has evidence relevant to intent, but not enough to cleanly distinguish:
- "follow what the lawmakers actually intended"
from
- "identify an objective statutory purpose and carry it out."

The adaptive diagnostic bank therefore includes an Intentionalist/Purposivist tie-breaker.

## Realism's special status

Realism is the only presently approved identity that intentionally sits **outside** the eight axes.

Why:
- It is substantially descriptive: how much doctrine actually determines hard cases.
- A respondent can normatively favor Rules or Balancing, Originalism or Living Constitutionalism, Narrow or Systemic Remedies, and still be a Realist about actual judicial behavior.
- Therefore no extreme axis result reliably unlocks Realism.

The design is:
1. one soft Realism probe for everyone;
2. if the respondent agrees, two stronger probes;
3. only a strong pattern permits **Legal Realist** to override the normal middle identity;
4. the front modifier and trailing phrase still carry the respondent's normative commitments.

That allows results such as a rule-oriented Legal Realist or a rights-protective Legal Realist without pretending Realism settles those questions.
