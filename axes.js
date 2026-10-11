/* LAWvalues axis definitions. The first pole is scored toward 100; the second toward 0. */
globalThis.LAW_VERSION = "0.5 Beta";
globalThis.LAW_QUESTION_COUNT = 93;
globalThis.LAW_SCORED_QUESTION_COUNT = 86;
globalThis.LAW_AXIS_ITEM_COUNTS = Object.freeze({
  sorc: 11,
  cons: 18,
  time: 12,
  prec: 12,
  remed: 11,
  post: 13,
  separ: 7,
  form: 9
});
globalThis.LAW_AXIS_SCORED_COUNTS = Object.freeze({
  sorc: 11,
  cons: 16,
  time: 8,
  prec: 12,
  remed: 11,
  post: 13,
  separ: 7,
  form: 8
});

globalThis.LAW_AXES = Object.freeze([
  {
    id: "sorc",
    name: "Source",
    left: "Positivist",
    right: "Non-positivist",
    leftShort: "Positive law",
    rightShort: "Moral principle",
    leftColor: "#b53a32",
    rightColor: "#2f8f62",
    question: "What ultimately makes a norm legally valid?",
    leftDescription: "Legal validity turns on recognized social sources such as enactment, precedent, and official practice, even when the resulting law is unjust.",
    rightDescription: "Legal validity is bounded or partly constituted by moral principles, fundamental rights, or higher law that positive sources cannot exhaust."
  },
  {
    id: "cons",
    name: "Constraint",
    left: "Textualist",
    right: "Open construction",
    leftShort: "Text-bound",
    rightShort: "Purpose-bound",
    leftColor: "#2f6fb0",
    rightColor: "#b6672e",
    question: "How tightly should enacted language constrain legal effect?",
    leftDescription: "Ordinary meaning, syntax, structure, and linguistic canons control; unenacted purpose and expected applications have limited force.",
    rightDescription: "Purpose, consequences, context, and anti-evasion principles may extend, narrow, or adapt the text's legal effect."
  },
  {
    id: "time",
    name: "Time",
    left: "Historical",
    right: "Living",
    leftShort: "Fixed meaning",
    rightShort: "Evolving meaning",
    leftColor: "#3157b7",
    rightColor: "#bf6f21",
    question: "At what time is constitutional meaning anchored?",
    leftDescription: "Meaning is fixed at adoption and informed by original public usage, early practice, and inherited legal tradition.",
    rightDescription: "Constitutional content may develop through precedent, changed facts, experience, and contemporary understandings."
  },
  {
    id: "prec",
    name: "Precedent",
    left: "Stability",
    right: "Overruling",
    leftShort: "Continuity",
    rightShort: "Correction",
    leftColor: "#6d44a8",
    rightColor: "#b58c16",
    question: "When should an erroneous precedent remain in force?",
    leftDescription: "Reliance, continuity, predictability, and institutional legitimacy often justify retaining a precedent despite doubt about its correctness.",
    rightDescription: "Serious error, incoherence, or unworkability often justifies overruling despite disruption and reliance costs."
  },
  {
    id: "remed",
    name: "Remedies",
    left: "Narrow",
    right: "Systemic",
    leftShort: "Party-specific",
    rightShort: "Structural",
    leftColor: "#588c24",
    rightColor: "#a63b88",
    question: "How broadly should courts repair legal violations?",
    leftDescription: "Relief should be party-specific, severable, incremental, and no broader than necessary to resolve the case before the court.",
    rightDescription: "Relief may address institutions, policies, and affected nonparties when broad measures are needed to end a pervasive violation."
  },
  {
    id: "post",
    name: "Posture",
    left: "Majoritarian",
    right: "Counter-majoritarian",
    leftShort: "Democratic deference",
    rightShort: "Judicial protection",
    leftColor: "#aa5148",
    rightColor: "#267f80",
    question: "How much deference should courts give elected government?",
    leftDescription: "Courts should usually defer to democratic choices and invalidate them only for clear legal violations.",
    rightDescription: "Courts should independently and searchingly enforce rights and constitutional structure, including against sustained majority will."
  },
  {
    id: "separ",
    name: "Separation",
    left: "Formalist",
    right: "Functionalist",
    leftShort: "Bright-line powers",
    rightShort: "Workable checks",
    leftColor: "#237f9b",
    rightColor: "#a7473d",
    question: "How rigidly should governmental powers be separated?",
    leftDescription: "Constitutionally assigned powers and procedures create enforceable boundaries even when overlap would be efficient.",
    rightDescription: "Pragmatic overlap is acceptable when accountability, checks, and each branch's core capacity remain intact."
  },
  {
    id: "form",
    name: "Form",
    left: "Rules",
    right: "Balancing",
    leftShort: "Categorical",
    rightShort: "Contextual",
    leftColor: "#657f1f",
    rightColor: "#8a4a9b",
    question: "Should doctrine rely more on rules or contextual judgment?",
    leftDescription: "Bright lines and categories promote notice, consistency, administrability, and constraint even at the cost of imperfect fit.",
    rightDescription: "Standards and proportionality permit closer fit to facts and values even at the cost of discretion and uncertainty."
  }
]);

globalThis.LAW_AXIS_MAP = Object.freeze(
  Object.fromEntries(globalThis.LAW_AXES.map((axis) => [axis.id, axis]))
);
