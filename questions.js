/* 93-item LAWvalues bank. key: +1 scores toward the first pole; -1 toward the second.
   scoreWeight: 0 records a diagnostic response without moving the headline axis score. */
globalThis.LAW_QUESTIONS = Object.freeze([
  {
    "id": "S1",
    "axis": "sorc",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "A government properly passes a cruel law through every required step and procedure. Decades later, a court may condemn it and refuse to repeat it, but it was nonetheless a legally valid law.",
    "sourceIds": [
      "hart1958"
    ]
  },
  {
    "id": "S2",
    "axis": "sorc",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "A statute properly enacted through every required step declares one racial group outside the protection of all courts. Nothing in the written laws could or should bar this. A court should treat the injustice as so extreme that the statute loses its claim to be law.",
    "sourceIds": [
      "radbruch2006",
      "dworkin1967"
    ]
  },
  {
    "id": "S3",
    "axis": "sorc",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "A licensing law gives every permitted reason for denying a license and contains no broader moral test. A judge who believes another reason is morally compelling should not treat that belief as an additional rule of law.",
    "sourceIds": [
      "hart1958"
    ]
  },
  {
    "id": "S4",
    "axis": "sorc",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "A legislature properly passes a harsh and foolish tax through every required step. A court should recognize that it is law.",
    "sourceIds": [
      "hart1958"
    ]
  },
  {
    "id": "S5",
    "axis": "sorc",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "Two officially signed copies of a law differ. The constitution does not say which one controls. For generations, every branch has treated the copy stored by the clerk as the final, authoritative copy. Do you agree that settled practice makes the clerk’s copy \"the law\"? In this specific case the other version would produce a fairer result.",
    "sourceIds": [
      "hart1994"
    ]
  },
  {
    "id": "S6",
    "axis": "sorc",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "Assume no constitution, statute, or past case requires compensation (i.e. no \"takings clause\" or \"just compensation\" for \"eminent domain\"). A city destroys several homes for a public project that benefits everyone. Do you agree the city’s action itself creates a legal duty to compensate the owners, despite no actual written law requiring it.",
    "sourceIds": [
      "hart1958",
      "dworkin1967"
    ]
  },
  {
    "id": "S7",
    "axis": "sorc",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "Sometimes the law \"runs out\" in novel cases, where there's no direct answer anywhere to lean on. In such a case, a judge is making new law and \"picking a winner.\" Meaning neither party was owed a legal right when they entered the room, and the judge has now created it, rather than discovered the correct answer.",
    "sourceIds": [
      "hart1958"
    ]
  },
  {
    "id": "S8",
    "axis": "sorc",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "The law never \"runs out\" in novel cases, where there's no direct answer written anywhere to lean on. This is because legal principles are themselves also part of the law. A judge choosing the most coherent and morally defensible option among reasonable interpretations is \"the correct answer,\" and it was there the whole time, because the principles are also the law.",
    "sourceIds": [
      "dworkin1967"
    ]
  },
  {
    "id": "S9",
    "axis": "sorc",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "Two large companies make a voluntary contract. Every constitution, statute, past decision, and accepted legal practice treats it as valid. Even so, a judge considers it to violate an objective moral rule that government has never recognized. The court should invalidate the contract.",
    "sourceIds": [
      "radbruch2006",
      "dworkin1967"
    ]
  },
  {
    "id": "S10",
    "axis": "sorc",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "Two large companies make a voluntary contract. Every constitution, statute, past decision, and accepted legal practice treats it as valid. Assume the contract nevertheless violates an objective moral rule—one that would be true even if no government recognized it. The court should treat that moral rule as part of the law and refuse to enforce the contract.",
    "sourceIds": [
      "radbruch2006",
      "dworkin1967"
    ]
  },
  {
    "id": "S11",
    "axis": "sorc",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "Two people sign a contract requiring one to publish a statement it knows is false in order to ruin a competitor. Assume every constitution, statute, past decision, and accepted legal practice treats the contract as valid. Nevertheless, the court should treat the moral rule that \"a deliberate harmful lie cannot create genuine obligations\" as part of the law and refuse to enforce the contract.",
    "sourceIds": [
      "radbruch2006",
      "dworkin1967"
    ]
  },
  {
    "id": "C1",
    "axis": "cons",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "A wage law says \"every person employed for wages\" must receive overtime pay. During debate, lawmakers discussed factory workers and repeatedly assumed farm workers were outside the bill, but the enacted law contains no farm-worker exception. A farm worker should receive overtime pay.",
    "sourceIds": [
      "manning2005"
    ]
  },
  {
    "id": "C2",
    "axis": "cons",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "A clean-water law’s stated purpose is to prevent river pollution, but it expressly exempts farms smaller than fifty acres. A forty-nine-acre farm causes exactly vastly disproportionate pollution the law was written to prevent. The court should enforce the exemption in favor of the farm.",
    "sourceIds": [
      "eskridge1987",
      "manning2005"
    ]
  },
  {
    "id": "C3",
    "axis": "cons",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "A surveillance law clearly authorizes police to collect a certain kind of record without a warrant. That reading raises a serious constitutional question. The court could either read the law narrowly and strangely to save it, or they could declare it unconstitutional. They should declare it unconstitutional by its reasonable reading.",
    "sourceIds": [
      "manning2005"
    ]
  },
  {
    "id": "C4",
    "axis": "cons",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "A gun-safety law clearly authorizes the federal government to ban and confiscate civilian possession of every firearm, including ordinary handguns kept at home for self-defense. That reading raises a serious Second Amendment question. The court could either read the law narrowly and strangely as banning only unusually dangerous weapons, or declare it unconstitutional. They should declare it unconstitutional by its reasonable reading.",
    "sourceIds": [
      "manning2005"
    ]
  },
  {
    "id": "C5",
    "axis": "cons",
    "key": 1,
    "scoreWeight": 0,
    "prompt": "A city ordinance says, \"No vehicles in the park.\" A restored Army truck (a vehicle) is permanently bolted to a platform as a war memorial (in the park). Everyone agrees the memorial doesn't count, but disagree why. The answer, of course, is clear: context shows vehicle is about transportation, and this is not functioning as a \"vehicle\" in that context at all.",
    "sourceIds": [
      "hart1958",
      "fuller1958"
    ]
  },
  {
    "id": "C6",
    "axis": "cons",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "A city ordinance says, \"No vehicles in the park.\" A restored Army truck (a vehicle) is permanently bolted to a platform as a war memorial (in the park). Everyone agrees the memorial doesn't count, but disagree why. The answer, of course, is clear: the purpose of the ordinance was to prevent traffic, noise, and danger, so the court should recognize an exception for the truck even though the enacted words literally cover it.",
    "sourceIds": [
      "hart1958",
      "fuller1958"
    ]
  },
  {
    "id": "C7",
    "axis": "cons",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "A tax law’s enacted words very clearly allow a deduction. Nonetheless, a committee report from the Senate written by the tax bill's sponsor very explicitly and directly says the committee intended to deny the deduction in cases like this one. The court should follow the enacted words rather than the report.",
    "sourceIds": [
      "manning2005"
    ]
  },
  {
    "id": "C8",
    "axis": "cons",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "A law intended to stop companies from importing cheap foreign manual labor was written so broadly that it also literally covers a university hiring a professor. Because the law’s target was labor exploitation, the professor should not be banned.",
    "sourceIds": [
      "holytrinity1892",
      "eskridge1987"
    ]
  },
  {
    "id": "C9",
    "axis": "cons",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "An endangered-species law says federal agencies may not take actions that would destroy a protected species. A nearly completed dam threatens one small regional variation of fish species. The court should stop the dam even though Congress probably never expected the law to sacrifice such an expensive project for such a weak case.",
    "sourceIds": [
      "tva1978",
      "manning2005"
    ]
  },
  {
    "id": "C10",
    "axis": "cons",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "A park rule says, \"No dogs.\" No other laws apply. A trained guide dog is quiet, under control, and creates none of the safety or sanitation problems the rule was adopted to prevent. The rule should not apply to the guide dog.",
    "sourceIds": [
      "hart1958",
      "fuller1958"
    ]
  },
  {
    "id": "C11",
    "axis": "cons",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "A benefits law names four groups that qualify. A fifth group seems equally deserving and equally fit to the context, but lawmakers left it out while bargaining over the bill. A court should apply the enacted list rather than add the fifth group.",
    "sourceIds": [
      "manning2005"
    ]
  },
  {
    "id": "C12",
    "axis": "cons",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "A park rule says, \"No dogs.\" A saber-tooth tiger is not a dog, but it creates the exact same safety and sanitation problems the rule was adopted to prevent. The rule should apply to the tiger.",
    "sourceIds": [
      "hart1958",
      "fuller1958"
    ]
  },
  {
    "id": "C13",
    "axis": "cons",
    "key": 1,
    "scoreWeight": 0,
    "prompt": "A tax provision applies to \"cars, trucks, motorcycles, and other vehicles.\" A boat fits one dictionary definition of \"vehicle,\" but every specific example in the list is a road vehicle. An administration uses it to tax luxury yachts. The tax provision should apply to boats.",
    "sourceIds": [
      "manning2005"
    ]
  },
  {
    "id": "C14",
    "axis": "cons",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "A law prohibits six specifically named kinds of financial contracts and contains no general catchall. A company creates a genuinely different contract that falls outside all six categories but produces the same economic result and was designed solely to evade the law. The court should prohibit the new contract anyway because excluding it would defeat the law’s purpose.",
    "sourceIds": [
      "eskridge1987",
      "manning2005"
    ]
  },
  {
    "id": "C15",
    "axis": "cons",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "First determine the statute's purpose; then interpret its words to carry that purpose out.",
    "sourceIds": [
      "eskridge1987",
      "manning2005"
    ]
  },
  {
    "id": "C16",
    "axis": "cons",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "We begin, as always, with the language of the statute.",
    "sourceIds": [
      "manning2005"
    ]
  },
  {
    "id": "C17",
    "axis": "cons",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "Different lawmakers may vote for the same bill for completely different reasons. The only thing both houses of Congress and the President necessarily agreed to is the text that became law. Courts should therefore treat that enacted text—not committee reports, floor speeches, or a judge’s reconstruction of Congress’s overall purpose—as the authoritative expression of what Congress decided.",
    "sourceIds": [
      "eskridge1987",
      "manning2005"
    ]
  },
  {
    "id": "C18",
    "axis": "cons",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "Congress wants to stop factories from dumping toxic chemicals into drinking-water sources, but the bill always fails to pass. Only after lawmakers add an exemption for companies with fewer than 50 employees does it pass. A 30-employee factory knowingly dumps 600% more dangerous chemical into a town’s water supply than anyone else, causing exactly the catastrophic harm the law was meant to prevent. The court should still enforce the exemption: Congress enacted the compromise that got the votes, not the broader purpose standing alone.",
    "sourceIds": [
      "eskridge1987",
      "manning2005"
    ]
  },
  {
    "id": "T1",
    "axis": "time",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "A law passed right after the American Civil War should be read with that strong, equality-securing sense they were understood to have when adopted, even if—especially if—times or views change.",
    "sourceIds": [
      "solum2010",
      "balkin2009"
    ]
  },
  {
    "id": "T2",
    "axis": "time",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "At the founding, the First Amendment was understood to permit Congress to use public money to employ chaplains and begin legislative sessions with official prayers. That understanding is correct even if—especially if—times or views change.",
    "sourceIds": [
      "solum2010",
      "balkin2009"
    ]
  },
  {
    "id": "T3",
    "axis": "time",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "Assume as a fact that six jurors can do the historical job of twelve jurors, as the U.S. Supreme Court has held for federal juries. During a pandemic where jurors and space are scarce, Pennsylvania wants to use ten jurors. Pennsylvania's state constitution guarantees their jury right shall remain \"as heretofore,\" which at enactment was twelve. Pennsylvania courts cannot use 10, they have to use 12.",
    "sourceIds": [
      "solum2010",
      "balkin2009"
    ]
  },
  {
    "id": "T4",
    "axis": "time",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "Assume that when a constitutional guarantee of \"liberty\" was adopted, its legal meaning clearly did not protect a particular personal freedom. If later generations come to understand that freedom as fundamental to personal liberty, courts may eventually recognize it as constitutionally protected without amending the text.",
    "sourceIds": [
      "strauss1996"
    ]
  },
  {
    "id": "T5",
    "axis": "time",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "Let's say Virginia requires every voter to pay a small fee before voting, only in state elections and only enough to cover voting infrastructure and services. Assume that when the Fourteenth Amendment was adopted, its legal guarantee of equal protection permitted a race-neutral poll tax. 100 years later, wealth has come to be regarded as irrelevant to a citizen’s right to vote. A court may now hold the poll tax unconstitutional under equal protection without a constitutional amendment. Virginia not just \"should not\" have a neutral poll tax, but it \"cannot\" have one.",
    "sourceIds": [
      "strauss1996"
    ]
  },
  {
    "id": "T6",
    "axis": "time",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "The Constitution expressly contemplates \"capital\" crimes and deprivation of \"life,\" and capital punishment (death penalty) was constitutionally permitted when the Bill of Rights was adopted. If Americans eventually come to regard execution itself as incompatible with human dignity, the Supreme Court may nonetheless override Congress and hold the death penalty unconstitutional without an amendment.",
    "sourceIds": [
      "trop1958",
      "strauss1996"
    ]
  },
  {
    "id": "T7",
    "axis": "time",
    "key": 1,
    "scoreWeight": 0,
    "prompt": "A state constitution adopted by popular vote says a governor may serve \"no more than two terms.\" Ordinary voters at the time understood that to mean two terms total. Years later, private convention notes are discovered showing that the drafters actually intended only to prohibit more than two consecutive terms. A governor who has already served two terms cannot run again. What the public ratified controls over the drafters’ uncommunicated intent.",
    "sourceIds": [
      "solum2010",
      "balkin2009"
    ]
  },
  {
    "id": "T8",
    "axis": "time",
    "key": 1,
    "scoreWeight": 0,
    "prompt": "Assume that in 1868 \"equal protection\" publicly expressed a general constitutional rule against arbitrary legal caste distinctions. Also assume that almost everyone in 1868 expected states would still be allowed to exclude women from certain professions. If faithfully applying the rule shows that such a sex restriction is arbitrary, a court should strike it down—and would be doing so without changing or adding to the Fourteenth Amendment's meaning.",
    "sourceIds": [
      "solum2010",
      "balkin2009"
    ]
  },
  {
    "id": "T9",
    "axis": "time",
    "key": -1,
    "scoreWeight": 0,
    "prompt": "A married woman has a child fathered by another man. The biological father wants constitutional protection for his relationship with the child. Assume there is a longstanding historical tradition specifically denying legal protection to biological fathers in that situation, but parent-child relationships more generally have long been treated as part of constitutional \"liberty.\" Courts should define \"liberty\" using the broader principle of protected parenthood rather than treating the historically specific exclusion as controlling.",
    "sourceIds": [
      "solum2010",
      "strauss1996"
    ]
  },
  {
    "id": "T10",
    "axis": "time",
    "key": 1,
    "scoreWeight": 0,
    "prompt": "Article IV says the federal government may protect states against \"domestic Violence.\" At the founding, \"domestic violence\" meant internal insurrection or violent civil disorder. Today the phrase ordinarily means abuse within a household. Suppose a state now faces an epidemic of intimate-partner violence and asks the President to send federal forces to help protect victims of spousal abuse. They cannot use Article IV just because that is what \"domestic violence\" means today.",
    "sourceIds": [
      "solum2010",
      "balkin2009"
    ]
  },
  {
    "id": "T11",
    "axis": "time",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "When the Constitution’s wording is unclear, a practice followed openly by the government from the earliest years should carry more weight than a recent shift in public opinion.",
    "sourceIds": [
      "solum2010",
      "balkin2009"
    ]
  },
  {
    "id": "T12",
    "axis": "time",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "A broad constitutional guarantee can legitimately develop through decades of court decisions and practical experience even when no formal amendment changes the text.",
    "sourceIds": [
      "strauss1996"
    ]
  },
  {
    "id": "P1",
    "axis": "prec",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "For eighty years, courts have used the same rule for determining property boundaries, and thousands of people have bought and sold land relying on it. Now, its clear that original decision was legally wrong. The Court should keep the old rule because changing it would unsettle deeply entrenched ownership across the country.",
    "sourceIds": [
      "kozel2010"
    ]
  },
  {
    "id": "P2",
    "axis": "prec",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "The Supreme Court interpreted a federal employment law forty years ago. Congress has amended nearby parts of the law several times without changing that interpretation. Even if today's Court thinks the old interpretation was wrong, it should leave the rule in place and let Congress change it.",
    "sourceIds": [
      "kimble2015",
      "kozel2010"
    ]
  },
  {
    "id": "P3",
    "axis": "prec",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "Precedent and accumulated practice are themselves major components of constitutional law, not merely defeasible mistakes sitting underneath the \"real\" Constitution.",
    "sourceIds": [
      "strauss1996",
      "kozel2010"
    ]
  },
  {
    "id": "P4",
    "axis": "prec",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "Even a clearly erroneous constitutional precedent can become too deeply embedded to overrule when institutions, private rights, and later law have been built around it.",
    "sourceIds": [
      "kozel2010"
    ]
  },
  {
    "id": "P5",
    "axis": "prec",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "Stare decisis (adherence to prior rulings) should act as a referee between competing visions of the Constitution: when judges reasonably disagree about first principles, the side seeking to overturn the existing rule should bear an extra burden.",
    "sourceIds": [
      "kozel2010"
    ]
  },
  {
    "id": "P6",
    "axis": "prec",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "A doctrine telling judges to follow a precedent they believe contradicts the Constitution corrupts whatever theory of constitutional interpretation they claim to follow; the Constitution should control over an inconsistent judicial decision.",
    "sourceIds": [
      "kozel2010"
    ]
  },
  {
    "id": "P7",
    "axis": "prec",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "Courts should use stare decisis to preserve a single, impersonal body of law across generations of judges, rather than allowing constitutional doctrine to track whichever interpretive philosophy happens to control the Court at a given moment.",
    "sourceIds": [
      "kozel2010"
    ]
  },
  {
    "id": "P8",
    "axis": "prec",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "A state constitution says that newspapers may be sued for false statements under the same rules as everyone else. Fifty years ago, the state supreme court nevertheless created a special rule out of nowhere protecting investigative journalism and political criticism from inclusion in that liability. The court should now abolish it because the constitution never authorized the special protection.",
    "sourceIds": [
      "kozel2010"
    ]
  },
  {
    "id": "P9",
    "axis": "prec",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "The Fifth Amendment forbids compelled self-incrimination, while Miranda warnings also exclude some completely voluntary statements that were not compelled at all. The Supreme Court has nevertheless treated those warnings as a constitutional issue, and thus Congress is not allowed to touch it despite the inconsistency. Even if everyone, everywhere thinks this judicial safeguard goes beyond the Fifth Amendment, the courts should still preserve Miranda warnings because it has become deeply embedded in American criminal justice.",
    "sourceIds": [
      "miranda1966",
      "kozel2010"
    ]
  },
  {
    "id": "P10",
    "axis": "prec",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "The Fourth Amendment forbids unreasonable searches, but it does not say that illegally obtained evidence must be thrown out at trial. The Supreme Court itself describes exclusion as a \"judicially created remedy,\" not a personal constitutional right, designed mainly to deter police misconduct. Even if excluding evidence is useful and has become a basic protection against illegal searches, courts should stop doing it if the Constitution itself does not require that remedy (Congress, of course, is free to pass a law fixing that).",
    "sourceIds": [
      "kozel2010"
    ]
  },
  {
    "id": "P11",
    "axis": "prec",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "The Constitution forbids federal officers from violating constitutional rights, but Congress never created a general law letting victims sue those officers for money damages. Congress has created damages remedies in other contexts when it wanted them, yet the Supreme Court created one here on its own—judicial activism by any other name. Without that judicially created remedy, some people whose constitutional rights are violated may have no damages remedy at all. Courts should stop allowing these lawsuits and leave creation of a damages remedy to Congress.",
    "sourceIds": [
      "kozel2010"
    ]
  },
  {
    "id": "P12",
    "axis": "prec",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "Fifty years ago, the Supreme Court interpreted a federal pension law to let retirement plans deny survivor benefits to certain widows, even though the better reading of the law would cover them. Thousands of elderly widows now lose the income they expected to live on, and some face poverty or losing their homes. But pension funds have spent fifty years setting contribution rates and promising benefits to millions of other retirees based on the old rule; overruling it would suddenly create enormous unfunded obligations and could force plans to cut other benefits or become insolvent. Congress has repeatedly amended the pension laws without changing the Court’s interpretation. The Court should keep the mistaken precedent and leave any correction to Congress.",
    "sourceIds": [
      "kimble2015",
      "kozel2010"
    ]
  },
  {
    "id": "R1",
    "axis": "remed",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "A federal agency adopts a nationwide rule requiring power plants to sharply reduce toxic air pollution. One power company convinces a single federal trial judge that the agency exceeded the authority Congress gave it. The judge should block the rule nationwide—not merely excuse that company from following it—even though no appeals court has yet reviewed the case, enabling pollution to continue.",
    "sourceIds": [
      "bray2017",
      "fiss1979"
    ]
  },
  {
    "id": "R2",
    "axis": "remed",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "A federal agency adopts a nationwide rule denying a certain group of workers overtime pay. One worker successfully proves that the rule violates federal law. The judge should block the rule for everyone affected, rather than give relief only to that worker and leave thousands of others to sue separately.",
    "sourceIds": [
      "bray2017",
      "fiss1979"
    ]
  },
  {
    "id": "R3",
    "axis": "remed",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "A prison is so overcrowded that sick prisoners routinely go untreated, and years of narrower court orders have failed. The only remedy that will actually fix the violation is reducing the prison population by thousands. A federal judge should order the state to release or transfer enough prisoners to make the prison constitutional, even though state law says those prisoners should still be incarcerated.",
    "sourceIds": [
      "plata2011",
      "fiss1979"
    ]
  },
  {
    "id": "R4",
    "axis": "remed",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "A police department repeatedly uses unconstitutional stops and searches. Earlier court orders simply telling officers to stop have failed. Unelected judges and court-appointed officials should effectively supervise major parts of the police department for years until its fixed.",
    "sourceIds": [
      "fiss1979",
      "levinson1999"
    ]
  },
  {
    "id": "R5",
    "axis": "remed",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "A state foster-care system leaves children in dangerous homes because each caseworker is responsible for far too many children. A court finds that the system violates the children’s state constitutional rights. The judge should be allowed to impose a maximum caseload even if complying would require the state to hire thousands of workers and redirect hundreds of millions of dollars that lawmakers had budgeted for other public programs.",
    "sourceIds": [
      "fiss1979",
      "levinson1999"
    ]
  },
  {
    "id": "R6",
    "axis": "remed",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "A state passes a sweeping election law that makes voting harder in several ways. One provision requiring voters to pay for a special ID is unconstitutional, but the rest of the law can operate without it. The court should strike only the unconstitutional ID-fee provision and leave the remaining restrictions in force, rather than invalidate the broader law.",
    "sourceIds": [
      "ayotte2006",
      "levinson1999"
    ]
  },
  {
    "id": "R7",
    "axis": "remed",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "A state passes a large worker-protection law. One section lets labor inspectors search workplaces without a warrant, which the state constitution forbids. The other wage, safety, and anti-retaliation protections work perfectly well without that section. The court should cut out only the unconstitutional search power and leave the rest of the law standing, rather than invalidate the whole package.",
    "sourceIds": [
      "ayotte2006",
      "levinson1999"
    ]
  },
  {
    "id": "R8",
    "axis": "remed",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "A city deliberately segregated its schools, and the effects cannot realistically be undone using only schools inside the city. Nearby suburban districts did not participate in the segregation, but including them in a regional attendance plan would make desegregation far more effective. A court should be allowed to require those suburban districts to participate even though they were not themselves found to have violated the Constitution.",
    "sourceIds": [
      "swann1971",
      "fiss1979"
    ]
  },
  {
    "id": "R9",
    "axis": "remed",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "A state repeatedly violates people’s gun rights by delaying lawful handgun permits for months without justification. Narrow court orders have failed because officials keep inventing new reasons for delay. The Constitution does not itself require permits to be issued within 30 days, but a judge should be allowed to impose a 30-day deadline anyway as a protective rule to make sure the constitutional violations actually stop.",
    "sourceIds": [
      "fiss1979",
      "levinson1999"
    ]
  },
  {
    "id": "R10",
    "axis": "remed",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "A state repeatedly violates people’s voting rights by leaving valid voter-registration applications unresolved until after elections. Narrow court orders have failed because officials keep inventing new administrative reasons for delay. The Constitution does not itself require registrations to be approved within 30 days, but a judge should be allowed to impose a 30-day deadline anyway as a protective rule to make sure the constitutional violations actually stop.",
    "sourceIds": [
      "fiss1979",
      "levinson1999"
    ]
  },
  {
    "id": "R11",
    "axis": "remed",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "A state law has several constitutionally doubtful provisions, but striking one specific provision would fully resolve the plaintiffs’ injury. The court should strike only that provision and leave the broader questions about the rest of the law for future cases.",
    "sourceIds": [
      "ayotte2006",
      "levinson1999"
    ]
  },
  {
    "id": "O1",
    "axis": "post",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "When the Constitution permits more than one reasonable interpretation, elected lawmakers are entitled to choose among them; judges should invalidate their choice only when it falls outside the range of reasonable constitutional judgment. The whole point is that judicial review is not ordinary error correction.",
    "sourceIds": [
      "thayer1893",
      "waldron2006"
    ]
  },
  {
    "id": "O2",
    "axis": "post",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "When democratic institutions are functioning and citizens sincerely disagree about what rights require, that disagreement should ordinarily be settled through representative politics rather than by giving unelected judges the final word.",
    "sourceIds": [
      "thayer1893",
      "waldron2006"
    ]
  },
  {
    "id": "O3",
    "axis": "post",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "When a court strikes down an unconstitutional law, it is not placing judges above the people; it is enforcing the people’s higher constitutional command against the temporary choices of their elected representatives.",
    "sourceIds": [
      "barnette1943",
      "ely1980"
    ]
  },
  {
    "id": "O4",
    "axis": "post",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "Constitutional rights matter most when the political majority wants to violate them; overwhelming democratic support for a law is therefore no reason for courts to become more deferential.",
    "sourceIds": [
      "barnette1943",
      "ely1980"
    ]
  },
  {
    "id": "O5",
    "axis": "post",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "Judges have no special moral expertise that makes five unelected lawyers better than a functioning democracy at deciding difficult questions about liberty, equality, and fairness.",
    "sourceIds": [
      "thayer1893",
      "waldron2006"
    ]
  },
  {
    "id": "O6",
    "axis": "post",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "A supreme court holds that a popular law violates freedom of expression. The legislature publicly considers the ruling, holds another vote, and reenacts the same law by a clear majority for five years, after which it must vote again if it wants the law to continue. A constitutional system should allow that: courts should force legislatures to confront rights objections, but judges should not necessarily have the final word.",
    "sourceIds": [
      "waldron2006",
      "barnette1943"
    ]
  },
  {
    "id": "O7",
    "axis": "post",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "A deeply divisive constitutional issue reaches the Supreme Court, but the case can be dismissed on a narrow procedural ground without deciding the constitutional question. Millions of people want a definitive answer now. The Court should avoid deciding anyway, giving elected institutions and public debate more time to work before nine judges impose a national constitutional settlement.",
    "sourceIds": [
      "waldron2006",
      "barnette1943"
    ]
  },
  {
    "id": "O8",
    "axis": "post",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "Everyone agrees that a disputed law turns on a genuine, reasonable disagreement about the meaning of a constitutional right. The legislature debates that right openly and passes the law after an election fought largely over the issue. The Supreme Court then strikes it down 5–4. There is no obvious democratic reason why the majority vote of five unelected judges should have greater authority than the majority vote of elected representatives on a question where both answers are reasonable.",
    "sourceIds": [
      "thayer1893",
      "waldron2006"
    ]
  },
  {
    "id": "O9",
    "axis": "post",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "A state constitution protects “personal liberty,” but reasonable judges disagree about whether that includes a right to abortion. After an election fought almost entirely over the issue, the legislature passes a 15-week abortion ban. If both constitutional readings are genuinely reasonable, courts should uphold the law rather than substitute their own view of liberty for the electorate’s.",
    "sourceIds": [
      "thayer1893",
      "waldron2006"
    ]
  },
  {
    "id": "O10",
    "axis": "post",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "After a mass shooting, 80% of voters approve a law banning ordinary handguns in the home. The state constitution protects an individual right to keep and bear arms, and judges reasonably conclude that the right includes ordinary handguns. The court should strike the law down even though an overwhelming majority deliberately voted for it.",
    "sourceIds": [
      "barnette1943",
      "ely1980"
    ]
  },
  {
    "id": "O11",
    "axis": "post",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "A law restricting an unpopular group's speech is debated for months, becomes the central issue in an election, wins a large majority, and is reenacted after the state supreme court warns that it may violate free speech. If the justices ultimately conclude that the law does violate the constitutional right, all that democratic deliberation should make no difference: the law still has to fall.",
    "sourceIds": [
      "barnette1943",
      "ely1980"
    ]
  },
  {
    "id": "O12",
    "axis": "post",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "A judge who repeatedly strikes down popular laws on debatable constitutional grounds should be removable by the voters at the next election. Judicial independence should protect honest judging, not insulate judges from democratic accountability forever.",
    "sourceIds": [
      "waldron2006",
      "barnette1943"
    ]
  },
  {
    "id": "O13",
    "axis": "post",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "Judges need secure tenure precisely so they can enforce constitutional rights when doing so is deeply unpopular; if judges can lose their jobs for protecting an unpopular person or minority, constitutional rights become dependent on majority approval.",
    "sourceIds": [
      "barnette1943",
      "ely1980"
    ]
  },
  {
    "id": "E1",
    "axis": "separ",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "Congress gives the President emergency authority to raise tariffs quickly during a trade crisis, but reserves the right for either house of Congress acting alone to cancel any tariff increase. That is a sensible check on delegated power, even though the Constitution normally requires both houses and the President to make or repeal federal law.",
    "sourceIds": [
      "chadha1983",
      "strauss1987"
    ]
  },
  {
    "id": "E2",
    "axis": "separ",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "A special prosecutor is investigating the President and senior White House officials. To prevent the President from simply firing the prosecutor, Congress allows removal only for serious misconduct or failure to do the job. That protection is constitutional because an investigation of the President cannot be meaningfully independent if the President can end it at will.",
    "sourceIds": [
      "morrison1988",
      "strauss1987"
    ]
  },
  {
    "id": "E3",
    "axis": "separ",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "Congress tells an environmental agency to set whatever nationwide pollution limits it considers “necessary to protect public health while avoiding unreasonable economic costs.” Even if experts are better equipped to make those judgments, Congress itself should make the major policy choices rather than hand such broad lawmaking discretion to an executive agency.",
    "sourceIds": [
      "strauss1987"
    ]
  },
  {
    "id": "E4",
    "axis": "separ",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "Congress passes a spending bill containing hundreds of individual projects, then gives the President power to cancel particular projects after signing the bill. Allowing the President to remove wasteful spending is not enough to justify letting one branch effectively rewrite legislation after it has passed through the constitutionally prescribed process.",
    "sourceIds": [
      "strauss1987"
    ]
  },
  {
    "id": "E5",
    "axis": "separ",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "Congress creates a financial regulator that writes rules, investigates violations, prosecutes companies, and decides many enforcement cases internally. Concentrating all of those functions in one agency is acceptable if courts remain available for meaningful review and the arrangement makes a complicated regulatory system workable.",
    "sourceIds": [
      "strauss1987"
    ]
  },
  {
    "id": "E6",
    "axis": "separ",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "During a severe national emergency, following the ordinary division of powers would make the government respond substantially more slowly. The branches should still use the constitutionally assigned procedures rather than treat necessity or efficiency as permission to blur those boundaries.",
    "sourceIds": [
      "youngstown1952",
      "strauss1987"
    ]
  },
  {
    "id": "E7",
    "axis": "separ",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "Separation of powers is violated only when an arrangement seriously threatens one branch’s independence or concentrates power dangerously; overlap between legislative, executive, and judicial functions is not itself a constitutional problem.",
    "sourceIds": [
      "strauss1987"
    ]
  },
  {
    "id": "F1",
    "axis": "form",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "General rules constrain judges, improve predictability, and treat like cases alike. Even though really straightforward and broad rules can produce ugly edge cases, they are vastly superior to the alternative.",
    "sourceIds": [
      "schauer1988",
      "sullivan1992"
    ]
  },
  {
    "id": "F2",
    "axis": "form",
    "key": -1,
    "scoreWeight": 0,
    "prompt": "No single set of legal rules can ever capture the ever changing complexity of human life.",
    "sourceIds": [
      "schauer1988",
      "sullivan1992"
    ]
  },
  {
    "id": "F3",
    "axis": "form",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "The point of a legal rule is that it sometimes requires the same answer even when the particular circumstances make another answer seem fairer; because if every compelling circumstance creates an exception, there stops being a rule entirely.",
    "sourceIds": [
      "schauer1988",
      "sullivan1992"
    ]
  },
  {
    "id": "F4",
    "axis": "form",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "Legal questions are more about categories than balancing: you fight over whether facts fit a category and know you're answer from which side it falls on, rather than fighting over how to weigh specific values at hand.",
    "sourceIds": [
      "schauer1988",
      "sullivan1992"
    ]
  },
  {
    "id": "F5",
    "axis": "form",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "Judges should not be able to hide behind made-up rules and say \"sorry, my hands are tied.\" They should take all the facts into consideration at all times and do everything in their ability to weigh all of those facts into their decision. Ultimately they have full responsibility for an individual decision, and need to act like it.",
    "sourceIds": [
      "schauer1988",
      "sullivan1992"
    ]
  },
  {
    "id": "F6",
    "axis": "form",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "A benefits law gives people exactly 30 days to appeal a denial. A government employee mistakenly tells an elderly woman she has 45 days, so she files on day 40 and loses benefits she needs for rent and medicine. Courts should be allowed to excuse late filings when enforcing the deadline would be unfair or they have \"good cause.\"",
    "sourceIds": [
      "schauer1988",
      "sullivan1992"
    ]
  },
  {
    "id": "F7",
    "axis": "form",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "A benefits law gives people exactly 30 days to appeal, but courts may excuse a late filing whenever they think there is \"good cause.\" An audit finds that judges routinely accept white claimants' excuses while rejecting essentially identical excuses from Black claimants. The 30-day deadline should be enforced strictly for everyone rather than leave room for that kind of discretionary judgment.",
    "sourceIds": [
      "schauer1988",
      "sullivan1992"
    ]
  },
  {
    "id": "F8",
    "axis": "form",
    "key": 1,
    "scoreWeight": 1,
    "prompt": "A state has a rule that anyone who commits a crime before age 18 must be sentenced as a juvenile and cannot receive adult sentencing enhancements. This is good: judges should not get to decide that one child was unusually mature, vicious, or “adult enough” for adult punishment while another was not. The state has also found serious racial and class disparities under discretionary transfer systems, where wealthy white teenagers were much more often judged “still children” than otherwise similar poor or Black teenagers. The fixed age rule is preferable because punishment this serious should not depend on a judge’s subjective assessment of a child.",
    "sourceIds": [
      "schauer1988",
      "sullivan1992"
    ]
  },
  {
    "id": "F9",
    "axis": "form",
    "key": -1,
    "scoreWeight": 1,
    "prompt": "Two teenagers commit the same violent crime together. One is 17 years and 350 days old and planned the attack, carried the weapon, deliberately hurt the victim, and added needless cruelty. The other turned 18 the day before, played a minor role, tried to stop the attack, and has no prior record. Both are convicted, but the state’s bright-line age rule means only the 18 year old will serve substantial time while the 17 year old gets a slap on the wrist. This is bad, the court should have discretion to make sure similar cases are getting similar results, and unfair outcomes like this are corrected for on the margins.",
    "sourceIds": [
      "schauer1988",
      "sullivan1992"
    ]
  }
]);
