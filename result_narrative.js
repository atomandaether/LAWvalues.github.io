/* Integrated public result narratives: <=70-word opening + single-paragraph literature context. */
(function attachResultNarrative(global) {
  "use strict";

  const ROUTES = Object.freeze({
  "special_unusable": {
    "opening": "The response pattern does not provide enough reliable evidence for a judicial portrait. The axis scores can still show individual tendencies, but LAWvalues is withholding the interpretive write-up rather than turning weak or inattentive evidence into a theory of judging.",
    "context": "LAWvalues only builds a jurisprudential narrative when the responses support relationships among legal propositions. The test looks for more than isolated axis scores: the same principle should survive changes in facts, adaptive questions should sharpen the pattern instead of undoing it, and enough evidence must exist to separate a theory from mechanical clicking. Here that foundation is missing. The axis scores still report the answers given, but a longer explanation would manufacture coherence the responses did not establish."
  },
  "special_incoherent": {
    "opening": "Your answers contain several direct conflicts that cannot be explained as ordinary tensions within a judicial philosophy. The individual axis scores still describe real preferences, but forcing them into one coherent account of judging would hide rather than explain what the responses actually say.",
    "context": "Eclectic legal thought can be coherent; direct contradiction across several domains is different. This result is reserved for patterns such as affirming and denying the same source-of-law proposition or applying opposite principles to closely matched disputes with no legal distinction explaining the switch. The axis scores still record those individual instincts. A unified theory would conceal the conflict by supplying connections the answers themselves never supplied, so LAWvalues stops before assigning one."
  },
  "special_outcome": {
    "opening": "Across several politically mirrored cases, your preferred legal rule changed in the same political direction often enough that LAWvalues cannot confidently treat the pattern as a stable theory of judging. The axis scores remain visible, but a normal jurisprudential portrait would make the answers look more principled than the evidence supports.",
    "context": "This result requires repeated reversals across politically mirrored cases. Each pair keeps the legal structure roughly constant while changing the political beneficiary. Consequences, democratic legitimacy, and rights protection can all be legitimate parts of a jurisprudence; the problem arises when the governing legal principle itself moves with the preferred side. Once that happens across several domains, almost any doctrinal label can be reconstructed after the fact. LAWvalues therefore reports the axis pattern without treating it as a stable method."
  },
  "low_theory": {
    "opening": "You do not approach hard cases with a fixed hierarchy telling you that text, history, precedent, purpose, institutional competence, or consequences always comes first. Instead, you let the dispute determine which considerations deserve the most weight. That produces a practical and fact-sensitive style of judging, but it gives fewer rules for predicting the next genuinely difficult case.",
    "context": "Low-theory judging has an identifiable pedigree of its own. It favors narrow decisions, close attention to facts, and incremental adjustment over comprehensive theories of legal interpretation. The judge may use text heavily in one dispute, precedent in another, and institutional consequences in a third without claiming that all three belong to a fixed hierarchy. Interpretive Pluralism goes further by defending several modes of argument as parts of an affirmative theory. Low theory stays closer to adjudicative craft. Its weakness appears when familiar legal materials point in opposite directions and the method offers little guidance beyond judgment exercised in the particular case."
  },
  "opm_mainstream": {
    "opening": "You think constitutional judging begins with law whose meaning was fixed when it was adopted, not with a license to update that law whenever later judges prefer a different answer. You are willing to apply old language to new circumstances, but the governing principle must still come from the enacted Constitution rather than from present-day judicial revision.",
    "context": "Modern Originalism moved away from treating framers' intentions as the primary object of constitutional interpretation. Original Public Meaning asks what the enacted language communicated in its historical legal and linguistic setting. That shift separates meaning from expected application. A founding-era practice can be powerful evidence of what a clause meant, yet the practice does not automatically define the clause's full reach. A rule against arbitrary caste, for example, can retain fixed historical meaning while governing forms of hierarchy the adopting generation tolerated. The theory fixes legal content historically and allows ordinary legal application to carry that content into facts the adopters never confronted."
  },
  "opm_construction": {
    "opening": "You think constitutional meaning can be fixed without making every hard case predetermined. Broad provisions can establish a binding principle while still leaving genuine questions unresolved. When that happens, later courts and institutions may need to develop implementing rules inside the space original meaning leaves open, without claiming that the Constitution's meaning itself has changed.",
    "context": "The interpretation/construction distinction divides two tasks. Interpretation recovers the Constitution's fixed communicative content. Construction develops implementing law where that content leaves more than one legally permissible answer. New Originalist scholarship made the distinction central because fixed meaning does not guarantee a complete decision procedure for every case. The size of the construction zone then becomes the live dispute. Some theories leave substantial room for precedent, principle, and institutional practice; others use historical law and interpretive conventions to narrow it sharply. The constitutional text continues to set the outer boundary even when doctrine inside that boundary develops later."
  },
  "opm_methods": {
    "opening": "You treat constitutional adjudication as historical legal interpretation rather than simply historical word-reading. What matters is not only what the words could communicate to an ordinary reader, but also the legal methods and interpretive rules that belonged to the constitutional system when those words became law.",
    "context": "Original Methods theories move the historical inquiry from ordinary language toward historical legal practice. A legal text can carry technical meanings, settled canons, and background rules that a competent legal reader at the time would have used automatically. Those conventions may resolve ambiguities that appear open when the text is read through modern linguistic habits. The judge therefore reconstructs part of the historical law of interpretation itself. This approach can produce results different from a simple ordinary-public-reader test even though both remain committed to historical fixation. The central evidence includes legal treatises, interpretive customs, drafting conventions, and the broader legal setting in which the constitutional text operated."
  },
  "opm_original_law": {
    "opening": "You think the deepest Originalist question is not simply what the Constitution's words meant to readers, but what law the Constitution originally made. That inquiry can include background legal rules, technical meanings, and lawful mechanisms of change, making constitutional judging a reconstruction of an original legal system rather than a purely linguistic exercise.",
    "context": "Original-Law theory asks what law the Constitution created at the founding. Communicative meaning is part of that inquiry, alongside background doctrines, technical legal categories, jurisdictional rules, and mechanisms for lawful change. A clause that looks underdeterminate at the level of ordinary language may have had a determinate legal effect once those surrounding rules are restored. The approach therefore shifts Originalism from historical semantics toward reconstruction of an earlier legal system. It often leaves less space for later judicial construction because some apparent gaps were already filled by law operating in the background. The historical object is the legal rule produced by the Constitution, not a dictionary snapshot of its words."
  },
  "opm_intratextual": {
    "opening": "You read the Constitution as a connected legal document rather than a collection of isolated clauses. Historical meaning still controls, but ambiguous language should be understood through recurring words, parallel provisions, structural relationships, and the way the document's parts fit together as a whole.",
    "context": "Intratextual interpretation treats the Constitution as one coordinated legal instrument. Repeated language, parallel structures, related grants of power, and the placement of provisions can illuminate a disputed clause from inside the document itself. The method remains historically fixed because those relationships existed in the enacted Constitution from the start. It simply uses more of the enacted document as evidence. A term used in Article I may clarify the same term elsewhere; symmetry between provisions may reveal a structural distinction that an isolated phrase conceals. This approach is especially useful where constitutional architecture carries information that sentence-level reading misses."
  },
  "opm_correction": {
    "opening": "You think constitutional meaning was fixed at adoption, and you give relatively little weight to precedent once you are convinced that a later court replaced that law with a mistaken rule. Stability matters, but it cannot permanently turn a judicial error into the Constitution itself.",
    "context": "Public-meaning Originalism treats constitutional meaning as historically fixed, while stare decisis is a later doctrine governing judicial behavior. Those two layers can conflict. Correction-first Originalists give the constitutional source priority when a precedent cannot be reconciled with the original law. Their strongest arguments distinguish reliance on concrete transactions from reliance on doctrine itself and question whether judicial repetition can acquire authority against a superior legal source. The hard cases involve deeply embedded rules that structure institutions or private expectations. Restorationist theories accept substantial disruption in some of those cases because preserving an erroneous precedent can entrench judicial law above the Constitution it was supposed to interpret."
  },
  "opm_settlement": {
    "opening": "You think the Constitution has fixed historical meaning, but you do not treat every departure from that meaning as something courts must immediately erase. Judges inherit an already-developed legal system, so precedent, reliance, and institutional continuity can matter even when fresh historical analysis points elsewhere.",
    "context": "Precedent-accommodating Originalism keeps original meaning as the constitutional benchmark while treating stare decisis as an independent legal reason. The focus moves to the consequences of judicial settlement: private reliance, administrability, doctrinal integration, institutional continuity, and the costs of sudden reversal. A court can therefore acknowledge that an earlier decision departed from original meaning and still leave the rule standing. That position preserves a difference between constitutional meaning and present judicial obligation. The historical answer tells the court what went wrong; stare decisis helps determine what the court should do about a legal order already built around the mistake."
  },
  "opm_higher_law": {
    "opening": "You think objective moral principles help explain why law can have authority, but you also think law exists to settle questions judges could otherwise keep reopening. That makes historically fixed constitutional law compatible with Natural Law: moral reasoning helps explain why legitimate positive law binds rather than giving judges a standing license to replace it.",
    "context": "Classical Natural Law and Originalism can fit together through the idea of determination. Moral principles establish broad requirements of justice and legitimate authority, yet many concrete legal questions admit several reasonable answers. Positive law selects among those options and gives the community a settled rule. Originalism then identifies the constitutional settlement through its fixed historical meaning. Moral reasoning explains why lawful settlement carries authority and where its outer limits lie; it does not supply a fresh judicial answer every time a judge sees a morally preferable rule. The combination gives positive constitutional law strong force inside a moral theory of legal authority."
  },
  "oi_mainstream": {
    "opening": "You think constitutional interpretation should recover the intentions behind the Constitution, not merely the public meaning later readers can extract from the enacted words. The enacting generation's purpose is therefore part of what gives the constitutional rule its content, making authorial intention legally central rather than merely historical evidence.",
    "context": "Original Intent makes the lawmaking intention part of constitutional interpretation. The inquiry reconstructs what the enacting generation meant to communicate or accomplish through the provision, using drafting history, debates, institutional acts, and the structure of the enactment. Collective intention creates the main difficulty because a constitution has many authors and ratifiers. Serious intentionalist theories therefore look for an institutional intention expressed through the lawmaking process, not stray private motives. Conflict with Public Meaning appears when the best evidence of that intention diverges from the meaning the enacted words would have conveyed to the public. Intentionalism gives the lawmaking choice greater authority in that conflict."
  },
  "oi_semantic": {
    "opening": "You treat original intent as a theory of meaning, not merely as a device for restraining judges. On your view, interpreting a constitutional text means recovering what its authors intended to communicate, so intent can control because it is part of what the enacted language meant.",
    "context": "Semantic Intentionalism treats authorial intention as part of what gives legal language its meaning. Shared public language still matters because lawmakers communicate through it, but the target of interpretation is the meaning they intended to convey through those words. The theory therefore differs from older defenses of Original Intent that focused mainly on judicial restraint. Its claim is linguistic before it is institutional. Collective authorship remains the pressure point: a legislature or ratifying public must possess an intention coherent enough to guide interpretation, and the evidence must distinguish intended communication from political hopes, expected applications, and individual statements that never became part of the collective act."
  },
  "oi_construction": {
    "opening": "You think founding intent fixes constitutional meaning, but you also think that intent can leave genuine legal questions unresolved. When the intended meaning runs out, later constitutional doctrine may legitimately develop within the space the original settlement left open rather than pretending the founders supplied a complete rule for every case.",
    "context": "Intentionalist construction separates the meaning intended by the enacting generation from the doctrine later needed to implement it. Historical intention can fix a constitutional principle without specifying a complete rule for every future dispute. Courts and other institutions then face a second task inside the space the original settlement left open. Precedent, practice, principle, or democratic choice can supply the implementing rule depending on the theory. The approach preserves historical fixation at the level of intended meaning while accepting later legal development at the level of doctrine. Its hardest question concerns which institutions and sources have authority once the historical intention stops giving a unique answer."
  },
  "originalist_generic": {
    "opening": "You think present constitutional judging is constrained by law fixed at adoption, even though your answers do not cleanly resolve which Originalist account best identifies that law. History is therefore authoritative for you, but the precise theory connecting historical meaning to modern cases remains comparatively open.",
    "context": "Originalism shares one basic commitment: the Constitution contains law fixed at adoption that later judges cannot revise through ordinary interpretation. The schools divide over the historical object. Public-meaning theories recover communicative content; intentionalists recover lawmaking intention; Original Methods theories restore historical interpretive rules; Original-Law theories reconstruct the broader legal system the Constitution created. Those choices affect ambiguity, precedent, and the room available for later doctrine. A respondent can therefore be firmly Originalist while leaving the internal theory unresolved. The common ground lies in historical legal authority, not in one agreed procedure for finding every answer."
  },
  "living_mainstream": {
    "opening": "You do not think present constitutional law is exhausted by the meaning fixed at adoption. Later precedent, experience, changed circumstances, and contemporary understandings can legitimately shape what constitutional commitments require, so the judge's task includes legal development rather than only historical recovery.",
    "context": "Living Constitutionalism needs a mechanism of legal change. Precedent, institutional practice, altered factual conditions, political development, and evolving understandings all appear in the literature, and different theories assign them different legal roles. The shared claim is that post-adoption developments can contribute to the constitutional law courts apply. Historical text remains an anchor, but it does not exhaust present legal content. That places the disagreement with Originalism at the level of legal authority: later developments can become constitutive of constitutional law instead of serving only as evidence about a meaning fixed at adoption."
  },
  "living_democratic": {
    "opening": "You think constitutional law develops through interaction among courts, political movements, officials, and public argument rather than through judges alone or through a meaning frozen at adoption. Courts still enforce rights, but democratic constitutional debate can legitimately help shape the understandings those courts eventually apply.",
    "context": "Democratic Constitutionalism locates constitutional development in sustained interaction among courts, political institutions, movements, elections, and public argument. Social contestation can change the constitutional understandings that later courts enforce, even though a present electoral majority does not simply control the meaning of rights. Judicial doctrine remains one participant in a wider constitutional practice. The theory is especially interested in feedback: court decisions reshape politics, political mobilization reshapes the terms of constitutional argument, and later doctrine absorbs parts of that development. Constitutional law emerges from that institutional conversation over time."
  },
  "living_transformative": {
    "opening": "You think constitutional interpretation can be part of an ongoing legal project of changing inherited institutions, not merely preserving them while adapting at the edges. Courts should read constitutional commitments with an eye toward the social and political transformation those commitments require.",
    "context": "Transformative Constitutionalism treats a constitution as a legal project aimed at changing an inherited political and social order. It is most associated with constitutions adopted against backgrounds of authoritarianism, hierarchy, or exclusion, where provisions protecting dignity, equality, participation, and democracy are read as mandates for institutional reconstruction. Courts may therefore ask whether existing structures reproduce the conditions the constitutional settlement was designed to displace. The approach gives constitutional purpose substantial legal force and can support aggressive remedies. Its pressure point is institutional authority: ambitious transformation requires judgments about social structure that can push courts far beyond conventional dispute resolution."
  },
  "living_moments": {
    "opening": "You think formal amendment is not the only way a constitutional order can undergo legitimate higher-law change. In extraordinary periods of sustained popular mobilization and repeated institutional ratification, political action can sometimes produce a new constitutional settlement that later courts should recognize.",
    "context": "Constitutional-moments theory allows higher-law change outside formal amendment when political mobilization reaches an extraordinary level. Routine elections and ordinary statutes do not suffice. The theory looks for sustained popular engagement, repeated electoral endorsement, institutional confrontation, and eventual settlement strong enough to resemble a constitutional founding episode. Later courts can treat that settlement as part of the constitutional order even without an Article V amendment. The model was developed to explain large historical shifts that seem too fundamental for ordinary precedent and too legally consequential to describe as simple political change."
  },
  "common_law_mainstream": {
    "opening": "You think constitutional law grows through precedent, practice, and accumulated institutional experience. Past decisions do more than imperfectly report an unchanged Constitution; over time they can become part of the legal structure that later judges inherit and develop.",
    "context": "Common-Law Constitutionalism treats precedent as a constitutive source of constitutional law. Courts inherit a body of doctrine that can be extended, narrowed, distinguished, or abandoned through familiar common-law techniques. As that doctrine thickens, a fresh reading of the constitutional text may matter less to the operative rule than the line of cases built around it. Stare decisis therefore sits inside the method rather than arriving later as a reason to tolerate error. The approach offers continuity and gradual change at the price of accepting that major parts of constitutional law can owe their authority to accumulated judicial practice instead of a single textual command."
  },
  "common_law_tradition": {
    "opening": "You think constitutional liberty develops through precedent and historically embedded tradition rather than through either fixed founding expectations or free-standing modern moral judgment. Change is legitimate, but it should grow out of the accumulated experience of the legal order.",
    "context": "Tradition-centered Common-Law Constitutionalism uses precedent together with long-running practices of ordered liberty. New claims are tested against the trajectory of the legal tradition: how related freedoms have been treated, which distinctions have persisted, and whether an extension grows out of the inherited pattern. The method permits development because common-law reasoning works through analogy and extension. It also gives history a constraining role different from Originalism. Founding-era meaning does not freeze the result; the accumulated tradition supplies the material from which current constitutional doctrine develops."
  },
  "common_law_strong_rights": {
    "opening": "You think some fundamental legal rights can be rooted so deeply in the constitutional common-law tradition that ordinary legislation cannot simply erase them, even when no written higher-law clause expressly supplies the limit. Judicially articulated principle can therefore constrain legislative supremacy.",
    "context": "Strong common-law constitutionalism gives some unwritten legal principles a status capable of limiting ordinary legislation. The argument appears most sharply in systems influenced by parliamentary sovereignty, where courts have sometimes described access to justice, legality, or fundamental rights as conditions of lawful government. Once such a principle is treated as constitutional, legislative power is no longer conceptually unlimited. That gives judges a demanding classificatory task: they must separate genuinely fundamental principles from ordinary common-law doctrine. The authority of the right comes from the constitutional character of the legal tradition itself, not from one express higher-law clause."
  },
  "common_law_source_bound": {
    "opening": "You think law gets its authority from recognized legal institutions, yet those institutions can change constitutional law over time through precedent and practice. Constitutional development is legitimate because it occurs through law's own sources, not because judges have a free-standing power to update constitutional values.",
    "context": "Source-based jurisprudence can accommodate constitutional development when precedent and official practice themselves count as legal sources. The source thesis concerns what makes law valid; it does not require every valid rule to trace directly to founding-era text. Common-Law Constitutionalism supplies the route of change. Repeated decisions, settled doctrine, and accepted governmental practice can acquire legal status through the institutions the system recognizes. This combination permits genuine constitutional evolution while keeping the new law tied to identifiable social and institutional sources. Moral judgment can still criticize those developments, but it does not independently create their legal status."
  },
  "common_good": {
    "opening": "You think public law should be understood through a classical idea of legitimate authority directed toward the common good. Individual autonomy and historically fixed meaning matter, but neither exhausts the legal purpose of government or the principles that should guide interpretation.",
    "context": "Common-Good Constitutionalism draws on classical accounts of political authority and practical reason. Public power exists to secure conditions of communal life that individuals cannot supply alone, and legal interpretation therefore pays close attention to purposes such as justice, peace, welfare, and ordered liberty. Positive law retains substantial settlement force because legitimate institutions must choose among many reasonable arrangements. Open-textured provisions can also be read through the purposes of lawful authority, which gives judges and administrators more room than hard Textualism or mainstream Originalism would allow. The deepest controversy concerns who may specify the common good when reasonable citizens disagree about its concrete demands."
  },
  "positivist_mainstream": {
    "opening": "You think the existence of law ultimately depends on recognized legal sources and social practices, not on whether the resulting rule is morally good. A cruel or foolish rule can still be law, even though judges and citizens may have powerful moral reasons to condemn or change it.",
    "context": "You separate the existence of law from its moral quality. A rule counts as law because it comes from the sources and practices the legal system recognizes—constitutions, statutes, precedent, custom, official acceptance—not because it is just. That leaves plenty of room for moral criticism: a valid law can be cruel, foolish, or illegitimate in the broader political sense. Modern Positivism is also compatible with uncertainty. Social sources can settle many questions while leaving others open enough that judges must exercise discretion or develop new law. The theory's central discipline is conceptual: first identify what the legal system has made authoritative, then ask whether that law deserves obedience, reform, or condemnation. Collapsing those two inquiries makes it harder, not easier, to explain how unjust legal systems can exist."
  },
  "positivist_inclusive": {
    "opening": "You think law is ultimately grounded in social rules and institutions, but those rules can themselves tell courts to apply genuine moral standards. Morality can therefore become part of legal validity without ceasing to be incorporated through a source-based legal system.",
    "context": "You are a Positivist who allows the legal system itself to make morality legally relevant. The foundation remains social: constitutions, statutes, precedent, and accepted official practices determine what counts as a valid legal criterion. But one of those criteria can direct a court to apply a moral standard such as equality, reasonableness, or cruelty. Inclusive Positivism says the moral test is part of the law because the source-based system incorporated it. Interpretivism reaches a superficially similar result from the opposite direction: moral principles can belong to law through the best interpretation of legal practice even without a source rule making them relevant. Exclusive Positivists draw the line more sharply and resist morality becoming a validity criterion at all. Your position keeps the source thesis while allowing some legal questions to become moral questions by virtue of the law's own design."
  },
  "positivist_exclusive": {
    "opening": "You think legal validity must remain identifiable from social and institutional sources without making moral correctness itself the test of what law exists. Morality may guide criticism or political reform, but it should not become an independent criterion for identifying valid law.",
    "context": "You draw a hard line between a rule's source and its merits. Legal institutions can use evaluative language, and judges can have moral duties, but the existence and content of law must ultimately be identifiable from source-based facts rather than from whether a norm is morally sound. The classic argument is about authority: law is supposed to settle some questions so people can act on a common rule instead of reopening the underlying moral dispute each time. If legal validity itself depends on deciding that dispute again, some of the settlement function disappears. Inclusive Positivists are willing to say that a constitution can incorporate moral criteria into law; you are more skeptical of that move. Moral reasons can explain whether a law should be obeyed or changed, but they do not supply an independent test for whether the legal system created it."
  },
  "positivist_normative": {
    "opening": "You do more than describe law as source-based; you think source-following is itself an important institutional discipline. Even when judges can imagine morally better answers, legal systems work better when contested moral lawmaking is left mainly to politically accountable institutions.",
    "context": "You defend source-bound judging as an institutional choice, not merely as a description of what law is. Ordinary Positivism says legal validity depends on social sources rather than moral merit. Normative Positivism adds that courts generally ought to respect that separation because legislatures and other politically accountable institutions are better places to make contested moral policy. Clear source rules give citizens notice, limit judicial discretion, and preserve a division of labor between adjudication and lawmaking. That argument can support a restrained judge even in a system whose legal sources authorize broad discretion elsewhere. The theory does not deny that morality matters; it assigns responsibility for moral change. When the law has settled the issue, a judge should usually enforce the settlement and leave revision to the institution empowered to revise it."
  },
  "natural_law_mainstream": {
    "opening": "You think objective moral principles matter to law, but you do not treat morality as a standing permission for judges to replace positive law. One of law's important jobs is to settle questions that practical morality leaves open and give a community a determinate rule.",
    "context": "You treat positive law as part of practical reason rather than as a separate moral universe. Basic principles of justice and the common good place limits on legitimate law, but they rarely dictate one detailed rule for every social problem. Legislatures, constitutions, and other lawful authorities fill that space by choosing among reasonable options—what classical Natural-Law theory calls determination. A speed limit, filing deadline, or institutional design can bind even though morality alone would have permitted several alternatives. This is why mainstream Natural Law is less judge-centered than the slogan 'an unjust law is no law' suggests. Positive law has authority because coordination and settlement are themselves goods. Moral reasoning supplies the framework and, at the extremes, the limits; enacted law supplies much of the concrete content people actually have to follow."
  },
  "natural_law_strong": {
    "opening": "You think moral defect can sometimes reach beyond making a rule unjust and undermine its status as law itself. Positive law normally settles questions and deserves authority, but sufficiently serious violations of objective moral requirements can defeat that legal claim.",
    "context": "You give moral defect a role not only in criticizing law but, in extreme cases, in determining whether a purported rule has legal authority at all. That is a stronger Natural-Law position than the ordinary claim that positive law should serve justice. Most natural-law theorists still give enacted law substantial settlement force, including when the rule is imperfect or unjust. Your line is crossed only when the defect is severe enough to defeat the law's claim to govern as law. The pressure point is obvious: if ordinary moral disagreement were enough, courts could convert almost every legal dispute into their own moral judgment. A strong Natural-Law theory therefore needs a demanding threshold and a reasoned account of why some forms of injustice destroy legal authority while lesser injustice leaves a bad but valid law in place."
  },
  "interpretivist": {
    "opening": "You think legal practice contains principles as well as enacted rules, and those principles can supply real legal answers in hard cases. Judges should interpret the existing legal system in the way that best fits its history while giving its institutions and rights the strongest coherent justification.",
    "context": "You treat legal rights as the product of both institutional history and principle. Statutes, precedents, and official practices supply the record a judge must fit; moral and political principles supply the justification that makes sense of that record as a coherent legal scheme. Dworkin's central claim is that a hard case need not become a blank space simply because no source states the answer explicitly. The law can include principles already implicit in the best interpretation of the practice. This differs from Positivism, which can say the sources run out and leave the judge with lawmaking discretion, and from free-form moral reasoning, because fit constrains which principles are legally available. A judge cannot simply choose the fairest rule in the abstract. The answer must make the existing legal history intelligible while showing why that history is worth treating as a system of rights."
  },
  "nonpos_moral_impact": {
    "opening": "You think legislatures and courts make law by changing people's actual moral rights and obligations. The legal institutions matter because of the moral impact their actions produce, not because they create a separate source-based category of obligation alongside morality.",
    "context": "You understand legislation and adjudication by asking what moral change those institutions actually produce. On Moral Impact Theory, a statute is legally significant because its enactment alters people's genuine moral rights and duties; the resulting moral obligations are the law. Source facts remain indispensable—without the institutional act there may be no change to explain—but pedigree alone does not finish the inquiry. The judge must work out the normative consequences of what the institution did. This differs from Interpretivism, which asks which principles best fit and justify legal practice, and from traditional Natural Law, which begins with more general principles of practical reason. Your account is causal and institutional: government action changes the moral situation, and legal reasoning identifies the rights and duties created by that change."
  },
  "nonpos_moral_practice": {
    "opening": "You think a person who claims a legal right is ultimately claiming a genuine moral right, not invoking a separate kind of obligation that exists only because legal sources created it. Legal practice is one part of our broader moral practice rather than a separate normative world.",
    "context": "You reject the idea that legal rights form a separate normative category alongside moral rights. When a court says someone has a legal right, the claim is ultimately about what that person is genuinely entitled to within a social practice shaped by statutes, precedents, institutions, and public power. Those institutional facts matter enormously, but they matter inside moral reasoning rather than generating a self-contained body of source-based normativity. This puts your view farther from Positivism than theories that merely allow moral standards to be incorporated by legal sources. It also differs from Moral Impact Theory, which emphasizes how official acts change the moral landscape. Here the emphasis is on the kind of claim law makes: legal argument is one part of the broader practice of determining what people truly owe one another under institutions that already structure their lives."
  },
  "nonpos_extreme": {
    "opening": "You think ordinary injustice can coexist with legal validity, but there is a point at which injustice becomes so extreme that a purported rule loses its claim to be law. Your view therefore rejects both simple source-only validity and the idea that every moral defect destroys legality.",
    "context": "You accept most of the practical picture of source-based law while reserving a moral breaking point. Ordinary injustice does not erase legal validity; bad laws can still be laws, and judges cannot turn every moral objection into a jurisdiction to disregard enactments. Extreme injustice is different. The Radbruch formula holds that positive law can become so radically inconsistent with justice or equality that its claim to legal status fails. The doctrine was developed against the problem of legal systems that used formally valid rules to organize grave wrongdoing. Its usefulness depends on its rarity. If the threshold is low, the theory collapses into routine moral review; if it is impossibly high, it does no work. Your position keeps positive legality as the normal rule while treating some forms of injustice as conceptually disqualifying rather than merely condemnable."
  },
  "fullerian": {
    "opening": "You think law can fail not only because of what it commands, but because of how it is made and administered. Secret, retroactive, contradictory, impossible, or systematically ignored rules can fail the basic conditions that make governance through law possible.",
    "context": "You locate part of law's morality in the way rules govern, not only in the ends they pursue. A regime of secret, retroactive, contradictory, unintelligible, impossible, constantly shifting, or systematically ignored commands may exercise power, but it is failing at the enterprise of governing through law. Fuller's principles of legality—publicity, prospectivity, clarity, consistency, feasibility, relative stability, and congruence between rule and official action—describe that enterprise. Positivists can value the same features as virtues of good law; this theory gives them a deeper role in the concept of legality itself. The theory does not guarantee substantively just outcomes. A clear and prospective rule can still be wicked. Its claim is that even wicked law must possess enough procedural integrity to count as a functioning legal order rather than arbitrary administration."
  },
  "textualist_mainstream": {
    "opening": "You think judges should enforce the meaning of the law Congress actually enacted rather than reshape it around an unenacted purpose. That does not mean reading words in isolation: grammar, ordinary usage, surrounding provisions, and legal context are all part of working out what the enacted text means.",
    "context": "You read statutes as enacted legal language, not as imperfect evidence of a policy the court may improve. Modern Textualism is contextual: grammar, ordinary usage, surrounding provisions, legal conventions, and the structure of the statute all help determine what the words mean. Textualism and Purposivism separate when the best reading of the enacted words and the law's apparent policy pull apart. A textualist may use purpose to understand context, but not to add an exception, repair an omission, or extend a prohibition beyond the legal bargain Congress enacted. That restraint rests partly on institutional grounds. Legislatures make law through compromise, and the precise boundary that survived bicameralism and presentment may be narrower, stranger, or less coherent than the policy a judge would have designed. The court enforces the enacted rule because that is the rule that became law."
  },
  "textualist_institutional": {
    "opening": "You think judges are constrained by enacted law, but faithful interpretation happens inside an institutional system rather than a linguistic vacuum. Text and statutory context come first, while precedent, delegated responsibility, expertise, and administrability can matter to who should resolve genuine uncertainty.",
    "context": "You are text-centered without assuming that courts must personally resolve every ambiguity. The first task is ordinary modern Textualism: use grammar, context, statutory structure, and legal conventions to identify the best readings of what Congress enacted. When more than one serious reading survives, institutional allocation enters. A court-centered textualist insists that deciding legal meaning remains a judicial responsibility even when an agency has technical expertise. An institutionalist asks whether Congress assigned interpretive responsibility to another body, whether settled practice has structured reliance, and whether the statutory scheme depends on administrative judgment. Text still marks the boundary; an agency cannot rewrite the law in the name of policy. But within genuine uncertainty, who decides can be part of the legal question. Your method combines textual constraint with a Legal-Process concern for the division of authority inside the legal system."
  },
  "textualist_bargain": {
    "opening": "You think the hardest part of judging is accepting that enacted law may be awkward, incomplete, or badly designed without giving courts permission to repair it. Omissions, exceptions, and compromises can be part of the legal bargain itself, not defects to be smoothed away in the name of coherence.",
    "context": "You take legislative compromise seriously enough to let statutes remain awkward. A clean policy story is not necessarily the law Congress passed. Exceptions, omissions, thresholds, and seemingly inconsistent provisions may record the bargain that assembled the votes, and a court that smooths them away can change the deal rather than interpret it. This is a harder-edged form of Textualism than simply consulting context for the best reading. Context still matters, but whole-statute coherence has limits because legislation is produced by coalition rather than by a single rational author. The judge's job is to identify the legal arrangement that survived the legislative process, including its imperfections. Purpose can explain why Congress legislated, but it cannot supply terms that were withheld, traded away, or never enacted. The result is unusually skeptical of anti-evasion reasoning when the proposed cure crosses the text's negotiated boundary."
  },
  "textualist_categorical": {
    "opening": "You combine text-centered interpretation with a strong preference for categorical legal rules. When constitutional or statutory language states a right or boundary in rule-like terms, you resist converting it into a balancing test simply because the government has important competing interests.",
    "context": "You combine Textualism with rule-like implementation. Once enacted language establishes a right, prohibition, or legal category, you resist turning that rule into an open-ended balance of the interests present in each case. The point is institutional as much as semantic. A categorical doctrine constrains the judge who applies it, while a balancing test lets the strength of the right vary with the decisionmaker's assessment of costs and benefits. That can make your judging aggressive against government even though the method is restraint-oriented: a popular policy still loses if it falls inside a legal prohibition that the court is not authorized to soften. Text determines the category; rules preserve its bite. The tradeoff is familiar—hard edges can produce unattractive cases that a more flexible standard could handle more sympathetically."
  },
  "intentionalist_mainstream": {
    "opening": "You think statutory interpretation should recover what the legislature meant to accomplish through the law it enacted. Text remains important evidence and constraint, but the interpretive target is the lawmaking body's intended legal decision rather than wording or objective purpose considered entirely apart from that intention.",
    "context": "You treat legislation as an institutional act with an intended legal effect. The enacted words remain the main evidence, but they are evidence of what the lawmaking body meant to do rather than the whole object of interpretation. That separates Intentionalism from modern Textualism, which gives the public meaning of enacted language priority even when historical evidence points to a different legislative expectation. It also separates Intentionalism from Purposivism: a statute's broad social purpose can outrun the narrower legal decision lawmakers actually intended. Collective intention is the pressure point. Congress is not one speaker, so a serious intentionalist account must identify intention through the bill's design, voting structure, reliable legislative materials, and shared choices rather than cherry-picked remarks. Your judge is trying to recover an institutional decision, not psychoanalyze individual legislators."
  },
  "intentionalist_imaginative": {
    "opening": "You think legislative intent matters even when lawmakers never considered the exact problem before the court. In those cases, the judge should reconstruct what the legislature would have intended had it confronted the issue, using the enacted scheme and the lawmakers' evident purposes as guides.",
    "context": "You use legislative intent even where history contains no actual answer to the precise case. Imaginative reconstruction asks what the enacting legislature would have decided if the unforeseen problem had been put to it, given the statute it wrote, the compromises it accepted, and the ends it was pursuing. That makes the method openly counterfactual. It can handle new technology or unusual facts without pretending lawmakers foresaw them, but it also creates room for judicial projection. The discipline comes from reconstructing this legislature, not an ideal legislature: the enacted scheme, historical choices, and known priorities constrain the hypothetical answer. Compared with ordinary Intentionalism, the judge does more creative work; compared with Pragmatism, the question is still what the lawmaking institution would have chosen, not simply which rule now produces the best consequences."
  },
  "intentionalist_congress": {
    "opening": "You think statutory interpretation should take Congress seriously as an institution that communicates through more than the final sentence-level text. When language is genuinely ambiguous, reliable committee materials and the actual legislative process can be legitimate evidence of the legal meaning Congress intended to enact.",
    "context": "You read statutes with a thicker picture of Congress as a working institution. The enacted text remains authoritative, but committee reports, drafting history, conference materials, and other reliable parts of the legislative process can help show what legal choice Congress understood itself to be making when the words are genuinely uncertain. Hard Textualists object that those materials never passed bicameralism and presentment and can be manipulated by staff or individual legislators. Your answer is institutional rather than sentimental: Congress legislates through committees, negotiations, and shared procedural practices, and interpretation should not pretend those practices do not exist. Legislative history cannot override clear enacted language, but it can illuminate ambiguity because it records how the lawmaking institution actually communicated with itself. The approach therefore joins Intentionalism to Legal Process more than to free-standing purposive updating."
  },
  "purposivist_mainstream": {
    "opening": "You think statutes should be read as legal projects with purposes, not merely as strings of words. Text remains important, but when rigid wording and the law's evident objective pull apart, judges may need to interpret the rule in a way that makes the statutory scheme work as the legislature designed it to work.",
    "context": "You read a statute as a legal project. Text is the starting point and an important constraint, but its provisions are understood in light of the problem the law was organized to solve and the scheme Congress built to solve it. Purposivism becomes distinct from Textualism when the most natural wording and the statute's evident design point in different directions. You are more willing to choose the reading that keeps the scheme from defeating its own objective, especially where literal application would create an obvious anomaly or route for evasion. The purpose is not simply whatever policy the judge likes; it is reconstructed from the enacted statute, its structure, and the legal problem it addresses. Coherence can slide into repair, with the court enforcing the statute it thinks Congress should have written rather than the compromise Congress actually enacted."
  },
  "purposivist_proportional": {
    "opening": "You combine purpose-centered interpretation with a structured way of resolving rights conflicts. A law's objective matters, but government must also show that burdens on rights genuinely serve that objective, are no broader than necessary, and remain justified in light of the harm imposed.",
    "context": "You combine two forms of structured purposive reasoning. Statutory or constitutional interpretation asks what legal objective the provision serves; proportionality asks whether government has pursued that objective in a way that justifies the burden imposed on a right. The latter is not free-form balancing. Government must identify a legitimate goal, show a real connection between the measure and that goal, explain why a less restrictive workable measure would not suffice, and justify the remaining burden. Purpose thus operates on both sides of the analysis: it helps identify what the law is trying to accomplish and supplies the end against which means are tested. Compared with categorical rights doctrine, your method gives courts more judgment but also forces the government to expose the logic of its policy step by step."
  },
  "legal_process_mainstream": {
    "opening": "You think hard cases cannot be understood by asking only which interpretation seems best. Courts should also ask who was assigned the decision, which institution is competent to make it, what has already been settled, and what kind of reasoned explanation the legal system requires.",
    "context": "You see law as a division of institutional labor. Text, purpose, precedent, and principle matter, but so does the identity of the decisionmaker: a legislature, agency, trial court, and appellate court are not interchangeable forums for solving the same problem. Legal Process asks which institution received authority, which procedures legitimate its decision, what expertise it can claim, and how settled rules allow other actors to plan. Courts still have an active role. They can police jurisdiction, insist on reasoned decisionmaking, enforce statutory limits, and develop doctrine where judicial elaboration is part of the assignment. What they should not do is treat every difficult policy question as though it became a judicial question merely because litigation reached a courthouse. Your method makes institutional competence and settlement part of legal reasoning rather than after-the-fact prudential concerns."
  },
  "legal_process_agency": {
    "opening": "You think agencies can engage in genuine legal interpretation rather than acting only as policy bodies waiting for courts to supply the law. Their expertise, internal legal norms, reason-giving duties, and responsibility for administering a statutory program can make agency interpretation part of the legal process itself.",
    "context": "You treat agencies as legal institutions, not merely policy shops operating beneath a judicial monopoly on interpretation. An agency administering a statute develops expertise, precedents, procedures, internal legal norms, and a continuing responsibility for making the program work. Those features can justify giving its interpretation a role when the statute leaves genuine room, even though courts remain responsible for enforcing legal limits. The disagreement with court-centered interpretation is about institutional allocation, not whether text matters. A court can insist that the agency stay within the statute while recognizing that Congress may have assigned the agency authority to make some legally consequential choices inside that boundary. Reason-giving becomes crucial: administrative interpretation earns respect through lawful procedure, expertise, consistency, and explanation rather than through an abstract claim that agencies always know best."
  },
  "legal_process_neutral": {
    "opening": "You think constitutional decisions should rest on principles a court is prepared to apply beyond the immediate parties and political stakes. A result-specific reason is not enough; judicial legitimacy depends on offering a rule that can be generalized across materially similar cases.",
    "context": "You demand reasons that survive a change in the parties. Neutral-principles theory asks a court to state a constitutional rule it is prepared to apply across materially similar cases, including cases where the political beneficiaries are reversed. The ideal is not political neutrality in the impossible sense of having no values; it is generality in judicial justification. A court that cannot explain why its rule applies beyond the favored litigant is probably deciding the result first and manufacturing doctrine afterward. This fits the Legal-Process idea of reasoned elaboration: judicial authority depends partly on giving legal reasons appropriate to an institution that decides cases through precedent. The approach can still produce strong judicial review. Its restraint lies in the form of justification—principles must be capable of becoming law for future cases, not one-off reasons for today's outcome."
  },
  "pragmatist_mainstream": {
    "opening": "You think hard cases sometimes leave judges with a real choice rather than a hidden answer waiting to be discovered. When that happens, consequences, administrability, incentives, and institutional performance can be legitimate reasons for choosing among legally defensible options.",
    "context": "You allow practical consequences to enter legal reasoning in their own right when conventional materials leave real room. A Pragmatist judge asks how competing rules will work, what incentives they create, whether courts or agencies can administer them, and how much disruption a change will cause. Text and precedent remain important partly because predictable rules have good consequences; they are not sacred simply because they are formal. This separates Pragmatism from Purposivism, where consequences usually matter as evidence of or means to a statutory objective, and from hard Textualism, where a bad consequence ordinarily cannot overcome enacted meaning. The method is candid about judicial choice but demanding in another way: consequences are plural and uncertain, so the judge must compare institutional effects rather than invoke 'workability' as a slogan for a preferred result."
  },
  "pragmatist_obsolescence": {
    "opening": "You think an old statute can become so badly mismatched with the later legal order that courts should not mechanically extend it forever. In an extreme case, judicial doctrine can force contemporary political institutions to take a fresh look rather than letting obsolete law govern by inertia.",
    "context": "You are willing to confront the problem of statutes that survive long after the legal world around them has changed. Ordinary Textualism says an old enactment remains law until Congress amends it, however badly it now fits. Statutory-obsolescence theories give courts a more active role when later doctrine, institutions, or social conditions make literal extension of the old rule distort the contemporary legal system. A 'second look' approach can force present political institutions to reconsider or reaffirm the obsolete rule instead of letting inertia do the work of legislation. The proposal stops short of giving judges a general repeal power; its justification depends on unusual temporal mismatch and legislative blockage. Your Pragmatism is thus aimed at a specific failure mode of source-bound law: rules can remain formally valid while becoming functionally disconnected from the system in which courts must apply them."
  },
  "pluralist_mainstream": {
    "opening": "You think several forms of legal argument can be legitimate at once. Text, history, precedent, structure, prudence, purpose, and other modes each answer different kinds of legal questions, so no single method should automatically control every hard case.",
    "context": "You reject the idea that one interpretive tool can do all the work. Text, history, precedent, structure, purpose, prudence, and constitutional principle can each supply genuinely legal reasons, and a serious theory has to explain how they coexist rather than reclassify all of them as evidence for one master source. This is stronger than simply observing that judges look at many things. Interpretive Pluralism treats the different modes as legitimate forms of argument with their own conventions and strengths. A clear precedent may sit uneasily with history, or structural logic may point away from the narrowest textual reading; those conflicts are where the pluralist account has to do its work. Your method accepts that legal reasoning sometimes requires choosing among incommensurable considerations rather than pretending one formula mechanically ranks them all. The discipline lies in using recognizable legal modes openly and consistently."
  },
  "pluralist_practical": {
    "opening": "You think several kinds of legal reasoning are legitimate, but you resist giving them a fixed ranking that applies to every case. Text, history, precedent, purpose, structure, and consequences can change in importance depending on the legal problem being decided.",
    "context": "You accept several legitimate forms of legal argument without giving them a permanent pecking order. Text can dominate a dispute about a precisely drafted statute; precedent may dominate a deeply settled constitutional issue; purpose or institutional competence may become central where an open-ended delegation is the problem. Practical-reasoning pluralism treats that variation as a feature of law rather than evidence that the judge lacks a method. The judge still has to explain why a particular consideration deserves priority in this case and remain consistent about what features make that priority appropriate. Compared with a more formal modal pluralism, your approach is less interested in assigning each mode a fixed jurisdiction. Compared with low-theory judging, it is more self-conscious: the plurality of legal reasons is an affirmative theory, not simply the absence of a general rule."
  },
  "sociological_mainstream": {
    "opening": "You think legal theory should pay close attention to what law actually does in society, not only to the formal rules written in statutes and cases. Social interests, institutions, and the real operation of doctrine can be legally important to understanding and developing the law.",
    "context": "You judge legal doctrine partly by the social relationships it actually organizes. Sociological Jurisprudence grew from dissatisfaction with analysis that treated legal concepts as self-contained and ignored how rules operate in practice. A rule about contract, property, policing, or administration can look coherent on paper while producing very different patterns once institutions, incentives, and unequal bargaining power enter. The method therefore asks about social interests, institutional behavior, and the gap between law on the books and law in action. It is not simply Pragmatism. Pragmatism uses consequences as reasons for choosing among legal options; Sociological Jurisprudence makes the real social operation of law part of understanding the legal problem itself. Your approach expects doctrine to be informed by the society it regulates rather than developed in conceptual isolation."
  },
  "sociological_pluralism": {
    "opening": "You think sufficiently organized institutions outside the state can themselves form genuine legal orders. Churches, unions, universities, professional bodies, or other associations may create law for their members even when the state did not enact or formally recognize those rules.",
    "context": "You do not assume the state has a monopoly on law. Institutional legal pluralism treats some organized nonstate bodies—churches, unions, universities, professional associations, customary communities—as capable of sustaining their own legal orders when they possess offices, procedures, authority structures, and rules that govern members. The claim is stronger than saying social norms influence official law. A norm can belong to a genuine legal order even if the state did not enact it and might not fully recognize it. This changes the map of jurisprudence: the question 'what is law?' becomes partly institutional rather than simply governmental. State law remains powerful because it can coerce, recognize, suppress, or coordinate other orders, but it is not the only possible site of legality. The theory widens the object of legal analysis before asking how courts should treat the competing orders."
  },
  "sociological_living": {
    "opening": "You think the most important law governing much of social life can arise from the actual norms of families, businesses, associations, and communities even when those norms were never formally enacted. Jurisprudence should therefore study the living rules people really use, not only official doctrine.",
    "context": "You give serious legal weight to the norms people actually live under. Ehrlich's idea of living law directs attention away from statutes and appellate opinions toward the rules embedded in families, businesses, associations, workplaces, and communities. Those norms often organize conduct more effectively than formal law and can explain why an official rule has little practical effect. The point is not that every social habit automatically becomes enforceable law. It is that jurisprudence badly misdescribes legal order if it studies only what courts announce. Your method would ask how a doctrine interacts with the expectations and institutions already governing the relationship, and whether official intervention reinforces, displaces, or misunderstands them. Compared with institutional legal pluralism, the emphasis is less on declaring a separate legal system and more on locating the operative norms that actually structure social life."
  },
  "sociological_free": {
    "opening": "You think authoritative legal sources should control while they genuinely answer the case, but judges should be honest when those sources run out. In a real gap, the court may need to construct a rule through disciplined inquiry into social facts, practical needs, equity, and justice rather than pretending the answer was already hidden in the text.",
    "context": "You insist on honesty about genuine gaps in positive law. Free Scientific Research begins with enacted law, custom, and other authoritative sources and follows them as far as they go. When they really stop, the judge should not disguise lawmaking as deduction from words that do not answer the case. The court may instead construct a rule using disciplined inquiry into social facts, the structure of the relationship, practical needs, equity, and justice. That makes the theory more source-respecting than broad Pragmatism at the front end and more openly creative than Textualism at the back end. Its discipline lies in the sequence: exhaust the authoritative materials first, then acknowledge the gap, then justify the new rule through public reasons rather than intuition. The judge becomes a lawmaker only where the existing law has genuinely left work to be done."
  },
  "realist_mainstream": {
    "opening": "You doubt that formal legal doctrine fully explains what judges do in genuinely hard cases. When respectable legal arguments support more than one result, background views, institutional setting, practical consequences, and other extra-doctrinal factors can help explain which answer a court actually chooses.",
    "context": "You are skeptical of accounts of judging that infer outcomes directly from formal doctrine. Legal Realists focused on the cases where lawyers can marshal respectable arguments on both sides and asked what actually explains the choice among them. Institutional setting, judicial background, practical consequences, professional habits, and politics may all matter once doctrine underdetermines the result. The claim is descriptive before it is prescriptive. A Realist can still favor Textualism, Pragmatism, or another method as the rule judges ought to follow; Realism asks whether that rule fully explains what courts in fact do. It also does not imply that law is meaningless. Doctrine can narrow the field sharply while leaving several legally defensible outcomes. Your view treats empirical study of courts as necessary to understand that remaining space rather than assuming judicial opinions reveal the whole causal story."
  },
  "realist_fact": {
    "opening": "Your Realism extends beyond uncertainty in legal rules to uncertainty about what happened. Witness credibility, memory, trial factfinding, and the psychology of judges and juries can make legal outcomes unpredictable even if appellate doctrine were much clearer.",
    "context": "Your Realism reaches the trial level, where uncertainty often enters before doctrine is applied. Fact skepticism points out that courts do not receive a clean set of facts; they build one from witnesses, documents, credibility judgments, memory, expert testimony, and procedural rules. A perfectly clear legal standard can produce very different outcomes if judges or juries disagree about what happened. That shifts attention away from appellate doctrine and toward the machinery of proof. Better rules cannot eliminate uncertainty created by human perception and factfinding, and predictions about litigation require understanding those processes. Legal indeterminacy is only one source of unpredictability; uncertainty in factfinding can persist even when doctrine is clear. The factual premises of adjudication can be unstable even when the law itself is not."
  },
  "realist_functional": {
    "opening": "You are suspicious of abstract legal labels doing the work of an argument. When a case turns on concepts such as property, corporation, or jurisdiction, you want the court to translate the label into the concrete conduct, consequences, and policy choices the concept is being used to justify.",
    "context": "You distrust legal concepts that appear to decide a case merely because a court has attached a label to the facts. Functional Realism asks what the category is doing. Saying something is 'property,' a 'corporation,' or within 'jurisdiction' should not end analysis if the real dispute concerns who may act, who bears a cost, or which institution should control. Legal categories remain useful shorthand, but they become suspect when the definition simply restates the desired outcome. Your method translates abstract doctrine into concrete consequences and institutional choices, then asks whether the concept still earns its work. This is not a rejection of rules so much as a demand that legal reasoning expose the policy or functional judgment hidden behind conceptual language. The judge cannot avoid responsibility for that judgment by pretending the noun itself decided the case."
  },
  "political_constitutionalist": {
    "opening": "You think reasonable people can disagree about constitutional rights without either side acting unlawfully, and that functioning representative institutions often have the stronger claim to make those contested choices. Courts matter, but judges do not automatically deserve the final word merely because a dispute is constitutional.",
    "context": "You give representative politics a stronger claim to final authority in reasonable constitutional disagreement. Political Constitutionalism starts from the premise that citizens can take rights seriously and still disagree about what those rights require. In a functioning democracy, handing the final word to judges may disrespect political equality by allowing a small, unelected body to settle questions on which the public and its representatives are equally entitled to reason. Courts can still enforce clear legal rules, interpret statutes, and contribute to public argument; the theory is not indifference to rights. Its objection is to strong judicial finality as the default solution to contested rights. Democratic participation and equal voice count as constitutional goods too. The institutional question is not only which body is likelier to reach the morally better answer, but which has the stronger claim to decide when no answer is beyond reasonable dispute."
  },
  "thayerian": {
    "opening": "You think courts should keep the power of judicial review but use it only when the legislature's constitutional error is clear, not merely because judges would interpret the Constitution differently. Reasonable constitutional disagreement should usually be resolved through politics rather than judicial invalidation.",
    "context": "You retain judicial review but raise the threshold for using it. In Thayer's clear-error approach, a court does not invalidate legislation merely because the judges think their constitutional reading is better. The legislature's judgment stands unless it falls outside the range of reasonable constitutional interpretation. That changes the judicial question from 'what do we think the Constitution means?' to 'is the political branch's answer one the Constitution can reasonably bear?' Courts still decide easy violations and preserve legal boundaries; they simply do not treat every interpretive disagreement as judicial error correction. The approach pushes constitutional responsibility back toward legislators and voters, who cannot assume judges will settle every doubtful question for them. It is narrower than Political Constitutionalism because it works as a doctrine of judicial restraint rather than a wholesale theory of democratic constitutional authority."
  },
  "popular": {
    "opening": "You think the Constitution ultimately belongs to the people rather than to courts. Judges may decide cases and enforce judgments, but constitutional meaning should remain part of democratic constitutional politics rather than becoming the exclusive property of the judiciary.",
    "context": "You reject judicial supremacy without reducing the Constitution to ordinary majority rule. Popular Constitutionalism treats constitutional interpretation as a practice in which citizens, movements, elections, legislatures, executives, and courts all participate. Judicial judgments bind the parties and court doctrine can be politically influential, but the Supreme Court does not acquire an exclusive title to constitutional meaning simply by deciding a case. The theory grew partly from periods in American history when constitutional argument was carried through politics rather than confined to litigation. Its difficult problem is settlement: a constitutional order needs enough stability for officials and citizens to know what law governs, yet too much judicial monopoly can turn public constitutional responsibility into spectator sport. Your position keeps constitutional authority in democratic political life rather than locating it entirely in the judiciary."
  },
  "departmentalist": {
    "opening": "You think courts are authoritative when they decide cases, but other branches retain their own constitutional duties rather than being required to treat the Supreme Court's interpretation as the Constitution's single binding meaning for everyone.",
    "context": "You distribute constitutional interpretation among the branches. Courts have authority to decide cases and their judgments bind the parties, but Congress and the President retain constitutional duties within their own offices. A Supreme Court opinion is powerful precedent without automatically becoming the one permissible constitutional view for every governmental actor. This is Departmentalism. It differs from Popular Constitutionalism because the emphasis is institutional rather than directly popular: coordinate departments each possess a sphere of interpretive responsibility. The practical question is how to preserve a functioning legal order when branches disagree. Departmentalists usually distinguish obedience to judgments from universal acceptance of judicial reasoning, allowing conflict over constitutional meaning while keeping the ordinary legal effects of adjudication intact. Your view resists turning judicial review into a general monopoly on constitutional interpretation."
  },
  "political_process": {
    "opening": "You usually leave substantive political disagreement to democratic institutions, but your deference ends when the political process itself is distorted. Courts have a stronger reason to intervene when groups are excluded, channels of change are blocked, or incumbents can entrench themselves against ordinary democratic correction.",
    "context": "You reserve the strongest judicial role for failures in the democratic machinery itself. Political Process theory leaves most disputes over substantive policy and contested values to politics, but it distrusts political actors when they control the rules that determine who can participate, organize, vote, or dislodge them from power. Courts are comparatively well placed to police blocked channels of political change and forms of exclusion that prevent a group from bargaining on ordinary terms. Ely's representation-reinforcing argument is that judicial review is most legitimate when it makes democracy work rather than replacing democratic choices with judges' preferred values. A court can be deferential in ordinary policy cases and aggressive in voting, representation, or exclusion cases without contradiction. The trigger is a defect in political self-correction, not simply the importance of the right asserted."
  },
  "political_process_responsive": {
    "opening": "You think courts should respond to failures of democracy, but not with one fixed level of scrutiny or one standard remedy. The timing, intensity, reasoning, and relief should depend on the particular democratic blind spot and on what courts are actually capable of improving.",
    "context": "You share the process-theory premise that judicial intervention is strongest when democracy cannot correct itself, but you do not think every democratic failure calls for the same judicial response. Responsive review asks what kind of malfunction is present—exclusion, entrenchment, inertia, distorted representation—and what courts can realistically improve. The intensity of scrutiny, timing of intervention, demanded reasons, and scope of remedy can then vary with the institutional problem. This makes the method more tailored than classic representation reinforcement. A court must identify the specific democratic defect and justify why its intervention is likely to repair rather than replace the political process. Judicial power is neither categorically strong nor weak; it is calibrated to the failure and to the court's own competence."
  },
  "minimalist": {
    "opening": "You think courts should decide no more than they need to decide. Narrow holdings, limited remedies, and leaving broader theories unresolved can protect rights while preserving room for later courts, democratic institutions, and social learning.",
    "context": "You prefer courts to settle the case without settling more law than the case requires. Judicial Minimalism favors narrow holdings and often shallow reasons: decide the concrete dispute, preserve room for later cases, and avoid announcing a comprehensive constitutional theory when a smaller rule will do. This can lower the cost of judicial error, make agreement among judges easier, and leave contested questions open to political and social learning. Minimalism is not the same as deference. A court may strike down government action decisively while keeping the rationale and remedy confined to the problem before it. The method concerns the size and depth of the judicial move. Its weakness is the mirror image of its virtue: a sequence of narrow rulings can postpone needed clarity and force litigants to rediscover the boundaries case by case."
  },
  "minimalist_passive": {
    "opening": "Your judicial restraint goes beyond narrow opinions. You think timing, justiciability, and strategic avoidance can themselves be legitimate tools, allowing courts to decline or postpone constitutional decisions when immediate resolution would needlessly intensify the conflict.",
    "context": "You are willing to use timing and justiciability as forms of judicial restraint. The passive-virtues tradition goes beyond writing narrow merits opinions; it treats standing, ripeness, avoidance, procedural posture, and sometimes delay as tools for deciding when a constitutional confrontation should occur. A court may leave a divisive question unresolved so politics, public debate, or later factual development can change the setting in which the issue returns. That can reduce the damage from premature constitutional settlement and preserve judicial authority for moments when a decision is more necessary. It can also leave genuine rights violations without a prompt remedy and allow procedure to conceal substantive choices. Your approach accepts that tradeoff because the temporal dimension of judicial power—when to decide—is part of constitutional judgment, not just docket management."
  },
  "weak_form": {
    "opening": "You think courts can decide rights independently without giving them an entrenched monopoly on the final constitutional word. A constitutional system may authorize legislatures to respond to a judicial rights ruling through a structured legal process short of formal constitutional amendment.",
    "context": "You divide authority over rights rather than assigning a permanent final word to one institution. Weak-form review lets courts decide constitutional rights independently and give those judgments immediate legal force, while preserving a structured path for legislatures to respond without the extraordinary burden of formal constitutional amendment. The arrangement differs from ordinary political disagreement with a court because the response mechanism is built into the constitutional design. It also differs from legislative supremacy because courts still force government to confront a legal rights judgment publicly and specifically. How weak or strong the system becomes depends on the response rule: an easy override may reduce review to advice; an arduous one can recreate judicial finality in practice. Your position prefers institutional dialogue to an all-or-nothing choice between courts and legislatures."
  },
  "formalist_mainstream": {
    "opening": "You think legal form matters because rules, categories, assigned powers, and prescribed procedures constrain decision-makers before the hard case arrives. Efficiency or fairness in a particular dispute is not enough to ignore a boundary the legal system has already drawn.",
    "context": "You give legal form independent value. Rules, categories, assigned powers, and prescribed procedures matter partly because they settle who may decide and how before officials confront the attractive facts of a particular case. Formalism accepts some loss of case-specific fit in exchange for notice, predictability, equality of treatment, and limits on discretion. The theory is broader than Textualism or Originalism. A judge could use nonoriginalist constitutional doctrine and still insist that once the law establishes a category or procedure, courts should not bend it for convenience. Conversely, a textualist can be quite flexible in implementation. Your commitment concerns the architecture of decisionmaking: legal boundaries should sometimes control even when an all-things-considered judgment would produce a more appealing result."
  },
  "formalist_nondelegation": {
    "opening": "You think some governmental powers must remain with the institution the Constitution assigned them to, even when Congress clearly wants to transfer the decision elsewhere. Efficiency and explicit authorization cannot cure a delegation that crosses the constitutional boundary itself.",
    "context": "You treat some transfers of policymaking authority as unconstitutional even when Congress clearly authorizes them. The question is not whether the agency received permission; it is whether the Constitution allows Congress to hand over that kind of legislative judgment in the first place. This is stronger than a clear-statement rule or major-questions doctrine, which may simply demand explicit authorization. A true nondelegation principle identifies a category of decisions Congress must make itself. The difficulty is drawing that category in a modern administrative state, where statutes routinely leave agencies discretion over technical and policy choices. Your approach is willing to sacrifice some flexibility and expertise to preserve the constitutional assignment of lawmaking responsibility. Separation of powers operates as a legal boundary, not merely a warning against dangerous concentrations of power."
  },
  "formalist_unitary": {
    "opening": "You think executive power carries a strong principle of presidential control. Congress may create offices and assign duties, but it cannot fully insulate executive administration from the President's authority to supervise and direct the execution of federal law.",
    "context": "You read Article II as assigning executive administration to a President who must retain substantial control over those who exercise executive power. Congress may create offices and prescribe duties, but it cannot fully sever executive officials from presidential supervision without changing the constitutional allocation itself. The dispute with more accommodationist theories is not simply about political accountability. It concerns whether presidential direction is part of the legal definition of executive power. A strong unitary view therefore treats removal restrictions and independent agencies with suspicion when they prevent the President from controlling executive judgments. The harder cases involve adjudicative, professional, or quasi-legislative functions inside agencies, where categorical branch labels fit less neatly. Your position resolves those doubts in favor of a more unified chain of executive authority."
  },
  "formalist_rules": {
    "opening": "You think rules are valuable partly because they deny judges permission to reach the best all-things-considered result in every case. Predictability and constraint are worth some bad edge cases if the alternative is letting each decisionmaker reopen the merits whenever a rule feels too rigid.",
    "context": "You value rules for the decisions they prevent as much as for the decisions they produce. A genuine rule excludes some considerations that would otherwise seem relevant: a deadline still binds in a sympathetic case, and a categorical boundary still applies when balancing would favor an exception. Rule formalism makes that exclusion central. If every unusually compelling fact reopens the all-things-considered merits, the rule ceases to constrain precisely when constraint is costly. Predictability, equal treatment, and reduced discretion can justify tolerating hard edge cases. This is more than a preference for clarity: legal form can require an outcome the decisionmaker would reject if free to decide from scratch. Balancing is suspect because it returns excluded considerations to the judge one case at a time."
  },
  "functionalist_mainstream": {
    "opening": "You think separation of powers should protect accountability, checks, and each branch's basic capacity rather than enforce rigid institutional boxes for their own sake. Some overlap is constitutionally acceptable when the arrangement remains workable and does not destroy the core role of another branch.",
    "context": "You read separation of powers by asking what an institutional arrangement does rather than which tidy branch label it fits. Functionalism looks for threats to accountability, checks and balances, concentration of power, and each branch's ability to perform its core role. Overlap is not automatically unconstitutional. Agencies can combine rulemaking, enforcement, and adjudication, and Congress can design hybrid institutions, so long as the arrangement does not disable a constitutional actor or create the kind of unchecked power the structure is meant to prevent. Formalists start from assigned powers and categories; you start from the operation of the system. The advantage is accommodation of modern government. A flexible inquiry can also become too forgiving if almost any innovation can be redescribed as preserving the overall balance."
  },
  "functionalist_supervisory": {
    "opening": "You think modern administration can be constitutionally legitimate without either rigidly separating every governmental function or giving the President plenary control over every official judgment. The Constitution instead requires a system of lawful supervision and accountability across the administrative state.",
    "context": "You accept the modern administrative state but insist that constitutional legitimacy still requires supervision. Supervision, on this account, need not mean plenary presidential direction. Congress can create agencies with some independent judgment while courts, executive officials, internal procedures, inspectors, and reason-giving duties together ensure that administration remains lawful and accountable. This differs from the unitary-executive model, which tends to locate accountability in a chain of presidential control, and from laissez-faire Functionalism, which might be satisfied once the institution seems workable. Your model is more distributed. Agencies can participate in constitutional implementation themselves, but their discretion sits inside a network of review and oversight. The constitutional question becomes whether the system supplies enough lawful supervision, not whether every official judgment can be replaced by the President."
  },
  "functionalist_admin": {
    "opening": "You think administrative adjudication can be constitutionally legitimate when Congress authorizes it and courts retain appropriate review. Assigning some disputes to agency adjudicators does not automatically violate the judicial role merely because the decision has legal consequences.",
    "context": "You are comfortable with administrative adjudication when the institutional safeguards are adequate. A strict Article III theory may treat the final imposition of serious private liability as judicial power that belongs in an independent court. Your approach looks at the arrangement as a whole: the kind of right being adjudicated, Congress's regulatory design, the agency's procedures and independence, and the scope of later judicial review. Combining administrative and adjudicative functions is not automatically disqualifying. The line is crossed when the arrangement undermines impartiality, strips courts of a constitutionally essential role, or concentrates authority without sufficient checks. This is a Functionalist answer to a structural problem: validity turns on how powers interact in practice rather than on the premise that every task must belong exclusively to one branch."
  },
  "proportionalist_mainstream": {
    "opening": "You prefer a structured form of balancing when government limits a right. The government should identify a legitimate goal, show that its measure actually advances that goal, explain why a less restrictive approach would not work, and justify the remaining burden on the right.",
    "context": "You use a structured test for government burdens on rights. Proportionality asks four linked questions: is the government's objective legitimate; does the measure actually advance it; is there a less rights-restrictive way to achieve roughly the same end; and is the remaining burden justified by the benefit? The method differs from loose balancing because each stage forces a separate explanation and can expose weak factual or policy assumptions. It also differs from categorical rights doctrine, where fitting the case inside a protected category may end the inquiry without comparing alternatives. Proportionality gives courts substantial evaluative responsibility, especially at necessity and final balancing, but makes that judgment visible and reviewable. Your approach prefers explicit justification over either absolute rules or an unstructured appeal to reasonableness."
  },
  "proportionalist_nonpositive": {
    "opening": "You think structured proportionality is not just a useful policy tool; it reflects the legal force of principles whose weight and moral justification are part of the law itself. Rights therefore require reasoned comparison rather than simple source-following or categorical rules.",
    "context": "You combine proportionality with a theory in which legal principles have force beyond simple source pedigree. Rights are not merely interests Congress or a constitution told judges to weigh; they are principles whose legal content depends partly on normative reasoning about justification. Proportionality provides the machinery for applying them. Government must identify a legitimate purpose, establish fit, confront less restrictive alternatives, and justify the residual burden. A source-based Positivist could apply the same test if positive law enacted it, but your account gives the underlying principles a more direct role in law itself. That places the method close to Alexy's principle-based theory: legal rights have weight, conflicts among them can be rationally structured, and adjudication requires reasoned comparison rather than either source-following alone or categorical exclusion."
  },
  "traditional_equity": {
    "opening": "You think courts do not gain a general power to solve a legal problem however effectively they can. Even when broader relief would work better, equitable remedies should ordinarily stay within historically grounded forms and protect the parties before the court.",
    "context": "You treat remedies as a question of lawful judicial power, not simply effectiveness. Finding a violation does not give a court authority to issue whatever order would solve the problem most completely. Traditional-equity theory asks what forms of relief historically belonged to courts of equity, who may receive that relief, and how an injunction operates on the parties before the court. That can produce a striking combination: strong enforcement on the merits but narrow relief afterward. The court may conclude that government acted unlawfully and still refuse to protect nonparties or redesign a regulatory program because those remedies exceed the judicial office. The argument is structural as much as historical—expanding equity can move courts from resolving cases toward making generally applicable policy. The restraint sits at the remedial stage rather than necessarily in the definition of the right."
  },
  "universal_relief": {
    "opening": "You think judicial relief is not categorically limited to protecting only the named plaintiff. When a government policy operates generally, a court may sometimes lawfully issue relief that protects affected nonparties rather than forcing everyone to bring the same lawsuit separately.",
    "context": "You allow judicial relief to reach beyond the named plaintiff in some cases. The debate is not whether courts may enforce rights vigorously, but what a remedy is supposed to do. A party-specific account says the court should redress the plaintiff's injury and leave everyone else to obtain their own judgment or use a class action. Your view accepts that a government rule operating uniformly may sometimes require broader relief, especially where piecemeal enforcement would leave the unlawful policy functioning against identically situated people. That does not automatically entail long-term structural supervision; a universal order can still target one discrete policy. The legal controversy turns on Article III, historical equity, statutory remedial authority, and the relationship between invalidating government action and protecting parties. You give courts more room to match the scope of relief to the scope of the unlawful rule."
  },
  "constitutional_common_law": {
    "opening": "You think courts may sometimes create legal rules that go beyond the Constitution's bare minimum in order to make a constitutional guarantee workable. Those implementing doctrines can be real law while remaining conceptually distinct from the underlying constitutional command.",
    "context": "You distinguish the Constitution from judicial rules designed to make the Constitution workable. Courts sometimes adopt prophylactic doctrines, evidentiary rules, or administrable tests that protect a constitutional right more broadly than the right's bare minimum would require in every case. Constitutional-common-law theory treats those rules as genuine law without pretending each detail is itself written into the Constitution. The distinction creates flexibility: an implementing rule can be revised, displaced by legislation in some settings, or adjusted as experience reveals its costs, while the underlying constitutional guarantee remains fixed. It also makes judicial lawmaking more candid. Rather than calling every protective doctrine the Constitution itself, the court can acknowledge an intermediate layer of judge-developed implementation. Your approach gives courts meaningful law-development authority while preserving a line between constitutional command and judicial machinery."
  },
  "remedial_equilibration": {
    "opening": "You think rights and remedies can shape one another. If a very broad understanding of a constitutional right would require remedies that courts regard as intolerably costly or intrusive, those remedial consequences may legitimately influence how the right itself is defined.",
    "context": "You reject a clean wall between defining a right and choosing a remedy. Courts know that broader rights can require expensive, intrusive, or institutionally difficult relief, and that knowledge can feed back into the substantive doctrine itself. Remedial equilibration describes this two-way pressure: the anticipated remedy can influence how the right is framed, while a strong substantive right can push courts toward more powerful relief. The theory is descriptive as well as normative because courts often adjust doctrine in ways that make enforcement manageable without announcing that remedies drove the change. Your position is willing to make that relationship explicit. The danger is obvious—rights can shrink because judges dislike the consequences of enforcing them. Constitutional doctrine, on this view, cannot be designed sensibly while pretending remedial capacity is irrelevant to what courts are willing and able to declare."
  },
  "structural_reform": {
    "opening": "You think a court can sometimes do more than order the government to stop one unlawful act. When the violation is built into an institution, effective adjudication may require structural reform, continuing supervision, and judicial oversight of the process of bringing the institution into legal compliance.",
    "context": "You treat some rights violations as defects in institutions rather than isolated unlawful acts. If a prison, school system, police department, or welfare bureaucracy is organized so that violations recur, an order directed at one plaintiff may leave the machinery untouched. Structural-reform litigation authorizes courts to require plans, change institutional practices, supervise compliance, and retain jurisdiction over time. That transforms the judicial role from resolving a discrete dispute toward managing a process of legal reconstruction. Defenders of this public-law model argue that effective rights enforcement sometimes demands institutional change; critics worry about expertise, democratic accountability, and the weak stopping rules of long-running decrees. Your approach accepts a larger remedial role when narrower orders have proved incapable of bringing the institution into lawful operation."
  },
  "nonpos_generic": {
    "opening": "You think recognized legal sources do not fully exhaust what law can require, but your answers do not reduce that claim to one simple moral override. Legal principle has a role that a purely source-based account cannot completely explain.",
    "context": "You reject source pedigree as a complete account of law, but your answers stop short of identifying one single non-Positivist mechanism. Several major theories occupy that territory for different reasons. Interpretivism treats principles that best fit and justify institutional practice as part of law. Natural-Law theories connect legal authority to practical reason while still giving positive enactment a large settlement role. Moral Impact and related one-system views understand official acts through the moral rights and duties they create. These positions can agree that social sources do not exhaust legal content while disagreeing sharply about what fills the gap, how much discretion judges possess, and when morality enters the analysis. Your profile supports the family resemblance more strongly than any one branch, so the safest conclusion is broad: legal validity or content cannot always be identified without normative reasoning."
  },
  "positivist_command": {
    "opening": "You understand law in strongly sovereign terms: legal rules are fundamentally commands issued by a determinate political authority, backed by the prospect of sanctions and sustained by habitual obedience. That is a much older and harder-edged form of Positivism than the social-rule theories that dominate modern legal philosophy.",
    "context": "You understand law through the relation between sovereign command and obedience. Austin's command theory treats a legal rule as the command of a determinate political superior, backed by sanctions, to people who habitually obey. That model captures the coercive side of law with unusual clarity, but it sits outside the modern Positivist mainstream. Modern rule-based Positivism objects that legal systems contain power-conferring rules, continuity across changes of government, and rules that bind officials themselves—features that do not fit comfortably into a simple command structure. Your account nonetheless keeps the command-theory insight that legal validity is explained through a social relation of political superiority and authorized coercion, not through the rule's moral merit. It is Positivist in source and strongly hierarchical in institutional form."
  },
  "positivist_pure": {
    "opening": "You think legal validity is structured through a hierarchy of authorizing norms: one rule is valid because a higher legal rule authorizes its creation, with the system ultimately unified by a presupposed basic norm rather than by morality, sovereign command, or ordinary social habit alone.",
    "context": "You understand legal validity as a chain of authorization inside a normative system. Kelsen's Pure Theory of Law asks why a regulation is legally valid, then looks upward: perhaps a statute authorizes it, a constitution authorizes the statute, and the legal order ultimately presupposes a basic norm that makes the hierarchy intelligible as one system. The theory deliberately brackets moral approval, political sociology, and sovereign psychology when answering the validity question. That separates it from command theory and from versions of Positivism built primarily around official social practices. The legal system is approached as a structure of norms authorizing the creation of other norms. Your view is Positivist because merit does not determine validity, but the architecture of validity is formal and hierarchical rather than simply a matter of accepted social rules."
  },
  "positivist_planning": {
    "opening": "You understand a legal system as a system of shared social planning. Legal institutions create, revise, and apply plans for coordinating conduct, and the authority of law is best explained through that planning structure rather than through sovereign commands or moral correctness.",
    "context": "You understand law as a system of social planning. Shapiro's Planning Theory starts from the practical problem of coordinating people who disagree, lack information, or cannot repeatedly deliberate from scratch. Legal institutions create plans about conduct and also plans about who may make, revise, and apply further plans. Constitutions, statutes, administrative delegations, and procedural rules all fit naturally into that structure. The theory remains Positivist because the existence of a legal plan depends on social facts about institutional creation and acceptance, not on whether the plan is morally sound. Compared with rule-of-recognition accounts, the emphasis shifts toward the planning function those practices perform; compared with command theory, authority is not reducible to threats from a sovereign. Your account explains law as an organized technology for settling and coordinating collective action."
  },
  "legal_constitutionalist": {
    "opening": "You give courts a strong independent responsibility to enforce constitutional rights and legal limits against political majorities. Judicial review is not merely a backstop for obvious mistakes; constitutional law can require courts to reach their own judgment even when elected institutions strongly disagree.",
    "context": "You assign courts an independent duty to enforce constitutional law against political majorities. The institutional claim is stronger than clear-error review, where legislation survives whenever the political branch's interpretation is reasonable, and stronger than Political Constitutionalism, which gives democratic institutions a presumptive claim to finality in rights disputes. Once a constitutional right or structural limit is established, electoral support does not dilute the court's obligation to apply it. That says nothing by itself about how the constitutional rule should be identified: an Originalist, Living Constitutionalist, or principle-based judge can each support strong-form review for different reasons. Your position is about final responsibility. Courts are not merely advisers or error-correctors at the margins; they are legal institutions authorized to displace political decisions that conflict with the Constitution as the court understands it."
  }
});

  const SPECIAL_IDS = new Set(["unusable_response","incoherent_response","outcome_driven_left","outcome_driven_right"]);
  const isOriginalist = (id) => ["originalist","public_meaning_originalist","original_intent_originalist","original_methods_originalist","framework_originalist"].includes(id);
  const has = (traits, key, min = 0.5) => Number(traits?.[key] || 0) >= min;
  const axis = (scores, id) => Number(scores?.[id] ?? 50);

  const OPENINGS = Object.freeze({
    constraint_correction: "A precedent that contradicts the governing law should be overruled. Age, repetition, and judicial prestige do not give courts authority to preserve an error indefinitely. Text, fixed constitutional meaning, rules, and structural limits bind the judge who dislikes the result just as much as the official whose conduct they restrain.",
    constraint_settlement: "Law includes the settlements courts and institutions have built over time. Text and historical meaning still constrain, but judges do not get to reset the legal system whenever a fresh analysis points somewhere else. Reliance, continuity, and stare decisis can make preservation legally responsible even when the earlier court probably got the underlying question wrong.",
    constraint_general: "Judges have a job with hard edges. Enacted words, fixed meaning, rules, and assigned powers control even when the result is clumsy, unpopular, or inefficient. Courts should enforce those limits without repairing the law around their own sense of justice or good policy.",
    developmental_settlement: "Constitutional law grows through precedent and practice. Later courts inherit that built structure; they do not start over from the founding every time a case arrives. Change should usually come through extension, distinction, and accumulated legal settlement, with continuity doing real legal work.",
    developmental_rights: "Constitutional commitments can acquire new legal content as doctrine, experience, and social understanding develop. Courts are responsible for carrying those commitments into the present, including against political majorities. Historical expectations constrain the starting point without freezing the law at the applications accepted generations ago.",
    moral_settlement: "Law answers to objective moral standards, and positive law still binds. Legislatures and constitutions settle questions that morality leaves open, so judges cannot reopen every enacted choice by announcing a better moral answer. Moral reasoning sets purposes and limits; lawful settlement supplies much of the rule people actually have to follow.",
    institutional_process: "Legal questions belong to institutions, not to an abstract super-court. Text, precedent, delegation, expertise, procedure, and reason-giving determine who gets to decide as much as they determine the answer. Courts should police the division of authority instead of absorbing every difficult legal judgment into the judicial role.",
    adaptive_pragmatic: "When law leaves room, judges should choose the rule that works. Consequences, incentives, administrability, and institutional performance are legitimate legal reasons in that space. Text and precedent earn weight through the stability and coordination they provide; neither deserves survival after it becomes a machine for producing avoidable dysfunction.",
    democratic_process: "Courts should hit hardest when democracy is rigged against self-correction. Exclusion, blocked political channels, and incumbent entrenchment justify intervention that ordinary policy disagreement does not. Once political competition can work again, judges should give the substantive fight back to politics.",
    democratic_deferential: "Five judges do not acquire superior authority merely because a constitutional question is difficult. When elected institutions adopt a reasonable constitutional view, courts should usually leave that judgment in place. Judicial review remains available for genuine legal violations, but reasonable disagreement belongs largely to democratic government.",
    rights_structured: "Rights are legal limits on government, and courts should enforce them without flinching when majorities push past them. The judgment still needs structure: purpose, fit, necessity, principle, and remedy discipline the court's reasoning. Strong judicial review is legitimate when the court can show the legal path from the right to the result.",
    rule_formalist: "A rule that disappears in the sympathetic case is barely a rule. Predictability, equal treatment, and limits on official discretion justify hard edges, including outcomes a judge would reject if free to weigh everything from scratch. The whole point is to deny the decisionmaker that freedom.",
    realist: "Hard appellate cases are not solved by doctrine alone. Legal materials narrow the field, then judges, institutions, facts, incentives, politics, and practical consequences help explain what happens inside the remaining space. A serious account of judging has to describe that causal machinery instead of treating the opinion's formal reasoning as the whole story.",
    sociological: "Law lives in institutions and social practices before it reaches an appellate reporter. The rules people actually follow, the interests doctrine organizes, and the way officials enforce it can matter more than the rule's elegant formulation on paper. Jurisprudence should study that lived legal order directly.",
    low_theory: "No master method gets permanent priority. Text, history, precedent, purpose, institutional competence, and consequences move in and out of the foreground with the case. The style is flexible and incremental, but when those materials conflict there is less theory telling the judge which one must win."
  });

  function selectOpeningId(classification, scores = {}) {
    const id = classification?.identity?.id || "mixed_jurisprudence";
    const t = classification?.traits || {};
    if (SPECIAL_IDS.has(id)) return null;
    if (id === "mixed_jurisprudence") return "low_theory";

    if (id === "legal_realist") return "realist";
    if (id === "sociological_jurist" || has(t,"method.law_in_action",0.65) || has(t,"source.institutional_legal_pluralism",0.5)) return "sociological";
    if (id === "natural_lawyer" || id === "common_good_constitutionalist" ||
        (has(t,"source.objective_morality",0.5) && has(t,"source.positive_law_settlement",0.4)))
      return "moral_settlement";
    if (id === "political_process_jurist" || id === "elyan" || has(t,"posture.process_reinforcement",0.5))
      return "democratic_process";
    if (id === "political_constitutionalist" || id === "thayerian" || id === "popular_constitutionalist" ||
        id === "departmentalist" || axis(scores,"post") >= 72)
      return "democratic_deferential";
    if (id === "legal_process_theorist" || has(t,"method.institutional_competence",0.5) ||
        has(t,"method.agency_interpretive_autonomy",0.5) ||
        (id === "textualist" && has(t,"separation.interpretive_accommodation",0.5)))
      return "institutional_process";
    if (id === "proportionalist" || has(t,"form.proportionality",0.5) ||
        (axis(scores,"post") <= 30 && axis(scores,"form") <= 32))
      return "rights_structured";
    if ((id === "living_constitutionalist" || id === "common_law_constitutionalist" || axis(scores,"time") <= 32) &&
        axis(scores,"prec") >= 62)
      return "developmental_settlement";
    if (id === "living_constitutionalist" || id === "common_law_constitutionalist" || axis(scores,"time") <= 28)
      return "developmental_rights";
    if (id === "pragmatist" || id === "purposivist" ||
        (axis(scores,"cons") <= 32 && axis(scores,"form") <= 38))
      return "adaptive_pragmatic";

    const constrained = axis(scores,"cons") >= 66 || axis(scores,"time") >= 66 ||
      axis(scores,"separ") >= 66 || axis(scores,"form") >= 66;
    if (constrained) {
      if (axis(scores,"prec") <= 32) return "constraint_correction";
      if (axis(scores,"prec") >= 68) return "constraint_settlement";
      if (id === "formalist" && axis(scores,"form") >= 72) return "rule_formalist";
      return "constraint_general";
    }
    if (id === "formalist" || axis(scores,"form") >= 74) return "rule_formalist";
    return "low_theory";
  }

  function buildOpening(classification, scores = {}) {
    const id = classification?.identity?.id || "mixed_jurisprudence";
    if (id === "unusable_response") return ROUTES.special_unusable.opening;
    if (id === "incoherent_response") return ROUTES.special_incoherent.opening;
    if (id === "outcome_driven_left" || id === "outcome_driven_right") return ROUTES.special_outcome.opening;
    const openingId = selectOpeningId(classification, scores);
    return OPENINGS[openingId] || OPENINGS.low_theory;
  }

  // Public narratives are deliberately champion-blind. A route may name a
  // theorist when the person's work is part of explaining the theory itself
  // (for example Dworkin, Fuller, Kelsen, or Ely), but route selection and prose
  // must never depend on which champion the matching layer selected.
  function selectContextId(classification, scores = {}) {
    const id = classification?.identity?.id || "mixed_jurisprudence";
    const t = classification?.traits || {};

    if (id === "unusable_response") return "special_unusable";
    if (id === "incoherent_response") return "special_incoherent";
    if (id === "outcome_driven_left" || id === "outcome_driven_right") return "special_outcome";

    // Originalism is selected from actual Originalist propositions, not merely
    // from the winning noun.
    const originalismEstablished =
      isOriginalist(id) ||
      has(t,"time.originalism_independent_authority",0.5);
    if (originalismEstablished) {
      if (id === "original_intent_originalist" || has(t,"time.original_intent",0.55)) {
        if (has(t,"time.construction_zone",0.5)) return "oi_construction";
        if (has(t,"time.intent_as_meaning",0.5)) return "oi_semantic";
        return "oi_mainstream";
      }
      if (id === "original_methods_originalist" || has(t,"time.original_methods",0.5)) return "opm_methods";
      if (id === "framework_originalist" || has(t,"time.construction_zone",0.5)) return "opm_construction";
      if (has(t,"source.objective_morality",0.5) && has(t,"source.positive_law_settlement",0.45))
        return "opm_higher_law";
      if (has(t,"time.original_law",0.5)) return "opm_original_law";
      if (has(t,"time.intratextualism",0.5)) return "opm_intratextual";
      if (has(t,"time.construction_zone",0.5)) return "opm_construction";
      if (has(t,"precedent.correctness_first",0.72) && axis(scores,"prec") <= 28) return "opm_correction";
      if (has(t,"precedent.stability",0.65) && axis(scores,"prec") >= 66) return "opm_settlement";
      if (id === "originalist" && !has(t,"time.public_meaning",0.5)) return "originalist_generic";
      return "opm_mainstream";
    }

    // Living / common-law constitutional development.
    if (id === "common_good_constitutionalist" || has(t,"method.common_good",0.5)) return "common_good";
    if (id === "common_law_constitutionalist" || has(t,"time.common_law_development",0.55)) {
      if (has(t,"source.common_law_fundamental_rights",0.5)) return "common_law_strong_rights";
      if (has(t,"source.morality_incorporated",0.5) || axis(scores,"sorc") >= 65) return "common_law_source_bound";
      if (has(t,"time.ordered_liberty_tradition",0.5)) return "common_law_tradition";
      return "common_law_mainstream";
    }
    if (id === "living_constitutionalist" || has(t,"time.living_content",0.7)) {
      if (has(t,"time.democratic_constitutionalism",0.5)) return "living_democratic";
      if (has(t,"time.transformative_constitutionalism",0.5)) return "living_transformative";
      if (has(t,"time.constitutional_moments",0.5)) return "living_moments";
      return "living_mainstream";
    }

    // Source-of-law theories.
    if (id === "natural_lawyer") {
      if (has(t,"source.strong_natural_law",0.5)) return "natural_law_strong";
      return "natural_law_mainstream";
    }
    if (id === "interpretivist" || id === "dworkinian") return "interpretivist";
    if (id === "fullerian") return "fullerian";
    if (id === "nonpositivist" || id === "moral_impact_theorist" || id === "radbruchian") {
      if (id === "moral_impact_theorist" || has(t,"source.moral_impact",0.5)) return "nonpos_moral_impact";
      if (has(t,"source.moral_practice",0.5)) return "nonpos_moral_practice";
      if (id === "radbruchian" || has(t,"source.extreme_injustice",0.5)) return "nonpos_extreme";
      return "nonpos_generic";
    }
    if (id === "positivist" || id === "inclusive_positivist" || id === "exclusive_positivist") {
      if (has(t,"source.command_theory",0.5)) return "positivist_command";
      if (has(t,"source.basic_norm",0.5)) return "positivist_pure";
      if (has(t,"source.planning_theory",0.5)) return "positivist_planning";
      if (has(t,"source.normative_positivism",0.5)) return "positivist_normative";
      if (id === "inclusive_positivist" || has(t,"source.morality_incorporated",0.5)) return "positivist_inclusive";
      if (id === "exclusive_positivist" || has(t,"source.source_thesis",0.5)) return "positivist_exclusive";
      return "positivist_mainstream";
    }

    // Statutory / adjudicative methods.
    if (id === "textualist") {
      if (has(t,"method.categorical_textual_rights",0.5)) return "textualist_categorical";
      if (has(t,"constraint.contextual_textualism",0.5) &&
          (has(t,"separation.interpretive_accommodation",0.5) || has(t,"precedent.settlement",0.55)))
        return "textualist_institutional";
      if (has(t,"constraint.enacted_bargain",0.55)) return "textualist_bargain";
      return "textualist_mainstream";
    }
    if (id === "intentionalist") {
      if (has(t,"method.congress_aware_interpretation",0.5)) return "intentionalist_congress";
      if (has(t,"constraint.imaginative_reconstruction",0.5)) return "intentionalist_imaginative";
      return "intentionalist_mainstream";
    }
    if (id === "purposivist") {
      if (has(t,"form.proportionality",0.5)) return "purposivist_proportional";
      return "purposivist_mainstream";
    }
    if (id === "legal_process_theorist") {
      if (has(t,"method.agency_interpretive_autonomy",0.5)) return "legal_process_agency";
      if (has(t,"method.neutral_principles",0.5)) return "legal_process_neutral";
      return "legal_process_mainstream";
    }
    if (id === "pragmatist") {
      if (has(t,"method.statutory_obsolescence",0.5)) return "pragmatist_obsolescence";
      return "pragmatist_mainstream";
    }
    if (id === "interpretive_pluralist") {
      if (has(t,"method.practical_reasoning",0.5)) return "pluralist_practical";
      return "pluralist_mainstream";
    }
    if (id === "sociological_jurist") {
      if (has(t,"source.institutional_legal_pluralism",0.5)) return "sociological_pluralism";
      if (has(t,"method.living_law",0.5)) return "sociological_living";
      if (has(t,"method.free_scientific_research",0.5)) return "sociological_free";
      return "sociological_mainstream";
    }
    if (id === "legal_realist") {
      if (has(t,"realism.fact_skepticism",0.5)) return "realist_fact";
      if (has(t,"realism.functional_anti_conceptual",0.5)) return "realist_functional";
      return "realist_mainstream";
    }

    // Judicial authority.
    if (id === "legal_constitutionalist") return "legal_constitutionalist";
    if (id === "thayerian") return "thayerian";
    if (id === "political_constitutionalist" || id === "waldronian") {
      if (has(t,"posture.weak_form",0.5)) return "weak_form";
      return "political_constitutionalist";
    }
    if (id === "popular_constitutionalist") return "popular";
    if (id === "departmentalist") return "departmentalist";
    if (id === "political_process_jurist" || id === "elyan") {
      if (has(t,"posture.responsive_review",0.5)) return "political_process_responsive";
      return "political_process";
    }
    if (id === "minimalist" || id === "bickelian") {
      if (has(t,"posture.passive_virtues",0.5)) return "minimalist_passive";
      if (has(t,"posture.weak_form",0.5)) return "weak_form";
      return "minimalist";
    }
    if (id === "weak_form_constitutionalist") return "weak_form";

    // A remedial theory becomes the context focus only after the broader
    // constitutional/source/method/authority theories above have had a chance
    // to explain the respondent.
    if (has(t,"remedies.equilibration",0.5)) return "remedial_equilibration";
    if (has(t,"remedies.constitutional_common_law",0.5)) return "constitutional_common_law";
    if (has(t,"remedies.universal_relief_theory",0.5) && axis(scores,"remed") <= 38) return "universal_relief";
    if (has(t,"remedies.traditional_equity",0.5) && axis(scores,"remed") >= 62) return "traditional_equity";
    if (has(t,"remedies.structural",0.8) && has(t,"remedies.supervision",0.6) && axis(scores,"remed") <= 24) return "structural_reform";

    // Structure / form.
    if (id === "formalist") {
      if (has(t,"separation.strong_nondelegation",0.5)) return "formalist_nondelegation";
      if (has(t,"separation.unitary_executive",0.5)) return "formalist_unitary";
      if (has(t,"form.anti_discretion",0.65) || has(t,"form.rules",0.78)) return "formalist_rules";
      return "formalist_mainstream";
    }
    if (id === "functionalist") {
      if (has(t,"separation.supervisory_duty",0.5)) return "functionalist_supervisory";
      if (has(t,"separation.administrative_adjudication",0.5)) return "functionalist_admin";
      return "functionalist_mainstream";
    }
    if (id === "proportionalist" || id === "alexyan") {
      if (axis(scores,"sorc") <= 35 || has(t,"source.principles_are_law",0.5)) return "proportionalist_nonpositive";
      return "proportionalist_mainstream";
    }

    return "low_theory";
  }

  function fromId(id) {
    const route = ROUTES[id] || ROUTES.low_theory;
    return { id: ROUTES[id] ? id : "low_theory", opening: route.opening, context: route.context };
  }

  function build(classification, scores = {}, explicitId = null) {
    const id = explicitId && ROUTES[explicitId] ? explicitId : selectContextId(classification, scores);
    const route = ROUTES[id] || ROUTES.low_theory;
    return {
      id: ROUTES[id] ? id : "low_theory",
      opening: buildOpening(classification, scores),
      context: route.context
    };
  }

  function wordCount(text) {
    return String(text || "").trim().split(/\s+/).filter(Boolean).length;
  }

  global.LAW_RESULT_NARRATIVE = Object.freeze({
    ROUTES,
    OPENINGS,
    selectOpeningId,
    buildOpening,
    selectContextId,
    fromId,
    build,
    wordCount
  });
})(globalThis);
