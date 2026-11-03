"""Validate the static portfolio without network access or third-party packages."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
VOID_TAGS = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path = path
        self.ids = set()
        self.references = []
        self.stack = []
        self.headings = 0
        self.main_count = 0
        self.links = []

    def handle_startendtag(self, tag, attributes):
        self.handle_starttag(tag, attributes)
        if tag not in VOID_TAGS:
            self.handle_endtag(tag)

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        assert not any(name.startswith('on') for name in attrs), f'{self.path}: inline handler'
        if 'id' in attrs:
            assert attrs['id'] not in self.ids, f'{self.path}: duplicate id {attrs["id"]}'
            self.ids.add(attrs['id'])
        for name in ['aria-labelledby', 'aria-describedby', 'aria-controls']:
            self.references.extend(attrs.get(name, '').split())
        if tag == 'label' and 'for' in attrs:
            self.references.append(attrs['for'])
        if tag == 'img':
            assert 'alt' in attrs, f'{self.path}: image without alt'
        if tag == 'h1':
            self.headings += 1
        if tag == 'main':
            self.main_count += 1
        for name in ['href', 'src', 'data-fallback']:
            if name in attrs:
                self.links.append(attrs[name])
        if tag not in VOID_TAGS:
            self.stack.append(tag)

    def handle_endtag(self, tag):
        assert self.stack and self.stack[-1] == tag, f'{self.path}: misnested closing {tag}'
        self.stack.pop()


def main():
    pages = {}
    for path in [ROOT / 'index.html', *sorted((ROOT / 'case-studies').glob('*.html'))]:
        page = Page(path.relative_to(ROOT))
        page.feed(path.read_text())
        assert not page.stack, f'{path}: unclosed elements'
        assert page.headings == 1 and page.main_count == 1, f'{path}: one h1 and main required'
        assert all(ref in page.ids for ref in page.references), f'{path}: unresolved accessible label'
        pages[path] = page
    for path, page in pages.items():
        for value in page.links:
            url = urlsplit(value)
            if url.scheme or url.netloc:
                continue
            target = (path.parent / unquote(url.path)).resolve() if url.path else path
            assert target.is_relative_to(ROOT) and target.is_file(), f'{page.path}: missing local target {value}'
            if url.fragment and target.suffix == '.html':
                assert target in pages and url.fragment in pages[target].ids, f'{page.path}: missing anchor {value}'
    for stylesheet in (ROOT / 'css').glob('*.css'):
        text = stylesheet.read_text()
        assert text.count('{') == text.count('}'), f'{stylesheet}: unmatched braces'
    print(f'PASS: {len(pages)} pages; HTML nesting, unique IDs, labels, image alternatives, local assets and anchors.')


if __name__ == '__main__':
    main()
