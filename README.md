# Encor Frontend

Stack:
- Next.js 16
- TypeScript
- styled-components

## Scripts
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

## Analytics
Yandex Metrica is enabled when `NEXT_PUBLIC_YANDEX_METRIKA_ID` is set to the counter ID.

## Deployment
- GitHub Actions workflow: `.github/workflows/deploy.yml`
- PM2 process file: `ecosystem.config.cjs`
- Default runtime port: `3000`
