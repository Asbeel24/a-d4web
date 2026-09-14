# Studio / playground iteration — 2026-09-14

The site remains a personal portfolio and interactive playground. Studio is an additional destination, not a replacement for Creative, Sound or Visual.

## Restore point

- Original main: `02e8106e27226267b8fe92225ccd0a740f393032`
- Annotated tag (also pushed to origin): `snapshot/2026-09-14-before-studio`
- Development branch: `codex/studio-playground`
- Main has not been merged or changed by this iteration.

Inspect the original in a separate directory without resetting the current branch:

```sh
git worktree add --detach ../a-d4web-2026-09-14 snapshot/2026-09-14-before-studio
```

The tag preserves the tracked repository, not local environment variables or hosting settings. Existing untracked `.playwright-cli/` files were left untouched. Any future production rollback must deploy the saved revision separately.

## Implemented

- Existing home canvas retained; added personal/Studio relationship and exploration links.
- Selected film stills and Play / Listen destinations below the hero.
- Studio page with filmmaking, education, workflow consulting and contact details from the supplied Studio PDF.
- Click-to-load ATTACHMENT player; native controls, inline playback and direct-file fallback.
- Visual section anchors, readable fixed navigation and mobile two-row navigation.
- Updated About copy and route-specific metadata; keyboard skip link.

## Media provenance

`public/media/videos/recent/attachment.mp4` is a web derivative of `Attachment/AttachmentFinal.MOV` in the supplied materials folder. Original untouched. Duration ~50 seconds; H.264/AAC, 1280px wide, fast-start MP4, approximately 8 MB. The name identifies this as the final version; public-release suitability should be checked before production deployment.

Other homepage images reuse existing repository images. No previews or individual shots were presented as full films. Shanghai Night and TAPTAP cards explicitly lead to image collections.

## Useful follow-up material

- Exact final film filenames for Shanghai Night (`shnpre.MOV` appears to be a preview), TAPTAP, PLUIEEE and FOLDIN.
- Which projects are preferred homepage selections.
- For richer case pages: year, commissioned/independent status, exact credits, and final delivery scope.
- Official Studio wordmark / preferred key image if a separate identity is desired.

## Validation

- ESLint and production build, including TypeScript.
- Desktop home / selected works / Studio visual checks.
- 390px mobile home and Studio; Studio has no horizontal overflow.
- Studio contact anchor and successful WeChat copy feedback.
- Home-to-ATTACHMENT anchor; explicit play button starts video, readyState 4, playback time advances, duration ~50 seconds.
- Complete transcoded video decodes without errors using FFmpeg.
- Original Creative, EDA and Sound implementations retained; these were not exhaustively retested in this iteration.
