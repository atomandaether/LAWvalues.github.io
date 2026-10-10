/* 64-item LAWvalues bank. key: +1 scores toward the first pole; -1 toward the second. */
globalThis.LAW_QUESTIONS = Object.freeze([
  {
    "id": "S1",
    "axis": "sorc",
    "key": 1,
    "prompt": "A government passes a cruel law through every required step. A later court may condemn it and refuse to repeat it, but should still say it was legally valid while it remained in force.",
    "sourceIds": ["hart1958"]
  },
  {
    "id": "S2",
    "axis": "sorc",
    "key": -1,
    "prompt": "A man named in a will murders the person who made it so he can inherit sooner. Even though no inheritance law covers this situation, the court should treat “no one may profit from their own wrongdoing” as part of the law and deny him the money.",
    "sourceIds": ["dworkin1967", "riggs1889"]
  },
  {
    "id": "S3",
    "axis": "sorc",
    "key": 1,
    "prompt": "After a dictatorship falls, a woman is prosecuted for reporting her husband under one of the dictatorship’s wicked laws. If the old rule was valid under that system, the new state should admit it is punishing past conduct under a new law rather than claim the old rule was never law.",
    "sourceIds": ["hart1958", "fuller1958"]
  },
  {
    "id": "S4",
    "axis": "sorc",
    "key": -1,
    "prompt": "A statute is enacted through every required procedure but deliberately strips one racial group of all legal protection. Its injustice is so extreme that a court should refuse to recognize it as law at all.",
    "sourceIds": ["radbruch2006"]
  },
  {
    "id": "S5",
    "axis": "sorc",
    "key": 1,
    "prompt": "A constitution expressly says that every law must respect human dignity. A judge may use moral judgment when applying that clause because the constitution made dignity a legal test, not because morality automatically overrides laws passed by government.",
    "sourceIds": ["hart1994"]
  },
  {
    "id": "S6",
    "axis": "sorc",
    "key": -1,
    "prompt": "Two readings of a law fit its words and past cases equally well. The judge should choose the reading that best supports the legal system’s promises of fairness and equal treatment, because those principles are themselves part of the law.",
    "sourceIds": ["dworkin1967"]
  },
  {
    "id": "S7",
    "axis": "sorc",
    "key": 1,
    "prompt": "A constitution says amendments need two-thirds support but does not say how to count members who are present and do not vote. For generations, courts and officials have consistently used the same counting rule. That accepted official practice can make the rule legally binding even if it has no moral advantage.",
    "sourceIds": ["hart1994"]
  },
  {
    "id": "S8",
    "axis": "sorc",
    "key": -1,
    "prompt": "A government keeps its criminal rules secret, changes them after people act, and punishes conduct that no one could have known was forbidden. Those commands are too lawless to deserve recognition as law.",
    "sourceIds": ["fuller1964"]
  },
  {
    "id": "C1",
    "axis": "cons",
    "key": 1,
    "prompt": "In 1964 Congress banned workplace discrimination “because of sex.” Firing a man for dating men while allowing a woman to date men treats him differently because he is male, so the ban applies even if most lawmakers in 1964 did not expect that result.",
    "sourceIds": ["bostock2020", "manning2005"]
  },
  {
    "id": "C2",
    "axis": "cons",
    "key": -1,
    "prompt": "A city rule says “No vehicles in the park.” A restored army truck is bolted to a platform as a war memorial. Because it creates none of the traffic, noise, or safety problems behind the rule, the truck should be allowed.",
    "sourceIds": ["hart1958", "fuller1958"]
  },
  {
    "id": "C3",
    "axis": "cons",
    "key": 1,
    "prompt": "A bill’s final words clearly allow a tax deduction. A committee report says the committee hoped to deny that deduction in cases like this one. The court should follow the enacted words rather than the report.",
    "sourceIds": ["manning2005"]
  },
  {
    "id": "C4",
    "axis": "cons",
    "key": -1,
    "prompt": "A law written to stop companies from importing cheap labor also literally covers a church hiring a foreign pastor. Because the law’s evident target was labor exploitation, the pastor should fall outside it.",
    "sourceIds": ["holytrinity1892", "eskridge1987"]
  },
  {
    "id": "C5",
    "axis": "cons",
    "key": 1,
    "prompt": "An endangered-species law says federal agencies must not take actions that would destroy a protected species. A nearly finished dam threatens a tiny fish. The court should stop the dam even though Congress probably did not imagine sacrificing such an expensive project for one fish.",
    "sourceIds": ["tva1978", "manning2005"]
  },
  {
    "id": "C6",
    "axis": "cons",
    "key": -1,
    "prompt": "A park rule says “No dogs.” A tame wolf poses the same danger and sanitation problems as a dog, while a trained guide dog does not. The rule should cover the wolf but make room for the guide dog, because the reason for the rule matters more than the animal’s label.",
    "sourceIds": ["hart1958", "fuller1958"]
  },
  {
    "id": "C7",
    "axis": "cons",
    "key": 1,
    "prompt": "A benefits law lists four groups that qualify. A fifth group seems equally deserving, but lawmakers left it out after bargaining over the bill. A court should apply the list rather than add the missing group.",
    "sourceIds": ["manning2005"]
  },
  {
    "id": "C8",
    "axis": "cons",
    "key": -1,
    "prompt": "A law says that anyone who “draws blood in the street” commits a serious crime. A surgeon opens an injured person’s vein in the street to save their life. The law should not apply because it was aimed at violence, not emergency treatment.",
    "sourceIds": ["manning2003"]
  },
  {
    "id": "T1",
    "axis": "time",
    "key": 1,
    "prompt": "A constitutional protection for people’s “papers and belongings” was written before phones existed. Its original principle against government rummaging through private information should still protect the contents of a smartphone, even though the technology is new.",
    "sourceIds": ["solum2010", "balkin2009"]
  },
  {
    "id": "T2",
    "axis": "time",
    "key": -1,
    "prompt": "A punishment accepted two hundred years ago may still be unconstitutional today if modern society has come to regard it as cruel.",
    "sourceIds": ["trop1958", "strauss1996"]
  },
  {
    "id": "T3",
    "axis": "time",
    "key": 1,
    "prompt": "A civil-rights law passed just after the Civil War should be read with the strong equality-protecting force its words and historical setting carried then, even when that reading is more protective than today’s politics would prefer.",
    "sourceIds": ["solum2010", "balkin2009"]
  },
  {
    "id": "T4",
    "axis": "time",
    "key": -1,
    "prompt": "A constitutional promise of equal treatment may forbid a kind of discrimination that most people accepted when the promise was adopted, because later generations learned more about why the practice is unequal.",
    "sourceIds": ["strauss1996", "balkin2009"]
  },
  {
    "id": "T5",
    "axis": "time",
    "key": 1,
    "prompt": "If a law passed in 1972 used a word with an ordinary meaning that most readers gave it at the time, a later change in everyday usage should not silently change the law; lawmakers can amend it if they want a new meaning.",
    "sourceIds": ["manning2005", "eskridge1987"]
  },
  {
    "id": "T6",
    "axis": "time",
    "key": -1,
    "prompt": "A broad constitutional guarantee can legitimately develop through decades of court decisions and practical experience even when no formal amendment changes the text.",
    "sourceIds": ["strauss1996"]
  },
  {
    "id": "T7",
    "axis": "time",
    "key": 1,
    "prompt": "When the Constitution’s wording is unclear, a practice followed openly by the government from the earliest years should carry more weight than a recent shift in public opinion.",
    "sourceIds": ["solum2010"]
  },
  {
    "id": "T8",
    "axis": "time",
    "key": -1,
    "prompt": "A broad word such as “liberty” should take much of its content from the lives and understandings of people now, not only from the specific freedoms recognized when the word entered the Constitution.",
    "sourceIds": ["strauss1996", "balkin2009"]
  },
  {
    "id": "P1",
    "axis": "prec",
    "key": 1,
    "prompt": "Twenty years ago, a court chose one of two reasonable readings of a zoning law. The rule works reasonably well. Even if today’s judges would have chosen the other reading, they should keep the old one unless there is more than ordinary disagreement.",
    "sourceIds": ["kozel2010"]
  },
  {
    "id": "P2",
    "axis": "prec",
    "key": -1,
    "prompt": "An old ruling allows government officials to punish peaceful criticism of them. If the ruling was seriously wrong from the start, its age alone should not save it.",
    "sourceIds": ["kozel2010"]
  },
  {
    "id": "P3",
    "axis": "prec",
    "key": 1,
    "prompt": "Businesses and families have arranged thousands of contracts around a court’s long-standing property rule. The judges now think the rule was mistaken, but the damage from upsetting those plans can justify keeping it.",
    "sourceIds": ["kozel2010"]
  },
  {
    "id": "P4",
    "axis": "prec",
    "key": -1,
    "prompt": "An earlier ruling now survives through a maze of exceptions that lower courts apply differently. Replacing it with a clearer rule is better than adding another exception.",
    "sourceIds": ["kozel2010"]
  },
  {
    "id": "P5",
    "axis": "prec",
    "key": 1,
    "prompt": "A court interpreted an employment law decades ago, and lawmakers have repeatedly revised nearby parts of the law without changing that interpretation. The court should be especially reluctant to reverse itself because lawmakers can correct it.",
    "sourceIds": ["kimble2015", "kozel2010"]
  },
  {
    "id": "P6",
    "axis": "prec",
    "key": -1,
    "prompt": "One mistaken ruling forces courts to twist several neighboring rules to avoid absurd results. Even if the ruling can still be applied on its own, making the surrounding law fit together again may justify replacing it.",
    "sourceIds": ["kozel2010"]
  },
  {
    "id": "P7",
    "axis": "prec",
    "key": -1,
    "prompt": "A sharply divided ruling is only three years old, few people have arranged their affairs around it, and later cases have rejected its reasoning. A new court need not preserve it merely because it came first.",
    "sourceIds": ["kozel2010"]
  },
  {
    "id": "P8",
    "axis": "prec",
    "key": 1,
    "prompt": "Several generations of judges with very different views have repeatedly examined and kept the same rule. That history gives the rule added weight even if current judges remain doubtful.",
    "sourceIds": ["kozel2010"]
  },
  {
    "id": "R1",
    "axis": "remed",
    "key": 1,
    "prompt": "Five businesses prove that a federal rule was unlawfully applied to them. The court should normally protect those five businesses rather than block the rule for every business in the country.",
    "sourceIds": ["bray2017"]
  },
  {
    "id": "R2",
    "axis": "remed",
    "key": -1,
    "prompt": "A federal policy is unlawful in exactly the same way everywhere, and protecting only the people who brought the case would leave thousands subject to the same illegal policy. A court may properly stop the policy across the country.",
    "sourceIds": ["fiss1979", "bray2017"]
  },
  {
    "id": "R3",
    "axis": "remed",
    "key": 1,
    "prompt": "One sentence in a large law violates the Constitution, but the rest works independently and lawmakers plainly wanted the other parts. The court should remove the bad sentence and leave the rest in force.",
    "sourceIds": ["ayotte2006", "levinson1999"]
  },
  {
    "id": "R4",
    "axis": "remed",
    "key": -1,
    "prompt": "A school district has repeatedly evaded orders to end unlawful segregation. A judge may set deadlines, require regular reports, and supervise a detailed plan until the district actually complies.",
    "sourceIds": ["brownII1955", "swann1971", "fiss1979"]
  },
  {
    "id": "R5",
    "axis": "remed",
    "key": 1,
    "prompt": "A licensing law is valid in most situations but would violate one journalist’s rights in this case. The court should protect the journalist without striking down the whole licensing law.",
    "sourceIds": ["levinson1999"]
  },
  {
    "id": "R6",
    "axis": "remed",
    "key": -1,
    "prompt": "Overcrowding throughout a prison system causes ongoing unconstitutional medical neglect. A court may require a system-wide population and treatment plan rather than wait for prisoners to sue one at a time.",
    "sourceIds": ["plata2011", "fiss1979"]
  },
  {
    "id": "R7",
    "axis": "remed",
    "key": -1,
    "prompt": "Evidence shows that illegal stops result from a police department’s training and supervision, not a few isolated officers. A court may order department-wide changes and regular public reporting.",
    "sourceIds": ["fiss1979"]
  },
  {
    "id": "R8",
    "axis": "remed",
    "key": 1,
    "prompt": "An election problem affected ballot counting in one county, while the rules worked lawfully elsewhere. The court should correct that county’s count rather than rewrite the rules for the whole state.",
    "sourceIds": ["levinson1999"]
  },
  {
    "id": "O1",
    "axis": "post",
    "key": 1,
    "prompt": "A law was passed by elected representatives, and the Constitution can reasonably be read to permit it. A court should uphold the law unless the constitutional violation is clear, even if judges think the opposite reading is somewhat better.",
    "sourceIds": ["thayer1893", "waldron2006"]
  },
  {
    "id": "O2",
    "axis": "post",
    "key": -1,
    "prompt": "A small, unpopular religious group is ordered to salute a national symbol against its beliefs. Courts should enforce the group’s constitutional rights even if nearly every voter supports the requirement.",
    "sourceIds": ["barnette1943", "ely1980"]
  },
  {
    "id": "O3",
    "axis": "post",
    "key": 1,
    "prompt": "A city adopts a housing policy, and both sides offer reasonable constitutional readings. If the text and history do not settle the issue, the elected city council should get the benefit of the doubt.",
    "sourceIds": ["thayer1893", "waldron2006"]
  },
  {
    "id": "O4",
    "axis": "post",
    "key": -1,
    "prompt": "Courts should look especially closely at a law that burdens a small group that is routinely shut out of voting or political bargaining.",
    "sourceIds": ["carolene1938", "ely1980"]
  },
  {
    "id": "O5",
    "axis": "post",
    "key": 1,
    "prompt": "A tax law is clumsy and unfair to some families but violates no reasonably clear constitutional rule. The remedy should come from elections and legislation, not judges.",
    "sourceIds": ["thayer1893", "waldron2006"]
  },
  {
    "id": "O6",
    "axis": "post",
    "key": -1,
    "prompt": "A city takes a person’s home for a claimed public purpose. Courts should require the city to prove a strong legal justification rather than presume the taking is acceptable.",
    "sourceIds": ["kelo2005"]
  },
  {
    "id": "O7",
    "axis": "post",
    "key": -1,
    "prompt": "A popular law bans all signs criticizing the government near public buildings. Courts should closely test the law rather than defer merely because voters strongly support it.",
    "sourceIds": ["barnette1943", "ely1980"]
  },
  {
    "id": "O8",
    "axis": "post",
    "key": 1,
    "prompt": "Lawmakers set complex utility rates after hearings and expert study. Unless the rates cross a clear constitutional line, judges should not replace the elected government’s judgment with their own.",
    "sourceIds": ["thayer1893", "waldron2006"]
  },
  {
    "id": "E1",
    "axis": "separ",
    "key": 1,
    "prompt": "Congress lets one chamber cancel an agency decision without approval from the other chamber or the President. Even if the shortcut improves oversight, it should fail because making law requires both chambers and the President.",
    "sourceIds": ["chadha1983", "strauss1987"]
  },
  {
    "id": "E2",
    "axis": "separ",
    "key": -1,
    "prompt": "Congress creates a board of judges and executive officials to manage courthouse security. The arrangement can be constitutional if no branch takes over another’s central work and clear lines of accountability remain.",
    "sourceIds": ["strauss1987"]
  },
  {
    "id": "E3",
    "axis": "separ",
    "key": 1,
    "prompt": "Congress tells an agency to decide whether an entire industry may operate, but gives it no real rule for how to decide beyond “serve the public interest.” Expertise and speed do not justify handing the agency that basic choice.",
    "sourceIds": ["strauss1987"]
  },
  {
    "id": "E4",
    "axis": "separ",
    "key": -1,
    "prompt": "Congress creates an investigator for high officials who can be fired by the President only for misconduct or neglect. The arrangement can be constitutional if the President still has enough control to ensure the laws are carried out.",
    "sourceIds": ["morrison1988", "strauss1987"]
  },
  {
    "id": "E5",
    "axis": "separ",
    "key": 1,
    "prompt": "Congress gives its own budget officer power to order spending cuts and keeps the power to fire that officer. Because carrying out the law is not Congress’s job, that arrangement should be unconstitutional.",
    "sourceIds": ["bowsher1986", "strauss1987"]
  },
  {
    "id": "E6",
    "axis": "separ",
    "key": -1,
    "prompt": "An agency writes safety rules, brings charges, and decides the first appeal. That combination can be acceptable when different staff handle each role and courts can review the final decision.",
    "sourceIds": ["strauss1987"]
  },
  {
    "id": "E7",
    "axis": "separ",
    "key": 1,
    "prompt": "Congress refuses to fund a program, but the President moves money from another account to run it anyway. A claimed need for quick action should not let the executive bypass Congress’s control of spending.",
    "sourceIds": ["youngstown1952", "strauss1987"]
  },
  {
    "id": "E8",
    "axis": "separ",
    "key": -1,
    "prompt": "Congress creates a commission of judges and experts to write detailed rules for prison sentences within goals set by statute. Sharing that task can be constitutional when Congress sets the boundaries and courts remain independent.",
    "sourceIds": ["mistretta1989", "strauss1987"]
  },
  {
    "id": "F1",
    "axis": "form",
    "key": 1,
    "prompt": "A clear filing deadline should sometimes defeat a deserving claim because a fixed date gives everyone notice and prevents judges from making exceptions based on sympathy.",
    "sourceIds": ["schauer1988", "sullivan1992"]
  },
  {
    "id": "F2",
    "axis": "form",
    "key": -1,
    "prompt": "When deciding whether police pressure made a confession unreliable, judges should consider all the facts rather than apply one automatic rule based on a single fact.",
    "sourceIds": ["sullivan1992"]
  },
  {
    "id": "F3",
    "axis": "form",
    "key": 1,
    "prompt": "Police should have to give the same set of warnings before questioning a person who is not free to leave, rather than leaving each court to decide afterward whether the person understood their rights.",
    "sourceIds": ["miranda1966", "schauer1988", "sullivan1992"]
  },
  {
    "id": "F4",
    "axis": "form",
    "key": -1,
    "prompt": "A court should be able to excuse a missed filing deadline when a natural disaster made filing impossible and the person acted immediately afterward.",
    "sourceIds": ["sullivan1992"]
  },
  {
    "id": "F5",
    "axis": "form",
    "key": 1,
    "prompt": "A simple rule telling police exactly when they may search a car can be preferable to a more accurate test whose answer appears only after a judge weighs many factors.",
    "sourceIds": ["schauer1988", "sullivan1992"]
  },
  {
    "id": "F6",
    "axis": "form",
    "key": -1,
    "prompt": "When a law burdens a basic freedom, courts should compare the seriousness of the burden, the government’s goal, and whether another approach would limit the freedom less, rather than rely only on fixed categories.",
    "sourceIds": ["sullivan1992"]
  },
  {
    "id": "F7",
    "axis": "form",
    "key": 1,
    "prompt": "Some mature 17-year-olds are as capable as adults, but a fixed voting age is better than asking officials to judge each teenager’s maturity.",
    "sourceIds": ["schauer1988"]
  },
  {
    "id": "F8",
    "axis": "form",
    "key": -1,
    "prompt": "Whether force was lawful in self-defense should turn on what a reasonable person would have done in the full situation, not on a fixed rule about the number of seconds or steps before force is allowed.",
    "sourceIds": ["sullivan1992"]
  }
]);
