/* 48-item LAWvalues bank. key: +1 scores toward the first pole; -1 toward the second. */
globalThis.LAW_QUESTIONS = Object.freeze([
  {
    "id": "S1",
    "axis": "sorc",
    "key": 1,
    "prompt": "A rule may be legally valid even when it is gravely unjust; injustice is a reason to condemn, change, or disobey it, not proof that it was never law.",
    "sourceIds": ["hart1958"]
  },
  {
    "id": "S2",
    "axis": "sorc",
    "key": -1,
    "prompt": "Courts may properly enforce an unwritten legal principle—such as no one may profit from their own wrong—even when enacted law and precedent do not expressly supply it.",
    "sourceIds": ["dworkin1967"]
  },
  {
    "id": "S3",
    "axis": "sorc",
    "key": 1,
    "prompt": "Suppose officials faithfully enforced a wicked statute that was valid under the system then in force. Punishing them later should require a candidly retroactive law rather than pretending the statute was never law.",
    "sourceIds": ["hart1958", "fuller1958"]
  },
  {
    "id": "S4",
    "axis": "sorc",
    "key": -1,
    "prompt": "A statute that reaches an intolerable level of injustice and deliberately repudiates equality should be denied legal validity, even if it was enacted through the accepted procedures.",
    "sourceIds": ["radbruch2006"]
  },
  {
    "id": "S5",
    "axis": "sorc",
    "key": 1,
    "prompt": "Whether a norm counts as law depends ultimately on social facts—such as enactment, precedent, and accepted official practice—not on whether its content is morally sound.",
    "sourceIds": ["hart1958"]
  },
  {
    "id": "S6",
    "axis": "sorc",
    "key": -1,
    "prompt": "Some moral principles are part of the law because legal reasoning itself requires them, not merely because a legislature or court previously adopted them.",
    "sourceIds": ["dworkin1967"]
  },
  {
    "id": "C1",
    "axis": "cons",
    "key": 1,
    "prompt": "When statutory words clearly cover a case, judges should apply them even if the enacting legislators probably did not anticipate or desire that result.",
    "sourceIds": ["manning2005", "bostock2020"]
  },
  {
    "id": "C2",
    "axis": "cons",
    "key": -1,
    "prompt": "A city ordinance says, “No vehicles in the park.” A restored military truck placed permanently as a war memorial should be treated as outside the ordinance because it creates none of the traffic risks the rule was meant to prevent.",
    "sourceIds": ["hart1958", "fuller1958"]
  },
  {
    "id": "C3",
    "axis": "cons",
    "key": 1,
    "prompt": "Committee reports and sponsor speeches should not change the result when the enacted statutory text has a clear ordinary meaning.",
    "sourceIds": ["manning2005"]
  },
  {
    "id": "C4",
    "axis": "cons",
    "key": -1,
    "prompt": "A nineteenth-century ban on importing foreign labor should not cover a church hiring a foreign pastor when the evident target of the statute was low-wage manual labor.",
    "sourceIds": ["holytrinity1892"]
  },
  {
    "id": "C5",
    "axis": "cons",
    "key": 1,
    "prompt": "When a statute leaves an apparent loophole, courts should normally apply the enacted boundary and leave closure of the loophole to the legislature.",
    "sourceIds": ["manning2005"]
  },
  {
    "id": "C6",
    "axis": "cons",
    "key": -1,
    "prompt": "A park rule says, “No dogs.” A tame wolf posing the same safety and sanitation concerns should be excluded even though a wolf is not literally a dog.",
    "sourceIds": ["hart1958", "eskridge1987"]
  },
  {
    "id": "T1",
    "axis": "time",
    "key": 1,
    "prompt": "A constitutional provision's linguistic meaning is fixed when it is adopted, although that fixed meaning may apply to technologies and facts the adopters never imagined.",
    "sourceIds": ["solum2010", "balkin2009"]
  },
  {
    "id": "T2",
    "axis": "time",
    "key": -1,
    "prompt": "Whether a punishment is “cruel” should be judged substantially by contemporary standards rather than by the practices accepted when the constitutional text was adopted.",
    "sourceIds": ["strauss1996"]
  },
  {
    "id": "T3",
    "axis": "time",
    "key": 1,
    "prompt": "Practices widely accepted close to a constitutional provision's ratification should strongly constrain later judges, even when modern opinion has shifted.",
    "sourceIds": ["solum2010"]
  },
  {
    "id": "T4",
    "axis": "time",
    "key": -1,
    "prompt": "An equality guarantee may forbid a modern classification even if most people at the time of adoption would have accepted that classification.",
    "sourceIds": ["balkin2009", "strauss1996"]
  },
  {
    "id": "T5",
    "axis": "time",
    "key": 1,
    "prompt": "When longstanding historical practice conflicts with a recent social consensus, the historical practice should ordinarily receive greater interpretive weight.",
    "sourceIds": ["solum2010"]
  },
  {
    "id": "T6",
    "axis": "time",
    "key": -1,
    "prompt": "Constitutional doctrine may legitimately evolve through precedent and accumulated experience without a formal amendment changing the text.",
    "sourceIds": ["strauss1996"]
  },
  {
    "id": "P1",
    "axis": "prec",
    "key": 1,
    "prompt": "A precedent that is probably wrong but workable should ordinarily remain in force unless there is a special justification beyond the original error.",
    "sourceIds": ["kozel2010", "kimble2015"]
  },
  {
    "id": "P2",
    "axis": "prec",
    "key": -1,
    "prompt": "An egregiously wrong constitutional precedent should be overruled even when it is old and some people have relied on it.",
    "sourceIds": ["kozel2010"]
  },
  {
    "id": "P3",
    "axis": "prec",
    "key": 1,
    "prompt": "When a precedent has generated settled contracts, institutions, or life plans, those reliance interests can outweigh confidence that the precedent was wrongly decided.",
    "sourceIds": ["kozel2010"]
  },
  {
    "id": "P4",
    "axis": "prec",
    "key": -1,
    "prompt": "A precedent that has become unworkable and survives only through proliferating exceptions should be overruled rather than patched again.",
    "sourceIds": ["kozel2010"]
  },
  {
    "id": "P5",
    "axis": "prec",
    "key": 1,
    "prompt": "Precedents interpreting statutes deserve especially strong protection because the legislature can amend the statute if the court got it wrong.",
    "sourceIds": ["kimble2015"]
  },
  {
    "id": "P6",
    "axis": "prec",
    "key": -1,
    "prompt": "A mistaken precedent that distorts neighboring doctrines should be overruled to restore coherence, even if the precedent itself can still be administered.",
    "sourceIds": ["kozel2010"]
  },
  {
    "id": "R1",
    "axis": "remed",
    "key": 1,
    "prompt": "An injunction should ordinarily restrict the defendant only as much as necessary to protect the plaintiffs who brought the case, not everyone who might be affected.",
    "sourceIds": ["bray2017"]
  },
  {
    "id": "R2",
    "axis": "remed",
    "key": -1,
    "prompt": "When a government policy is unlawful everywhere and narrower relief would leave the same violation in place for others, a court may properly block the policy systemwide.",
    "sourceIds": ["fiss1979", "bray2017"]
  },
  {
    "id": "R3",
    "axis": "remed",
    "key": 1,
    "prompt": "When one provision of a statute is invalid, courts should preserve the rest whenever the remaining provisions can operate independently.",
    "sourceIds": ["levinson1999"]
  },
  {
    "id": "R4",
    "axis": "remed",
    "key": -1,
    "prompt": "Ongoing judicial supervision of a prison, school, or agency is justified when a one-time order cannot end a persistent pattern of violations.",
    "sourceIds": ["fiss1979"]
  },
  {
    "id": "R5",
    "axis": "remed",
    "key": 1,
    "prompt": "If a law has both lawful and unlawful applications, courts should usually grant relief for the unlawful application rather than invalidate the law on its face.",
    "sourceIds": ["levinson1999"]
  },
  {
    "id": "R6",
    "axis": "remed",
    "key": -1,
    "prompt": "When violations arise from an institution's structure rather than isolated decisions, the remedy should require structural change rather than wait for individual lawsuits one by one.",
    "sourceIds": ["fiss1979"]
  },
  {
    "id": "O1",
    "axis": "post",
    "key": 1,
    "prompt": "Courts should invalidate a democratically enacted law only when its constitutional error is clear, not merely because judges think the contrary reading is somewhat better.",
    "sourceIds": ["thayer1893", "waldron2006"]
  },
  {
    "id": "O2",
    "axis": "post",
    "key": -1,
    "prompt": "When a fundamental right is unpopular, courts should not presume that the political majority is more entitled than judges to define the right's limits.",
    "sourceIds": ["ely1980"]
  },
  {
    "id": "O3",
    "axis": "post",
    "key": 1,
    "prompt": "When the Constitution genuinely permits more than one reasonable answer, the benefit of the doubt should go to politically accountable elected branches.",
    "sourceIds": ["waldron2006"]
  },
  {
    "id": "O4",
    "axis": "post",
    "key": -1,
    "prompt": "Courts should review laws especially closely when they burden groups that are excluded from, or systematically disadvantaged in, the ordinary political process.",
    "sourceIds": ["carolene1938", "ely1980"]
  },
  {
    "id": "O5",
    "axis": "post",
    "key": 1,
    "prompt": "A severe policy mistake or inequity is normally a matter for elections and legislation unless it also violates a reasonably clear legal limit.",
    "sourceIds": ["thayer1893", "waldron2006"]
  },
  {
    "id": "O6",
    "axis": "post",
    "key": -1,
    "prompt": "When government plausibly burdens a fundamental right, government should bear the burden of supplying a compelling legal justification rather than the citizen bearing the burden of disproving one.",
    "sourceIds": ["ely1980"]
  },
  {
    "id": "E1",
    "axis": "separ",
    "key": 1,
    "prompt": "Congress may not reserve a one-house veto over executive action, even when that shortcut would make oversight more efficient; legislation must pass both houses and be presented to the President.",
    "sourceIds": ["chadha1983", "strauss1987"]
  },
  {
    "id": "E2",
    "axis": "separ",
    "key": -1,
    "prompt": "Some overlap among the branches is constitutional so long as no branch aggrandizes itself or prevents another branch from performing its core functions.",
    "sourceIds": ["strauss1987"]
  },
  {
    "id": "E3",
    "axis": "separ",
    "key": 1,
    "prompt": "Congress should not transfer basic policy choices to an executive agency merely because the agency has greater expertise and can act more quickly.",
    "sourceIds": ["strauss1987"]
  },
  {
    "id": "E4",
    "axis": "separ",
    "key": -1,
    "prompt": "Congress may protect an independent prosecutor from at-will presidential removal if the President retains enough authority to ensure faithful execution of the law.",
    "sourceIds": ["morrison1988", "strauss1987"]
  },
  {
    "id": "E5",
    "axis": "separ",
    "key": 1,
    "prompt": "Congress may not retain removal power over an officer who executes federal law, even if congressional removal would provide an additional check against executive abuse.",
    "sourceIds": ["bowsher1986", "strauss1987"]
  },
  {
    "id": "E6",
    "axis": "separ",
    "key": -1,
    "prompt": "An agency may combine rulemaking, enforcement, and adjudication when statutory limits, judicial review, and political oversight preserve practical accountability.",
    "sourceIds": ["strauss1987"]
  },
  {
    "id": "F1",
    "axis": "form",
    "key": 1,
    "prompt": "A clear rule should sometimes control a poorly fitting edge case because predictable boundaries constrain officials better than case-by-case judgment.",
    "sourceIds": ["schauer1988", "sullivan1992"]
  },
  {
    "id": "F2",
    "axis": "form",
    "key": -1,
    "prompt": "Where relevant facts vary greatly, a totality-of-the-circumstances standard is usually better than a categorical rule that will predictably misclassify some cases.",
    "sourceIds": ["sullivan1992"]
  },
  {
    "id": "F3",
    "axis": "form",
    "key": 1,
    "prompt": "A fixed warning requirement, like the familiar police warnings before custodial interrogation, is preferable to asking in every case whether a confession was sufficiently voluntary.",
    "sourceIds": ["schauer1988", "sullivan1992"]
  },
  {
    "id": "F4",
    "axis": "form",
    "key": -1,
    "prompt": "A court should be able to excuse a missed filing deadline when unforeseeable circumstances make strict enforcement seriously unfair.",
    "sourceIds": ["sullivan1992"]
  },
  {
    "id": "F5",
    "axis": "form",
    "key": 1,
    "prompt": "When law must guide officials before they act, an overinclusive categorical rule is often better than a more accurate standard whose application is uncertain until later.",
    "sourceIds": ["schauer1988"]
  },
  {
    "id": "F6",
    "axis": "form",
    "key": -1,
    "prompt": "Courts reviewing a burden on liberty should openly weigh its severity, the government's objective, the fit, and available alternatives rather than rely mainly on categorical labels.",
    "sourceIds": ["sullivan1992"]
  }
]);
