/*
  Future profile/champion layer.

  Add entries only after the scale is piloted. A profile can contain:
  {
    id: "example",
    name: "Example jurist or school",
    image: "value_images/example.webp",
    description: "Short explanation.",
    scores: { sorc: 50, cons: 50, time: 50, prec: 50, remed: 50, post: 50, separ: 50, form: 50 }
  }

  The results page will automatically reveal a closest-profile panel when this array is non-empty.
*/
globalThis.LAW_PROFILES = Object.freeze([]);
