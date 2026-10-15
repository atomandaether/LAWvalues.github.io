/* Integrated public result narratives: <=70-word opening + one coherent portrait.
   Context target: roughly 180–300 words; 300 is a cap, not a reason to pad. */
(function attachResultNarrative(global) {
  "use strict";

  const ROUTES = ({
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
    "context": "Originalist theories fix constitutional law historically while disagreeing about whether the relevant object is public meaning, lawmaking intention, or historical legal rules. That leaves a separate question about judicial precedent. Correction-first approaches treat stare decisis as a doctrine of adjudication subordinate to the constitutional source. Their debates often turn on forms of reliance: completed transactions and property arrangements create stronger settlement interests than abstract reliance on a line of doctrine. A precedent can also generate later rules that make reversal institutionally costly. A restorationist approach accepts more of those costs when continued adherence would let judicial doctrine displace the superior law that gave courts authority in the first place."
  },
  "opm_settlement": {
    "opening": "You think the Constitution has fixed historical meaning, but you do not treat every departure from that meaning as something courts must immediately erase. Judges inherit an already-developed legal system, so precedent, reliance, and institutional continuity can matter even when fresh historical analysis points elsewhere.",
    "context": "Originalism fixes constitutional law historically, yet that commitment does not mechanically dictate the treatment of later precedent. Stare decisis can operate as an implementation doctrine that mediates between the original law and the legal system courts actually inherit. Reliance comes in different forms—private ordering, governmental institutions, doctrinal dependence—and each can strengthen the case for continuity. Some precedent-accommodating theories also distinguish the certainty of historical error from the cost of correction. The result is a layered account: the old decision may remain wrong about the Constitution while still generating legal reasons that constrain what today's court should do. This issue arises for intentionalist and public-meaning approaches alike."
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
    "context": "Strong Natural-Law theories make moral requirements relevant to legal validity itself. An enactment's institutional pedigree does not fully answer whether it is law: some serious normative defects can defeat that status. The difficult work lies in specifying which moral requirements are constitutive and how their violation affects the rule's authority. That inquiry is distinct from whether a judge may disregard an enactment in a particular case; institutional powers and duties still require explanation. The commitment also leaves room for disagreement about ordinary unjust laws and the legal force of positive settlement. A strong Natural-Law result establishes the validity thesis without assigning every respondent the same exceptional-injustice threshold or a complete theory of judicial review."
  },
  "interpretivist": {
    "opening": "You think legal practice contains principles as well as enacted rules, and those principles can supply real legal answers in hard cases. Judges should interpret the existing legal system in the way that best fits its history while giving its institutions and rights the strongest coherent justification.",
    "context": "Dworkin's account of law as integrity asks the interpreter to make the community's coercive legal practices intelligible as a coherent scheme of principle. Fit and justification perform different jobs. Fit prevents the judge from discarding statutes and precedents that resist the favored moral theory; justification chooses among interpretations that can plausibly account for the institutional record. Principles can carry legal force without appearing as freestanding enacted rules because they emerge from that constructive interpretation of practice. The approach is ambitious about legal coherence: adjudication should explain past political decisions as speaking with a principled voice across cases, including when their surface rules leave the dispute unresolved."
  },
  "nonpos_moral_impact": {
    "opening": "You think legislatures and courts make law by changing people's actual moral rights and obligations. The legal institutions matter because of the moral impact their actions produce, not because they create a separate source-based category of obligation alongside morality.",
    "context": "Moral Impact Theory asks how legal institutions alter genuine rights and obligations. An enactment can coordinate conduct, create expectations, or change the options available to citizens. Those changes can produce duties whose content differs from the literal message communicated by the lawmakers. Legal interpretation traces this normative effect of institutional action. The theory also limits which effects count as law. An oppressive decision can generate moral duties to resist or undo it, but those duties do not become legal obligations just because an institution caused them. Greenberg describes the relevant changes as arising in the legally proper way. The account needs an explanation of that condition, making the relationship between legal institutions and their moral purpose central to its theory of adjudication."
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
    "context": "Source-based validity and hard textual constraint form one account of institutional settlement. Legislatures make law through enacted language, so the public words are the authoritative form of the decision and sharply limit judicial completion of legislative policy. Inclusive versions of Positivism can still incorporate moral criteria where the legal system itself does so. Outside those incorporated standards, judicial improvement lacks a legal source. The same instinct operates at both levels: recognized institutions determine which norms count as law, and enacted language sharply limits how judges elaborate those norms after the fact."
  },
  "profile_source_purposive": {
    "opening": "Law comes from legal institutions and recognized sources. Moral judgment does not manufacture authority on its own.",
    "context": "Source-based validity can coexist with open interpretation because legal sources can confer judgment as well as settle it. Broad standards, purposive schemes, and delegations may deliberately leave later institutions room to specify the law. The source determines who has authority and the legal framework within which that authority operates; it need not dictate every application in advance. This produces a Positivism comfortable with substantial interpretive judgment so long as the judgment can be traced back to an institutional assignment. The interesting divide is between pedigree and determinacy: the law can have a clear source while leaving its application genuinely open."
  },
  "profile_source_originalist": {
    "opening": "Law comes from legal institutions and recognized sources. Moral judgment does not manufacture authority on its own.",
    "context": "Positivism and Originalism fit neatly when constitutional adoption is treated as a source-creating event. The Constitution's historical enactment supplies legal authority because the system recognizes that enactment as superior law. Historical inquiry then becomes ordinary source identification at the constitutional level. Precedent complicates the picture because judicial doctrine is also an institutional practice with source-like authority. A source-based Originalist has to explain when later legal settlement can mediate, preserve, or displace the consequences of an earlier constitutional settlement. The central tension lies inside Positivism itself: different recognized sources can point in different directions."
  },
  "profile_source_developmental": {
    "opening": "Law comes from legal institutions and recognized sources. Moral judgment does not manufacture authority on its own.",
    "context": "Positivism and constitutional development fit when precedent and official practice themselves qualify as legal sources. Constitutional change can then occur through institutional acceptance without giving judges a freestanding moral power to modernize the document. The important question becomes which practices have crossed the line from political habit into law. Repetition alone is not enough; authority depends on the legal system's criteria for recognizing precedent, settled governmental practice, and other forms of constitutional custom. This places Common-Law Constitutionalism on a source-based footing: later doctrine can genuinely change the law because recognized institutions have made it part of the legal order."
  },
  "profile_source_deferential": {
    "opening": "Law comes from legal institutions and recognized sources. Moral judgment does not manufacture authority on its own.",
    "context": "Source-based validity and political deference converge around institutional legitimacy. Courts have their strongest claim to displace elected government when recognized law actually settles the issue. As legal sources become less determinate, the justification for judicial finality weakens and the authority of political institutions becomes more important. Deference follows from the allocation of lawmaking power, democratic responsibility, and the limited authority of courts to create new settlement for everyone else. Judicial review remains fully available where the law supplies a genuine boundary. The restrained posture appears in the uncertain cases, where a court's preferred interpretation competes with an institution possessing its own legal authority."
  },
  "profile_source_rights": {
    "opening": "Law comes from legal institutions and recognized sources. Moral judgment does not manufacture authority on its own.",
    "context": "Source-based validity can support muscular judicial review when recognized law creates rights that bind political institutions. Once a constitution, precedent, or other authoritative source establishes the right, enforcement does not depend on current democratic approval. The profile is restrained at the stage of identifying law and forceful at the stage of applying it. A judge can reject free-standing moral lawmaking while still treating courts as the institution responsible for enforcing source-grounded rights against majorities. Judicial power draws its legitimacy from fidelity to an authoritative legal settlement, with no claim of superior moral insight required."
  },
  "profile_nonpositive_textual": {
    "opening": "Principles can belong to law even when no explicit rule states them. Judicial freedom remains constrained by the legal practice those principles must explain.",
    "context": "Moral grounds of law and tight textual constraint address different parts of legal judgment. An account of what gives law authority can include moral reasons while still treating enacted statutes as deliberate institutional settlements. Precisely drafted provisions sharply limit what judges can do in the name of an attractive purpose; open constitutional standards leave different questions for legal reasoning. The combination requires an account of why the chosen words bind and where their authority ends. Acknowledging moral limits on law does not, by itself, authorize judicial repair of every bad legislative choice. Textual discipline can preserve coordination, notice, and the allocation of decisionmaking even within a theory that denies source pedigree is the whole explanation of law."
  },
  "profile_nonpositive_purposive": {
    "opening": "Principles can belong to law even when no explicit rule states them. Judicial freedom remains constrained by the legal practice those principles must explain.",
    "context": "Moral grounds of law and purposive interpretation meet in the question of what legal institutions are entitled to require. Statutory purposes help explain the project an enactment undertakes, while normative reasoning helps identify the authority and limits of that project. The words, institutional setting, and consequences of competing readings all remain relevant. This combination gives courts substantial interpretive responsibility without making a preferred policy self-authorizing. Its difficulty is to distinguish reasons that belong to the law from reasons for changing the law. Its recurring problem is control: courts need an account of why a purpose has legal force, what limits its use, and how a defensible reading can be distinguished from rewriting."
  },
  "profile_nonpositive_rights": {
    "opening": "Principles can belong to law even when no explicit rule states them. Judicial freedom remains constrained by the legal practice those principles must explain.",
    "context": "A moral account of law takes on an additional institutional commitment when paired with strong judicial review. The first claim concerns the grounds of legal rights; the second gives courts responsibility for enforcing those rights against political majorities. Neither claim establishes the other automatically. A moral theory can recognize reasons for democratic decisionmaking, and a source-based theory can authorize powerful courts. In this combination, legal rights require normative reasoning and courts have a substantial role in applying them. The central challenge is explaining what makes that reasoning legally authoritative and how judges remain accountable for it. Institutional authority, the character of the right, and the limits of judicial reasoning all bear on that explanation. Confidence in judicial enforcement needs justification alongside the moral account of the law being enforced."
  },
  "profile_originalist_formal": {
    "opening": "The Constitution was settled before the present judge arrived. New circumstances do not create a power to rewrite it.",
    "context": "Originalism can combine with categorical rules or firm structural boundaries to limit judicial discretion. Fixed historical meaning constrains interpretation; the independent commitment to rules or assigned powers constrains how the law operates. A judge can enforce a strict allocation of government authority while using contextual standards elsewhere, so structural formalism does not require categorical doctrine in every field. The combination can support forceful judicial review when historical law establishes a boundary that political institutions have crossed. It can also support restraint where that law leaves a choice to another decisionmaker. The shared concern is whether an institution has legal authority for its action, with the respondent's additional commitments determining how strictly that authority is bounded."
  },
  "profile_originalist_deferential": {
    "opening": "The Constitution was settled before the present judge arrived. New circumstances do not create a power to rewrite it.",
    "context": "Originalism does not require aggressive judicial invalidation. Historical meaning can fix the constitutional benchmark while leaving elected institutions substantial room whenever that benchmark underdetermines the dispute. This version of Originalism separates interpretive fidelity from judicial supremacy. Courts enforce determinate historical limits, yet uncertainty remains politically owned instead of becoming an automatic warrant for judicial finality. The result resembles clear-error or departmentalist traditions more than the image of Originalism as a machine for striking down modern government. Historical constraint identifies the law; institutional restraint governs the space the law leaves unresolved."
  },
  "profile_developmental_source": {
    "opening": "Constitutional law develops through an inherited legal tradition. Change has to grow out of what courts and institutions have already built.",
    "context": "Common-law constitutional development can rest on a strongly source-based theory of law. Precedent, practice, and settled doctrine acquire authority through the institutions and recognition rules of the legal system, allowing constitutional law to evolve without treating contemporary morality as an independent source. Each generation inherits a legal order already changed by previous courts and officials. The legitimacy of development depends on continuity of institutional practice and on the system's criteria for treating those practices as law. This combination makes constitutional evolution genuinely legal while keeping the mechanism of change social, institutional, and historically traceable."
  },
  "profile_developmental_rights": {
    "opening": "Constitutional commitments have to remain capable of governing a society the adopters could not fully imagine.",
    "context": "Developmental constitutionalism and strong-form rights review give courts a substantial role in carrying constitutional commitments forward. Later doctrine and social experience can reveal applications of equality, liberty, or dignity that earlier generations failed to recognize. Precedent supplies continuity, while principle allows the doctrine to become more demanding over time. The theory treats constitutional history as a trajectory of legal development whose later stages can carry legal authority of their own. Its hardest institutional question concerns judicial authority: the mechanism that lets courts correct inherited exclusion also gives them considerable power over contested moral development."
  },
  "profile_legal_process_textual": {
    "opening": "Good judging begins with institutional role. The best substantive answer can still be legally wrong when the wrong institution claims the power to give it.",
    "context": "Textualism can serve Legal Process as a rule of institutional allocation. Statutory language identifies powers, duties, procedures, and jurisdictional boundaries before courts ask which institution would handle the problem most effectively. The text structures the division of labor among legislatures, agencies, and courts. Institutional competence matters inside the authority the statute actually conferred. This approach gives enacted wording a role broader than semantic accuracy: textual constraint preserves the settlement created by the lawmaking process and prevents courts from reallocating power simply because another arrangement seems administratively superior."
  },
  "profile_legal_process_purposive": {
    "opening": "Good judging begins with institutional role. The best substantive answer can still be legally wrong when the wrong institution claims the power to give it.",
    "context": "Within Legal Process, purpose helps identify the function a statute assigned to each institution. A legal scheme can distribute responsibility among courts, agencies, and political actors in ways that only make sense when read against the problem Congress was trying to solve. Institutional competence and reason-giving then discipline how each actor carries out that assignment. This produces a purposive method with strong structural limits: the judge interprets the statutory project while remaining attentive to who was authorized to make which choices. Coherence, procedure, and institutional role all become part of the interpretive inquiry."
  },
  "profile_legal_process_deferential": {
    "opening": "Good judging begins with institutional role. The best substantive answer can still be legally wrong when the wrong institution claims the power to give it.",
    "context": "Legal Process gives deference a jurisprudential basis in the allocation of authority. Legislatures possess democratic responsibility, agencies may possess delegated expertise, trial courts control factual development, and appellate courts supply legal supervision. The system works by giving different institutions different jobs. Judicial restraint follows when another institution is acting within a lawful assignment and offering the kind of reasons appropriate to its role. Courts still police jurisdiction, statutory boundaries, procedure, and reason-giving. The deference is conditional and institutional, tracking lawful competence and assigned responsibility."
  },
  "profile_pragmatic_rights": {
    "opening": "Doctrine has to survive contact with institutions, incentives, and actual human behavior.",
    "context": "Pragmatism changes the way strong rights review is designed. Effective protection depends on remedies, administrability, incentives, and the behavior of institutions after the opinion is issued. A right enforced through a rule that officials can easily evade may be nominal; a sweeping doctrine courts cannot administer may collapse under its own costs. The judge evaluates the practical architecture of rights enforcement as part of the legal problem. This approach can support interventionist courts while remaining skeptical of symbolic or categorical solutions. Judicial power is justified through its capacity to make legal guarantees function in the institutions where violations occur."
  },
  "profile_pragmatic_rules": {
    "opening": "Doctrine has to survive contact with institutions, incentives, and actual human behavior.",
    "context": "Rules can be justified pragmatically because predictability, coordination, administrability, and reduced bias are themselves consequences. A rigid rule may produce some unattractive individual outcomes while improving the legal system across a larger class of cases. The relevant comparison is between decision procedures, not between abstraction and practical judgment. Case-by-case balancing gives decisionmakers more information and more discretion; rules sacrifice some fit in exchange for stable expectations and cheaper administration. This profile is pragmatic about the value of constraint: the rule earns its authority through the institutional effects created by committing to it in advance."
  },
  "profile_thin_beyond_noun": {
    "opening": "One jurisprudential commitment is clear; the rest of the judicial philosophy is not yet comparably developed.",
    "context": "A clear answer to one jurisprudential question does not by itself amount to a complete theory of judging. Here the primary commitment is real, but the answers on interpretation, precedent, judicial authority, remedies, institutional structure, and doctrinal form stay too close to the middle to generate a stable second-order method. That matters because hard cases usually force those dimensions into conflict. A judge needs some account of what happens when source fidelity collides with precedent, rights collide with deference, or rules collide with consequences. This profile has a recognizable center of gravity without a comparably definite theory for resolving those collisions."
  },
  "profile_unresolved_commitments": {
    "opening": "Your answers contain definite legal commitments, but they do not establish one supported account of how those commitments govern hard cases.",
    "context": "A profile can contain strong legal commitments without establishing a single jurisprudential school. Firm positions on different questions need an account of how they interact when a case brings them into conflict. That account cannot be inferred from distance from the midpoint alone. It may remain unresolved, or the available questions may not distinguish it clearly enough. Interpretive Pluralism would require affirmative support for several forms of argument as legitimate parts of a method. Direct contradiction requires separate evidence of incompatible answers to matched propositions. Neither follows merely from a mixed profile. LAWvalues preserves the measured commitments while withholding a theoretical synthesis the responses have not established."
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
  const nearCenter = (scores) => ["sorc","cons","time","prec","remed","post","separ","form"]
    .every((id) => Math.abs(axis(scores,id)-50) <= 22);

  const OPENINGS = ({
    constraint_correction: "You trust judges least when they preserve a rule they believe the law never authorized. Stability has value, but it cannot turn judicial repetition into a source superior to the Constitution or statute itself. Once the mistake is clear enough, you would rather absorb the disruption of correction than make fidelity depend on how long courts have been wrong.",
    constraint_settlement: "You think a legal system can be damaged by correction as well as by error. Judges inherit reliance, institutions, and settled expectations that did not exist when the original mistake was made. Fidelity includes knowing when legal continuity has become weightier than a fresh effort to get the underlying question exactly right.",
    constraint_general: "You want judges to have somewhere outside themselves to point. Text, fixed meaning, rules, and assigned powers matter because they deny the court an easy route from 'this result is bad' to 'the law must mean something else.' Your ideal judge can enforce hard limits without claiming a general license to improve the legal order.",
    developmental_settlement: "You think judges inherit a legal tradition rather than a blank page. The legitimacy of constitutional change comes from working through precedent, practice, and accumulated doctrine, so continuity is part of the method itself. A court can move the law, but it owes an account of how the new position grew out of what came before.",
    developmental_rights: "You think a constitution has to remain capable of governing a society its adopters could not fully imagine. Later doctrine, experience, and political development can change what constitutional commitments demand. Courts still owe legal reasons for that development, but founding-era expectations do not get a permanent veto over the law's application.",
    moral_settlement: "You think law loses something essential when it becomes morally blind, and judges lose legitimacy when morality becomes a blank check. Positive law can settle questions that moral reasoning leaves open, while objective principles still shape authority and its limits. The difficult work is preserving both ideas at once.",
    institutional_process: "You think good judging often begins by asking whether the judge should be the one deciding at all. Legal systems divide authority among institutions for reasons of competence, procedure, accountability, and settlement. A court that reaches the substantively best answer through the wrong institutional role can still get the law wrong.",
    adaptive_pragmatic: "You care less about theoretical purity than whether legal doctrine survives contact with institutions, incentives, and actual human behavior. Hard cases expose choices that doctrine cannot always hide. When genuine room remains, you want judges to confront consequences openly and prefer rules that can be administered without making the legal system ridiculous.",
    democratic_process: "You distrust democracy least when it can correct itself and courts least when they repair the machinery that makes correction possible. Exclusion, entrenchment, and blocked political channels justify judicial aggression. Ordinary policy disagreement does not. The court's strongest claim to power is restoring a political process capable of taking the fight back.",
    democratic_deferential: "You think reasonable constitutional disagreement gives politics a stronger claim to decide who governs and how. Courts still enforce genuine legal limits, but reasonable disagreement weakens the case for displacement. Judicial authority is strongest when the law is clear and weakest when the judge is simply another participant in the dispute.",
    rights_structured: "You think rights become ornamental if courts retreat whenever enforcement becomes politically expensive. Judicial review should be strong enough to bind majorities, but the court must show its work through disciplined legal structure rather than intuition. The harder the intervention, the more exacting the justification has to be.",
    rule_formalist: "You distrust discretion enough to accept ugly results from clear rules. A legal category earns its value by continuing to bind when the equities tempt the decisionmaker to escape it. The point is not neatness; it is denying judges and officials the power to reopen every settled boundary whenever a sympathetic case appears.",
    realist: "You think judicial opinions often tell a cleaned-up story about decisions made under genuine legal uncertainty. Doctrine constrains, but hard cases leave room for institutional incentives, politics, psychology, factual framing, and consequences to shape outcomes. A serious theory of judging has to explain that remaining space instead of pretending the formal opinion exhausts it.",
    sociological: "You think a rule that looks elegant in the books and absurd in the world is still absurd. Legal analysis has to account for the institutions, relationships, incentives, and social norms through which rules actually operate. A court that never looks beyond doctrine can misunderstand the legal order it is supposedly governing.",
    source_positive: "You think judges get into trouble when they confuse what law is with what law should be. Legal authority should be traceable to institutions and practices the system actually recognizes. Moral judgment still matters, but it cannot silently manufacture a source of law whenever the recognized materials produce an unattractive answer.",
    nonpositive_general: "You think identifying the institution that made a rule leaves an important legal question unanswered. Moral reasons can help determine the authority or content of law itself. Judges still need an account of how those reasons operate within public institutions; dissatisfaction with an outcome does not supply that account on its own.",
    moral_impact: "You think an official decision can bind people for reasons its authors never fully understood. Passing a statute changes expectations, dependencies, and the terms on which people can fairly deal with one another. A judge must follow those changes through, including when the duties they create reach beyond the message lawmakers intended to communicate.",
    moral_practice: "You distrust a legal answer that ends at 'those are the rules.' Public decisions can change what fair treatment requires, and judging has to explain why one person may demand something from another. The courtroom is part of that continuing moral relationship, with official materials shaping its responsibilities and limits.",
    strong_natural_law: "You think an institution's authority to issue a rule cannot settle every question about its legal validity. Some moral defects undermine the rule's status as law itself. A judge must explain where that limit lies and what authority courts have to enforce it; identifying a moral failure does not answer every institutional question.",
    popular_authority: "You distrust a constitutional order in which citizens can debate everything except what their own Constitution means. Courts decide cases, but public movements and democratic politics retain constitutional responsibility. A judicial ruling can settle a dispute without closing the people's continuing argument about the commitments under which they govern themselves.",
    departmental_authority: "You think every branch has to take responsibility for the Constitution when exercising its own powers. A court's judgment binds the case it decides, but its reasoning does not relieve other officials of their constitutional duties. The hard problem is coordinating those responsibilities without turning one branch into the permanent constitutional supervisor of all the others.",
    purposive_method: "You think a judge can get the words right and still misunderstand the law's project. An enactment addresses a problem through a particular institutional design, and interpretation has to make sense of that design. The judge must explain how the reading serves the enacted scheme without replacing its compromises with a more attractive policy.",
    proportionality_method: "You want public power to justify the burdens it places on rights through a disciplined sequence of questions. Does the measure serve a legitimate goal, does it work, and could a less restrictive measure do the job? Any remaining burden needs its own justification. The method demands reasons without deciding in advance which institution always gets the final word.",
    structural_formalist: "You think constitutional allocations of power should bind even when ignoring them would make government work more smoothly. A useful arrangement still needs legal authority. Judges protect the boundaries of each institution's role, leaving political actors to pursue their goals through powers and procedures the constitutional system actually gives them.",
    unresolved_commitments: "You take definite positions on important legal questions, but your answers leave unresolved how those commitments fit together when they collide. A preference about one kind of case does not establish the rule for another. The evidence supports parts of a judicial outlook without yet supporting one account of what should control the hardest decisions.",
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

  function legacySelectOpeningId(classification, scores = {}, explicitOpeningId = null) {
    const id = classification?.identity?.id || "mixed_jurisprudence";
    const t = classification?.traits || {};
    if (SPECIAL_IDS.has(id)) return null;
    if (typeof explicitOpeningId === "string" && Object.hasOwn(OPENINGS, explicitOpeningId)) return explicitOpeningId;
    if (id === "mixed_jurisprudence") return nearCenter(scores) ? "low_theory" : "unresolved_commitments";

    if (id === "legal_realist") return "realist";
    if (id === "sociological_jurist" || has(t,"method.law_in_action",0.65) ||
        has(t,"source.institutional_legal_pluralism",0.5)) return "sociological";

    if (id === "radbruchian" ||
        (id === "nonpositivist" && has(t,"source.extreme_injustice",0.5))) return "extreme_injustice";
    if (id === "fullerian") return "legality_form";
    if (id === "natural_lawyer" && has(t,"source.strong_natural_law",0.5)) return "strong_natural_law";
    if (id === "natural_lawyer" || id === "common_good_constitutionalist") return "moral_settlement";
    if (id === "moral_impact_theorist" ||
        (id === "nonpositivist" && has(t,"source.moral_impact",0.5))) return "moral_impact";
    if (id === "nonpositivist" && has(t,"source.moral_practice",0.5)) return "moral_practice";
    if (id === "interpretivist" || id === "dworkinian") return "principled_nonpositive";
    if (id === "nonpositivist") return "nonpositive_general";
    if (["positivist","inclusive_positivist","exclusive_positivist"].includes(id)) return "source_positive";

    if (has(t,"source.objective_morality",0.5) && has(t,"source.positive_law_settlement",0.4))
      return "moral_settlement";
    if (has(t,"source.fit_and_justification",0.5) && has(t,"source.principles_are_law",0.35))
      return "principled_nonpositive";
    if (has(t,"source.extreme_injustice",0.67)) return "extreme_injustice";
    if (has(t,"source.internal_legality",0.5)) return "legality_form";

    if (id === "political_process_jurist" || id === "elyan" || has(t,"posture.process_reinforcement",0.5))
      return "democratic_process";
    if (id === "weak_form_constitutionalist" || has(t,"posture.weak_form",0.65))
      return "dialogic_authority";
    if (id === "popular_constitutionalist") return "popular_authority";
    if (id === "departmentalist") return "departmental_authority";
    if (id === "political_constitutionalist" || id === "thayerian" || id === "waldronian" ||
        axis(scores,"post") >= 72)
      return "democratic_deferential";
    if (id === "legal_constitutionalist") return "rights_structured";

    if (id === "legal_process_theorist" || has(t,"method.institutional_competence",0.5) ||
        has(t,"method.agency_interpretive_autonomy",0.5) ||
        (id === "textualist" && has(t,"separation.interpretive_accommodation",0.5)))
      return "institutional_process";
    if (id === "proportionalist" || id === "alexyan" || has(t,"form.proportionality",0.5))
      return axis(scores,"post") <= 30 ? "rights_structured" : "proportionality_method";
    if (axis(scores,"post") <= 30 && axis(scores,"form") <= 32) return "rights_structured";

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
    if (id === "purposivist") return "purposive_method";
    if (id === "pragmatist" ||
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
    if (id === "formalist") return "structural_formalist";
    if (axis(scores,"form") >= 74) return "rule_formalist";
    return "low_theory";
  }

  function legacyBuildOpening(classification, scores = {}, explicitOpeningId = null) {
    const id = classification?.identity?.id || "mixed_jurisprudence";
    if (id === "unusable_response") return ROUTES.special_unusable.opening;
    if (id === "incoherent_response") return ROUTES.special_incoherent.opening;
    if (id === "outcome_driven_left" || id === "outcome_driven_right") return ROUTES.special_outcome.opening;
    const openingId = selectOpeningId(classification, scores, explicitOpeningId);
    return OPENINGS[openingId] || OPENINGS.low_theory;
  }

  // Public narratives are deliberately champion-blind. A route may name a
  // theorist when the person's work is part of explaining the theory itself
  // (for example Dworkin, Fuller, Kelsen, or Ely), but route selection and prose
  // must never depend on which champion the matching layer selected.
  function legacySelectContextId(classification, scores = {}) {
    const id=classification?.identity?.id||"mixed_jurisprudence";
    const t=classification?.traits||{};
    if(id==="unusable_response") return "special_unusable";
    if(id==="incoherent_response") return "special_incoherent";
    if(id==="outcome_driven_left"||id==="outcome_driven_right") return "special_outcome";

    const sourcePositive=["positivist","inclusive_positivist","exclusive_positivist"].includes(id);
    const sourceNonpositive=["interpretivist","dworkinian","nonpositivist","moral_impact_theorist","radbruchian","fullerian"].includes(id);
    const originalist=!has(t,"time.precedent_mediated_historicism",0.5) &&
      (isOriginalist(id)||has(t,"time.originalism_independent_authority",0.5));
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

    if(id==="common_good_constitutionalist") return "common_good";
    if(id==="nonpositivist" && has(t,"source.extreme_injustice",0.5)) return "nonpos_extreme";

    if(sourceNonpositive && id!=="fullerian" && id!=="radbruchian"){
      if(axis(scores,"cons")>=82) return "profile_nonpositive_textual";
      if(axis(scores,"cons")<=18) return "profile_nonpositive_purposive";
      if(axis(scores,"post")<=18) return "profile_nonpositive_rights";
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
      if(has(t,"constraint.contextual_textualism",0.5) &&
         has(t,"separation.interpretive_accommodation",0.5))
        return "textualist_institutional";
      if(has(t,"constraint.enacted_bargain",0.55)) return "textualist_bargain";
      return "textualist_mainstream";
    }
    if(id==="intentionalist"){
      if(has(t,"method.congress_aware_interpretation",0.5)) return "intentionalist_congress";
      if(has(t,"constraint.imaginative_reconstruction",0.5)) return "intentionalist_imaginative";
      return "intentionalist_mainstream";
    }
    if(id==="interpretive_pluralist"){
      if(has(t,"method.practical_reasoning",0.25)) return "pluralist_practical";
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

    if(id==="mixed_jurisprudence")
      return nearCenter(scores) ? "profile_low_commitment" : "profile_unresolved_commitments";
    if(nearCenter(scores)) return "profile_low_commitment";

    return "low_theory";
  }


  // Each plan describes a relationship, its mechanism, and its unresolved case.
  // Scores support tendencies; none licenses an invented life history or motive.
  const PORTRAITS = {
    realist_continuity: {
      opening: "You want courts to develop inherited law with care, but you also think legal rules leave important parts of actual judging unexplained. Precedent constrains decisions without always determining them. Understanding hard cases requires looking at judges and their institutions as well as legal arguments. That makes the gap between legal justification and actual decision-making central to your outlook.",
      context: "A commitment to precedent can coexist with a realistic account of its limits. Settled decisions supply authority, and development through cases can preserve continuity as law changes. Yet the materials may support several defensible answers in a hard dispute. Your empirical orientation asks what then explains the court's actual choice: institutional pressures, experience, background views, and other influences that legal arguments alone may not reveal. Legal realism studies that gap between the reasons available in doctrine and the forces shaping decisions. It does not require concluding that precedent is irrelevant or that judges should decide according to personal politics. In this combination, continuity remains a commitment about how courts should work, while realism cautions against assuming that stated legal reasons provide a complete account of how they do work.",
      boundary: "The challenge is to evaluate and improve legal constraints using evidence about judicial behavior without treating every observed influence as a legitimate reason for a decision."
    },
    pluralist_rights_continuity: {
      opening: "You want courts to protect rights while developing the law they inherit through several kinds of legal reasoning. Precedent gives continuity, but text, history, structure, and consequences also deserve attention. Courts must explain how those reasons support their decisions, especially when a new protection challenges an established rule or a popular policy.",
      context: "A strong judicial role need not rest on one interpretive method. Your pluralist approach gives several forms of legal argument a legitimate place in deciding what a right requires. Precedent supplies an inherited body of principles and working rules; text, history, structure, and consequences can illuminate how that body of law should develop. This joins interpretive pluralism with constitutional development through cases. Respect for continuity gives courts reasons for caution, while support for judicial rights enforcement gives them responsibility for confronting failures of protection, including against elected institutions. A court must explain how its chosen combination of reasons warrants the protection it orders.",
      boundary: "The recurring difficulty is deciding which reasons should carry the most weight when a claimed right, a settled precedent, and a democratic decision point in different directions."
    },
    pluralist_continuity: {
      opening: "You want courts to develop inherited law through several kinds of legal reasoning. Precedent provides continuity, while text, history, structure, and consequences can also matter. No single method supplies every answer. Your outlook asks judges to explain how those reasons work together in a dispute and why departing from a settled decision is justified.",
      context: "Pluralist reasoning gives continuity a place within a broader method. Earlier decisions supply established principles and reasons for caution, while text, history, structure, purpose, and practical considerations can illuminate different aspects of the same dispute. Interpretive pluralism treats these forms of argument as legitimate parts of legal reasoning without giving one permanent control over every hard case. Your support for development through precedent gives that flexibility an inherited legal setting: new decisions should work with a body of law that other courts and institutions already use. The competing forms of argument must be related to the particular problem the court must resolve. This is an affirmative account of using several methods, not evidence that the respondent has no commitments or chooses whichever result seems attractive.",
      boundary: "The difficult case is one where the available methods point in different directions. A court must explain its priorities in that case and whether the same explanation would remain persuasive when the beneficiary changes."
    },
    continuity_rights: {
      opening: "You want courts to make rights effective while building on the law they inherit. Earlier decisions deserve weight, yet they can also provide the starting point for broader protection. Your outlook gives courts responsibility for development and a reason to avoid abrupt reversals. The difficult question is when protecting a right requires leaving settled law behind.",
      context: "Continuity and rights protection can reinforce each other. Earlier cases supply principles and working rules that later courts can extend to problems their predecessors did not resolve. This is a central idea of common-law constitutionalism: constitutional law develops through decisions, while settled decisions also limit how freely the next court can start over. Strong judicial review adds another responsibility, enforcing constitutional limits when elected institutions resist them. Respect for precedent does not settle every conflict between those responsibilities. A longstanding decision might organize public life while denying a protection the court now considers legally required.",
      boundary: "The recurring test is whether extending protection can be justified through the inherited law, and when the reasons for departure outweigh the reasons for continuity."
    },
    continuity_development: {
      opening: "You see courts as inheriting a body of law that can develop through use. Earlier decisions give later judges something to build on and a reason to avoid sudden reversals. New circumstances can justify growth in legal protection. Your outlook makes continuity part of legal change, while leaving a hard question about how far that change can go.",
      context: "Treating precedent as a starting point for development connects stability with adaptation. Courts can reason from earlier cases, extend their principles, and work out how a protection operates in a new setting. Common-law constitutionalism gives this accumulated practice a role in shaping present constitutional law. The legal order is built across generations of decisions, which makes both inherited authority and the costs of reversing it relevant. This differs from an account in which later decisions only provide evidence of a meaning already fixed at adoption. It still leaves limits to judicial development: an established rule may resist the change a new case seems to invite.",
      boundary: "The pressure point is deciding when a development remains grounded in existing legal authority and when it becomes a change that requires another institution's decision."
    },
    public_constraint_reliance: {
      opening: "You want people to know the rules before officials use power against them. Enacted words, established constitutional meaning, and consistent standards constrain judicial choices. Yet settled decisions also deserve weight. Your outlook combines a demand for legal discipline with resistance to reopening every old ruling, especially when people and institutions have come to depend on it.",
      context: "Public legal constraint joins several commitments here. Enacted language identifies the decision lawmakers made, historical interpretation anchors constitutional law in its adoption, and general rules extend that discipline across individual disputes. Textualism, originalism, and rule-oriented judging overlap in this outlook without eliminating the judgment needed for ambiguous language or genuine gaps. Respect for precedent adds a qualification: a later decision can generate reasons for continuity even if a fresh interpretation would reach a different answer. The legal order people actually use may depend on rules that a judge would not have adopted in the first place.",
      boundary: "The hard case is a settled decision that seems wrong under the governing text or historical law. The answers support both correction and continuity as relevant concerns, without specifying a complete rule for choosing between them."
    },
    historical_reliance: {
      opening: "You want constitutional judging tied to the law established at adoption, while giving settled decisions weight in the present. Recovering the original answer matters, but so does the legal order built around later rulings. Your outlook asks courts to respect both commitments. The hardest cases arise when correcting an old mistake would unsettle rules people have come to rely on.",
      context: "Historical constraint and respect for precedent answer different questions. Originalism asks what constitutional law was established at adoption; precedent asks what authority a later decision has for today's court. Original meaning, lawmaking intention, and historical legal methods offer different ways to identify that original law. Reliance can give a later ruling weight even when the historical inquiry casts doubt on it. People and institutions may have organized important arrangements around the ruling, and other legal rules may depend on it. This produces a qualified approach to correction: recovering the original law remains important without automatically deciding when an existing decision must be overturned.",
      boundary: "The unresolved question is how much certainty about historical error, and how much disruption from reversal, should be enough to overcome the authority of a settled decision."
    },
    historical_correction: {
      opening: "You want courts to recover the constitutional law established at adoption, even when later decisions have moved away from it. Earlier rulings deserve consideration, but their age does not settle whether they should survive. Your outlook gives legal correction substantial weight and asks whether preserving an established rule would keep an unauthorized change in place.",
      context: "Historical authority and correction reinforce each other in this outlook. Originalism identifies constitutional law through its adoption, whether the inquiry emphasizes public meaning, lawmaking intention, or historical legal methods. A later judicial decision can then be evaluated against a source of authority outside the decision itself. Giving correction substantial weight limits the ability of precedent to turn an error into a lasting constitutional settlement. The difficulty is institutional as well as interpretive. A court must decide how confidently it has identified an error and account for the legal arrangements that have grown around it.",
      boundary: "The hard case involves a historically doubtful rule whose reversal would cause serious disruption. The answers establish a direction of judgment, without supplying a formula for every such conflict."
    },
    historical_rules: {
      opening: "You want judges constrained by constitutional history and rules that carry across cases. A hard application does not by itself justify changing the governing standard. This joins a fixed legal starting point with a preference for predictable decisions. The challenge is deciding how much judgment remains when an old rule meets facts its makers never considered.",
      context: "Historical authority can work alongside rule-based judging. The first identifies the law established at adoption; the second favors standards that constrain decisions across changing facts. Originalism and legal formalism overlap here without becoming the same theory. Historical law may contain a broad standard, while a clear rule may have a recent origin. Their combination asks a court to distinguish applying an inherited rule to new circumstances from replacing it with a preferred modern rule. Difficult cases remain because historical materials may be incomplete, legal language may be broad, and a rule can leave its application uncertain.",
      boundary: "The practical difficulty is preserving an external legal constraint while acknowledging the choices needed to apply it. A commitment to rules does not establish that judging can be mechanical."
    },
    rules_rights: {
      opening: "You want courts to protect legal rights through rules that remain dependable across cases. Rights should constrain popular decisions, and judges should also be constrained in how they enforce them. This makes consistent legal standards part of the protection you seek. The difficult case is one where a clear rule protects certainty but fits an individual claim poorly.",
      context: "Judicial enforcement and rule-based constraint can serve the same project. Courts can stand against a popular measure while relying on a standard that also limits their own choices. The combination belongs within legal constitutionalism, which gives courts a substantial role in enforcing constitutional rights, with a comparatively rule-oriented method. It does not require treating every right as absolute or every legal question as already resolved. Rules still need interpretation, and choosing a remedy can require further judgment. The distinctive tension is between the protection a general standard gives across cases and the protection sought by someone whose circumstances fit that standard awkwardly.",
      boundary: "A difficult dispute tests whether an exception would make the right more effective or weaken the dependable rule that gives it force."
    },
    purpose_restraint: {
      opening: "You want legal interpretation to serve the purposes behind the law while leaving elected institutions substantial room to govern. Judges need to understand what a rule is trying to accomplish, yet that does not give them authority to choose public policy freely. Your outlook puts the boundary between interpreting a legislative decision and replacing it at the center of hard cases.",
      context: "Attention to legislative purpose can coexist with judicial restraint. A court may read ambiguous language in light of the problem lawmakers addressed while respecting their authority to choose the policy itself. Purposivism supplies the interpretive method; a restrained account of judicial review limits the court's role in revisiting public decisions. The two commitments reinforce each other when understanding a statutory scheme helps implement the legislative choice. They come under pressure when an apparent drafting mistake, an unforeseen circumstance, or a frustrated purpose tempts a court to improve the scheme beyond the enacted decision.",
      boundary: "The question is how much reconstruction remains faithful interpretation. A useful outcome alone cannot establish that lawmakers authorized the court to produce it."
    },
    text_restraint: {
      opening: "You want enacted words to constrain judges and elected institutions to retain substantial responsibility for public policy. Reading the law carefully is part of respecting that division of authority. Your outlook makes judicial correction of an imperfect law a demanding choice. The difficult question is when enforcing a legal limit requires a court to resist the officials it otherwise leaves room to govern.",
      context: "Textual constraint and institutional restraint can reinforce each other. Enacted language records the public decision that survived the lawmaking process, including compromises that a court might otherwise smooth away. Giving that language priority limits judicial reconstruction. Leaving elected bodies substantial room to govern supplies a related account of institutional responsibility. Textualism and democratic restraint nevertheless remain distinct: a clearly enacted constitutional limit may require a court to reject a popular policy. Their combination demands attention to both the authority of the public decision and the superior legal rules that bind its makers.",
      boundary: "The difficult case is one in which restraint toward elected officials conflicts with faithful enforcement of a legal limit. These commitments do not determine that every such dispute must end in deference."
    },
    text_rules: {
      opening: "You want public legal rules to give dependable guidance before a dispute reaches court. Enacted language and standards that apply across cases help constrain judicial choices. Your outlook makes a sympathetic exception something that needs a legal justification. The hard question is what courts should do when the words are incomplete or a clear rule fits a new problem badly.",
      context: "Giving priority to enacted language can reinforce a preference for general rules. Textualism asks courts to work from the law's public wording; rule-oriented judging seeks standards that remain consistent across individual disputes. Together they restrict the freedom to reconstruct a law around the most attractive outcome in a particular case. Yet enacted wording can contain broad standards as well as precise commands. A court may still need to resolve ambiguity, fill a genuine gap, or identify the scope of an exception. The combination provides a disciplined starting point without proving that legal materials always dictate a single answer.",
      boundary: "The recurring difficulty is distinguishing a legally grounded exercise of judgment from an exception that erodes the rule's authority in future cases."
    },
    adaptive_rights: {
      opening: "You give courts room to develop constitutional protection as new problems arise, including when elected institutions resist. The law's capacity to protect people matters to how you understand its development. This outlook assigns judges substantial responsibility. Its difficult question is how they can justify a new protection as law while remaining accountable to limits on their own authority.",
      context: "Constitutional development and strong rights enforcement reinforce each other when courts extend protection to circumstances earlier law did not adequately address. Living constitutionalism allows later legal developments to contribute to present constitutional meaning. Legal constitutionalism gives judicial enforcement an important place in holding public power to constitutional limits. Their combination leaves a demanding problem of justification. A court must explain why an expanded protection follows from legally relevant principles or developments, and why it has authority to impose that protection against a democratic decision. The importance of a desired result cannot by itself answer either question.",
      boundary: "The pressure point is the boundary between developing an enforceable constitutional commitment and making a policy choice that requires democratic authorization."
    },
    adaptive_democracy: {
      opening: "You allow constitutional law to develop over time while giving elected institutions substantial room to shape public decisions. Change need not belong to judges alone. Your outlook connects an adaptable Constitution with limits on judicial control. The hard question is how courts should protect a constitutional commitment when democratic judgment pushes its development in a different direction.",
      context: "An evolving Constitution need not imply judicial supremacy. Constitutional understandings can change through legislation, public argument, institutional practice, and court decisions. Democratic constitutionalism emphasizes this interaction, while restrained judicial review leaves political institutions room to resolve disagreements. The commitments fit together when courts and elected bodies contribute to a developing legal settlement. They become harder to reconcile when a court regards a protection as legally required and the political process rejects it. Accepting legal development does not establish that every public demand changes the Constitution or that courts must accept every democratic answer.",
      boundary: "The unresolved issue is which forms of change carry legal authority and when judicial intervention should interrupt, rather than follow, the political process."
    },
    practical_continuity: {
      opening: "You want courts to make the law work without repeatedly unsettling the rules they inherit. Attention to purpose or practical effects gives judges room to respond to difficult cases; respect for precedent limits abrupt changes. Your outlook makes adaptation a task within an existing legal order. The recurring question is when improving that order justifies disturbing it.",
      context: "Practical judgment and continuity can work together when courts improve legal rules incrementally. Precedent provides a stable starting point, while attention to a rule's purpose and operation can reveal where clarification or adjustment is needed. This connects pragmatic and common-law approaches to judging, though statutory purpose and practical consequences remain different reasons for a decision. A court can care about implementation without treating every desirable outcome as legally available. The difficulty comes when an inherited rule frustrates its apparent purpose or produces serious costs, yet people and institutions have arranged their affairs around it.",
      boundary: "The difficult choice is between revising a rule to make it work better and preserving the settlement that gives the legal order continuity. Neither commitment supplies an automatic answer."
    },
    contextual_rights: {
      opening: "You want courts to take rights seriously while examining the circumstances of a restriction. That combines a strong judicial role with a willingness to weigh competing legal claims. Your outlook asks for reasons that explain why a burden is justified in this case. The hard question is how that flexible judgment can remain consistent across cases.",
      context: "Strong rights review can operate through contextual justification instead of a single categorical rule. Proportionality is one influential example: it examines the public objective, the connection between means and ends, the availability of less restrictive measures, and the burden imposed. Other contextual approaches use different tests. What joins this family of methods is a demand for reasons responsive to the circumstances. Coupled with an important judicial role, it gives courts substantial responsibility for testing public decisions. That responsibility raises questions about evidence, consistency, and the relative competence of courts and elected institutions.",
      boundary: "The pressure point is whether a context-sensitive test disciplines judicial choice enough to protect rights predictably, especially when reasonable institutions disagree about the relevant costs."
    }
  };
  // Authored combinations explain how a source commitment changes the actual
  // mechanism of judging. These keys describe evidence, never a persona.
  const AUTHORED = {
    pluralist_rights_continuity_independent_extreme: {
      opening: "You want courts to protect rights by drawing on several kinds of legal reasoning while building on inherited law. Precedent provides continuity, but independent principles of justice can also bind. Text, history, purpose, and practical judgment help courts work through their responsibilities. Your outlook demands reasons for changing settled law, especially when a new protection challenges a popular decision.",
      context: "Several commitments shape your account of judicial development. Precedent supplies principles and working rules, while text, history, structure, and consequences can each illuminate what a right requires. Interpretive pluralism gives these forms of argument legitimate roles without assigning one permanent control over every dispute. Your strong support for judicial enforcement gives courts responsibility for acting on those reasons even against elected institutions. Independent moral principles add legal authority beyond protections officials have already recognized, while extreme injustice supplies a further limit on a rule's legal status. That moral dimension extends beyond the exceptional case of a radically unjust enactment. Respect for continuity still matters: an earlier decision can organize public life and provide reasons against overturning it. The difficult case asks the court to reconcile those demands, rather than merely collect arguments for a preferred answer. It must explain why the relevant methods support extending protection through existing law or justify departing from a settled rule, and whether that explanation remains credible when the result favors another side."
    },
    realist_continuity_qualified_positive: {
      opening: "You want courts to build on inherited law, while recognizing that legal arguments do not fully explain how judges decide hard cases. Precedent supplies authority without always determining the answer. Public legal practice anchors your view, but understanding actual decisions also requires evidence about judges and their institutions. Your outlook keeps those two tasks connected without treating them as identical.",
      context: "Respect for precedent and attention to judicial behavior answer different parts of the same problem. Earlier cases help make the law courts inherit, and gradual development can extend that law without repeatedly starting over. But legal materials may support several defensible answers in a difficult case. Your empirical orientation asks what explains the court's choice among them, including institutional pressures, experience, and background views. Legal realism studies those influences rather than assuming that the published legal argument tells the whole story. Your chiefly source-based view still gives recognized legal practice authority: discovering an influence on a decision does not make that influence a legitimate legal reason. You also leave an opening for extreme injustice to undermine legal status, without specifying exactly where that limit falls. The resulting outlook distinguishes what the law authorizes, how courts can develop it, and what actually moves judges to decide. Its practical challenge is using evidence about judicial behavior to assess legal constraints without concluding either that those constraints always determine decisions or that they have no force."
    },
    pluralist_continuity_qualified_positive: {
      opening: "You want courts to develop inherited law using several kinds of legal reasoning. Precedent supplies continuity, while text, history, structure, and consequences can also matter. Recognized legal practice gives this work its authority. Your outlook asks judges to explain how these reasons fit together, especially when improving the law would disturb a settled answer.",
      context: "Continuity gives your pluralist method an institutional starting point. Earlier cases supply principles and working rules, while other forms of legal argument can reveal why those rules should be extended, qualified, or preserved. Interpretive pluralism treats text, history, structure, purpose, and precedent as legitimate ways to reason about law without making one method govern every dispute. These forms of argument must be related to the concrete problem before the court. Your chiefly source-based view bounds this flexibility: recognized legal practice authorizes the inquiry, while a desirable outcome alone does not establish a legal right. That leaves room to use moral standards when the legal system incorporates them. Your answers also leave an opening for extreme injustice to defeat legal status; they do not supply a complete account of that exception. The central difficulty is explaining why a particular combination of reasons warrants changing or retaining an inherited rule. A persuasive account must do more than list several methods: it must show why they carry the weight assigned to them in this case and remain credible when the result favors a different side."
    },
    continuity_rights_natural_principles: {
      opening: "You want courts to build on settled law while making rights more effective. Principles of justice can bind even before officials recognize them, but legitimate public decisions also deserve respect. Earlier cases help courts develop protection without starting over. Your outlook asks when a legal principle requires changing an inherited rule and when the existing settlement should stand.",
      context: "Continuity gives rights development a starting point. Courts inherit decisions whose principles can support broader protection, along with settled rules that people and institutions depend on. Common-law constitutionalism describes this development through cases. Your commitment to independently binding moral principles adds a source of legal authority beyond what officials have already recognized. Yet moral reasoning can also support respecting a public settlement: some questions permit several legitimate answers, and lawmaking can choose among them. These two parts of natural-law thinking pull together when an established rule gives a workable form to a broad principle of justice. They pull apart when an inherited rule blocks a right the court regards as already legally binding. Your support for strong judicial enforcement gives courts substantial responsibility for confronting that conflict, including against popular legislation. The difficulty is distinguishing a settlement that courts should preserve from one that must yield to a legal principle. Neither the age of the decision nor the appeal of a proposed improvement supplies a complete answer."
    },
    continuity_rights_natural_principles_extreme: {
      opening: "You want courts to build on settled law while making rights more effective. Principles of justice can bind even before officials recognize them, and extreme injustice can defeat a rule's authority. Legitimate public decisions still deserve respect. Your outlook asks when courts should extend protection through inherited law and when a legal principle requires them to depart from it.",
      context: "Continuity gives rights development a starting point. Courts inherit decisions whose principles can support broader protection, along with settled rules that people and institutions depend on. Common-law constitutionalism describes this development through cases. Your commitment to independently binding moral principles adds legal reasons beyond what officials have already recognized. Yet moral reasoning can also support respecting a public settlement: some questions permit several legitimate answers, and lawmaking can choose among them. These parts of natural-law thinking reinforce each other when an established rule gives workable form to a broad principle of justice. They conflict when an inherited rule blocks a right the court regards as legally binding. Extreme injustice supplies a further limit on legal authority; it does not exhaust your acceptance of independent principles. Your support for strong judicial enforcement gives courts substantial responsibility for confronting these conflicts, including against popular legislation. The difficult judgment is when a public settlement deserves preservation, when its protections can grow through precedent, and when it must give way. The commitments establish reasons to consider each response without providing a complete rule for every case."
    },
    continuity_rights_strong_natural_principles: {
      opening: "You want courts to make rights effective while preserving a body of law they can build on. Principles of justice can carry legal force beyond official adoption, and serious moral defects can undermine a rule's validity. Earlier decisions still deserve weight. Your outlook asks courts to reconcile that inherited authority with rights the existing rules may fail to recognize.",
      context: "Constitutional development connects your respect for continuity with your commitment to rights. Earlier decisions supply principles and working rules that courts can extend as they confront new claims. Their authority also gives courts a reason to avoid starting over whenever judicial membership changes. Yet the existing record does not exhaust the legally relevant reasons: your answers allow moral principles to bind independently of official adoption and sufficiently serious moral defects to undermine a rule's validity. This places development through precedent alongside a demanding natural-law account of authority. Strong judicial review makes courts responsible for acting on these commitments even when elected institutions resist. The combination leaves a real conflict when an established decision organizes public life but falls short of a legally binding principle. Respecting precedent, extending protection through it, and departing from it are different responses. Your commitments give reasons for each in different circumstances, without establishing a complete test for choosing among them."
    },
    continuity_rights_independent_extreme: {
      opening: "You want courts to make rights real while building on inherited law. Earlier decisions deserve respect, but they can also help constitutional protections grow. Principles of justice can carry legal force beyond official adoption, and extreme injustice can undermine a rule's authority. Your outlook asks when those commitments justify changing a settled decision.",
      context: "Respect for precedent and independent rights can pull in different directions. Constitutional development offers one way to connect them: earlier decisions provide a starting point, while principles such as equal treatment can justify extending protection beyond what those decisions recognized. Continuity gives courts something to build on without freezing every old answer. Your strong support for judicial enforcement gives courts considerable responsibility for that development, including when a popular law stands in the way. The legal principles involved need not depend entirely on official adoption. That brings this outlook near the meeting point of common-law constitutionalism, which emphasizes development through cases, and theories that make justice part of law itself. Extreme injustice is another limit on authority, but your acceptance of independent principles is broader than that exceptional threshold. The difficulty is deciding when a principle warrants changing settled law. An inherited decision and a claim of fundamental right can both make demands on the court; the response pattern does not provide a complete ranking that resolves every conflict."
    },
    continuity_rights_independent: {
      opening: "You want courts to build on inherited law while extending rights that existing decisions may not fully protect. Principles of justice can have legal authority beyond official adoption. Precedent still deserves weight, making continuity part of the task. Your outlook gives courts substantial responsibility for deciding when a legal principle warrants changing a settled answer.",
      context: "Continuity can give rights development a legal structure. Earlier cases establish principles and working rules that later courts can extend, while also creating reasons against an abrupt reversal. Common-law constitutionalism emphasizes this development through decisions. Your acceptance of moral principles as law adds a further demand: the rights a court must consider need not be exhausted by the protections officials have already recognized. Strong judicial enforcement makes the court responsible for confronting that gap even against a popular decision. This combination is more demanding than either preserving precedent or improving outcomes in isolation. It requires a justification for the claimed legal principle and an explanation of its relationship to the inherited law. The difficult case is a settled decision that organizes public life while denying a protection the court considers legally required. Neither the authority of the old case nor the importance of the claimed right automatically settles how far the court should go."
    },
    continuity_development_qualified_positive: {
      opening: "You see law as something courts inherit and develop through deciding disputes. Settled decisions provide authority as well as reasons for caution. Legal practice can support new protections, while a desirable outcome alone does not supply their legal basis. Your source-based outlook also leaves an opening for extreme injustice to undermine a rule's status as law.",
      context: "Continuity and change belong to the same judicial task in this outlook. Precedent helps make the law present courts must work with, giving legal development an institutional starting point. That connects the common-law tradition of development through cases with a chiefly source-based understanding of law: recognized legal practice supplies authority for the work of adaptation. A court can extend a principle or develop its application without treating every morally attractive result as an existing legal right. The inherited legal order also constrains that work, especially when a proposed improvement would unsettle established rules. Your answers leave a qualification at the edge of this source-based position by allowing some force to the idea that extreme injustice can defeat legal status. They do not establish why you accept that exception or exactly where its threshold lies. The recurring difficulty is deciding when an adaptation remains authorized by existing practice and when it changes a settlement beyond what courts are entitled to do."
    },
    continuity_development_inclusive: {
      opening: "You see courts as inheriting law that can develop through use. Settled decisions give judges both a starting point and reasons for caution. Moral standards can guide that development when recognized law gives them a role. Your outlook connects legal change to public practice, while asking courts to justify how far a new decision can carry it.",
      context: "Precedent can be both a source of continuity and a means of development. Earlier cases establish principles that later courts apply and extend, so an evolving legal order need not depend on judges beginning afresh. This connects common-law constitutionalism with inclusive positivism. In plain terms, recognized public practice supplies legal authority, and that practice can itself make a moral standard part of law. A court interpreting a legal guarantee of equal treatment may thus need moral judgment to apply an institutionally recognized rule. That is different from assuming that every morally sound claim already has legal force. Respect for settled decisions constrains this development because later rulings operate within a system people already use and depend on. The hard case is one in which extending a recognized principle would displace an established rule. The court must explain both its authority to develop the protection and why the reasons for continuity should give way."
    },
    public_constraint_reliance_inclusive: {
      opening: "You want people to know the rules before officials use power against them. Enacted words, established constitutional meaning, and consistent standards constrain judicial choice. Yet settled decisions also deserve weight. Your outlook allows judgment within recognized law, including moral standards it incorporates, while resisting repeated judicial revision of the legal order people rely on.",
      context: "Dependable public rules connect your interpretive commitments. Enacted language identifies what lawmakers adopted, historical interpretation anchors constitutional law in its adoption, and general rules extend that discipline across disputes. Textualism and originalism describe different parts of this approach; neither requires pretending that every difficult case already has a clear answer. Your source-based position can also recognize moral standards when the legal system incorporates them. That permits judgment within the law without making a judge's preferred moral answer an independent source of authority. Respect for precedent qualifies the demand to recover the original answer. A later decision may have generated rules and arrangements that people and institutions depend on, giving continuity weight even when a fresh interpretation would go another way. The difficult case is a settled decision that appears wrong under the governing text or historical law. Your outlook makes both the authority of that law and the costs of reopening its settled application relevant, without supplying an automatic resolution."
    }
  };
  const SOURCE_BOUNDARIES = {
    normative: ["You also defend source-based legal institutions on normative grounds.", "includes a normative case for source-based institutions: public rules can serve values such as coordination, accountability, and restraint. That institutional argument goes beyond describing how existing law is identified; it does not by itself choose inclusive or exclusive positivism"],
    normative_inclusive: ["You defend source-based institutions that can incorporate moral validity criteria.", "joins a normative defense of source-based institutions with inclusive positivism. Accepted legal standards can make moral acceptability a condition of validity; the separate normative claim concerns why institutions organized around public sources deserve support"],
    normative_exclusive: ["You defend institutions whose existing law is identifiable through public sources.", "joins source-only identification of existing law with a normative defense of that institutional arrangement. Moral reasons can support designing and improving the system without themselves becoming criteria of existing legal validity"],
    positive: ["Recognized legal practice supplies the authority for that work.", "depends on authority supplied by recognized public legal sources. A good reason to improve a rule is not automatically a legal reason to change it"],
    inclusive: ["Recognized law can give moral judgment a role in that work.", "can involve moral judgment when recognized law incorporates a moral standard. The court must connect that judgment to the legal practice giving it authority"],
    exclusive: ["Public legal sources must supply the authority for that work.", "must remain anchored in identifiable public sources. Where those sources leave a choice open, moral judgment can guide that choice without becoming a new source of existing law"],
    qualified_positive: ["Public sources anchor your view, with a qualification for extreme injustice.", "is chiefly grounded in recognized public sources, with an unresolved qualification for extreme injustice. That qualification prevents treating official adoption as conclusive in every imaginable case"],
    independent: ["Principles of justice can supply legal authority beyond official adoption.", "can draw on legally binding principles of justice beyond official adoption. This enlarges the reasons a court must consider while making it responsible for establishing the claimed principle's legal force"],
    independent_extreme: ["Independent principles and limits on extreme injustice also shape legal authority.", "can draw on principles with legal force beyond official adoption, alongside a limit on extreme injustice. The moral dimension extends beyond the exceptional case of a radically unjust enactment"],
    extreme: ["Extreme injustice can put an outer limit on legal authority.", "operates with an outer limit: extreme injustice can defeat a rule's legal status. That exceptional limit does not establish that every morally preferable principle is already law"],
    interpretive: ["Legal principles must both fit inherited practice and help justify it.", "requires principles that both fit the institutional record and morally justify it. Interpretivism connects legal authority to that combined inquiry, making the inherited practice a constraint on moral judgment"],
    impact: ["Legal authority turns on the obligations institutions properly create or change.", "turns on the moral obligations institutions properly create or change. Moral-impact theory asks which institutional effects constitute law; an obligation to resist an oppressive act does not automatically become one of them"],
    practice: ["Legal practice shapes genuine rights and responsibilities that officials must confront.", "concerns genuine moral rights and responsibilities shaped by legal institutions. On this moral-practice view, an official statement does not alone settle the obligations the court must recognize"],
    legality: ["Authority depends on governing through public, intelligible, consistently applied law.", "depends on the conditions that make government through law possible. Public, intelligible rules and consistency between official conduct and announced standards constrain how the court can carry out that task"],
    natural: ["Moral authority can support the binding force of public legal settlements.", "can respect public settlements because legitimate lawmaking gives concrete form to broader moral requirements. Natural-law reasoning can thus support the force of enacted rules while also explaining limits on their authority"],
    natural_principles: ["Principles of justice can bind independently, while legitimate public settlements deserve respect.", "must reconcile independently binding principles of justice with the authority of legitimate public settlements. Moral principles may leave room for lawmakers to choose among acceptable rules, while also imposing legal limits on those choices"],
    natural_principles_extreme: ["Independent principles constrain public settlements, with extreme injustice an additional limit.", "must reconcile independently binding principles with legitimate public settlements, while recognizing extreme injustice as an additional limit on legal authority. Independent principles can matter beyond that exceptional threshold; public lawmaking can still settle questions those principles leave open"],
    strong_natural_principles: ["Independent moral principles and serious injustice can shape legal validity.", "must account for both independently binding moral principles and serious injustice capable of defeating legal validity. These commitments broaden the court's legal reasons beyond official adoption without specifying how every dispute between principle and settled practice must be resolved"],
    strong_natural: ["A serious failure of justice can undermine a rule's legal authority.", "must confront a demanding moral test of legal validity. A serious failure of justice can undermine the legal status of the rule the court is being asked to apply"],
    open: ["", "leaves a further question about the source of legal authority. The method alone cannot establish whether recognized institutions exhaust the legal reasons a court may use"]
  };
  const RELATION_SUBJECTS = {
    realist_continuity:"Assessing how courts actually develop inherited law",
    pluralist_continuity:"Developing inherited law through several legitimate methods",
    pluralist_rights_continuity:"Developing enforceable rights through several legitimate methods and inherited decisions",
    continuity_rights:"Extending rights through inherited decisions",
    continuity_development:"Developing law through precedent",
    public_constraint_reliance:"Reconciling public legal constraint with settled decisions",
    historical_reliance:"Respecting historical authority alongside later precedent",
    historical_correction:"Correcting later doctrine in the name of historical authority",
    historical_rules:"Applying historically grounded rules to new circumstances",
    rules_rights:"Protecting rights through dependable general standards",
    purpose_restraint:"Implementing legislative purposes within a restrained judicial role",
    text_restraint:"Enforcing enacted language while leaving room for elected judgment",
    text_rules:"Using enacted words to discipline decisions across cases",
    adaptive_rights:"Developing judicially enforceable constitutional protection",
    adaptive_democracy:"Connecting constitutional development with democratic authority",
    practical_continuity:"Adapting inherited rules to make them work",
    contextual_rights:"Justifying rights decisions through the circumstances of a case"
  };
  Object.assign(RELATION_SUBJECTS, {
  "mediated_history_continuity": "Following historical methods through inherited legal practice",
  "historical_construction_continuity": "Developing implementing doctrine while respecting historical limits and precedent",
  "democratic_development": "Developing constitutional meaning through public contestation",
  "transformative_development": "Transforming institutions through constitutional commitments",
  "process_reinforcing_review": "Repairing failures of democratic representation",
  "responsive_process_review": "Calibrating review to democratic dysfunction",
  "dynamic_statutory_continuity": "Interpreting statutes through change and settled practice",
  "fact_skeptical_continuity": "Assessing factual uncertainty within settled law",
  "dynamic_statutory_context": "Interpreting statutes in their later legal setting",
  "fact_skeptical_adjudication": "Assessing factual uncertainty in adjudication",
  "historical_construction": "Developing implementing doctrine within historical limits"
});
  // Diagnostic refinements are complete relational portraits, not label glosses.
  Object.assign(PORTRAITS, {
  "mediated_history_continuity": {
    "opening": "You give historical constitutional reasoning a place within a legal practice shaped by precedent. Earlier decisions can require courts to investigate original meaning, but that does not make history independently controlling whenever it conflicts with the law courts have inherited. Your respect for settled decisions makes the authority of the historical method itself part of what legal practice must explain.",
    "context": "History can enter adjudication through more than one route. An originalist may regard the law established at adoption as independently binding on present judges. Precedent-mediated historicism instead follows historical methods because the existing legal practice calls for them. This difference matters when an established doctrine departs from the best historical reading. On the mediated account, fresh historical evidence does not automatically override the practice that gave that inquiry its legal significance. Your respect for continuity reinforces this institutional setting: prior decisions can establish both substantive rules and methods for interpreting constitutional provisions. History remains a serious form of legal argument, but its authority must be understood alongside the precedents that authorize and constrain its use. This is compatible with extensive historical research without treating every historical discovery as a reason to restore an original answer.",
    "boundary": "The hard question is when the inherited practice authorizes changing its own interpretive methods, and how a court should justify that change without assuming the historical priority being disputed."
  },
  "historical_construction_continuity": {
    "opening": "You treat constitutional meaning as historically fixed while giving later decisions weight. If that fixed meaning genuinely leaves a question unresolved, you allow implementing doctrine within the remaining space. That permission does not say how often gaps occur. Your outlook distinguishes developing law inside a genuine gap from preserving a precedent that conflicts with the original settlement.",
    "context": "The interpretation/construction distinction separates identifying fixed constitutional meaning from developing implementing law where that meaning does not supply a unique answer. New Originalism is an established name for scholarship that brought this distinction to the foreground, although its theorists disagree about how much work construction should do. Your answers support conditional permission, not a conclusion that a substantial construction zone exists. Historical legal methods, context, or further evidence might resolve an apparent gap before construction becomes necessary. Respect for precedent adds a different problem. A settled decision might operate within an unresolved space, but it might instead contradict the best historical interpretation. The first can be legitimate implementing law; the second raises questions about reliance, settlement, and the costs of correction. Keeping these problems separate prevents respect for precedent from silently changing the meaning that interpretation identifies.",
    "boundary": "The unresolved questions concern the boundaries of genuine uncertainty, which institutions may supply implementing law, and when reliance can justify retaining a mistaken decision. The construction answer alone does not settle them."
  },
  "democratic_development": {
    "opening": "You understand constitutional development as a process in which public argument and democratic contestation help shape enforceable constitutional meaning. Courts retain a role in protecting rights, but their judgments belong to a wider exchange with citizens and institutions. Your outlook asks how that public participation can change constitutional law while maintaining constraints that remain effective against a current majority.",
    "context": "Democratic constitutionalism explains constitutional development through interaction among public movements, elected institutions, and courts. Public contestation can influence how constitutional commitments are understood without making each election a referendum that erases judicial protection. This is a mechanism of constitutional change, not simply a preference for updating old language or allowing judges to reach attractive results. Courts must explain their interpretations as constitutional judgments while recognizing that the public participates in developing the principles those judgments enforce. That interaction may bring excluded claims into legal understanding and may also expose courts to pressure to retreat from unpopular protections. The central institutional question is how constitutional responsiveness and enforceable rights can coexist. Neither judicial insulation nor immediate majority preference alone describes this account. You endorse public participation in development, without thereby endorsing any particular movement, constitutional outcome, or replacement for formal amendment.",
    "boundary": "The difficult case is sustained public disagreement with a judicial protection: when does contestation improve constitutional understanding, and when should the court maintain a limit despite that pressure?"
  },
  "transformative_development": {
    "opening": "You see constitutional commitments as a continuing responsibility to change institutions that fall short of them. Constitutional development should help turn promises into durable social and institutional arrangements, rather than merely update the wording of old rules. Your outlook gives legal reasoning a forward-looking task while requiring an account of which changes the Constitution authorizes and which institutions should carry them out.",
    "context": "Transformative constitutionalism treats a constitution as a framework for sustained institutional transformation toward its commitments. Its characteristic concern is the distance between a constitutional promise and the practices through which people actually live. Interpretation can therefore require changes in institutions and legal relationships, rather than treating existing arrangements as the natural baseline. This differs from democratic constitutionalism, whose distinctive mechanism is public contestation over constitutional meaning. Transformation can involve democratic participation, but participation alone does not specify the direction or depth of institutional reform. Nor does a transformative commitment establish that courts should control every part of the project. Legislatures, administrators, and other public bodies may have essential responsibilities, and legal remedies must contend with capacity and accountability. The relevant judgment concerns how constitutional commitments justify development without giving officials an unlimited mandate to pursue their preferred social programme.",
    "boundary": "The hard case asks whether a proposed institutional change implements an existing constitutional commitment or instead requires a political decision that the constitutional text and practice have not authorized courts to make."
  },
  "process_reinforcing_review": {
    "opening": "You give courts a particular reason to intervene when democratic decision-making fails to represent people fairly. The judicial role is to protect participation and repair exclusion rather than routinely replace political judgments with a court’s preferred outcome. That makes the condition of the decision-making process central to deciding when restraint should give way to constitutional review.",
    "context": "Political-process theories connect judicial review to the requirements of representative democracy. Courts have a stronger case for intervention when officials obstruct political participation or when excluded groups cannot obtain fair consideration through ordinary politics. The justification is selective: correcting a democratic failure can strengthen self-government even though it requires invalidating an elected institution’s decision. This differs from a general theory that courts should enforce whichever substantive rights their best moral judgment identifies. A process account must explain why the problem before the court is a defect of representation, participation, or inclusion, and why the remedy addresses that defect. It also cannot escape every substantive judgment. Deciding which exclusions matter, how participation should work, and whether formally open channels offer meaningful access requires legal and political evaluation. The distinctive commitment concerns the reason for intervention, not an assumption that procedural judging is mechanically neutral.",
    "boundary": "The difficult case is a harmful decision made through apparently open institutions: the court must identify an actual democratic failure rather than treating disagreement with the outcome as proof that the process failed."
  },
  "responsive_process_review": {
    "opening": "You would calibrate judicial intervention to the democratic failure a case reveals. Political monopoly, exclusion, institutional blind spots, and inertia can justify different responses, and a court’s capacity matters to the remedy it chooses. Your outlook gives courts responsibility for repairing democratic dysfunction without assuming that the strongest available intervention is always the most legitimate or effective.",
    "context": "Responsive judicial review develops the process-based case for constitutional intervention into a more differentiated institutional practice. A blocked channel of political participation, an entrenched monopoly, an overlooked group, and legislative inertia need not call for the same judicial response. The court should identify the failure and choose a form of review capable of addressing it, taking account of its own information, competence, and ability to sustain an effective remedy. This remains a theory of democracy-repair rather than a generic commitment to aggressive rights enforcement. Strong intervention can sometimes reopen politics; a narrower ruling or a response that leaves institutions room to act may sometimes do more. Calibration therefore concerns both the justification for intervention and its practical design. Institutional limits are part of that inquiry, without automatically defeating every right or requiring deference whenever another branch resists.",
    "boundary": "The hard question is whether a proposed response actually addresses the identified democratic failure, or substitutes judicial policy preferences while leaving the underlying exclusion or institutional blockage intact."
  },
  "dynamic_statutory_continuity": {
    "opening": "You see statutory interpretation as an ongoing practice in which later legal and social developments can affect meaning. Earlier readings and the arrangements built around them still deserve weight. Your outlook connects adaptation with continuity: a court must explain why changed circumstances justify a new interpretation and why that change remains accountable to the law the legislature enacted.",
    "context": "Dynamic statutory interpretation treats a statute’s subsequent history as potentially relevant to its present legal meaning. Intervening law, established interpretations, and changed social conditions can affect which reading is best justified. This goes beyond applying an unchanged meaning to new facts. Respect for precedent makes the process more demanding: an interpretation can acquire authority and generate reliance even when a later court would read the statute differently. Practical reasoning must therefore explain both the proposed evolution and its costs to people entitled to depend on existing law. Enacted language remains a constraint; a dynamic approach does not create a general power to override a clear statutory command. Nor does accepting evolution in statutory interpretation establish a living-constitution theory. The two concern different legal materials and may carry different accounts of democratic revision, since legislatures ordinarily retain power to change statutes.",
    "boundary": "The difficult case asks whether a later development changes the best legal interpretation or merely supplies a good policy reason for legislation, and whether settled reliance should nevertheless preserve the earlier reading."
  },
  "fact_skeptical_continuity": {
    "opening": "You think uncertainty about what happened can shape legal outcomes even when the governing rule is relatively clear. Respect for settled law does not remove the difficulty of evaluating witnesses, evidence, and disputed facts. Your outlook makes the fact-finding process part of understanding legal predictability while keeping that empirical problem distinct from whether courts should preserve inherited doctrine.",
    "context": "Fact skepticism identifies a limit of rule-centered accounts of adjudication. A clear legal standard cannot by itself determine a trial outcome if witnesses disagree, evidence is incomplete, or fact-finders assess credibility differently. This is different from rule skepticism, which emphasizes competing doctrinal arguments and underdetermination in hard appellate cases. A system can stabilize doctrine through precedent while remaining uncertain in its reconstruction of events. Your respect for continuity therefore operates alongside a concern with what legal rules can realistically predict. The empirical inquiry should attend to the institutions and procedures through which facts become legally established, not just the reasons printed in appellate opinions. Recognizing this uncertainty does not establish that every finding is arbitrary, that all evidence is equally good, or that judges ought to decide according to their political preferences. It identifies a distinct source of variation that a purely doctrinal account can overlook.",
    "boundary": "The practical challenge is improving the reliability and transparency of fact-finding without assuming that clearer rules alone will eliminate uncertainty, or treating observed influences on a verdict as legitimate reasons for it."
  },
  "dynamic_statutory_context": {
    "opening": "You allow later legal and social developments to affect the interpretation of statutes. Enacted words, original expectations, purpose, and present context remain reasons a court must assess. Your outlook asks judges to explain why evolution is warranted, rather than treating a statute’s age as permission to replace its limits with a preferred policy.",
    "context": "Dynamic statutory interpretation treats a statute’s subsequent history as potentially relevant to its present legal meaning. Intervening law, established interpretations, and changed social conditions can affect which reading is best justified. This goes beyond applying an unchanged meaning to new facts. Precedent creates a further question: an interpretation can acquire authority and generate reliance even when a later court would read the statute differently. An account of dynamic interpretation must explain both the proposed evolution and any costs to people entitled to depend on existing law. Enacted language remains a constraint; a dynamic approach does not create a general power to override a clear statutory command. Nor does accepting evolution in statutory interpretation establish a living-constitution theory. The two concern different legal materials and may carry different accounts of democratic revision, since legislatures ordinarily retain power to change statutes.",
    "boundary": "The difficult case asks whether a later development changes the best legal interpretation or merely supplies a good policy reason for legislation, and whether settled reliance should nevertheless preserve the earlier reading."
  },
  "fact_skeptical_adjudication": {
    "opening": "You think uncertainty about what happened can shape legal outcomes even when the governing rule is relatively clear. Witnesses, evidence, and credibility judgments create problems that legal interpretation alone cannot resolve. Your outlook makes the fact-finding process central to understanding predictability, without turning uncertainty into a claim that all decisions are arbitrary or that judges should abandon legal constraints.",
    "context": "Fact skepticism identifies a limit of rule-centered accounts of adjudication. A clear legal standard cannot by itself determine a trial outcome if witnesses disagree, evidence is incomplete, or fact-finders assess credibility differently. This is different from rule skepticism, which emphasizes competing doctrinal arguments and underdetermination in hard appellate cases. A system can stabilize doctrine through precedent while remaining uncertain in its reconstruction of events. Fact skepticism therefore concerns what legal rules can realistically predict even after the doctrinal question has been settled. The empirical inquiry should attend to the institutions and procedures through which facts become legally established, not just the reasons printed in appellate opinions. Recognizing this uncertainty does not establish that every finding is arbitrary, that all evidence is equally good, or that judges ought to decide according to their political preferences. It identifies a distinct source of variation that a purely doctrinal account can overlook.",
    "boundary": "The practical challenge is improving the reliability and transparency of fact-finding without assuming that clearer rules alone will eliminate uncertainty, or treating observed influences on a verdict as legitimate reasons for it."
  },
  "historical_construction": {
    "opening": "You treat constitutional meaning as historically fixed while allowing later implementing doctrine if that meaning genuinely leaves a question unresolved. The permission is conditional: further historical interpretation might settle an apparent gap. Your outlook separates identifying what the Constitution already requires from choosing among answers it leaves available, without assuming how much unresolved space exists.",
    "context": "The interpretation/construction distinction separates identifying fixed constitutional meaning from developing implementing law where that meaning does not supply a unique answer. New Originalism is an established name for scholarship that brought this distinction to the foreground, although its theorists disagree about how much work construction should do. Your answers support conditional permission, not a conclusion that a substantial construction zone exists. Historical legal methods, context, or further evidence might resolve an apparent gap before construction becomes necessary. The authority of precedent presents a different problem. A settled decision might operate within an unresolved space, but it might instead contradict the best historical interpretation. The first can be legitimate implementing law; the second raises questions about reliance, settlement, and the costs of correction. Keeping these problems separate prevents respect for precedent from silently changing the meaning that interpretation identifies.",
    "boundary": "The unresolved questions concern the boundaries of genuine uncertainty, which institutions may supply implementing law, and when reliance can justify retaining a mistaken decision. The construction answer alone does not settle them."
  }
});
  // The authority of history is distinct from the strength of stare decisis.
  PORTRAITS.mediated_history_practice = {
    opening: "You use historical constitutional reasoning because the legal practice you inherit gives it a role. That is different from treating the law at adoption as independently controlling whenever it conflicts with later doctrine. Your outlook asks what authorizes a historical inquiry and what weight that inquiry should have, rather than inferring historical supremacy from frequent use of history.",
    context: "Historical interpretation can derive authority from contemporary legal practice rather than from a freestanding duty to restore founding law. Precedent-mediated historicism treats an instruction to investigate original meaning as part of the legal methods the existing system supplies. This distinction remains important even for a judge willing to reconsider many precedents. Rejecting one old decision does not by itself establish that history must control every constitutional dispute. A court instead needs an account of which practices authorize its interpretive methods and how those practices can be revised. Historical evidence may be extensive and persuasive while leaving that question of legal authority unresolved. Originalism, by contrast, gives historical law an independent claim against later practice. The contrast concerns why history binds, not whether historical research is valuable or whether later decisions can ever be corrected.",
    boundary: "The difficult case is a historical conclusion that conflicts with the method current doctrine requires. The court must justify its choice without assuming the independent authority of history that the account has declined to establish."
  };
  RELATION_SUBJECTS.mediated_history_practice = "Following historical methods through existing legal practice";
  for (const [plan, copy] of Object.entries(PORTRAITS)) {
    for (const source of Object.keys(SOURCE_BOUNDARIES)) {
      const id = `portrait_${plan}_${source}`;
      const authored=AUTHORED[`${plan}_${source}`];
      const [sourceOpening,sourceRelationship]=SOURCE_BOUNDARIES[source];
      const opening=sourceOpening ? copy.opening.replace(/[^.!?]+[.!?]$/, "").trim()+" "+sourceOpening : copy.opening;
      const route=authored || {opening,
        context: `${copy.context} ${RELATION_SUBJECTS[plan]} ${sourceRelationship}. ${copy.boundary}`};
      OPENINGS[id] = route.opening;
      ROUTES[id] = Object.freeze(route);
    }
  }

  function sourceFrame(c, scores={}) {
    const id=c?.identity?.id, t=c?.traits||{};
    const extreme=has(t,"source.extreme_injustice",0.25);
    const independent=has(t,"source.independent_moral_validity",0.5) ||
      (!Object.hasOwn(t,"source.independent_moral_validity") && axis(scores,"sorc")<62 && has(t,"source.objective_morality",0.5));
    if (has(t,"source.moral_impact")) return "impact";
    if (has(t,"source.moral_practice")) return "practice";
    if (has(t,"source.strong_natural_law")) return independent ? "strong_natural_principles" : "strong_natural";
    if (axis(scores,"sorc")<62 && has(t,"source.positive_law_settlement",0.4) && has(t,"source.objective_morality",0.4))
      return independent ? (extreme ? "natural_principles_extreme" : "natural_principles") : "natural";
    if (has(t,"source.internal_legality")) return "legality";
    if (has(t,"source.fit_and_justification")) return "interpretive";
    // S10/S11 address independent moral legality. D-CLC1 alone does not:
    // unwritten common-law rights can still be institutionally grounded.
    if (independent)
      return extreme ? "independent_extreme" : "independent";
    if (has(t,"source.normative_positivism")) {
      if (has(t,"source.source_thesis")) return "normative_exclusive";
      if (has(t,"source.morality_incorporated")) return "normative_inclusive";
      return "normative";
    }
    if (axis(scores,"sorc")>=62 || has(t,"source.morality_incorporated") || has(t,"source.source_thesis")) {
      if (extreme) return "qualified_positive";
      if (has(t,"source.source_thesis")) return "exclusive";
      if (has(t,"source.morality_incorporated")) return "inclusive";
      return "positive";
    }
    if (extreme) return "extreme";
    // Identity is only a compatibility fallback when available evidence does
    // not establish the source relationship. A low aggregate alone does not
    // identify which independent source thesis a person accepts.
    if (id==="natural_lawyer" || id==="common_good_constitutionalist") return "natural";
    if (id==="moral_impact_theorist") return "impact";
    if (id==="fullerian") return "legality";
    if (["interpretivist","dworkinian"].includes(id)) return "interpretive";
    if (id==="inclusive_positivist") return "inclusive";
    if (id==="exclusive_positivist") return "exclusive";
    if (id==="positivist") return "positive";
    if (id==="radbruchian") return "extreme";
    return "open";
  }

  // Full-profile prose is selected by the conjunction of measured commitments.
  // Names, champion matches, labels, and exact score fingerprints are never gates.
  const EVIDENCED_PROFILES = {
  "independent_common_law_safeguards": {
    "opening": "You think a legal order can owe people more than its rulers have agreed to give them. Judges should uncover those obligations through principle and accumulated experience, then enforce them against elected lawmakers without express constitutional authorization. Past decisions deserve respect because they help constitute that order; they cannot exhaust its moral obligations. You would give courts responsibility for developing rights, and accept the cost of letting judges enforce them.",
    "context": "Your view makes legal argument a continuing inquiry into what people are already entitled to. When reasoning from earlier decisions, you would seek an interpretation that fits the legal record and makes moral sense of its principles. That reasoning can carry the law beyond its earlier conclusions. The Constitution’s arrangement of powers and institutions can also imply binding rules that no single clause states. A judge who treats accepted legal practice as the ultimate test of law will see an unauthorized addition where you see an obligation finally understood. The disagreement concerns whether official acceptance finally determines what can count as law. Your answer leaves public institutions substantial work to do, settling questions on which morality permits several reasonable arrangements. Ordinary unfairness therefore leaves much law intact; extreme injustice can destroy its claim to legal validity. Courts must explain how new conclusions belong to the legal order they inherit, without casually undoing arrangements people made in reliance on old decisions. They can create additional legal safeguards to make a right effective, while distinguishing those safeguards from the right itself. You would ordinarily make practical difficulties shape the remedy rather than reduce the right itself. People who reject the judges' moral reasoning must nevertheless live under the resulting law."
  },
  "inclusive_textual_settlement_safeguards": {
    "opening": "You think public power should answer to commitments that survive the preferences of whoever holds office. Enacted language, constitutional meaning and general rules bind judges as well as lawmakers. Established decisions can acquire authority of their own, so a better interpretation is not always sufficient reason to start again. You would enforce recognized rights firmly, while requiring legal authority for both judicial intervention and the changes made in its name.",
    "context": "The strength of this outlook is that a judge must explain where a claimed power comes from before explaining why its use would be good. Your inclusive positivism allows accepted legal standards to make moral acceptability a condition of legal validity. A judge applying those standards is determining existing law. Even a sound moral objection cannot supply a missing legal basis. Textualism and originalism carry the same discipline into interpretation. A statute’s wording records how far lawmakers agreed to pursue its aims. Whole-text context and ordinary usage help recover that bargain, including limits that its broader purpose would erase. An adopted principle can reach circumstances its authors misunderstood; its content remains a commitment to be interpreted rather than a proposal to be improved. Your respect for precedent makes this more accommodating than a programme of restoring every original answer. Judicial decisions can become part of the law people legitimately depend on, giving some mistakes continuing legal authority. You would tolerate that cost rather than let every change in judicial philosophy reopen settled arrangements. Courts can fill genuine gaps and create safeguards beyond a constitutional guarantee’s minimum requirements. Those safeguards can be binding law while remaining open to legislative revision that respects the underlying right."
  },
  "inclusive_development_structural_safeguards": {
    "opening": "You think judges inherit responsibility for the legal order people have learned to depend on. Its enacted rules, developed rights and settled decisions deserve to be carried forward through improvement. A new court's conviction that an old decision was mistaken is therefore insufficient by itself. You would normally preserve it when serious reliance is at stake, while developing the law through its existing commitments and making its protections practically effective.",
    "context": "For you, legal history changes what justice now requires of a court. An earlier ruling may have been wrong when made, yet undoing it can wrong people whose arrangements the law itself encouraged. This gives continuity an independent claim against theoretical tidiness. It also explains how constitutional law can grow through precedent. Each generation works with an accumulated body of decisions that supplies both reasons for development and limits on it. Your inclusive positivism lets recognized legal practices make moral acceptability a condition of legal validity. Constitutional obligations can also follow from the relationships the document establishes, without any single clause stating them. Courts can genuinely make new law where existing standards leave a choice, and should distinguish that work from enforcing a right already owed. You would give purpose and practical judgment room in interpretation while respecting deliberate legislative limits. Courts may create binding safeguards beyond a right’s constitutional minimum. Separating those safeguards from the guarantee itself makes room to revise the protection while continuing to honor the right. Change proceeds through inherited law, with a heavy burden on disruption. People disadvantaged by an entrenched mistake may have to wait for a correction that protects others' reliance, even when the intellectual case against the old rule is strong."
  },
  "inclusive_categorical_textual_settlement": {
    "opening": "You want judicial power disciplined by commitments a judge cannot simply improve away. The words lawmakers enacted, the Constitution's adopted meaning and rules that apply across cases give that discipline substance. Settled decisions also create obligations to people who have relied on them. You would protect legal rights against political pressure while resisting judicial freedom to redesign the law, accepting imperfect outcomes as a serious cost of dependable, bounded authority.",
    "context": "Lawmakers decide how far to pursue an aim, through which institutions, and at what cost to competing interests. Your textualism preserves those choices inside the enacted language. Reading a statute in context should recover the decision that was made, including its limits; pursuing its purpose further would require authority to make a different decision. Your constitutional originalism follows the same logic. Adopted principles can govern applications their authors failed to recognize, while retaining the meaning that gave them authority. Accepted legal standards can make moral requirements part of what determines legal validity. Your preference for general rules and prescribed governmental procedures extends this restraint across public power. When constitutional text states a right categorically, you would enforce that prohibition rather than weigh the right against governmental interests. Defining its scope remains an interpretive task; once it applies, judges cannot reopen the balance because the law they must invalidate is popular. Judges retain responsibility for choosing the best statutory reading, including when an agency disagrees. Earlier judicial decisions can acquire authority through settled practice and the reliance they invite. You would preserve some interpretive mistakes for that reason, especially where legislation can repair them. You would sometimes leave the resulting harm in place because correction would disrupt obligations built around the old rule."
  },
  "inclusive_empirical_development_remedies": {
    "opening": "You see a legal order shaped by judicial choices and sustained by the expectations those choices create. Understanding it requires evidence about how judges actually decide, alongside attention to the rules they invoke. You would carry that realism into a cautious, institutionally grounded practice of judging. Established rights deserve effective protection, and deeply relied-on decisions deserve continuity, even when closer examination exposes the judgment and human influences behind their creation.",
    "context": "Your interest in how judges decide reaches beyond the reasons printed in an opinion. In hard appeals, several outcomes can have defensible legal support. You would investigate whether judges’ outlooks, experience or institutional pressures help explain and predict which they choose. A decision’s legal authority remains a separate question. Recognized practices can make moral requirements part of the law, including conditions of legal validity. Explaining a decision’s origins does not settle what later judges ought to do with it. You give inherited decisions legal authority of their own. Constitutional principles can develop through accumulated decisions, and genuine gaps leave courts responsible for making some new law. Those decisions organize lives and institutions, so a fresh judicial theory is insufficient by itself to justify dismantling them. Serious reliance would normally lead you to preserve even a mistaken ruling. Correction must take account of obligations created by the law people were previously entitled to follow. You would work within that inheritance, giving purpose and practical judgment room in interpretation while respecting deliberate legislative limits. Courts should make established rights effective, using stronger remedies when narrower measures have failed and tailoring relief to the violation."
  },
  "inclusive_intratextual_construction_settlement": {
    "opening": "You think changing the judge should not change the commitments a legal system owes its people. Constitutional meaning, enacted compromises and general rules should survive shifts in judicial conviction. Settled decisions have acquired authority too, so returning to first principles can itself require justification. You would enforce rights firmly within that inherited order, developing its protections where needed while keeping judicial reform tied to the authority judges have actually received.",
    "context": "Your originalism reads constitutional language as part of a connected document. When a phrase is ambiguous, repeated or related wording elsewhere and the Constitution’s overall structure can outweigh an isolated reading. These connections help recover the public meaning adopted, including principles whose applications their adopters misunderstood. That gives constitutional reasoning room to produce unfamiliar conclusions without treating present approval as permission to change the Constitution's content. If that meaning genuinely leaves a question unresolved, you allow later doctrine to develop within the remaining space. The first task is still to determine what the text, read as a whole, has already settled. Your textualism, insistence on recognized legal authority and preference for general rules reinforce its demand that judges respect commitments established before they took office. Moral reasoning enters through standards the legal system accepts. Precedent then complicates what fidelity requires. A court inherits a functioning legal order as well as an original text, and serious reliance can give an erroneous ruling reasons to survive. You would give those reasons weight instead of making historical error decisive. You would sometimes leave a ruling in force while acknowledging that it misread the Constitution. That protects existing arrangements while leaving people harmed by the original mistake with a harder route to correction."
  }
};
  for (const [key, route] of Object.entries(EVIDENCED_PROFILES)) {
    const id = `portrait_evidenced_${key}`;
    ROUTES[id] = Object.freeze(route);
    OPENINGS[id] = route.opening;
  }
  function selectEvidencedProfile(c, scores) {
    const t=c?.traits||{}, v=k=>axis(scores,k);
    const all=(...keys)=>keys.every(key=>has(t,key,0.5));
    const inclusive=sourceFrame(c,scores)==="inclusive" ||
      (sourceFrame(c,scores)==="qualified_positive" && has(t,"source.morality_incorporated",0.5) && !has(t,"source.extreme_injustice",0.5));
    const stable=v("prec")>=62 && has(t,"precedent.settlement",0.5);
    const historical=v("time")>=64 && !has(t,"time.precedent_mediated_historicism") &&
      all("time.public_meaning","time.semantic_fixation","time.principle_originalism");
    const textual=historical && stable && inclusive && v("cons")>=64 && v("form")>=64 &&
      all("constraint.contextual_textualism","constraint.enacted_bargain","posture.rights_trumps");
    const development=stable && v("time")<=42 && all("time.common_law_development");
    let key=null;
    if (textual && all("method.categorical_textual_rights","separation.independent_judicial_interpretation",
        "separation.prescribed_process","precedent.statutory"))
      key="inclusive_categorical_textual_settlement";
    else if (textual && all("time.intratextualism","time.construction_zone"))
      key="inclusive_intratextual_construction_settlement";
    else if (textual && all("source.law_runs_out","remedies.constitutional_common_law"))
      key="inclusive_textual_settlement_safeguards";
    else if (development && inclusive && all("realism.underdetermination","realism.extra_doctrinal",
        "realism.empirical_prediction","source.law_runs_out","remedies.structural","remedies.supervision",
        "constraint.enacted_bargain","posture.rights_trumps") &&
        Object.entries(t).some(([k,value])=>k.startsWith("priority.realism.over.") && value>=0.5))
      key="inclusive_empirical_development_remedies";
    else if (development && inclusive && all("source.law_runs_out","method.structural_inference",
        "remedies.constitutional_common_law","constraint.enacted_bargain","posture.rights_trumps"))
      key="inclusive_development_structural_safeguards";
    else if (development && v("post")<=38 && v("remed")<=38 &&
        all("source.independent_moral_validity","source.extreme_injustice","source.positive_law_settlement",
        "source.common_law_fundamental_rights","source.fit_and_justification",
        "method.structural_inference","remedies.constitutional_common_law"))
      key="independent_common_law_safeguards";
    return key ? `portrait_evidenced_${key}` : null;
  }

  function selectBasePortrait(c, scores={}) {
    const id=c?.identity?.id||"mixed_jurisprudence", t=c?.traits||{};
    if (SPECIAL_IDS.has(id) || id==="mixed_jurisprudence") return legacySelectContextId(c,scores);
    const v=k=>axis(scores,k);
    // Paired evidence, including moderate tendencies, outranks a source noun.
    // Prefer relationships with an explicit mechanism over isolated loud scores.
    const development=v("time")<=42 || (v("time")<55 && has(t,"time.common_law_development",0.67));
    const history=!has(t,"time.precedent_mediated_historicism",0.5) &&
      (v("time")>=64 || (v("time")>=50 && has(t,"time.originalism_independent_authority",0.67)));
    const stable=v("prec")>=62, correct=v("prec")<=38;
    const rights=v("post")<=38, defer=v("post")>=62;
    const rules=v("form")>=64, text=v("cons")>=64, purpose=v("cons")<=38;
    let plan=null;
    // Descriptive Realism and affirmative Pluralism need their own evidence,
    // plus explicit priority: an ordinary mixed-method tendency is insufficient.
    const realismPriority=Object.entries(t).some(([key,value])=>key.startsWith("priority.realism.over.") && Number(value)>=0.5);
    const methodPriority=Object.entries(t).some(([key,value])=>key.startsWith("priority.method.over.") && Number(value)>=0.5);
    const confirmedRealism=has(t,"realism.extra_doctrinal",0.5) && has(t,"realism.empirical_prediction",0.5);
    const confirmedPluralism=has(t,"method.modal_pluralism",0.5);
    if(development && stable && realismPriority && confirmedRealism && !has(t,"priority.method.over.realism")) plan="realist_continuity";
    else if(development && stable && methodPriority && confirmedPluralism && !has(t,"priority.realism.over.method")) plan=rights ? "pluralist_rights_continuity" : "pluralist_continuity";
    else if(development && stable) plan=rights ? "continuity_rights" : "continuity_development";
    else if(history && stable) plan=text && rules ? "public_constraint_reliance" : "historical_reliance";
    else if(history && correct) plan="historical_correction";
    else if(history && rules) plan="historical_rules";
    else if(development && rights) plan="adaptive_rights";
    else if(development && defer) plan="adaptive_democracy";
    else if(rules && rights) plan="rules_rights";
    else if(purpose && defer) plan="purpose_restraint";
    else if(text && defer) plan="text_restraint";
    else if(text && rules) plan="text_rules";
    else if(purpose && stable) plan="practical_continuity";
    else if(v("form")<=38 && rights) plan="contextual_rights";
    if(plan) return `portrait_${plan}_${sourceFrame(c,scores)}`;
    // With insufficient relational evidence, keep the supported specialist
    // account and its matching opening instead of fabricating a combination.
    return legacySelectContextId(c,scores);
  }
  // Retain the established practical-pluralist route for legacy links; other
  // supported relationships now also have authored dynamic variants.
  const DYNAMIC_SUFFIX = "_dynamic_statutory";
  ROUTES.pluralist_practical_dynamic_statutory = {
    opening: "You approach statutory interpretation as a continuing legal practice. Text, original expectations, purpose, precedent, and present legal context can carry different weight as a statute ages. Later developments may justify a changed interpretation, while the enacted law still limits the choices available to the court.",
    context: "Practical reasoning becomes dynamic statutory interpretation when the statute's later life helps determine its legal meaning. Original language and legislative expectations remain important, but they do not exhaust the inquiry: intervening law, established interpretations, reliance, and changed social conditions may alter which reading is best justified. A precise statutory definition can settle a question; an open-ended provision may require a different balance of reasons. This account therefore goes beyond asking what the original legislature would have decided, or applying an unchanged meaning to a new factual situation. It also differs from treating a statute as obsolete and requiring lawmakers to reaffirm it. The court works within an ongoing interpretive practice, explaining why contemporary developments warrant its reading and how that reading remains accountable to the enacted law. The central difficulty is distinguishing justified evolution from a judge's preferred policy while giving sufficient weight to the stability people have built around earlier interpretations."
  };
  // A diagnostic can refine a broad relationship without changing the source
  // account. Multiple refinements are ranked by explanatory specificity; the
  // coverage report records any supported mechanism not represented in prose.
  const DISTINCTIVE_EVIDENCE = {
    "time.precedent_mediated_historicism": /mediated_history/,
    "time.construction_zone": /construction/,
    "time.democratic_constitutionalism": /democratic_development/,
    "time.transformative_constitutionalism": /transformative_development/,
    "posture.process_reinforcement": /process/,
    "posture.responsive_review": /responsive_process/,
    "source.normative_positivism": /normative/,
    "method.dynamic_statutory": /dynamic_statutory/,
    "realism.fact_skepticism": /fact_skeptical/
  };
  function selectPortrait(c, scores={}) {
    const base=selectBasePortrait(c,scores), t=c?.traits||{};
    if (SPECIAL_IDS.has(c?.identity?.id) || c?.identity?.id==="mixed_jurisprudence") return base;
    const stable=axis(scores,"prec")>=62;
    const history=axis(scores,"time")>=64 || has(t,"time.originalism_independent_authority",0.67);
    const supported=key=>has(t,key,0.5);
    const specialMechanism=["time.democratic_constitutionalism","time.transformative_constitutionalism",
      "posture.process_reinforcement","posture.responsive_review","method.dynamic_statutory",
      "realism.fact_skepticism","source.normative_positivism"].some(supported);
    const evidenced=specialMechanism ? null : selectEvidencedProfile(c,scores);
    if (evidenced) return evidenced;
    let plan=null;
    // A direct rejection of independent historical authority takes priority
    // over a high aggregate Time score. No contradictory originalist opening.
    if (supported("time.precedent_mediated_historicism"))
      plan=stable ? "mediated_history_continuity" : "mediated_history_practice";
    else if (supported("posture.responsive_review")) plan="responsive_process_review";
    else if (supported("posture.process_reinforcement")) plan="process_reinforcing_review";
    else if (supported("time.democratic_constitutionalism")) plan="democratic_development";
    else if (supported("time.transformative_constitutionalism")) plan="transformative_development";
    else if (supported("realism.fact_skepticism")) plan=stable ? "fact_skeptical_continuity" : "fact_skeptical_adjudication";
    else if (supported("method.dynamic_statutory")) {
      if (base==="pluralist_practical" && supported("method.practical_reasoning")) return base+DYNAMIC_SUFFIX;
      plan=stable ? "dynamic_statutory_continuity" : "dynamic_statutory_context";
    }
    else if (history && !supported("time.precedent_mediated_historicism") && supported("time.construction_zone"))
      plan=stable ? "historical_construction_continuity" : "historical_construction";
    if (plan) return `portrait_${plan}_${sourceFrame(c,scores)}`;
    return base;
  }
  function evidenceCoverage(c, scores={}) {
    const route=selectPortrait(c,scores), t=c?.traits||{};
    const focus=/mediated_history/.test(route) ? "The portrait first resolves evidence rejecting independent historical authority" :
      /responsive_process|process_reinforcing/.test(route) ? "The portrait prioritizes the specific institutional justification for judicial intervention" :
      /democratic_development|transformative_development/.test(route) ? "The portrait prioritizes the identified mechanism of constitutional development" :
      /fact_skeptical/.test(route) ? "The portrait prioritizes the distinct trial-level source of uncertainty" :
      /dynamic_statutory/.test(route) ? "The portrait prioritizes the identified mechanism of statutory evolution" :
      "The portrait requires a supported relationship, rather than promoting an isolated diagnostic into a complete outlook";
    return Object.entries(DISTINCTIVE_EVIDENCE).filter(([key])=>has(t,key,0.5)).map(([key,pattern])=>({
      trait:key, represented:pattern.test(route), route,
      reason:pattern.test(route) ? "Explained by the selected authored relationship." :
        SPECIAL_IDS.has(c?.identity?.id) ? "Reliability result withholds an ordinary portrait." :
        `${focus}; this additional diagnostic is deferred, not negated or inferred away. Its coexistence is not exhaustively explained by this portrait.`
    }));
  }
  function selectContextId(c,scores={}) { return selectPortrait(c,scores); }
  function selectOpeningId(c,scores={},explicit=null) {
    if(SPECIAL_IDS.has(c?.identity?.id)) return null;
    const plan=selectPortrait(c,scores);
    if(plan.startsWith("portrait_")) return plan;
    if(typeof explicit==="string" && Object.hasOwn(OPENINGS,explicit)) return explicit;
    return `paired_${plan}`;
  }
  function buildOpening(c,scores={},explicit=null) {
    if(SPECIAL_IDS.has(c?.identity?.id)) return ROUTES[selectPortrait(c,scores)].opening;
    return OPENINGS[selectOpeningId(c,scores,explicit)] || ROUTES.low_theory.opening;
  }
  // Pair specialist fallback paragraphs too. Old opening IDs stay readable.
  for(const [id,route] of Object.entries(ROUTES)) if(!id.startsWith("portrait_"))
    OPENINGS[`paired_${id}`]=route.opening;
  Object.freeze(ROUTES);
  Object.freeze(OPENINGS);

  function fromId(id) {
    const valid = typeof id === "string" && Object.hasOwn(ROUTES, id);
    const route = valid ? ROUTES[id] : ROUTES.low_theory;
    return { id: valid ? id : "low_theory", opening: route.opening, context: route.context };
  }

  function build(classification, scores = {}, explicitId = null, explicitOpeningId = null) {
    const selected = selectPortrait(classification, scores);
    // Exceptional results cannot be overwritten by ordinary or legacy URL IDs.
    if (SPECIAL_IDS.has(classification?.identity?.id)) return {
      id: selected, openingId: null, ...ROUTES[selected]
    };
    const id = typeof explicitId === "string" && Object.hasOwn(ROUTES, explicitId)
      ? explicitId : selected;
    const integrated = id.startsWith("portrait_");
    // New plans are atomic. Legacy x/o pairs remain independently replayable.
    const openingId = integrated ? id :
      (typeof explicitOpeningId === "string" && Object.hasOwn(OPENINGS, explicitOpeningId)
        ? explicitOpeningId :
          (typeof explicitId === "string" && Object.hasOwn(ROUTES, explicitId)
            ? legacySelectOpeningId(classification, scores) : selectOpeningId(classification, scores)));
    return {id, openingId, opening: OPENINGS[openingId] || ROUTES[id].opening,
      context: ROUTES[id].context};
  }

  function wordCount(text) {
    return String(text || "").trim().split(/\s+/).filter(Boolean).length;
  }

  global.LAW_RESULT_NARRATIVE = Object.freeze({
    ROUTES,
    OPENINGS,
    selectPortrait,
    evidenceCoverage,
    sourceFrame,
    selectOpeningId,
    buildOpening,
    selectContextId,
    fromId,
    build,
    wordCount
  });
})(globalThis);

