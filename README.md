# ShelfScout

**Compare grocery prices across local stores.**

ShelfScout is a community-powered grocery price comparison platform built for underserved and rural markets, starting with Guam. It helps residents and service members find the best prices across local stores, track deals, and make smarter purchasing decisions without having to visit every store in person.

---

## The Problem

In places like Guam, imported goods and limited competition drive prices significantly higher than mainland averages. Large urban areas have apps for coupons, price comparisons, and delivery, but rural and island communities still rely on manually checking stores in person. ShelfScout changes that.

---

## Features

- **Search by item** - search "eggs", "rice", "chicken breast" and see prices across stores
- **Unit price comparison** - compare by $/lb, $/oz, $/each so bag sizes don't mislead you
- **Grocery list optimizer** - build a list and see the cheapest single store vs. a split trip
- **Crowdsourced prices** - users can submit and confirm prices with photos
- **Community trust scores** - see how fresh and verified each price is
- **Filter by village / distance** - find stores near you

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js, TypeScript, Tailwind CSS |
| Backend | Next.js API Routes |
| Database | PostgreSQL + Prisma ORM |
| Auth + Storage | Supabase |
| Maps | Mapbox or Google Maps |
| Search | Postgres full-text search (later: Meilisearch) |
| Hosting | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) account (free tier works)

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/shelfscout.git
cd shelfscout
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
DATABASE_URL=your_supabase_postgres_url
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Setup

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
shelfscout/
├── app/
│   ├── page.tsx              # Home / search
│   ├── item/[id]/page.tsx    # Price comparison for one item
│   ├── list/page.tsx         # Grocery list + optimizer
│   ├── stores/page.tsx       # Store map and list
│   ├── submit-price/page.tsx # Crowdsource a price
│   └── admin/page.tsx        # Approve submitted prices
├── prisma/
│   └── schema.prisma
├── lib/
└── components/
```

---

## Roadmap

- [x] Project setup
- [x] Prisma schema + database seed
- [x] Item search page
- [ ] Price comparison page
- [x] Unit price normalization
- [ ] Grocery list builder
- [ ] List optimizer (cheapest store vs. split trip)
- [ ] Price submission form
- [ ] Admin approval dashboard
- [ ] Community trust scores
- [ ] PWA support

---

## Contributing

Prices go stale fast. If you live on Guam (or anywhere ShelfScout is used), the most valuable thing you can do is submit and verify prices. Use the `/submit-price` page in the app.

For code contributions, open an issue or pull request.

---

## License

MIT
