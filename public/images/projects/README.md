# Project images

**Home and case study assets use separate folders so they never get mixed.**

```
public/images/projects/
  home/   → homepage exhibition only (`placeholders`, coverImage, EduNet SCREENS)
  case/   → case study pages only (`images`, `escapeDuo`)
```

## Homepage (`placeholders`)

Edit URLs under `/images/projects/home/…` in each project’s MDX:

```yaml
coverImage: /images/projects/home/{slug}-….ext
placeholders:
  scroll: /images/projects/home/…
  primary: /images/projects/home/…
  # etc.
```

EduNet screens are also hardcoded in `EdunetMobileShowcase` under `/images/projects/home/`.

## Case study (`images` + `escapeDuo`)

Edit URLs under `/images/projects/case/…`:

```yaml
escapeDuo:
  left: /images/projects/case/{slug}-escape-left.ext
  right: /images/projects/case/{slug}-escape-right.ext
images:
  - src: /images/projects/case/{slug}-1.ext
    alt: …
```

Replace a file in `home/` or `case/` independently - the other surface stays unchanged.
