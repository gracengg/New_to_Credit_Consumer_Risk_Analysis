# Grace Ngo — Portfolio Preview

A static HTML, CSS and JavaScript portfolio for business analytics, financial operations and applied research.

Preview: https://gracengg.github.io/portfolio-preview/

This repository is the working preview. The main portfolio has a separate repository.

## Structure

- `index.html`: introduction, experience, selected work, research and contact.
- `case-studies/`: project briefs and the three-stage NSDUH dashboard gallery.
- `css/style.css`: shared tokens, components and responsive layouts.
- `css/case-study.css`: case-study page layout only.
- `js/script.js`: optional navigation, section tracking, reveal, image fallback and email-draft enhancements.
- `images/projects/`: original coursework dashboard exports.
- `publications/`: public academic PDF attachments.
- `scripts/check_site.py`: offline checks for HTML structure, labels, local assets and anchors.

## Content and evidence

| Work | Published evidence | Status |
| --- | --- | --- |
| 1Matrix | Experience summary and control-framework description | Design and implementation recommendations; no deployed-system or savings claim |
| Dickinson / CCLA | Experience summary and prototype scope brief | Supplied CCLA source is intermediate; individual records are not published |
| NSDUH | Three original report screenshots and a methodology note | Coursework; descriptive and exploratory, not a validated clinical model |
| Campus energy | Edited brief based on the April 20, 2025 fellowship report | Proposal; no adoption or realized savings claim |
| Credit and hiring ethics | Original course essay PDF | Philosophical argument, not legal guidance or empirical hiring research |
| Beauty and wages | Research summary | Supporting paper not supplied; no misleading download link |
| Helping behavior | Original course paper PDF | Hypothetical-scenario experiment and statistical analysis |

The CCLA workbook and supplied PBIX files are not public downloads. PBIX models may embed records; institutional source files must not be copied into this public repository. Do not present the NSDUH coursework exports as independently validated population estimates.

## Checks

Run from the repository root:

```sh
python3 scripts/check_site.py
node --check js/script.js
git diff --check
```

Also review the homepage and case-study pages in a browser at phone, tablet and desktop widths. Check mobile menu keyboard behavior, native disclosures, image loading and contact validation. The contact form opens a draft in the visitor's email application; it does not send through a server.

## Deployment

GitHub Pages builds from this repository's configured branch. Publishing here updates the preview only. Relative links keep the site compatible with the `/portfolio-preview/` subpath. If moving it to another public URL, update the canonical and social metadata together.
