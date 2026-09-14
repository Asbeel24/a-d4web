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
- Image-only portfolio; all local video playback and hosted video assets removed at user request. Audio playback remains.
- Visual section anchors, readable fixed navigation and mobile two-row navigation.
- Updated About copy and route-specific metadata; keyboard skip link.

## Media provenance

FOLDIN stills are extracted at 1 second from the supplied Foldin clips 13, 14 and 2, using 1280px WebP derivatives. Original clips are untouched. FOLDIN and PLUIE are classified as narrative shorts, matching the Studio introduction. Existing FOLDIN and 晓力的一天 storyboard pages appear in expandable full-width sections instead of cropped thumbnails.

SURF ON PAIN and AGENT1 use optimized copies of images 1–3 in their respective supplied PIC folders. No new role credits were inferred. COUPURE is not added because the inspected folder imagery does not match the introduction.

Removed tracked MP4/MOV assets remain recoverable from earlier Git commits; no history rewrite was performed. Source materials remain untouched.

## Useful follow-up material

- Confirmed COUPURE stills matching the Studio introduction; final movie files are no longer needed for this image-only version.
- Which projects are preferred homepage selections.
- For richer case pages: year, commissioned/independent status, exact credits, and final delivery scope.
- Official Studio wordmark / preferred key image if a separate identity is desired.

## Validation

- ESLint / production build and TypeScript.
- Verify that app/components contain no video elements, video asset references or FilmPlayer.
- Check desktop/mobile FOLDIN images and expandable, uncropped storyboard pages.
- Original audio playback and creative experiments retained.
