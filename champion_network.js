/* Compact champion-neighborhood network for the results page.
   Nodes are selectable LAWvalues champion units. Each unit is connected to its
   three closest theory-derived neighbors using the same profile metadata that
   drives champion matching. */
(function championNetworkModule() {
    'use strict';

    const SVG_NS = 'http://www.w3.org/2000/svg';
    const WIDTH = 900;
    const HEIGHT = 650;

    const CAMP_ORDER = [
        'Originalism',
        'Positivism',
        'Natural law / Nonpositivism',
        'Living / Common-law constitutionalism',
        'Textualism / Formalism',
        'Pragmatism / Legal Process',
        'Realism / Sociological',
        'Authority / Remedies / Institutions'
    ];

    const CAMP_COLORS = Object.freeze({
        'Originalism': '#A85D52',
        'Positivism': '#537B9F',
        'Natural law / Nonpositivism': '#806A9A',
        'Living / Common-law constitutionalism': '#5F8A69',
        'Textualism / Formalism': '#B18A4D',
        'Pragmatism / Legal Process': '#4F8985',
        'Realism / Sociological': '#8A6B55',
        'Authority / Remedies / Institutions': '#747B85'
    });

    const CAMP_IDS = Object.freeze({
        'Originalism': new Set([
            'bork_berger','alexander_kay_prakash','whittington','solum',
            'barnett_bernick','balkin','scalia_manning','mcginnis_rappaport',
            'baude_sachs','amar','thomas_paulsen','barrett','natural_law_originalists'
        ]),
        'Positivism': new Set([
            'hart','kelsen','austin','shapiro','coleman_waluchow_kramer',
            'raz_shapiro_marmor','campbell_waldron_schauer','waluchow_common_law'
        ]),
        'Natural law / Nonpositivism': new Set([
            'dworkin_stavropoulos','greenberg_hershovitz','greenberg','hershovitz','finnis_murphy_george',
            'moore_strong_natural_law','fuller','radbruch_soper','alexy','vermeule'
        ]),
        'Living / Common-law constitutionalism': new Set([
            'david_strauss','harlan_ii','robin_cooke','brennan',
            'post_siegel','klare_langa','ackerman','charles_black'
        ]),
        'Textualism / Formalism': new Set([
            'hugo_black','owen_dixon','schauer','scalia_manning_easterbrook',
            'kavanaugh_barrett','kagan','lawson','calabresi_prakash'
        ]),
        'Pragmatism / Legal Process': new Set([
            'guido_calabresi','cardozo','posner','breyer','barak','hart_sacks',
            'mashaw','ekins_intentionalism','katzmann','hand_posner_imaginative',
            'wechsler','eskridge_frickey','bobbitt','oconnor'
        ]),
        'Realism / Sociological': new Set([
            'pound','ehrlich','santi_romano','geny','felix_cohen','frank','leiter','llewellyn'
        ]),
        'Authority / Remedies / Institutions': new Set([
            'sunstein','thayer','waldron','kramer','walsh_departmentalism','gardbaum',
            'ely','dixon_responsive','bickel','fiss','bhagwati_iyer','bray',
            'sohoni_frost','monaghan','levinson','peter_strauss','metzger'
        ])
    });

    const ID_FAMILY = Object.freeze({
        positivist:'Source', interpretivist:'Source', nonpositivist:'Source',
        natural_lawyer:'Source', fullerian:'Source',
        textualist:'Method', intentionalist:'Method', purposivist:'Method',
        legal_process_theorist:'Method', interpretive_pluralist:'Method',
        sociological_jurist:'Method', legal_realist:'Method', pragmatist:'Method',
        originalist:'Constitutional time', public_meaning_originalist:'Constitutional time',
        original_intent_originalist:'Constitutional time', living_constitutionalist:'Constitutional time',
        common_law_constitutionalist:'Constitutional time', common_good_constitutionalist:'Constitutional time',
        political_constitutionalist:'Judicial authority', thayerian:'Judicial authority',
        popular_constitutionalist:'Judicial authority', departmentalist:'Judicial authority',
        political_process_jurist:'Judicial authority', minimalist:'Judicial authority',
        legal_constitutionalist:'Judicial authority',
        formalist:'Structure / form', functionalist:'Structure / form', proportionalist:'Structure / form',
        mixed_jurisprudence:'Mixed'
    });

    function campFor(id) {
        for (const name of CAMP_ORDER) {
            if (CAMP_IDS[name].has(id)) return name;
        }
        return 'Authority / Remedies / Institutions';
    }

    function requiredTraits(profile) {
        const out = [];
        for (const rule of profile.requiredTraits || []) {
            if (typeof rule === 'string') out.push(rule);
            if (rule && Array.isArray(rule.all)) out.push(...rule.all);
            if (rule && Array.isArray(rule.any)) out.push(...rule.any);
        }
        return [...new Set(out)];
    }

    function weightedJaccard(a, b) {
        const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
        let intersection = 0;
        let union = 0;
        for (const key of keys) {
            intersection += Math.min(a[key] || 0, b[key] || 0);
            union += Math.max(a[key] || 0, b[key] || 0);
        }
        return union ? intersection / union : 0.5;
    }

    function identityVector(profile) {
        const vector = {};
        for (const id of profile.identityIds || []) vector[id] = Math.max(vector[id] || 0, 2);
        for (const id of profile.crossCuttingIdentityIds || []) vector[id] = Math.max(vector[id] || 0, 0.8);
        return vector;
    }

    function traitVector(profile) {
        const vector = {};
        for (const trait of profile.signatureTraits || []) vector[trait] = (vector[trait] || 0) + 1.4;
        for (const trait of requiredTraits(profile)) vector[trait] = (vector[trait] || 0) + 0.8;
        return vector;
    }

    function familyVector(profile) {
        const vector = {};
        for (const id of [...(profile.identityIds || []), ...(profile.crossCuttingIdentityIds || [])]) {
            const family = ID_FAMILY[id];
            if (family) vector['identity:' + family] = (vector['identity:' + family] || 0) + 1;
        }
        for (const trait of [...(profile.signatureTraits || []), ...requiredTraits(profile)]) {
            const family = trait.split('.')[0];
            vector['trait:' + family] = (vector['trait:' + family] || 0) + 0.6;
        }
        return vector;
    }

    function axisSimilarity(a, b) {
        const left = a.axisSignature || {};
        const right = b.axisSignature || {};
        const keys = new Set([...Object.keys(left), ...Object.keys(right)]);
        if (!keys.size) return 0.5;
        let numerator = 0;
        let denominator = 0;
        for (const key of keys) {
            const av = left[key];
            const bv = right[key];
            const weight = (((av && av.weight) || 0) + ((bv && bv.weight) || 0)) / 2 || 0.4;
            const similarity = av && bv ? 1 - Math.abs(av.target - bv.target) / 100 : 0.45;
            numerator += similarity * weight;
            denominator += weight;
        }
        return denominator ? numerator / denominator : 0.5;
    }

    function similarity(a, b) {
        let value =
            0.38 * weightedJaccard(identityVector(a), identityVector(b)) +
            0.30 * weightedJaccard(traitVector(a), traitVector(b)) +
            0.20 * axisSimilarity(a, b) +
            0.12 * weightedJaccard(familyVector(a), familyVector(b));

        const aIds = a.identityIds || [];
        const bIds = b.identityIds || [];
        const aCross = a.crossCuttingIdentityIds || [];
        const bCross = b.crossCuttingIdentityIds || [];

        if (aIds.some((id) => bIds.includes(id))) value += 0.10;
        else if (aIds.some((id) => bCross.includes(id)) || bIds.some((id) => aCross.includes(id))) value += 0.04;

        const aPositive = new Set([...(a.signatureTraits || []), ...requiredTraits(a)]);
        const bPositive = new Set([...(b.signatureTraits || []), ...requiredTraits(b)]);
        let conflicts = 0;
        for (const trait of a.antiTraits || []) if (bPositive.has(trait)) conflicts += 1;
        for (const trait of b.antiTraits || []) if (aPositive.has(trait)) conflicts += 1;
        value -= Math.min(0.20, conflicts * 0.07);

        return Math.max(0, Math.min(1, value));
    }

    function buildGraph() {
        const profiles = (globalThis.LAW_PROFILES || []).filter(
            (profile) => profile.selectable !== false && profile.tier !== 'lineage'
        );
        const pairSimilarity = new Map();
        const keyFor = (a, b) => [a, b].sort().join('|');

        for (let i = 0; i < profiles.length; i += 1) {
            for (let j = i + 1; j < profiles.length; j += 1) {
                pairSimilarity.set(keyFor(profiles[i].id, profiles[j].id), similarity(profiles[i], profiles[j]));
            }
        }

        const getSimilarity = (a, b) => pairSimilarity.get(keyFor(a, b)) || 0;
        const nearest = {};
        for (const profile of profiles) {
            nearest[profile.id] = profiles
                .filter((candidate) => candidate.id !== profile.id)
                .map((candidate) => ({ id: candidate.id, similarity: getSimilarity(profile.id, candidate.id) }))
                .sort((a, b) => b.similarity - a.similarity)
                .slice(0, 5);
        }

        const edgeMap = new Map();
        for (const profile of profiles) {
            for (const neighbor of nearest[profile.id].slice(0, 3)) {
                const key = keyFor(profile.id, neighbor.id);
                const mutual = nearest[neighbor.id].slice(0, 3).some((item) => item.id === profile.id);
                const previous = edgeMap.get(key);
                edgeMap.set(key, {
                    source: profile.id,
                    target: neighbor.id,
                    similarity: neighbor.similarity,
                    mutual: mutual || Boolean(previous && previous.mutual)
                });
            }
        }

        const nodes = profiles.map((profile) => ({
            id: profile.id,
            name: profile.name,
            camp: campFor(profile.id),
            density: nearest[profile.id].reduce((sum, item) => sum + item.similarity, 0) / 5,
            x: 0,
            y: 0,
            vx: 0,
            vy: 0
        }));
        const byId = Object.fromEntries(nodes.map((node) => [node.id, node]));
        const edges = [...edgeMap.values()].map((edge) => ({
            ...edge,
            sourceNode: byId[edge.source],
            targetNode: byId[edge.target]
        }));

        layout(nodes, edges);
        return { nodes, edges, byId };
    }

    function layout(nodes, edges) {
        const centers = {};
        CAMP_ORDER.forEach((camp, index) => {
            const angle = -Math.PI / 2 + index * Math.PI * 2 / CAMP_ORDER.length;
            centers[camp] = {
                x: WIDTH / 2 + Math.cos(angle) * 250,
                y: HEIGHT / 2 + Math.sin(angle) * 185
            };
        });

        const campCounts = {};
        for (const node of nodes) {
            const count = campCounts[node.camp] || 0;
            campCounts[node.camp] = count + 1;
            const angle = count * 2.399963229728653;
            const radius = 18 + Math.sqrt(count) * 20;
            node.x = centers[node.camp].x + Math.cos(angle) * radius;
            node.y = centers[node.camp].y + Math.sin(angle) * radius;
        }

        for (let iteration = 0; iteration < 180; iteration += 1) {
            const cooling = 1 - iteration / 180;

            for (let i = 0; i < nodes.length; i += 1) {
                for (let j = i + 1; j < nodes.length; j += 1) {
                    const a = nodes[i];
                    const b = nodes[j];
                    let dx = b.x - a.x;
                    let dy = b.y - a.y;
                    let distanceSquared = dx * dx + dy * dy;
                    if (distanceSquared < 16) {
                        dx += ((i + 1) * 17 % 7) - 3;
                        dy += ((j + 1) * 19 % 7) - 3;
                        distanceSquared = dx * dx + dy * dy + 1;
                    }
                    const distance = Math.sqrt(distanceSquared);
                    const force = 1300 * cooling / distanceSquared;
                    const fx = dx / distance * force;
                    const fy = dy / distance * force;
                    a.vx -= fx;
                    a.vy -= fy;
                    b.vx += fx;
                    b.vy += fy;
                }
            }

            for (const edge of edges) {
                const a = edge.sourceNode;
                const b = edge.targetNode;
                const dx = b.x - a.x;
                const dy = b.y - a.y;
                const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy));
                const target = 118 - edge.similarity * 72;
                const force = (distance - target) * (0.011 + edge.similarity * 0.018) * cooling;
                const fx = dx / distance * force;
                const fy = dy / distance * force;
                a.vx += fx;
                a.vy += fy;
                b.vx -= fx;
                b.vy -= fy;
            }

            for (const node of nodes) {
                node.vx += (WIDTH / 2 - node.x) * 0.0009 * cooling;
                node.vy += (HEIGHT / 2 - node.y) * 0.0009 * cooling;
                node.vx *= 0.76;
                node.vy *= 0.76;
                node.x += node.vx;
                node.y += node.vy;
                node.x = Math.max(28, Math.min(WIDTH - 28, node.x));
                node.y = Math.max(28, Math.min(HEIGHT - 28, node.y));
            }
        }
    }

    let cachedGraph = null;

    function svgElement(tag, attrs) {
        const element = document.createElementNS(SVG_NS, tag);
        for (const [key, value] of Object.entries(attrs || {})) element.setAttribute(key, value);
        return element;
    }

    function render(options) {
        const container = options && options.container;
        const selectionElement = options && options.selectionElement;
        if (!container) return;

        const graph = cachedGraph || (cachedGraph = buildGraph());
        const championId = options.championId && graph.byId[options.championId] ? options.championId : null;
        let selectedId = championId;

        container.textContent = '';
        const svg = svgElement('svg', {
            viewBox: '0 0 ' + WIDTH + ' ' + HEIGHT,
            role: 'img',
            'aria-label': 'Jurisprudential network of LAWvalues champion units'
        });
        svg.classList.add('champion-network-svg');

        const edgeLayer = svgElement('g', { 'aria-hidden': 'true' });
        const nodeLayer = svgElement('g', {});
        const hitLayer = svgElement('g', {});
        svg.append(edgeLayer, nodeLayer, hitLayer);

        const edgeElements = [];
        for (const edge of graph.edges) {
            const line = svgElement('line', {
                x1: edge.sourceNode.x.toFixed(2),
                y1: edge.sourceNode.y.toFixed(2),
                x2: edge.targetNode.x.toFixed(2),
                y2: edge.targetNode.y.toFixed(2),
                class: 'champion-network-edge' + (edge.mutual ? ' mutual' : '')
            });
            edgeLayer.appendChild(line);
            edgeElements.push({ edge, line });
        }

        const densities = graph.nodes.map((node) => node.density);
        const minDensity = Math.min(...densities);
        const maxDensity = Math.max(...densities);
        const radiusFor = (node) => {
            const ratio = maxDensity === minDensity ? 0.5 : (node.density - minDensity) / (maxDensity - minDensity);
            return 5.5 + ratio * 5.5;
        };

        const nodeElements = new Map();
        for (const node of graph.nodes) {
            const circle = svgElement('circle', {
                cx: node.x.toFixed(2),
                cy: node.y.toFixed(2),
                r: radiusFor(node).toFixed(2),
                fill: CAMP_COLORS[node.camp],
                class: 'champion-network-node',
                'data-node-id': node.id
            });
            const title = svgElement('title', {});
            title.textContent = node.name;
            circle.appendChild(title);
            nodeLayer.appendChild(circle);
            nodeElements.set(node.id, circle);

            const hit = svgElement('circle', {
                cx: node.x.toFixed(2),
                cy: node.y.toFixed(2),
                r: '22',
                class: 'champion-network-hit',
                'data-node-id': node.id,
                tabindex: '0',
                role: 'button',
                'aria-label': node.name
            });
            hitLayer.appendChild(hit);
        }

        container.appendChild(svg);

        function updateSelection() {
            const selected = selectedId ? graph.byId[selectedId] : null;
            for (const node of graph.nodes) {
                const circle = nodeElements.get(node.id);
                circle.classList.toggle('selected', node.id === selectedId);
                circle.classList.toggle('user-champion', node.id === championId);
            }
            for (const { edge, line } of edgeElements) {
                const touchesSelection = selectedId && (edge.source === selectedId || edge.target === selectedId);
                line.classList.toggle('selected', Boolean(touchesSelection));
            }

            if (selectionElement) {
                if (selected) {
                    selectionElement.textContent = selected.name + ' — ' + selected.camp;
                    selectionElement.classList.add('has-selection');
                } else {
                    selectionElement.textContent = 'Tap a circle to identify a champion unit.';
                    selectionElement.classList.remove('has-selection');
                }
            }
        }

        function selectNode(id) {
            if (!graph.byId[id]) return;
            selectedId = id;
            updateSelection();
        }

        hitLayer.addEventListener('click', (event) => {
            const target = event.target.closest('[data-node-id]');
            if (!target) return;
            event.stopPropagation();
            selectNode(target.getAttribute('data-node-id'));
        });

        hitLayer.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            const target = event.target.closest('[data-node-id]');
            if (!target) return;
            event.preventDefault();
            selectNode(target.getAttribute('data-node-id'));
        });

        svg.addEventListener('click', (event) => {
            if (event.target.closest('[data-node-id]')) return;

            const rect = svg.getBoundingClientRect();
            const scaleX = WIDTH / Math.max(1, rect.width);
            const scaleY = HEIGHT / Math.max(1, rect.height);
            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;
            const threshold = Math.max(22, 22 * Math.max(scaleX, scaleY));

            let nearest = null;
            let nearestDistance = Infinity;
            for (const node of graph.nodes) {
                const distance = Math.hypot(node.x - x, node.y - y);
                if (distance < nearestDistance) {
                    nearest = node;
                    nearestDistance = distance;
                }
            }

            if (nearest && nearestDistance <= threshold) selectNode(nearest.id);
            else {
                selectedId = null;
                updateSelection();
            }
        });

        updateSelection();
    }

    globalThis.LAW_CHAMPION_NETWORK = Object.freeze({
        render,
        colors: CAMP_COLORS,
        camps: CAMP_ORDER
    });
})();
