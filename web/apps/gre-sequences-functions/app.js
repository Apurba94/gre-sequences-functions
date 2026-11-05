/* Sequences and Functions: arithmetic and geometric sequences, function notation and defined operations. */
(function () {
  'use strict';
  const NAMES = SK.QUANT_TOPICS.seq.concat(['compose']);
  // List the first n terms so students can see the pattern.
  const terms = (kind, a, d, n) => SK.range(n).map((i) => (kind === 'arithmetic' ? a + i * d : a * Math.pow(d, i)));
  const App = {
    about: 'Practise arithmetic and geometric sequences, sums of evenly spaced numbers, function notation such as f(f(2)), and defined operations such as a ◆ b. Generated questions, worked solutions, and a sequence explorer to see the patterns.',
    how: ['Practise in **Practice**.', 'Use **Explorer** to list terms of a sequence.', 'For a defined operation, substitute carefully: the symbol means exactly what the question says, nothing more.'],
    tabs: [
      SK.quantTab('practice', 'Practice', NAMES),
      { id: 'explore', label: 'Explorer', render(el) {
        let kind = 'arithmetic';
        const a = SK.h('input', { type: 'number', value: 3, style: { width: '8ch' }, oninput: () => draw() }), d = SK.h('input', { type: 'number', value: 4, style: { width: '8ch' }, oninput: () => draw() });
        const out = SK.h('div', {});
        const draw = () => {
          SK.clear(out);
          const A = Number(a.value), D = Number(d.value);
          const t = terms(kind, A, D, 10);
          out.appendChild(SK.h('p', {}, SK.rich('First ten terms: ' + t.map((x) => SK.round(x, 4)).join(', '))));
          out.appendChild(SK.h('p', {}, SK.rich(kind === 'arithmetic' ? 'a_{n} = ' + A + ' + (n − 1) × ' + D + '. Sum of the first 10 = 10 × (' + t[0] + ' + ' + t[9] + ') ÷ 2 = ' + SK.round(SK.sum(t), 4) + '.' : 'a_{n} = ' + A + ' × ' + D + '^{n − 1}.')));
        };
        el.appendChild(SK.card('Sequence explorer', SK.h('div', { class: 'sk-row' }, SK.select([['arithmetic', 'Arithmetic (add)'], ['geometric', 'Geometric (multiply)']], kind, (v) => { kind = v; draw(); }, 'Kind'), SK.field('First term', a), SK.field('Difference or ratio', d)), out));
        draw();
      } },
    ],
    terms,
    checks: {
      'the explorer lists the right terms': (data, assert) => { assert.deepEqual(terms('arithmetic', 3, 4, 4), [3, 7, 11, 15]); assert.deepEqual(terms('geometric', 2, 3, 4), [2, 6, 18, 54]); },
      'generated sets are valid': (data, assert) => { for (let s = 1; s < 30; s++) for (const q of SK.makeQuant(NAMES, 10, s)) assert.deepEqual(SK.validateItem(q), []); },
    },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
