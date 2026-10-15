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
    "context": "This result requires repeated reversals across politically mirrored cases. Each pair keeps the legal structure roughly constant while changing the political beneficiary. Consequences, democratic legitimacy, and rights protection can all be legitimate parts of a jurisprudence; the problem arises when the governing legal principle itself moves with the preferred side. Once that happens across several domains, almost any doctrinal label can be reconstructed after the fact. LAWvalues reports the axis pattern without treating it as a stable method."
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
    "context": "Original Methods theories move the historical inquiry from ordinary language toward historical legal practice. A legal text can carry technical meanings, settled canons, and background rules that a competent legal reader at the time would have used automatically. Those conventions may resolve ambiguities that appear open when the text is read through modern linguistic habits. The judge reconstructs part of the historical law of interpretation itself. This approach can produce results different from a simple ordinary-public-reader test even though both remain committed to historical fixation. The central evidence includes legal treatises, interpretive customs, drafting conventions, and the broader legal setting in which the constitutional text operated."
  },
  "opm_original_law": {
    "opening": "You think the deepest Originalist question is not simply what the Constitution's words meant to readers, but what law the Constitution originally made. That inquiry can include background legal rules, technical meanings, and lawful mechanisms of change, making constitutional judging a reconstruction of an original legal system rather than a purely linguistic exercise.",
    "context": "Original-Law theory asks what law the Constitution created at the founding. Communicative meaning is part of that inquiry, alongside background doctrines, technical legal categories, jurisdictional rules, and mechanisms for lawful change. A clause that looks underdeterminate at the level of ordinary language may have had a determinate legal effect once those surrounding rules are restored. The approach shifts Originalism from historical semantics toward reconstruction of an earlier legal system. It often leaves less space for later judicial construction because some apparent gaps were already filled by law operating in the background. The historical object is the legal rule produced by the Constitution, not a dictionary snapshot of its words."
  },
  "opm_intratextual": {
    "opening": "You read the Constitution as a connected legal document rather than a collection of isolated clauses. Historical meaning still controls, but ambiguous language should be understood through recurring words, parallel provisions, structural relationships, and the way the document's parts fit together as a whole.",
    "context": "Intratextual interpretation treats the Constitution as one coordinated legal instrument. Repeated language, parallel structures, related grants of power, and the placement of provisions can illuminate a disputed clause from inside the document itself. The method remains historically fixed because those relationships existed in the enacted Constitution from the start. It simply uses more of the enacted document as evidence. A term used in Article I may clarify the same term elsewhere; symmetry between provisions may reveal a structural distinction that an isolated phrase conceals. This approach is especially useful where constitutional architecture carries information that sentence-level reading misses."
  },
  "opm_correction": {
    "opening": "You think constitutional meaning was fixed at adoption, and you give relatively little weight to precedent once you are convinced that a later court replaced that law with a mistaken rule. Stability matters, but it cannot permanently turn a judicial error into the Constitution itself.",
    "context": "Modern public-meaning Originalism shifted the historical inquiry away from private framers' intentions and toward the meaning carried by the enacted Constitution. That leaves a separate question about judicial precedent. Correction-first writers treat stare decisis as a doctrine of adjudication subordinate to the constitutional source. Their debates often turn on forms of reliance: completed transactions and property arrangements create stronger settlement interests than abstract reliance on a line of doctrine. A precedent can also generate later rules that make reversal institutionally costly. Restorationist Originalism accepts more of those costs when continued adherence would let judicial doctrine displace the superior law that gave courts authority in the first place."
  },
  "opm_settlement": {
    "opening": "You think the Constitution has fixed historical meaning, but you do not treat every departure from that meaning as something courts must immediately erase. Judges inherit an already-developed legal system, so precedent, reliance, and institutional continuity can matter even when fresh historical analysis points elsewhere.",
    "context": "Public-meaning Originalism fixes constitutional meaning at adoption, yet that historical rule does not mechanically dictate the treatment of later precedent. Stare decisis can operate as an implementation doctrine that mediates between the original law and the legal system courts actually inherit. Reliance comes in different forms—private ordering, governmental institutions, doctrinal dependence—and each can strengthen the case for continuity. Some precedent-accommodating theories also distinguish the certainty of historical error from the cost of correction. The result is a layered account: the old decision may remain wrong about the Constitution while still generating legal reasons that constrain what today's court should do."
  },
  "opm_higher_law": {
    "opening": "You think objective moral principles help explain why law can have authority, but you also think law exists to settle questions judges could otherwise keep reopening. That makes historically fixed constitutional law compatible with Natural Law: moral reasoning helps explain why legitimate positive law binds rather than giving judges a standing license to replace it.",
    "context": "Classical Natural Law supplies a vocabulary for explaining why positive constitutional settlement has authority. The key device is determination: practical reason establishes broad requirements, while legitimate lawmakers choose one concrete rule from several morally permissible options. Constitutional enactment can then settle institutional structure, procedure, and rights rules without claiming that morality itself dictated every detail. Originalist historical inquiry identifies the content of that positive settlement. Higher-law principles remain relevant to the legitimacy and limits of authority, but ordinary adjudication receives much of its determinate content from the law already promulgated. That is why this combination can be stricter about positive text than many people expect from a Natural-Law theory."
  },
  "oi_mainstream": {
    "opening": "You think constitutional interpretation should recover the intentions behind the Constitution, not merely the public meaning later readers can extract from the enacted words. The enacting generation's purpose is part of what gives the constitutional rule its content, making authorial intention legally central rather than merely historical evidence.",
    "context": "Original Intent makes the lawmaking intention part of constitutional interpretation. The inquiry reconstructs what the enacting generation meant to communicate or accomplish through the provision, using drafting history, debates, institutional acts, and the structure of the enactment. Collective intention creates the main difficulty because a constitution has many authors and ratifiers. Serious intentionalist theories look for an institutional intention expressed through the lawmaking process, not stray private motives. Conflict with Public Meaning appears when the best evidence of that intention diverges from the meaning the enacted words would have conveyed to the public. Intentionalism gives the lawmaking choice greater authority in that conflict."
  },
  "oi_semantic": {
    "opening": "You treat original intent as a theory of meaning, not merely as a device for restraining judges. On your view, interpreting a constitutional text means recovering what its authors intended to communicate, so intent can control because it is part of what the enacted language meant.",
    "context": "Semantic Intentionalism treats authorial intention as part of what gives legal language its meaning. Shared public language still matters because lawmakers communicate through it, but the target of interpretation is the meaning they intended to convey through those words. The theory differs from older defenses of Original Intent that focused mainly on judicial restraint. Its claim is linguistic before it is institutional. Collective authorship remains the pressure point: a legislature or ratifying public must possess an intention coherent enough to guide interpretation, and the evidence must distinguish intended communication from political hopes, expected applications, and individual statements that never became part of the collective act."
  },
  "oi_construction": {
    "opening": "You think founding intent fixes constitutional meaning, but you also think that intent can leave genuine legal questions unresolved. When the intended meaning runs out, later constitutional doctrine may legitimately develop within the space the original settlement left open rather than pretending the founders supplied a complete rule for every case.",
    "context": "Intentionalist construction separates the meaning intended by the enacting generation from the doctrine later needed to implement it. Historical intention can fix a constitutional principle without specifying a complete rule for every future dispute. Courts and other institutions then face a second task inside the space the original settlement left open. Precedent, practice, principle, or democratic choice can supply the implementing rule depending on the theory. The approach preserves historical fixation at the level of intended meaning while accepting later legal development at the level of doctrine. Its hardest question concerns which institutions and sources have authority once the historical intention stops giving a unique answer."
  },
  "originalist_generic": {
    "opening": "You think present constitutional judging is constrained by law fixed at adoption, even though your answers do not cleanly resolve which Originalist account best identifies that law. History is authoritative for you, but the precise theory connecting historical meaning to modern cases remains comparatively open.",
    "context": "Originalism shares one basic commitment: the Constitution contains law fixed at adoption that later judges cannot revise through ordinary interpretation. The schools divide over the historical object. Public-meaning theories recover communicative content; intentionalists recover lawmaking intention; Original Methods theories restore historical interpretive rules; Original-Law theories reconstruct the broader legal system the Constitution created. Those choices affect ambiguity, precedent, and the room available for later doctrine. A respondent can be firmly Originalist while leaving the internal theory unresolved. The common ground lies in historical legal authority, not in one agreed procedure for finding every answer."
  },
  "living_mainstream": {
    "opening": "You do not think present constitutional law is exhausted by the meaning fixed at adoption. Later precedent, experience, changed circumstances, and contemporary understandings can legitimately shape what constitutional commitments require, so the judge's task includes legal development rather than only historical recovery.",
    "context": "Living Constitutionalism needs a mechanism of legal change. Precedent, institutional practice, altered factual conditions, political development, and evolving understandings all appear in the literature, and different theories assign them different legal roles. The shared claim is that post-adoption developments can contribute to the constitutional law courts apply. Historical text remains an anchor, but it does not exhaust present legal content. That places the disagreement with Originalism at the level of legal authority: later developments can become constitutive of constitutional law instead of serving only as evidence about a meaning fixed at adoption."
  },
  "living_democratic": {
    "opening": "You think constitutional law develops through interaction among courts, political movements, officials, and public argument rather than through judges alone or through a meaning frozen at adoption. Courts still enforce rights, but democratic constitutional debate can legitimately help shape the understandings those courts eventually apply.",
    "context": "Democratic Constitutionalism locates constitutional development in sustained interaction among courts, political institutions, movements, elections, and public argument. Social contestation can change the constitutional understandings that later courts enforce. Present electoral majorities influence that process without controlling it outright. Judicial doctrine remains one participant in a wider constitutional practice. Court decisions reshape politics; political mobilization reshapes constitutional argument; later doctrine absorbs parts of that development. Constitutional law emerges from that institutional conversation over time."
  },
  "living_transformative": {
    "opening": "You think constitutional interpretation can be part of an ongoing legal project of changing inherited institutions, not merely preserving them while adapting at the edges. Courts should read constitutional commitments with an eye toward the social and political transformation those commitments require.",
    "context": "Transformative Constitutionalism treats a constitution as a legal project aimed at changing an inherited political and social order. It is most associated with constitutions adopted against backgrounds of authoritarianism, hierarchy, or exclusion, where provisions protecting dignity, equality, participation, and democracy are read as mandates for institutional reconstruction. Courts may ask whether existing structures reproduce the conditions the constitutional settlement was designed to displace. The approach gives constitutional purpose substantial legal force and can support aggressive remedies. Its pressure point is institutional authority: ambitious transformation requires judgments about social structure that can push courts far beyond conventional dispute resolution."
  },
  "living_moments": {
    "opening": "You think formal amendment is not the only way a constitutional order can undergo legitimate higher-law change. In extraordinary periods of sustained popular mobilization and repeated institutional ratification, political action can sometimes produce a new constitutional settlement that later courts should recognize.",
    "context": "Constitutional-moments theory allows higher-law change outside formal amendment when political mobilization reaches an extraordinary level. Routine elections and ordinary statutes do not suffice. The theory looks for sustained popular engagement, repeated electoral endorsement, institutional confrontation, and eventual settlement strong enough to resemble a constitutional founding episode. Later courts can treat that settlement as part of the constitutional order even without an Article V amendment. The model was developed to explain large historical shifts that seem too fundamental for ordinary precedent and too legally consequential to describe as simple political change."
  },
  "common_law_mainstream": {
    "opening": "You think constitutional law grows through precedent, practice, and accumulated institutional experience. Past decisions do more than imperfectly report an unchanged Constitution; over time they can become part of the legal structure that later judges inherit and develop.",
    "context": "Common-law constitutional adjudication works through doctrinal accretion. A line of cases generates tests, exceptions, presumptions, and settled categories that later courts manipulate through analogy, distinction, and extension. Over time, those intermediate doctrines can become the operative law that lawyers brief and lower courts administer, even when the constitutional text remains highly general. Stare decisis is built into that method because each new decision changes the material available to the next court. The model resembles ordinary common-law development: legal continuity comes from working on an inherited doctrinal structure, with major change usually arriving through a sequence of smaller adjustments built on the inherited cases."
  },
  "common_law_tradition": {
    "opening": "You think constitutional liberty develops through precedent and historically embedded tradition rather than through either fixed founding expectations or free-standing modern moral judgment. Change is legitimate, but it should grow out of the accumulated experience of the legal order.",
    "context": "Tradition-centered Common-Law Constitutionalism uses precedent together with long-running practices of ordered liberty. New claims are tested against the trajectory of the legal tradition: how related freedoms have been treated, which distinctions have persisted, and whether an extension grows out of the inherited pattern. The method permits development because common-law reasoning works through analogy and extension. It also gives history a constraining role different from Originalism. Founding-era meaning does not freeze the result; the accumulated tradition supplies the material from which current constitutional doctrine develops."
  },
  "common_law_strong_rights": {
    "opening": "You think some fundamental legal rights can be rooted so deeply in the constitutional common-law tradition that ordinary legislation cannot simply erase them, even when no written higher-law clause expressly supplies the limit. Judicially articulated principle can constrain legislative supremacy.",
    "context": "Strong common-law constitutionalism gives some unwritten legal principles a status capable of limiting ordinary legislation. The argument appears most sharply in systems influenced by parliamentary sovereignty, where courts have sometimes described access to justice, legality, or fundamental rights as conditions of lawful government. Once such a principle is treated as constitutional, legislative power is no longer conceptually unlimited. That gives judges a demanding classificatory task: they must separate genuinely fundamental principles from ordinary common-law doctrine. The authority of the right comes from the constitutional character of the legal tradition itself, not from one express higher-law clause."
  },
  "common_law_source_bound": {
    "opening": "You think law gets its authority from recognized legal institutions, yet those institutions can change constitutional law over time through precedent and practice. Constitutional development is legitimate because it occurs through law's own sources, not because judges have a free-standing power to update constitutional values.",
    "context": "Legal Positivism and Common-Law Constitutionalism answer different questions. Positivism identifies the grounds on which a legal system recognizes authoritative norms; common-law constitutionalism describes one way those recognized norms can develop. If judicial precedent and official practice qualify as accepted sources, constitutional law can evolve through them without appealing to free-standing judicial morality. The same source-based account can explain why some practices become legally authoritative while others remain political custom. This combination puts unusual weight on institutional acceptance, precedent, and continuity because those practices do more than influence adjudication: they help constitute the law the next court receives."
  },
  "common_good": {
    "opening": "You think public law should be understood through a classical idea of legitimate authority directed toward the common good. Individual autonomy and historically fixed meaning matter, but neither exhausts the legal purpose of government or the principles that should guide interpretation.",
    "context": "Common-Good Constitutionalism draws on classical accounts of political authority and practical reason. Public power exists to secure conditions of communal life that individuals cannot supply alone, and legal interpretation pays close attention to purposes such as justice, peace, welfare, and ordered liberty. Positive law retains substantial settlement force because legitimate institutions must choose among many reasonable arrangements. Open-textured provisions can also be read through the purposes of lawful authority, which gives judges and administrators more room than hard Textualism or mainstream Originalism would allow. The deepest controversy concerns who may specify the common good when reasonable citizens disagree about its concrete demands."
  },
  "positivist_mainstream": {
    "opening": "You think the existence of law ultimately depends on recognized legal sources and social practices, not on whether the resulting rule is morally good. A cruel or foolish rule can still be law, even though judges and citizens may have powerful moral reasons to condemn or change it.",
    "context": "Legal Positivism separates the existence and content of law from its moral merits. A rule belongs to the legal system because recognized social sources and institutional practices make it law: enactment, precedent, custom, official acceptance, and related criteria. Justice enters as a separate evaluation. That distinction lets a jurist describe a statute as legally valid and morally atrocious in the same breath. Modern Positivism also accepts hard cases. Source-based law can run out or leave open texture, at which point judges may exercise discretion or develop new law. The theory explains legal authority through social facts without committing itself to mechanical adjudication."
  },
  "positivist_inclusive": {
    "opening": "You think law is ultimately grounded in social rules and institutions, but those rules can themselves tell courts to apply genuine moral standards. Morality can become part of legal validity without ceasing to be incorporated through a source-based legal system.",
    "context": "Inclusive Positivism keeps social sources at the foundation while allowing those sources to incorporate moral criteria. A constitution can make concepts such as equality, cruelty, or reasonableness legally operative, forcing courts to engage in genuine moral reasoning because the legal system itself assigned that task. The legal system remains source-grounded because the moral criterion has legal force through a socially recognized rule of recognition or other accepted source practice. The hard question is how far incorporation goes: some legal systems may authorize moral tests in particular domains without making moral correctness a general condition of legal validity."
  },
  "positivist_exclusive": {
    "opening": "You think legal validity must remain identifiable from social and institutional sources without making moral correctness itself the test of what law exists. Morality may guide criticism or political reform, but it should not become an independent criterion for identifying valid law.",
    "context": "Exclusive Positivism insists that law be identifiable from its social sources without making moral correctness a condition of legal validity. The theory is often defended through law's settlement function. An authority can guide conduct only if people can identify what it decided without reopening the very moral dispute the authority was meant to settle. Moral concepts may still appear in legal language, and judges may still have moral duties. The claim concerns the ultimate grounds of law: source facts carry that work. A wicked rule can remain valid law even when everyone has decisive moral reason to condemn, resist, or repeal it."
  },
  "positivist_normative": {
    "opening": "You do more than describe law as source-based; you think source-following is itself an important institutional discipline. Even when judges can imagine morally better answers, legal systems work better when contested moral lawmaking is left mainly to politically accountable institutions.",
    "context": "Normative Positivism turns source-based legality into an institutional prescription for judges. Clear source rules promote notice, predictability, and democratic responsibility by keeping contested moral lawmaking in politically accountable institutions. Courts still interpret difficult texts and apply evaluative standards the law actually contains. The discipline appears when a judge sees a morally attractive result that the recognized legal sources did not adopt. Normative Positivism treats adherence to those sources as a virtue of the legal system itself. Its case for restraint rests on institutional design, democratic responsibility, and the value of source-based settlement."
  },
  "natural_law_mainstream": {
    "opening": "You think objective moral principles matter to law, but you do not treat morality as a standing permission for judges to replace positive law. One of law's important jobs is to settle questions that practical morality leaves open and give a community a determinate rule.",
    "context": "Classical Natural-Law theory distinguishes broad principles of practical reason from the detailed rules needed to govern a community. Aquinas's idea of determination captures the move from one level to the other: morality may require safe roads without fixing a particular speed limit, or fair procedure without specifying every filing deadline. Legitimate positive law chooses among the permissible details and coordinates everyone around the choice. The judge encounters a large domain of law whose authority depends on enacted settlement even though its deeper justification is moral. The theory becomes controversial near the boundaries—grave injustice, defective authority, or legal language that itself calls for moral judgment."
  },
  "natural_law_strong": {
    "opening": "You think moral defect can sometimes reach beyond making a rule unjust and undermine its status as law itself. Positive law normally settles questions and deserves authority, but sufficiently serious violations of objective moral requirements can defeat that legal claim.",
    "context": "Strong Natural Law places a moral limit on legal validity itself. Ordinary injustice leaves room for bad but binding law; severe injustice can destroy the law's claim to authority. The difficulty lies in the threshold. If every serious moral error defeats validity, adjudication collapses into ordinary moral disagreement and judges gain a sweeping power to disregard enactments. If the threshold is unreachable, the doctrine adds nothing. Strong theories reserve invalidity for extreme cases and retain a substantial role for positive law in ordinary governance."
  },
  "interpretivist": {
    "opening": "You think legal practice contains principles as well as enacted rules, and those principles can supply real legal answers in hard cases. Judges should interpret the existing legal system in the way that best fits its history while giving its institutions and rights the strongest coherent justification.",
    "context": "Dworkin's account of law as integrity asks the interpreter to make the community's coercive legal practices intelligible as a coherent scheme of principle. Fit and justification perform different jobs. Fit prevents the judge from discarding statutes and precedents that resist the favored moral theory; justification chooses among interpretations that can plausibly account for the institutional record. Principles can carry legal force without appearing as freestanding enacted rules because they emerge from that constructive interpretation of practice. The approach is ambitious about legal coherence: adjudication should explain past political decisions as speaking with a principled voice across cases, including when their surface rules leave the dispute unresolved."
  },
  "nonpos_moral_impact": {
    "opening": "You think legislatures and courts make law by changing people's actual moral rights and obligations. The legal institutions matter because of the moral impact their actions produce, not because they create a separate source-based category of obligation alongside morality.",
    "context": "Moral Impact Theory asks what moral change legal institutions actually produce. Legislation, adjudication, and official action alter people's genuine rights and obligations; the resulting moral situation constitutes the law. Source facts remain indispensable because the institutional action causes the change, yet pedigree alone does not determine the legal content. The judge must work out the normative consequences of what the institution did. Interpretivism focuses on fit and justification within legal practice. Traditional Natural Law begins from broader principles of practical reason. Moral Impact Theory is centered on the moral effects of institutional action itself."
  },
  "nonpos_moral_practice": {
    "opening": "You think a person who claims a legal right is ultimately claiming a genuine moral right, not invoking a separate kind of obligation that exists only because legal sources created it. Legal practice is one part of our broader moral practice rather than a separate normative world.",
    "context": "One-system theories reject a separate category of purely legal rights. A courtroom claim concerns what people genuinely owe one another within institutions already shaped by statutes, precedents, and public power. Those legal materials remain central because they transform social relationships and expectations. Moral reasoning determines their normative significance inside the same system of rights and duties. This places the theory farther from Positivism than an incorporation model, where moral criteria become law only because source-based rules authorize them."
  },
  "nonpos_extreme": {
    "opening": "You think ordinary injustice can coexist with legal validity, but there is a point at which injustice becomes so extreme that a purported rule loses its claim to be law. Your view rejects both simple source-only validity and the idea that every moral defect destroys legality.",
    "context": "The Radbruch formula preserves positive legality through ordinary injustice and draws a line at extreme injustice. Formally valid rules can be cruel, foolish, and deeply wrong while remaining law. At some point, radical conflict with justice or equality defeats the legal claim itself. The formula emerged from the problem of regimes that used formally valid enactments to organize grave wrongdoing. Its doctrinal usefulness depends on rarity. A low threshold turns every moral dispute into a validity dispute; a high threshold leaves positive law secure while reserving a conceptual emergency brake for exceptional cases."
  },
  "fullerian": {
    "opening": "You think law can fail not only because of what it commands, but because of how it is made and administered. Secret, retroactive, contradictory, impossible, or systematically ignored rules can fail the basic conditions that make governance through law possible.",
    "context": "Fuller's internal morality of law concerns the form of legal governance. Rules must be public, prospective, intelligible, reasonably consistent, possible to follow, sufficiently stable, and administered in ways that match what officials announced. A regime that systematically fails those conditions may exercise coercive power while failing to govern through law. Positivists can value the same features as virtues of good legal systems. Fuller gives them a deeper role in legality itself. A clear and prospective rule can still be wicked, so procedural legality does not guarantee substantive justice. It claims that even wicked legal orders need a minimum architecture of legality."
  },
  "textualist_mainstream": {
    "opening": "You think judges should enforce the meaning of the law Congress actually enacted rather than reshape it around an unenacted purpose. That does not mean reading words in isolation: grammar, ordinary usage, surrounding provisions, and legal context are all part of working out what the enacted text means.",
    "context": "Modern Textualism treats enacted language as the legal object and reads it with the full apparatus of ordinary interpretation: grammar, usage, statutory structure, legal conventions, and the surrounding text. Literalism is a caricature because context helps determine what the words mean. The fight with Purposivism begins when the best textual reading and the statute's broader policy diverge. Textualists resist filling gaps, adding exceptions, or extending prohibitions just to make the scheme more coherent. Legislative compromise matters here. The precise wording that survived bicameralism and presentment may reflect bargains no single policymaker would have designed, and courts lack authority to improve that bargain after enactment."
  },
  "textualist_institutional": {
    "opening": "You think judges are constrained by enacted law, but faithful interpretation happens inside an institutional system rather than a linguistic vacuum. Text and statutory context come first, while precedent, delegated responsibility, expertise, and administrability can matter to who should resolve genuine uncertainty.",
    "context": "Institutionalist Textualism adds a question of allocation after linguistic analysis has done its work. Grammar, structure, and legal context can leave more than one serious reading. Court-centered textualists treat choosing among those readings as an irreducibly judicial task. Institutionalist versions give weight to delegation, settled administrative practice, expertise, and the statutory assignment of responsibility. The enacted text still sets the legal boundary. The remaining issue is which institution has authority to resolve uncertainty inside it. This brings Textualism into contact with Legal Process, where the identity and competence of the decisionmaker form part of the legal analysis."
  },
  "textualist_bargain": {
    "opening": "You think the hardest part of judging is accepting that enacted law may be awkward, incomplete, or badly designed without giving courts permission to repair it. Omissions, exceptions, and compromises can be part of the legal bargain itself, not defects to be smoothed away in the name of coherence.",
    "context": "Enacted-bargain Textualism takes legislative compromise as a source of legal meaning. Thresholds, exceptions, omissions, and awkward juxtapositions may record the deal that assembled enough votes to become law. A court that smooths those features into a cleaner policy can erase the bargain itself. Whole-statute context still matters. Coalition bargaining often produces statutes with deliberate rough edges and internal asymmetries. Purpose explains why Congress acted; it does not supply terms that were traded away or never enacted. The method is especially skeptical of anti-evasion reasoning when closing the loophole requires crossing a textual boundary Congress actually adopted."
  },
  "textualist_categorical": {
    "opening": "You combine text-centered interpretation with a strong preference for categorical legal rules. When constitutional or statutory language states a right or boundary in rule-like terms, you resist converting it into a balancing test simply because the government has important competing interests.",
    "context": "Categorical Textualism carries source-based constraint into doctrinal form. Once enacted law establishes a right, prohibition, or legal category, the court applies that category without reopening the balance of interests in every case. The institutional payoff is reduced judicial discretion: a right does not expand or contract with each judge's assessment of costs and benefits. This can produce forceful review of government action because the rule retains its bite even against popular policies. The price is rigidity at the margins. Hard cases remain hard, and the doctrine accepts some unattractive outcomes to keep the legal category from dissolving into case-specific judgment."
  },
  "intentionalist_mainstream": {
    "opening": "You think statutory interpretation should recover what the legislature meant to accomplish through the law it enacted. Text remains important evidence and constraint, but the interpretive target is the lawmaking body's intended legal decision rather than wording or objective purpose considered entirely apart from that intention.",
    "context": "Intentionalism treats legislation as an institutional act aimed at producing a particular legal change. The enacted text supplies the strongest evidence of that act, joined by the structure of the statute and reliable evidence from the lawmaking process. Collective intention is the central problem because Congress has many members with different motives. A serious intentionalist account looks for shared legal decisions embedded in drafting, voting, negotiation, and institutional practice. Purposivism asks about the statute's objective project; Textualism gives priority to the public meaning of the enacted language. Intentionalism focuses on the legal choice the lawmaking body meant to make."
  },
  "intentionalist_imaginative": {
    "opening": "You think legislative intent matters even when lawmakers never considered the exact problem before the court. In those cases, the judge should reconstruct what the legislature would have intended had it confronted the issue, using the enacted scheme and the lawmakers' evident purposes as guides.",
    "context": "Imaginative reconstruction addresses cases the legislature never actually considered. The judge asks what the enacting legislature would have decided if the new problem had been presented to it, using the statutory scheme, known compromises, and historical priorities as constraints. The method is openly counterfactual and more creative than ordinary historical Intentionalism. It can handle new technologies and unforeseen evasions without pretending the lawmakers foresaw them. The danger is projection: a judge can easily replace the historical legislature with an idealized one that shares the judge's preferences. The discipline lies in reconstructing this legislature from the law it actually enacted and the choices it actually made."
  },
  "intentionalist_congress": {
    "opening": "You think statutory interpretation should take Congress seriously as an institution that communicates through more than the final sentence-level text. When language is genuinely ambiguous, reliable committee materials and the actual legislative process can be legitimate evidence of the legal meaning Congress intended to enact.",
    "context": "Congress-aware Intentionalism treats the legislative process itself as evidence of the legal decision Congress made. Committee reports, conference materials, drafting history, and other reliable institutional documents can illuminate what legal choice Congress understood itself to be making when enacted language remains uncertain. Textualists object that these materials never passed bicameralism and presentment and can be manipulated by individual members or staff. Committees, negotiation, drafting practices, and internal procedures generate evidence about the agreement that became law. Clear text still controls; legislative history earns its role at the margin where the enacted language does not settle the point."
  },
  "purposivist_mainstream": {
    "opening": "You think statutes should be read as legal projects with purposes, not merely as strings of words. Text remains important, but when rigid wording and the law's evident objective pull apart, judges may need to interpret the rule in a way that makes the statutory scheme work as the legislature designed it to work.",
    "context": "Purposivism reads a statute as a scheme organized around an objective. Text remains a constraint, but provisions are understood through the problem the law addresses and the structure Congress built to solve it. The method becomes distinctive when a literal or linguistically natural reading would frustrate that design, create an absurd gap, or invite easy evasion. Purpose is reconstructed from the statute and its legal setting, not supplied by a judge's preferred policy. The recurring danger is judicial repair. A court seeking coherence can drift from interpreting the enacted scheme into enforcing the cleaner law it wishes Congress had written."
  },
  "purposivist_proportional": {
    "opening": "You combine purpose-centered interpretation with a structured way of resolving rights conflicts. A law's objective matters, but government must also show that burdens on rights genuinely serve that objective, are no broader than necessary, and remain justified in light of the harm imposed.",
    "context": "Purpose and proportionality answer linked questions. Interpretation identifies the legal objective a provision is designed to serve. Proportionality then tests whether government has pursued that objective through means that fit it, burden rights no more than necessary, and remain justified in the final balance. The sequence exposes the government's reasoning instead of allowing a bare assertion of public interest to carry the case. It also gives courts substantial evaluative responsibility because necessity and final balancing require judgments about alternatives, evidence, and the weight of competing claims. Purposive interpretation supplies the objective; proportionality supplies the sequence for testing the means."
  },
  "legal_process_mainstream": {
    "opening": "You think hard cases cannot be understood by asking only which interpretation seems best. Courts should also ask who was assigned the decision, which institution is competent to make it, what has already been settled, and what kind of reasoned explanation the legal system requires.",
    "context": "The Legal Process tradition is a theory of judicial role across statutory interpretation, constitutional structure, precedent, administration, and remedies. Hart and Sacks described law as an institutional system that settles who decides, through what procedures, and with what kind of reasons. Competence, settlement, and reasoned elaboration become part of the legal analysis itself. A court asks what authority has already been allocated, what other institutions are better positioned to resolve, and how much existing settlements should constrain revision. Purpose still matters, especially in interpretation, but it is filtered through institutional role. Agency expertise is one application of that framework; the broader idea is that judges occupy one place inside a legal division of labor with other decisionmakers."
  },
  "legal_process_agency": {
    "opening": "You think agencies can engage in genuine legal interpretation rather than acting only as policy bodies waiting for courts to supply the law. Their expertise, internal legal norms, reason-giving duties, and responsibility for administering a statutory program can make agency interpretation part of the legal process itself.",
    "context": "Administrative Legal Process focuses on the legal capacities agencies develop through repeated administration. Agencies build internal precedent, specialized interpretive practices, factual expertise, and reason-giving procedures that generalist courts often lack. Those features can make an agency's reading more than a policy preference, especially when Congress assigned it continuing responsibility for a statutory scheme. Judicial review still supplies an external legal boundary. The dispute concerns how much interpretive authority remains with the agency inside that boundary and what forms of procedure, consistency, expertise, and explanation make administrative judgment worthy of legal respect."
  },
  "legal_process_neutral": {
    "opening": "You think constitutional decisions should rest on principles a court is prepared to apply beyond the immediate parties and political stakes. A result-specific reason is not enough; judicial legitimacy depends on offering a rule that can be generalized across materially similar cases.",
    "context": "Neutral-principles theory demands reasons capable of surviving a change in the parties. A constitutional rule should apply across materially similar cases even when the political beneficiary flips. That requirement turns consistency into a condition of judicial legitimacy. It also makes outcome-driven reasoning easier to expose, because a court must state a proposition capable of guiding future cases. The theory sits inside the Legal-Process tradition of reasoned elaboration: courts earn authority by giving generalizable legal reasons appropriate to an institution that works through precedent. Strong judicial review remains possible, but the justification must be capable of becoming law beyond the immediate dispute."
  },
  "pragmatist_mainstream": {
    "opening": "You think hard cases sometimes leave judges with a real choice rather than a hidden answer waiting to be discovered. When that happens, consequences, administrability, incentives, and institutional performance can be legitimate reasons for choosing among legally defensible options.",
    "context": "Pragmatism gives practical consequences independent weight once conventional legal materials leave room. The judge asks how competing rules will operate, what incentives they create, whether institutions can administer them, and what disruption a change will cause. Text and precedent still matter because predictability and coordination have practical value. Their force depends partly on what they contribute to the legal system. This distinguishes Pragmatism from Purposivism, where consequences usually matter through a statute's objective, and from hard Textualism, where a bad outcome cannot ordinarily override enacted meaning. The method is candid about choice and demanding about institutional effects."
  },
  "pragmatist_obsolescence": {
    "opening": "You think an old statute can become so badly mismatched with the later legal order that courts should not mechanically extend it forever. In an extreme case, judicial doctrine can force contemporary political institutions to take a fresh look rather than letting obsolete law govern by inertia.",
    "context": "Statutory-obsolescence theory confronts laws that survive after the legal and institutional world around them has changed. Ordinary source-based interpretation leaves the old enactment in force until Congress amends it. A more aggressive Pragmatist account gives courts tools to force a contemporary political reconsideration when literal extension of the old rule badly distorts the present legal system. 'Second look' mechanisms and common-law-like updating are responses to legislative inertia, not general licenses to repeal disliked statutes. Their justification depends on a severe mismatch between an old enactment and the later legal order. The theory trades some source-bound stability for a way to prevent obsolete law from governing indefinitely through inertia alone."
  },
  "pluralist_mainstream": {
    "opening": "You think several forms of legal argument can be legitimate at once. Text, history, precedent, structure, prudence, purpose, and other modes each answer different kinds of legal questions, so no single method should automatically control every hard case.",
    "context": "Interpretive Pluralism accepts several forms of legal argument as independently legitimate: text, history, precedent, structure, purpose, prudence, and constitutional principle. The theory refuses to reduce all of them to evidence for one master source. Conflict among the modes is unavoidable. A settled precedent may clash with history; structural reasoning may resist the narrowest textual reading; purpose may point beyond ordinary usage. Pluralism asks judges to work openly with those competing forms of legal reason. Its discipline comes from the conventions and limits of each mode and from consistency in how conflicts among them are handled across cases."
  },
  "pluralist_practical": {
    "opening": "You think several kinds of legal reasoning are legitimate, but you resist giving them a fixed ranking that applies to every case. Text, history, precedent, purpose, structure, and consequences can change in importance depending on the legal problem being decided.",
    "context": "Practical-reasoning Pluralism differs from a simple catalogue of interpretive modes. Text, history, precedent, structure, purpose, and prudence are accepted as legal reasons, but their weight changes with features of the dispute. The theory needs second-order judgment about relevance: a precise statutory definition changes the case for textual priority; deep reliance changes the force of precedent; institutional allocation changes the importance of competence. That second-order reasoning supplies the method. Low-theory judging can use the same materials without defending a general account of why their relative force shifts. Practical pluralism makes the shifting weight itself part of the jurisprudence."
  },
  "sociological_mainstream": {
    "opening": "You think legal theory should pay close attention to what law actually does in society, not only to the formal rules written in statutes and cases. Social interests, institutions, and the real operation of doctrine can be legally important to understanding and developing the law.",
    "context": "Sociological Jurisprudence grew from the gap between 'law in books' and 'law in action.' Its inquiry reaches beyond doctrinal validity to the interests a rule organizes, the institutions that enforce it, and the behavior it actually produces. Courts may use that knowledge when shaping open-ended doctrines or adapting common-law rules to social conditions. The tradition overlaps with Realism but has a different center of gravity: Realists often study what explains judicial decisions, while sociological jurists study how legal ordering functions across society. Empirical knowledge about institutions and social practices becomes part of competent legal judgment."
  },
  "sociological_pluralism": {
    "opening": "You think sufficiently organized institutions outside the state can themselves form genuine legal orders. Churches, unions, universities, professional bodies, or other associations may create law for their members even when the state did not enact or formally recognize those rules.",
    "context": "Institutional legal pluralism rejects the assumption that all law flows from the state. Churches, unions, universities, customary communities, and other organized bodies can possess offices, procedures, authority structures, and rules that govern their members. A norm can belong to a genuine legal order even without state enactment. The state remains powerful because it can recognize, coordinate, suppress, or override other normative orders, but it is not the only possible site of legality. The theory expands jurisprudence from a study of government rules to a study of organized normative institutions and the conflicts among them."
  },
  "sociological_living": {
    "opening": "You think the most important law governing much of social life can arise from the actual norms of families, businesses, associations, and communities even when those norms were never formally enacted. Jurisprudence should study the living rules people really use, not only official doctrine.",
    "context": "Ehrlich's living-law idea directs attention to the norms that actually organize daily life. Families, businesses, professions, workplaces, and communities often enforce expectations that matter more to conduct than formal statutes or reported cases. Those norms can explain why official law has little effect or why enforcement produces unexpected results. Living law does not turn every social habit into an enforceable legal rule. It treats socially operative norms as indispensable evidence about the legal order. Courts and scholars who ignore them risk describing a system that exists on paper but not in practice."
  },
  "sociological_free": {
    "opening": "You think authoritative legal sources should control while they genuinely answer the case, but judges should be honest when those sources run out. In a real gap, the court may need to construct a rule through disciplined inquiry into social facts, practical needs, equity, and justice rather than pretending the answer was already hidden in the text.",
    "context": "Free Scientific Research begins by exhausting authoritative legal sources. Statute, precedent, and custom govern while they genuinely answer the dispute. Once those materials leave a real gap, the judge should acknowledge the gap and construct a rule through disciplined inquiry into social facts, institutional needs, equity, and justice. The method separates source-following from judicial creation instead of disguising the latter as deduction from language that has run out. It gives the judge creative authority at the edge of positive law and demands a public account of the reasons used to fill that space."
  },
  "realist_mainstream": {
    "opening": "You doubt that formal legal doctrine fully explains what judges do in genuinely hard cases. When respectable legal arguments support more than one result, background views, institutional setting, practical consequences, and other extra-doctrinal factors can help explain which answer a court actually chooses.",
    "context": "Legal Realism begins with a selection effect: easy cases settle or never become appellate controversies, so reported hard cases disproportionately contain legal materials capable of supporting multiple arguments. Realists then ask what explains the judicial choice inside that narrowed field. The answers can include ideology, institutional incentives, professional culture, consequences, and factual framing. That is a descriptive claim about adjudication and can coexist with a normative theory telling judges how they ought to decide. Rule skepticism leaves substantial room for legal rules to constrain outcomes. It means doctrinal constraint often stops short of uniquely determining the disputes most likely to reach high courts."
  },
  "realist_fact": {
    "opening": "Your Realism extends beyond uncertainty in legal rules to uncertainty about what happened. Witness credibility, memory, trial factfinding, and the psychology of judges and juries can make legal outcomes unpredictable even if appellate doctrine were much clearer.",
    "context": "Fact skepticism moves Realism below the appellate level. Courts do not receive a clean factual record; they construct one through witness testimony, documents, credibility judgments, expert evidence, memory, and procedural rules. A perfectly clear legal standard can yield unpredictable outcomes because judges and juries disagree about what happened. Better doctrine can reduce legal uncertainty without eliminating uncertainty in proof. Prediction and explanation of litigation must account for factfinding institutions as well as rules of law."
  },
  "realist_functional": {
    "opening": "You are suspicious of abstract legal labels doing the work of an argument. When a case turns on concepts such as property, corporation, or jurisdiction, you want the court to translate the label into the concrete conduct, consequences, and policy choices the concept is being used to justify.",
    "context": "Functional Realism distrusts legal concepts that appear to decide a case merely because the court has attached a label. Categories such as property, corporation, or jurisdiction can summarize doctrine, but they become circular when the category itself substitutes for an explanation. Functional analysis asks what the classification changes in concrete terms: who may act, who bears costs, which incentives follow, and which institution gains control. The method exposes policy and institutional choices hidden inside conceptual vocabulary. Legal categories remain useful only when they clarify those choices instead of concealing them."
  },
  "political_constitutionalist": {
    "opening": "You think reasonable people can disagree about constitutional rights without either side acting unlawfully, and that functioning representative institutions often have the stronger claim to make those contested choices. Courts matter, but judges do not automatically deserve the final word merely because a dispute is constitutional.",
    "context": "Political Constitutionalism begins from persistent reasonable disagreement about rights. The institutional question then turns to political equality: when citizens disagree in good faith, a representative legislature gives each citizen an equal formal role in choosing the rule, whereas strong judicial review transfers final authority to a small unelected body. This argument usually assumes functioning democratic institutions and serious public commitment to rights; it weakens when those conditions fail. Courts can still interpret statutes, enforce settled legal limits, and contribute reasons to public debate. The controversial step is granting judges final authority over a dispute that remains reasonably contestable among citizens."
  },
  "thayerian": {
    "opening": "You think courts should keep the power of judicial review but use it only when the legislature's constitutional error is clear, not merely because judges would interpret the Constitution differently. Reasonable constitutional disagreement should usually be resolved through politics rather than judicial invalidation.",
    "context": "Thayer's clear-error approach preserves judicial review while changing the standard for invalidation. A court asks whether the legislature's constitutional judgment falls outside the range of reasonable interpretation, not whether the judges themselves would read the Constitution differently. That places a burden on the challenger beyond ordinary legal disagreement. The theory pushes constitutional responsibility toward legislators and voters because doubtful questions remain politically owned. Courts still enforce clear limits. The restraint appears in the treatment of uncertainty: reasonable constitutional judgment by a political branch survives even when the court would have chosen another answer."
  },
  "popular": {
    "opening": "You think the Constitution ultimately belongs to the people rather than to courts. Judges may decide cases and enforce judgments, but constitutional meaning should remain part of democratic constitutional politics rather than becoming the exclusive property of the judiciary.",
    "context": "Popular Constitutionalism treats constitutional meaning as part of democratic political life. Courts decide cases and their judgments have legal force, yet constitutional argument also belongs to citizens, movements, legislatures, executives, and elections. The theory resists a system in which Supreme Court doctrine becomes the only authoritative language of constitutional politics. Historical examples of constitutional conflict show political actors contesting meaning outside litigation and sometimes reshaping the constitutional order through that struggle. The unresolved problem is settlement. Public constitutional responsibility still has to coexist with enough stability for officials and citizens to know which rules govern."
  },
  "departmentalist": {
    "opening": "You think courts are authoritative when they decide cases, but other branches retain their own constitutional duties rather than being required to treat the Supreme Court's interpretation as the Constitution's single binding meaning for everyone.",
    "context": "Departmentalism assigns constitutional interpretation to each branch within its own sphere of responsibility. Courts issue binding judgments and build judicial precedent. Congress and the President still possess independent constitutional duties when exercising powers committed to them. A Supreme Court opinion has legal consequences without automatically becoming the single constitutional view every official must adopt in every setting. The theory distinguishes obedience to judgments from universal acceptance of judicial reasoning. Branch disagreement creates a coordination problem, so remedies, precedent, and institutional authority carry unusual weight in the theory."
  },
  "political_process": {
    "opening": "You usually leave substantive political disagreement to democratic institutions, but your deference ends when the political process itself is distorted. Courts have a stronger reason to intervene when groups are excluded, channels of change are blocked, or incumbents can entrench themselves against ordinary democratic correction.",
    "context": "Ely's representation-reinforcement theory grew out of the countermajoritarian problem and the logic associated with Carolene Products' famous footnote four. Judicial review is easier to justify when courts police the processes through which political majorities are formed than when judges simply substitute their own substantive values. Voting rules, access to political organization, incumbent entrenchment, and systematic exclusion receive special attention. The theory also supplies a competence claim: courts may be better at identifying procedural distortions than at resolving society's deepest moral disputes. Its limits appear when process and substance cannot be separated cleanly."
  },
  "political_process_responsive": {
    "opening": "You think courts should respond to failures of democracy, but not with one fixed level of scrutiny or one standard remedy. The timing, intensity, reasoning, and relief should depend on the particular democratic blind spot and on what courts are actually capable of improving.",
    "context": "Responsive review develops process theory by distinguishing different democratic pathologies. A blind spot affecting a politically weak minority, a burden of legislative inertia, and incumbent monopoly over the rules of competition create different reasons for judicial concern. The response can vary accordingly: heightened reasons, delayed invalidation, narrower or broader remedies, and different levels of scrutiny become tools matched to the institutional failure. This framework makes judicial capacity part of the remedial design. Courts should choose interventions they can administer and that plausibly improve democratic functioning. Maximum remedial force is not always the best representation-reinforcing strategy."
  },
  "minimalist": {
    "opening": "You think courts should decide no more than they need to decide. Narrow holdings, limited remedies, and leaving broader theories unresolved can protect rights while preserving room for later courts, democratic institutions, and social learning.",
    "context": "Judicial Minimalism limits the breadth and depth of constitutional decisions. A court resolves the concrete dispute with a narrow holding and can leave larger theoretical questions unsettled. That strategy reduces the cost of mistakes, preserves room for later factual development, and allows judges who disagree about first principles to converge on a smaller rule. Minimalism can still invalidate government action; the modesty concerns how much law the opinion settles. The recurring cost is uncertainty. A long sequence of narrow decisions can leave citizens and lower courts without a clear rule until many cases have accumulated."
  },
  "minimalist_passive": {
    "opening": "Your judicial restraint goes beyond narrow opinions. You think timing, justiciability, and strategic avoidance can themselves be legitimate tools, allowing courts to decline or postpone constitutional decisions when immediate resolution would needlessly intensify the conflict.",
    "context": "The passive virtues add timing and justiciability to judicial restraint. Standing, ripeness, avoidance, procedural posture, and delay can keep a court from reaching a constitutional merits question even when the controversy is politically urgent. The theory treats timing as part of constitutional statecraft. Political institutions may resolve the conflict, public understanding may change, or later facts may make the legal question easier to answer. The costs are serious as well: avoidance can leave rights unprotected and can disguise substantive preferences as procedure. The approach accepts that risk to preserve judicial room to choose when constitutional settlement should occur."
  },
  "weak_form": {
    "opening": "You think courts can decide rights independently without giving them an entrenched monopoly on the final constitutional word. A constitutional system may authorize legislatures to respond to a judicial rights ruling through a structured legal process short of formal constitutional amendment.",
    "context": "Weak-form review divides constitutional authority between courts and legislatures. Courts issue independent rights judgments with immediate legal force, while the constitutional system provides a structured legislative route for responding without a full formal amendment. The details determine how much power each institution really holds. An easy override can reduce judicial review to advice; an onerous response mechanism can recreate judicial supremacy in practice. The model aims to preserve legal rights scrutiny and public judicial reasoning while keeping some constitutional disagreement open to democratic resolution."
  },
  "formalist_mainstream": {
    "opening": "You think legal form matters because rules, categories, assigned powers, and prescribed procedures constrain decision-makers before the hard case arrives. Efficiency or fairness in a particular dispute is not enough to ignore a boundary the legal system has already drawn.",
    "context": "Formalism gives legal categories and prescribed procedures independent force. Their value lies partly in settling questions before officials confront the equities of a particular dispute. Rules about jurisdiction, branch authority, deadlines, and legal form create predictable boundaries and reduce opportunities for discretionary manipulation. Formalism tolerates some mismatch between general law and case-specific justice. The theory is broader than Textualism or Originalism because the same commitment can operate across many sources of law. Its core concern is the architecture of decisionmaking: officials should sometimes be bound by the legal form already chosen."
  },
  "formalist_nondelegation": {
    "opening": "You think some governmental powers must remain with the institution the Constitution assigned them to, even when Congress clearly wants to transfer the decision elsewhere. Efficiency and explicit authorization cannot cure a delegation that crosses the constitutional boundary itself.",
    "context": "Nondelegation treats some policy choices as constitutionally assigned to Congress itself. Clear statutory authorization does not end the inquiry because the constitutional question concerns transfer of legislative power. A major-questions or clear-statement doctrine can accept a broad delegation once Congress speaks unmistakably; a true nondelegation rule says some choices cannot be transferred at all. Modern administration makes the line difficult to draw because agencies routinely exercise discretion while implementing statutes. The theory accepts greater pressure on Congress to make policy itself in order to preserve a sharper constitutional boundary around lawmaking authority."
  },
  "formalist_unitary": {
    "opening": "You think executive power carries a strong principle of presidential control. Congress may create offices and assign duties, but it cannot fully insulate executive administration from the President's authority to supervise and direct the execution of federal law.",
    "context": "Unitary-executive theory reads Article II as requiring substantial presidential control over executive administration. Congress can create offices and prescribe duties, but insulation from presidential supervision becomes constitutionally suspect when an official exercises executive power. The theory links accountability to a chain of authority running to the President. Independent-agency models distribute control more widely through statutory design, professional norms, and judicial review. The hardest cases involve officials exercising mixed adjudicative, regulatory, and executive functions, where the classification of the power determines how far presidential control must extend."
  },
  "formalist_rules": {
    "opening": "You think rules are valuable partly because they deny judges permission to reach the best all-things-considered result in every case. Predictability and constraint are worth some bad edge cases if the alternative is letting each decisionmaker reopen the merits whenever a rule feels too rigid.",
    "context": "Rule Formalism distinguishes rules from standards by the considerations a decisionmaker is allowed to revisit. A genuine rule is deliberately over- and under-inclusive; its value comes partly from settling cases without reweighing every background reason. Schauer emphasizes this entrenchment of generalization: the legal category screens out facts that would matter under all-things-considered judgment. That structure can reduce bias, improve predictability, and shift difficult policy choices to the rulemaker. Standards buy flexibility by returning more of those considerations to the adjudicator. The choice between rules and standards allocates discretion: it determines who gets to revisit excluded considerations and at what stage."
  },
  "functionalist_mainstream": {
    "opening": "You think separation of powers should protect accountability, checks, and each branch's basic capacity rather than enforce rigid institutional boxes for their own sake. Some overlap is constitutionally acceptable when the arrangement remains workable and does not destroy the core role of another branch.",
    "context": "Separation-of-powers Functionalism evaluates institutional arrangements through their operation. The analysis asks whether power is dangerously concentrated, accountability disappears, checks fail, or a branch loses the ability to perform its constitutional role. Overlap among rulemaking, enforcement, and adjudication can survive when those systemic safeguards remain intact. Formalism begins from categorical assignments of power and prescribed processes; Functionalism places more weight on the working structure of government. That flexibility accommodates the administrative state but also requires courts to explain where acceptable overlap ends and constitutional distortion begins."
  },
  "functionalist_supervisory": {
    "opening": "You think modern administration can be constitutionally legitimate without either rigidly separating every governmental function or giving the President plenary control over every official judgment. The Constitution instead requires a system of lawful supervision and accountability across the administrative state.",
    "context": "Supervisory Functionalism accepts substantial administrative independence while demanding a network of legal accountability. Supervision can come from courts, executive officials, internal procedures, inspectors, statutory duties, and reason-giving requirements. Presidential control is one possible channel of supervision among several constitutional safeguards. Agencies can exercise independent judgment and participate in constitutional implementation so long as their discretion remains embedded in lawful review and oversight. The inquiry evaluates the whole accountability structure around administration and asks whether the combined safeguards are constitutionally sufficient."
  },
  "functionalist_admin": {
    "opening": "You think administrative adjudication can be constitutionally legitimate when Congress authorizes it and courts retain appropriate review. Assigning some disputes to agency adjudicators does not automatically violate the judicial role merely because the decision has legal consequences.",
    "context": "Functional defenses of administrative adjudication examine the tribunal's place in the larger regulatory system. Congress's design, the nature of the right, procedural safeguards, adjudicator independence, and the availability of meaningful judicial review all bear on validity. Combining administrative and adjudicative functions does not itself settle the constitutional issue. The arrangement becomes problematic when impartiality collapses, courts lose an essential constitutional role, or power accumulates without adequate checks. This approach treats Article III as a structural safeguard operating within a complex institutional system instead of a categorical ban on noncourt adjudication."
  },
  "proportionalist_mainstream": {
    "opening": "You prefer a structured form of balancing when government limits a right. The government should identify a legitimate goal, show that its measure actually advances that goal, explain why a less restrictive approach would not work, and justify the remaining burden on the right.",
    "context": "Proportionality structures rights adjudication into a sequence of justification. Government must pursue a legitimate objective, use a measure that actually advances it, confront less restrictive workable alternatives, and justify the residual burden on the right. Each stage exposes a different weakness in governmental reasoning. Alexy and other theorists defend the structure as a form of rational practical argument; critics worry that necessity and final balancing still leave judges substantial control over contested values. The method gives rights neither absolute priority nor casual override. Government carries an explicit burden of justification from means to end."
  },
  "proportionalist_nonpositive": {
    "opening": "You think structured proportionality is not just a useful policy tool; it reflects the legal force of principles whose weight and moral justification are part of the law itself. Rights require reasoned comparison rather than simple source-following or categorical rules.",
    "context": "Principle-based Proportionality gives constitutional rights legal force that is not exhausted by source pedigree. Rights operate as principles with weight, and conflicts among them are resolved through structured practical reasoning about justification. Alexy's theory connects that account of principles to proportionality: purpose, suitability, necessity, and balancing make the competing legal claims explicit. A Positivist legal system can also enact a proportionality test, but principle-based theories give the underlying normative reasons a more direct role in law itself. The method combines a substantive theory of legal principles with a procedural structure for applying them."
  },
  "traditional_equity": {
    "opening": "You think courts do not gain a general power to solve a legal problem however effectively they can. Even when broader relief would work better, equitable remedies should ordinarily stay within historically grounded forms and protect the parties before the court.",
    "context": "Traditional-equity theory asks what remedial powers courts historically possessed once a violation has been found. Injunctions, party status, equitable defenses, and the forms of relief themselves limit judicial authority. Effectiveness does not exhaust the remedial inquiry. A court can condemn government conduct on the merits and still refuse relief extending beyond the parties because the remedy exceeds the judicial office. The argument places separation-of-powers concerns inside remedies. Broad relief may solve the underlying policy problem more completely while moving the court toward general administration of government."
  },
  "universal_relief": {
    "opening": "You think judicial relief is not categorically limited to protecting only the named plaintiff. When a government policy operates generally, a court may sometimes lawfully issue relief that protects affected nonparties rather than forcing everyone to bring the same lawsuit separately.",
    "context": "Universal-relief theory allows some injunctions to protect people beyond the named plaintiff when government action operates through a general rule. Party-specific theories tie relief closely to the claimant's injury and expect others to sue separately or proceed through a class action. Broader theories focus on the legal character of the challenged policy and the court's equitable or statutory authority to restrain its enforcement. The dispute turns on Article III, historical equity, remedial statutes, and the difference between protecting plaintiffs and controlling unlawful government action. Universal relief can remain narrow in subject even when it reaches many people."
  },
  "constitutional_common_law": {
    "opening": "You think courts may sometimes create legal rules that go beyond the Constitution's bare minimum in order to make a constitutional guarantee workable. Those implementing doctrines can be real law while remaining conceptually distinct from the underlying constitutional command.",
    "context": "Constitutional common law separates the constitutional minimum from judicial rules built to implement it. Courts often use prophylactic doctrines, evidentiary rules, and administrable tests that protect a right more broadly than the Constitution would require in every individual case. Treating those rules as a distinct layer of law makes their status more candid. They can be revised as experience changes, and some can be displaced by legislation without altering the underlying constitutional guarantee. The theory gives courts genuine law-development authority while preserving a conceptual line between constitutional command and the judicial machinery used to make it effective."
  },
  "remedial_equilibration": {
    "opening": "You think rights and remedies can shape one another. If a very broad understanding of a constitutional right would require remedies that courts regard as intolerably costly or intrusive, those remedial consequences may legitimately influence how the right itself is defined.",
    "context": "Remedial equilibration describes feedback between the scope of a right and the burden of enforcing it. Courts often define substantive doctrine with some awareness of the remedies that definition will require. Expensive, intrusive, or administratively difficult relief can push doctrine toward a narrower right; a strongly defined right can push courts toward more powerful remedies. The theory rejects the idea that rights are always fixed first and remedies chosen afterward. Its danger is obvious: judicial discomfort with enforcement can quietly shrink the right. Its descriptive power comes from recognizing pressures that ordinary doctrinal analysis often leaves unstated."
  },
  "structural_reform": {
    "opening": "You think a court can sometimes do more than order the government to stop one unlawful act. When the violation is built into an institution, effective adjudication may require structural reform, continuing supervision, and judicial oversight of the process of bringing the institution into legal compliance.",
    "context": "Structural-reform litigation addresses violations embedded in the design and operation of institutions. A prison, school system, police department, or welfare bureaucracy can be organized so that unlawful outcomes recur regardless of one order directed to one plaintiff. Courts may then require plans, alter institutional practices, supervise compliance, and retain jurisdiction for years. The court becomes an institutional supervisor for part of the remedial period. Defenders justify that role by the persistence of systemic violations; critics point to expertise, democratic accountability, and weak stopping rules. The theory accepts a large judicial role when ordinary injunctions repeatedly fail to produce lawful conditions."
  },
  "nonpos_generic": {
    "opening": "You think recognized legal sources do not fully exhaust what law can require, but your answers do not reduce that claim to one simple moral override. Legal principle has a role that a purely source-based account cannot completely explain.",
    "context": "Non-Positivism covers several theories that reject social source pedigree as a complete account of legal content. Dworkinian Interpretivism uses principles that fit and justify legal practice. Natural-Law theories connect legal authority to practical reason while preserving a large settlement role for enacted law. Moral Impact and related one-system theories understand official action through the moral rights and duties it creates. Agreement at the family level leaves major questions open: how morality enters law, whether hard cases already contain legal answers, and how much judicial discretion remains. A generic Non-Positivist result establishes the common rejection of source-only legality without pretending those downstream disputes are settled."
  },
  "positivist_command": {
    "opening": "You understand law in strongly sovereign terms: legal rules are fundamentally commands issued by a determinate political authority, backed by the prospect of sanctions and sustained by habitual obedience. That is a much older and harder-edged form of Positivism than the social-rule theories that dominate modern legal philosophy.",
    "context": "Austin's command theory explains law through sovereign command, habitual obedience, and sanctions. A legal rule is the command of a determinate political superior backed by the prospect of coercion. The model captures law's hierarchical and coercive features cleanly. Modern Positivism moved away from it because legal systems also contain power-conferring rules, constitutional limits on officials, and continuity across changes of government. Those features fit awkwardly into a simple sovereign-subject model. Command theory nevertheless remains a distinct source-based account: legal validity arises from political superiority and organized coercive authority, not from moral merit."
  },
  "positivist_pure": {
    "opening": "You think legal validity is structured through a hierarchy of authorizing norms: one rule is valid because a higher legal rule authorizes its creation, with the system ultimately unified by a presupposed basic norm rather than by morality, sovereign command, or ordinary social habit alone.",
    "context": "Kelsen's Pure Theory describes law as a hierarchy of authorizing norms. A regulation is valid because a statute authorizes it; the statute is valid because the constitution authorizes its creation; the legal order presupposes a basic norm that unifies the chain. The theory deliberately brackets moral approval, political sociology, and sovereign psychology when analyzing validity. Command theory locates law in a relation of political superiority; social-rule theories locate it in official practices. Kelsen locates validity in the normative structure through which one legal act receives authority from another."
  },
  "positivist_planning": {
    "opening": "You understand a legal system as a system of shared social planning. Legal institutions create, revise, and apply plans for coordinating conduct, and the authority of law is best explained through that planning structure rather than through sovereign commands or moral correctness.",
    "context": "Shapiro's Planning Theory treats law as a system for organizing collective action through social plans. Legal institutions create plans about conduct and meta-plans about who may make, revise, interpret, and enforce further plans. Constitutions, statutes, delegations, and procedural rules fit naturally into that architecture. A legal plan exists because institutions created and accepted it, which keeps the theory within Positivism. Its emphasis falls on coordination: law allows large groups to settle questions without repeatedly reopening the reasons underlying every choice. Authority is structured through planning practices instead of sovereign threats or moral correctness."
  },
  "legal_constitutionalist": {
    "opening": "You give courts a strong independent responsibility to enforce constitutional rights and legal limits against political majorities. Judicial review is not merely a backstop for obvious mistakes; constitutional law can require courts to reach their own judgment even when elected institutions strongly disagree.",
    "context": "Strong-form judicial review concerns finality after the interpretive work is done. A court with this authority can invalidate legislation on its own best constitutional judgment and make that judgment legally controlling unless later doctrine or formal constitutional change displaces it. Clear-error approaches preserve more room for legislative interpretation; weak-form systems create formal routes for legislative response. Strong-form constitutionalism concentrates final legal responsibility in courts because constitutional limits are treated as ordinary law for judges to enforce in cases. The remaining debates—Originalism, Living Constitutionalism, principle-based interpretation—concern how the court identifies the constitutional rule it will enforce."

  },
  "profile_source_textual": {
    "opening": "Law comes from legal institutions and recognized sources. Moral judgment does not manufacture authority on its own.",
    "context": "Source-based validity and hard textual constraint form one account of institutional settlement. Legislatures make law through enacted language, so the public words are the authoritative form of the decision rather than loose evidence of a policy courts may complete. Inclusive versions of Positivism can still incorporate moral criteria where the legal system itself does so. Outside those incorporated standards, judicial improvement lacks a legal source. The same instinct operates at both levels: recognized institutions determine which norms count as law, and enacted language sharply limits how judges elaborate those norms after the fact."
  },
  "profile_source_purposive": {
    "opening": "Law comes from legal institutions and recognized sources. Moral judgment does not manufacture authority on its own.",
    "context": "Source-based validity can coexist with open interpretation because legal sources can confer judgment as well as settle it. Broad standards, purposive schemes, and delegations may deliberately leave later institutions room to specify the law. The source determines who has authority and the legal framework within which that authority operates; it need not dictate every application in advance. This produces a Positivism comfortable with substantial interpretive judgment so long as the judgment can be traced back to an institutional assignment. The interesting divide is therefore between pedigree and determinacy: the law can have a clear source while leaving its application genuinely open."
  },
  "profile_source_originalist": {
    "opening": "Law comes from legal institutions and recognized sources. Moral judgment does not manufacture authority on its own.",
    "context": "Positivism and Originalism fit neatly when constitutional adoption is treated as a source-creating event. The Constitution's historical enactment supplies legal authority because the system recognizes that enactment as superior law. Historical inquiry then becomes ordinary source identification at the constitutional level. Precedent complicates the picture because judicial doctrine is also an institutional practice with source-like authority. A source-based Originalist therefore has to explain when later legal settlement can mediate, preserve, or displace the consequences of an earlier constitutional settlement. The central tension lies inside Positivism itself: different recognized sources can point in different directions."
  },
  "profile_source_developmental": {
    "opening": "Law comes from legal institutions and recognized sources. Moral judgment does not manufacture authority on its own.",
    "context": "Positivism and constitutional development fit when precedent and official practice themselves qualify as legal sources. Constitutional change can then occur through institutional acceptance without giving judges a freestanding moral power to modernize the document. The important question becomes which practices have crossed the line from political habit into law. Repetition alone is not enough; authority depends on the legal system's criteria for recognizing precedent, settled governmental practice, and other forms of constitutional custom. This places Common-Law Constitutionalism on a source-based footing: later doctrine can genuinely change the law because recognized institutions have made it part of the legal order."
  },
  "profile_source_deferential": {
    "opening": "Law comes from legal institutions and recognized sources. Moral judgment does not manufacture authority on its own.",
    "context": "Source-based validity and political deference converge around institutional legitimacy. Courts have their strongest claim to displace elected government when recognized law actually settles the issue. As legal sources become less determinate, the justification for judicial finality weakens and the authority of political institutions becomes more important. Deference therefore follows from the allocation of lawmaking power, democratic responsibility, and the limited authority of courts to create new settlement for everyone else. Judicial review remains fully available where the law supplies a genuine boundary. The restrained posture appears in the uncertain cases, where a court's preferred interpretation competes with an institution possessing its own legal authority."
  },
  "profile_source_rights": {
    "opening": "Law comes from legal institutions and recognized sources. Moral judgment does not manufacture authority on its own.",
    "context": "Source-based validity can support muscular judicial review when recognized law creates rights that bind political institutions. Once a constitution, precedent, or other authoritative source establishes the right, enforcement does not depend on current democratic approval. The profile is restrained at the stage of identifying law and forceful at the stage of applying it. This separates Positivism from political deference: a judge can reject free-standing moral lawmaking while still treating courts as the institution responsible for enforcing source-grounded rights against majorities. Judicial power draws its legitimacy from fidelity to an authoritative legal settlement rather than from superior moral judgment."
  },
  "profile_nonpositive_textual": {
    "opening": "Principles can belong to law even when no explicit rule states them. Judicial freedom remains constrained by the legal practice those principles must explain.",
    "context": "Non-Positivism and Textualism allocate normative reasoning asymmetrically. Principles can contribute to legal content in hard cases, yet enacted statutes remain deliberate institutional settlements whose wording places severe limits on judicial reconstruction. The legal practice itself determines where principle has room to operate. A broad constitutional standard may invite constructive interpretation, while a precisely drafted statute may leave almost none. This profile therefore avoids a simple equation between moral relevance and interpretive freedom. Normative reasoning can be legally indispensable in one domain and sharply cabined in another because different legal materials generate different kinds of interpretive responsibility."
  },
  "profile_nonpositive_purposive": {
    "opening": "Principles can belong to law even when no explicit rule states them. Judicial freedom remains constrained by the legal practice those principles must explain.",
    "context": "Non-Positivism and purposive interpretation reinforce a view of adjudication in which legal materials require constructive judgment. Principles, statutory purposes, institutional history, and enacted language all contribute to identifying the law's best account. The judge remains tied to the existing legal practice: purpose must come from the law being interpreted, and principle must fit the institutional record. Hard cases become questions of justification across several forms of legal evidence rather than searches for one source that mechanically resolves the dispute. This is a jurisprudence with substantial room for judicial reasoning, but that reasoning earns legal authority through fit with an already structured practice."
  },
  "profile_nonpositive_rights": {
    "opening": "Principles can belong to law even when no explicit rule states them. Judicial freedom remains constrained by the legal practice those principles must explain.",
    "context": "Non-Positivism becomes especially consequential when paired with strong-form rights review. Principles embedded in the legal order can generate enforceable claims even when no explicit rule exhausts their content, and courts possess authority to apply those principles against political majorities. The resulting judicial role is broader than source enforcement alone. A court may have to decide which interpretation of the institutional history best justifies the rights the legal system claims to recognize. Fit remains a legal constraint, while moral and political principle help determine the content of the right. This combination places great confidence in courts as interpreters of the legal order's underlying commitments."
  },
  "profile_originalist_formal": {
    "opening": "The Constitution was settled before the present judge arrived. New circumstances do not create a power to rewrite it.",
    "context": "Originalism and rule formalism share an anti-discretion logic. Fixed historical meaning constrains constitutional interpretation; rules, categories, and structural boundaries constrain application. Each device reduces the occasions on which a judge can replace law already made with an all-things-considered judgment about the better outcome. The package can still produce aggressive judicial review because a historically grounded boundary may require courts to invalidate politically attractive arrangements. Its restraint is methodological, not deferential. The judge is powerful when enforcing an external legal limit and deliberately weak when the claimed authority depends on present-day balancing or policy judgment."
  },
  "profile_originalist_deferential": {
    "opening": "The Constitution was settled before the present judge arrived. New circumstances do not create a power to rewrite it.",
    "context": "Originalism does not require aggressive judicial invalidation. Historical meaning can fix the constitutional benchmark while leaving elected institutions substantial room whenever that benchmark underdetermines the dispute. This version of Originalism separates interpretive fidelity from judicial supremacy. Courts enforce determinate historical limits, yet uncertainty remains politically owned instead of becoming an automatic warrant for judicial finality. The result resembles clear-error or departmentalist traditions more than the image of Originalism as a machine for striking down modern government. Historical constraint identifies the law; institutional restraint governs the space the law leaves unresolved."
  },
  "profile_developmental_source": {
    "opening": "Constitutional law develops through an inherited legal tradition. Change has to grow out of what courts and institutions have already built.",
    "context": "Common-law constitutional development can rest on a strongly source-based theory of law. Precedent, practice, and settled doctrine acquire authority through the institutions and recognition rules of the legal system, allowing constitutional law to evolve without treating contemporary morality as an independent source. Each generation therefore inherits a legal order already changed by previous courts and officials. The legitimacy of development depends on continuity of institutional practice and on the system's criteria for treating those practices as law. This combination makes constitutional evolution genuinely legal while keeping the mechanism of change social, institutional, and historically traceable."
  },
  "profile_developmental_rights": {
    "opening": "Constitutional commitments have to remain capable of governing a society the adopters could not fully imagine.",
    "context": "Developmental constitutionalism and strong-form rights review give courts a substantial role in carrying constitutional commitments forward. Later doctrine and social experience can reveal applications of equality, liberty, or dignity that earlier generations failed to recognize. Precedent supplies continuity, while principle allows the doctrine to become more demanding over time. The theory treats constitutional history as a trajectory of legal development rather than a catalogue of founding-era applications. Its hardest institutional question concerns judicial authority: the mechanism that lets courts correct inherited exclusion also gives them considerable power over contested moral development."
  },
  "profile_legal_process_textual": {
    "opening": "Good judging begins with institutional role. The best substantive answer can still be legally wrong when the wrong institution claims the power to give it.",
    "context": "Textualism can serve Legal Process as a rule of institutional allocation. Statutory language identifies powers, duties, procedures, and jurisdictional boundaries before courts ask which institution would handle the problem most effectively. The text therefore structures the division of labor among legislatures, agencies, and courts. Institutional competence matters inside the authority the statute actually conferred. This approach gives enacted wording a role broader than semantic accuracy: textual constraint preserves the settlement created by the lawmaking process and prevents courts from reallocating power simply because another arrangement seems administratively superior."
  },
  "profile_legal_process_purposive": {
    "opening": "Good judging begins with institutional role. The best substantive answer can still be legally wrong when the wrong institution claims the power to give it.",
    "context": "Within Legal Process, purpose helps identify the function a statute assigned to each institution. A legal scheme can distribute responsibility among courts, agencies, and political actors in ways that only make sense when read against the problem Congress was trying to solve. Institutional competence and reason-giving then discipline how each actor carries out that assignment. This produces a purposive method with strong structural limits: the judge interprets the statutory project while remaining attentive to who was authorized to make which choices. Coherence, procedure, and institutional role all become part of the interpretive inquiry."
  },
  "profile_legal_process_deferential": {
    "opening": "Good judging begins with institutional role. The best substantive answer can still be legally wrong when the wrong institution claims the power to give it.",
    "context": "Legal Process gives deference a jurisprudential basis in the allocation of authority. Legislatures possess democratic responsibility, agencies may possess delegated expertise, trial courts control factual development, and appellate courts supply legal supervision. The system works by giving different institutions different jobs. Judicial restraint follows when another institution is acting within a lawful assignment and offering the kind of reasons appropriate to its role. Courts still police jurisdiction, statutory boundaries, procedure, and reason-giving. The deference is conditional and institutional: it tracks lawful competence rather than an across-the-board preference for political decisionmaking."
  },
  "profile_pragmatic_rights": {
    "opening": "Doctrine has to survive contact with institutions, incentives, and actual human behavior.",
    "context": "Pragmatism changes the way strong rights review is designed. Effective protection depends on remedies, administrability, incentives, and the behavior of institutions after the opinion is issued. A right enforced through a rule that officials can easily evade may be nominal; a sweeping doctrine courts cannot administer may collapse under its own costs. The judge therefore evaluates the practical architecture of rights enforcement as part of the legal problem. This approach can support interventionist courts while remaining skeptical of symbolic or categorical solutions. Judicial power is justified through its capacity to make legal guarantees function in the institutions where violations occur."
  },
  "profile_pragmatic_rules": {
    "opening": "Doctrine has to survive contact with institutions, incentives, and actual human behavior.",
    "context": "Rules can be justified pragmatically because predictability, coordination, administrability, and reduced bias are themselves consequences. A rigid rule may produce some unattractive individual outcomes while improving the legal system across a larger class of cases. The relevant comparison is between decision procedures, not between abstraction and practical judgment. Case-by-case balancing gives decisionmakers more information and more discretion; rules sacrifice some fit in exchange for stable expectations and cheaper administration. This profile is pragmatic about the value of constraint: the rule earns its authority through the institutional effects created by committing to it in advance."
  },
  "profile_low_commitment": {
    "opening": "Your answers do not organize legal judgment around a stable hierarchy of reasons.",
    "context": "A near-center profile says less than it first appears to say. Moderate scores across text, history, precedent, remedies, judicial power, structure, and doctrinal form do not automatically combine into a sophisticated synthesis. They can instead reflect weak commitments, unresolved tensions, or a case-by-case style that lacks a stable rule for deciding which legal reason should prevail when several conflict. Direct contradiction is a separate problem and triggers a different result. Here the limitation is theoretical depth: the answers supply legal instincts, but they do not yet supply a durable second-order account of how those instincts fit together."
  }
});

  const SPECIAL_IDS = new Set(["unusable_response","incoherent_response","outcome_driven_left","outcome_driven_right"]);
  const isOriginalist = (id) => ["originalist","public_meaning_originalist","original_intent_originalist","original_methods_originalist","framework_originalist"].includes(id);
  const has = (traits, key, min = 0.5) => Number(traits?.[key] || 0) >= min;
  const axis = (scores, id) => Number(scores?.[id] ?? 50);

  const OPENINGS = Object.freeze({
    constraint_correction: "You trust judges least when they preserve a rule they believe the law never authorized. Stability has value, but it cannot turn judicial repetition into a source superior to the Constitution or statute itself. Once the mistake is clear enough, you would rather absorb the disruption of correction than make fidelity depend on how long courts have been wrong.",
    constraint_settlement: "You think a legal system can be damaged by correction as well as by error. Judges inherit reliance, institutions, and settled expectations that did not exist when the original mistake was made. Fidelity therefore includes knowing when legal continuity has become weightier than a fresh effort to get the underlying question exactly right.",
    constraint_general: "You want judges to have somewhere outside themselves to point. Text, fixed meaning, rules, and assigned powers matter because they deny the court an easy route from 'this result is bad' to 'the law must mean something else.' Your ideal judge can enforce hard limits without claiming a general license to improve the legal order.",
    developmental_settlement: "You think judges inherit a legal tradition rather than a blank page. The legitimacy of constitutional change comes from working through precedent, practice, and accumulated doctrine, so continuity is part of the method itself. A court can move the law, but it owes an account of how the new position grew out of what came before.",
    developmental_rights: "You think a constitution has to remain capable of governing a society its adopters could not fully imagine. Later doctrine, experience, and political development can change what constitutional commitments demand. Courts still owe legal reasons for that development, but founding-era expectations do not get a permanent veto over the law's application.",
    moral_settlement: "You think law loses something essential when it becomes morally blind, and judges lose legitimacy when morality becomes a blank check. Positive law can settle questions that moral reasoning leaves open, while objective principles still shape authority and its limits. The difficult work is preserving both ideas at once.",
    institutional_process: "You think good judging often begins by asking whether the judge should be the one deciding at all. Legal systems divide authority among institutions for reasons of competence, procedure, accountability, and settlement. A court that reaches the substantively best answer through the wrong institutional role can still get the law wrong.",
    adaptive_pragmatic: "You care less about theoretical purity than whether legal doctrine survives contact with institutions, incentives, and actual human behavior. Hard cases expose choices that doctrine cannot always hide. When genuine room remains, you want judges to confront consequences openly and prefer rules that can be administered without making the legal system ridiculous.",
    democratic_process: "You distrust democracy least when it can correct itself and courts least when they repair the machinery that makes correction possible. Exclusion, entrenchment, and blocked political channels justify judicial aggression. Ordinary policy disagreement does not. The court's strongest claim to power is restoring a political process capable of taking the fight back.",
    democratic_deferential: "You think constitutional disagreement is usually a reason to leave room for politics, not a reason to give judges the final word. Courts still enforce genuine legal limits, but reasonable disagreement weakens the case for displacement. Judicial authority is strongest when the law is clear and weakest when the judge is simply another participant in the dispute.",
    rights_structured: "You think rights become ornamental if courts retreat whenever enforcement becomes politically expensive. Judicial review should be strong enough to bind majorities, but the court must show its work through disciplined legal structure rather than intuition. The harder the intervention, the more exacting the justification has to be.",
    rule_formalist: "You distrust discretion enough to accept ugly results from clear rules. A legal category earns its value by continuing to bind when the equities tempt the decisionmaker to escape it. The point is not neatness; it is denying judges and officials the power to reopen every settled boundary whenever a sympathetic case appears.",
    realist: "You think judicial opinions often tell a cleaned-up story about decisions made under genuine legal uncertainty. Doctrine constrains, but hard cases leave room for institutional incentives, politics, psychology, factual framing, and consequences to shape outcomes. A serious theory of judging has to explain that remaining space instead of pretending the formal opinion exhausts it.",
    sociological: "You think a rule that looks elegant in the books and absurd in the world is still absurd. Legal analysis has to account for the institutions, relationships, incentives, and social norms through which rules actually operate. A court that never looks beyond doctrine can misunderstand the legal order it is supposedly governing.",
    source_positive: "You think judges get into trouble when they confuse what law is with what law should be. Legal authority should be traceable to institutions and practices the system actually recognizes. Moral judgment still matters, but it cannot silently manufacture a source of law whenever the recognized materials produce an unattractive answer.",
    principled_nonpositive: "You distrust the idea that a judge can call a hard case a gap and then openly make new law. Principles of justice and legal coherence can already belong to the law through the practice itself. Judicial freedom is constrained by the institutional history those principles must explain, even when no explicit rule states the answer.",
    extreme_injustice: "You think legality has a floor. Ordinary injustice can remain law, and judges cannot treat every moral error as permission to disregard an enactment. Some wrongs are so radical that the claim to legal authority collapses. The theory is powerful only if that breaking point remains exceptional.",
    legality_form: "You think a regime can fail as law through the way it governs. Secret, retroactive, contradictory, impossible, or routinely ignored rules destroy the conditions that make legal guidance possible. The legal defect exists even before asking whether the substantive policy is just.",
    textual_constraint: "You think Congress owns its mistakes. Judges can read enacted language intelligently and in context, but they do not get to repair the bargain because its omissions, exceptions, or compromises produce a bad policy. The court's discipline is accepting that legally authoritative language can be clumsy, incomplete, and still binding.",
    intentional_method: "You think legal language is an act by lawmakers, not a word puzzle detached from the decision they were trying to make. Text is central because it is the vehicle of that decision, but the lawmaking process can illuminate what the institution meant to accomplish through it when the words remain genuinely uncertain.",
    originalist_fixed: "You would rather live with an old constitutional settlement than let each generation of judges rewrite it. Historical meaning supplies a rule outside present judicial preferences, even when modern facts make application difficult. New circumstances can change what the rule governs; they do not authorize the court to change what the Constitution means.",
    pluralist_method: "You think no single interpretive tool deserves permanent supremacy. Text, history, precedent, structure, purpose, and consequence can each carry genuine legal authority. The judge's burden is explaining why a particular mode should dominate this dispute and applying that same account when the political stakes reverse.",
    minimalist_opening: "You think courts do damage by deciding more than they have to. A narrow holding can resolve the dispute without freezing every adjacent question into constitutional law. Judicial restraint here is about the size and depth of the decision: leave future courts, political institutions, and later facts as much room as the case permits.",
    functional_structure: "You care more about whether power is actually checked than whether every governmental function fits a tidy branch label. Institutional overlap is acceptable when accountability and counterweights remain real. Constitutional structure fails when an arrangement concentrates power, disables a branch, or creates authority no institution can effectively supervise.",
    dialogic_authority: "You want courts strong enough to force a constitutional confrontation and weak enough not to own it forever. Judicial review should make rights legally serious, while the constitutional system preserves a structured route for democratic response. Finality is shared rather than monopolized.",
    low_theory: "You have legal instincts without a stable hierarchy telling you which one wins when they collide. Text, history, precedent, purpose, institutions, and consequences all matter, but your answers do not yet organize them into a durable theory of judicial choice. That can produce flexibility; it can also make hard cases depend heavily on case-specific judgment."
  });

  function selectOpeningId(classification, scores = {}) {
    const id = classification?.identity?.id || "mixed_jurisprudence";
    const t = classification?.traits || {};
    if (SPECIAL_IDS.has(id)) return null;
    if (id === "mixed_jurisprudence") return "low_theory";

    if (id === "legal_realist") return "realist";
    if (id === "sociological_jurist" || has(t,"method.law_in_action",0.65) ||
        has(t,"source.institutional_legal_pluralism",0.5)) return "sociological";

    if (id === "natural_lawyer" || id === "common_good_constitutionalist" ||
        (has(t,"source.objective_morality",0.5) && has(t,"source.positive_law_settlement",0.4)))
      return "moral_settlement";
    if (id === "interpretivist" || id === "dworkinian" || id === "moral_impact_theorist" ||
        id === "nonpositivist" || has(t,"source.fit_and_justification",0.5) ||
        has(t,"source.principles_are_law",0.5))
      return "principled_nonpositive";
    if (id === "radbruchian" || has(t,"source.extreme_injustice",0.67)) return "extreme_injustice";
    if (id === "fullerian" || has(t,"source.internal_legality",0.5)) return "legality_form";
    if (["positivist","inclusive_positivist","exclusive_positivist"].includes(id))
      return "source_positive";

    if (id === "political_process_jurist" || id === "elyan" || has(t,"posture.process_reinforcement",0.5))
      return "democratic_process";
    if (id === "weak_form_constitutionalist" || has(t,"posture.weak_form",0.65))
      return "dialogic_authority";
    if (id === "political_constitutionalist" || id === "thayerian" ||
        id === "popular_constitutionalist" || id === "departmentalist" || id === "waldronian" ||
        axis(scores,"post") >= 72)
      return "democratic_deferential";
    if (id === "legal_constitutionalist") return "rights_structured";

    if (id === "legal_process_theorist" || has(t,"method.institutional_competence",0.5) ||
        has(t,"method.agency_interpretive_autonomy",0.5) ||
        (id === "textualist" && has(t,"separation.interpretive_accommodation",0.5)))
      return "institutional_process";
    if (id === "proportionalist" || id === "alexyan" || has(t,"form.proportionality",0.5) ||
        (axis(scores,"post") <= 30 && axis(scores,"form") <= 32))
      return "rights_structured";

    if (id === "minimalist" || id === "bickelian" || has(t,"method.narrow_shallow",0.75))
      return "minimalist_opening";

    if ((id === "living_constitutionalist" || id === "common_law_constitutionalist" ||
         axis(scores,"time") <= 32) && axis(scores,"prec") >= 62)
      return "developmental_settlement";
    if (id === "living_constitutionalist" || id === "common_law_constitutionalist" ||
        axis(scores,"time") <= 28)
      return "developmental_rights";

    if (["originalist","public_meaning_originalist","original_intent_originalist",
         "original_methods_originalist","framework_originalist"].includes(id) ||
        axis(scores,"time") >= 72) {
      if (axis(scores,"prec") <= 32) return "constraint_correction";
      if (axis(scores,"prec") >= 68) return "constraint_settlement";
      return "originalist_fixed";
    }

    if (id === "textualist") {
      if (axis(scores,"prec") <= 32) return "constraint_correction";
      return "textual_constraint";
    }
    if (id === "intentionalist") return "intentional_method";
    if (id === "interpretive_pluralist") return "pluralist_method";
    if (id === "pragmatist" || id === "purposivist" ||
        (axis(scores,"cons") <= 32 && axis(scores,"form") <= 38))
      return "adaptive_pragmatic";

    if (id === "functionalist" || axis(scores,"separ") <= 28) return "functional_structure";

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
    const id=classification?.identity?.id||"mixed_jurisprudence";
    const t=classification?.traits||{};
    if(id==="unusable_response") return "special_unusable";
    if(id==="incoherent_response") return "special_incoherent";
    if(id==="outcome_driven_left"||id==="outcome_driven_right") return "special_outcome";

    const sourcePositive=["positivist","inclusive_positivist","exclusive_positivist"].includes(id);
    const sourceNonpositive=["interpretivist","dworkinian","nonpositivist","moral_impact_theorist","radbruchian","fullerian"].includes(id);
    const originalist=isOriginalist(id)||has(t,"time.originalism_independent_authority",0.5);
    const developmental=id==="living_constitutionalist"||id==="common_law_constitutionalist";

    if(sourcePositive){
      if(axis(scores,"cons")>=82) return "profile_source_textual";
      if(axis(scores,"cons")<=18) return "profile_source_purposive";
      if(axis(scores,"time")>=82) return "profile_source_originalist";
      if(axis(scores,"time")<=18 && axis(scores,"prec")>=62) return "profile_source_developmental";
      if(axis(scores,"post")>=82) return "profile_source_deferential";
      if(axis(scores,"post")<=18) return "profile_source_rights";
      if(has(t,"source.command_theory",0.5)) return "positivist_command";
      if(has(t,"source.basic_norm",0.5)) return "positivist_pure";
      if(has(t,"source.planning_theory",0.5)) return "positivist_planning";
      if(has(t,"source.normative_positivism",0.5)) return "positivist_normative";
      if(id==="inclusive_positivist"||has(t,"source.morality_incorporated",0.5)) return "positivist_inclusive";
      if(id==="exclusive_positivist"||has(t,"source.source_thesis",0.5)) return "positivist_exclusive";
      return "positivist_mainstream";
    }

    if(sourceNonpositive && id!=="fullerian" && id!=="radbruchian"){
      if(axis(scores,"cons")>=82) return "profile_nonpositive_textual";
      if(axis(scores,"cons")<=18) return "profile_nonpositive_purposive";
      if(axis(scores,"post")<=18 || axis(scores,"form")<=18) return "profile_nonpositive_rights";
      if(id==="moral_impact_theorist"||has(t,"source.moral_impact",0.5)) return "nonpos_moral_impact";
      if(has(t,"source.moral_practice",0.5)) return "nonpos_moral_practice";
      if(id==="interpretivist"||id==="dworkinian") return "interpretivist";
      return "nonpos_generic";
    }
    if(id==="radbruchian") return "nonpos_extreme";
    if(id==="fullerian") return "fullerian";

    if(id==="natural_lawyer"){
      if(axis(scores,"cons")>=82) return "profile_nonpositive_textual";
      if(axis(scores,"cons")<=18) return "profile_nonpositive_purposive";
      if(axis(scores,"post")<=18) return "profile_nonpositive_rights";
      if(has(t,"source.strong_natural_law",0.5)) return "natural_law_strong";
      return "natural_law_mainstream";
    }

    if(originalist){
      if(axis(scores,"prec")<=28 && has(t,"precedent.correctness_first",0.45)) return "opm_correction";
      if(axis(scores,"prec")>=72) return "opm_settlement";
      if(axis(scores,"separ")>=82 || axis(scores,"form")>=82) return "profile_originalist_formal";
      if(axis(scores,"post")>=82) return "profile_originalist_deferential";
      if(id==="original_intent_originalist"||has(t,"time.original_intent",0.55)){
        if(has(t,"time.construction_zone",0.5)) return "oi_construction";
        if(has(t,"time.intent_as_meaning",0.5)) return "oi_semantic";
        return "oi_mainstream";
      }
      if(id==="original_methods_originalist"||has(t,"time.original_methods",0.5)) return "opm_methods";
      if(id==="framework_originalist"||has(t,"time.construction_zone",0.5)) return "opm_construction";
      if(has(t,"source.objective_morality",0.5)&&has(t,"source.positive_law_settlement",0.45)) return "opm_higher_law";
      if(has(t,"time.original_law",0.5)) return "opm_original_law";
      if(has(t,"time.intratextualism",0.5)) return "opm_intratextual";
      return id==="originalist" ? "originalist_generic" : "opm_mainstream";
    }

    if(developmental){
      if(axis(scores,"sorc")>=82) return "profile_developmental_source";
      if(axis(scores,"post")<=18) return "profile_developmental_rights";
      if(id==="common_law_constitutionalist"||has(t,"time.common_law_development",0.55)){
        if(has(t,"source.common_law_fundamental_rights",0.5)) return "common_law_strong_rights";
        if(has(t,"time.ordered_liberty_tradition",0.5)) return "common_law_tradition";
        return "common_law_mainstream";
      }
      if(has(t,"time.democratic_constitutionalism",0.5)) return "living_democratic";
      if(has(t,"time.transformative_constitutionalism",0.5)) return "living_transformative";
      if(has(t,"time.constitutional_moments",0.5)) return "living_moments";
      return "living_mainstream";
    }

    if(id==="legal_process_theorist"){
      if(axis(scores,"cons")>=82) return "profile_legal_process_textual";
      if(axis(scores,"cons")<=18) return "profile_legal_process_purposive";
      if(axis(scores,"post")>=82) return "profile_legal_process_deferential";
      return "legal_process_mainstream";
    }

    if(id==="pragmatist"||id==="purposivist"){
      if(axis(scores,"post")<=18) return "profile_pragmatic_rights";
      if(axis(scores,"form")>=82) return "profile_pragmatic_rules";
      if(id==="purposivist"){
        if(has(t,"form.proportionality",0.5)) return "purposivist_proportional";
        return "purposivist_mainstream";
      }
      if(has(t,"method.statutory_obsolescence",0.5)) return "pragmatist_obsolescence";
      return "pragmatist_mainstream";
    }

    if(id==="textualist"){
      if(has(t,"method.categorical_textual_rights",0.5)) return "textualist_categorical";
      if(has(t,"constraint.enacted_bargain",0.55)) return "textualist_bargain";
      return "textualist_mainstream";
    }
    if(id==="intentionalist"){
      if(has(t,"method.congress_aware_interpretation",0.5)) return "intentionalist_congress";
      if(has(t,"constraint.imaginative_reconstruction",0.5)) return "intentionalist_imaginative";
      return "intentionalist_mainstream";
    }
    if(id==="interpretive_pluralist"){
      if(has(t,"method.practical_reasoning",0.5)) return "pluralist_practical";
      return "pluralist_mainstream";
    }
    if(id==="sociological_jurist"){
      if(has(t,"source.institutional_legal_pluralism",0.5)) return "sociological_pluralism";
      if(has(t,"method.living_law",0.5)) return "sociological_living";
      if(has(t,"method.free_scientific_research",0.5)) return "sociological_free";
      return "sociological_mainstream";
    }
    if(id==="legal_realist"){
      if(has(t,"realism.fact_skepticism",0.5)) return "realist_fact";
      if(has(t,"realism.functional_anti_conceptual",0.5)) return "realist_functional";
      return "realist_mainstream";
    }

    if(id==="political_process_jurist"||id==="elyan"){
      if(has(t,"posture.responsive_review",0.5)) return "political_process_responsive";
      return "political_process";
    }
    if(id==="political_constitutionalist"||id==="waldronian"){
      if(has(t,"posture.weak_form",0.5)) return "weak_form";
      return "political_constitutionalist";
    }
    if(id==="thayerian") return "thayerian";
    if(id==="popular_constitutionalist") return "popular";
    if(id==="departmentalist") return "departmentalist";
    if(id==="minimalist"||id==="bickelian"){
      if(has(t,"posture.passive_virtues",0.5)) return "minimalist_passive";
      if(has(t,"posture.weak_form",0.5)) return "weak_form";
      return "minimalist";
    }
    if(id==="weak_form_constitutionalist") return "weak_form";
    if(id==="legal_constitutionalist") return "legal_constitutionalist";

    if(id==="formalist"){
      if(axis(scores,"time")>=82) return "profile_originalist_formal";
      if(has(t,"separation.strong_nondelegation",0.5)) return "formalist_nondelegation";
      if(has(t,"separation.unitary_executive",0.5)) return "formalist_unitary";
      if(has(t,"form.anti_discretion",0.65)||has(t,"form.rules",0.78)) return "formalist_rules";
      return "formalist_mainstream";
    }
    if(id==="functionalist") return "functionalist_mainstream";
    if(id==="proportionalist"||id==="alexyan"){
      if(axis(scores,"sorc")<=35||has(t,"source.principles_are_law",0.5)) return "proportionalist_nonpositive";
      return "proportionalist_mainstream";
    }

    if(id==="mixed_jurisprudence" || Math.max(...["sorc","cons","time","prec","remed","post","separ","form"].map(a=>Math.abs(axis(scores,a)-50)))<=22)
      return "profile_low_commitment";

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
