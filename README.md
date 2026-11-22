# Meng Yang — portfolio redesign review

Static HTML/CSS/JavaScript redesign based on the supplied `Meng-Yang-Portfolio-Preview.html`. The visual direction follows [The Agentic UX Lab](https://mengyang2015.github.io/agentic-uxlab/): warm white, terracotta, Plus Jakarta Sans, Newsreader italic, and restrained editorial layouts.

## Review status

- Branch: `codex/portfolio-redesign-review`
- Review only. Do not merge or deploy without Meng's approval.
- The six-project lineup is provisional. Meng will supply the exact six projects later. The unsupported Transcript MCP attribution was replaced with a neutral slot; this does not represent a final project-selection decision.
- Project covers are conceptual placeholders, not product screenshots. Overview dialogs describe design focus and evidence limits, not full case studies.
- Professional copy was checked against the supplied `06-Meng-Yang-Career-Background.txt` (October 13, 2026). The private background file is not copied into this repository.

## Preview locally

From this directory:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173. No install or build step is required. Google Fonts are optional network dependencies; system fallbacks are included.

## Files

- `index.html`: About me → Design philosophy → six provisional project cards → Prior presentations → Resume.
- `assets/css/portfolio.css`: preview styles, conceptual illustrations, responsive and accessibility refinements.
- `assets/js/portfolio.js`: provisional overview data, mobile menu, native project dialogs, active-section navigation.
- `assets/images/meng-yang.png`: portrait extracted unchanged from the supplied preview.
- `earlier-work.html`: byte-for-byte copy of the original `main:index.html`; original assets and PDF remain untouched. The homepage links to this archive.
- `QA.md`: verification results and remaining editorial work.

To update the final project selection, change the corresponding card markup in `index.html` and matching data in `assets/js/portfolio.js`. Keep employer work, prototypes, concepts, and measured outcomes distinct. Confirm release status and historical metrics before expanding claims.

The existing Canva resume and presentation destinations are retained; editing those external documents is outside this change.
