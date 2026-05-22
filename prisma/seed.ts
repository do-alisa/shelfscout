import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("🌱 Seeding ShelfScout database...");
    // ─── STORES ───────────────────────────────────────────────────────────────
    await prisma.store.upsert({
        where: { id: "store-payless-oka" },
        update: {},
        create: {
            id: "store-payless-oka",
            name: "Pay-Less Supermarkets",
            chain: "Pay-Less",
            village: "Oka",
            address: "445 Gov Carlos G Camacho Rd, Oka, Guam 96913",
            lat: 13.4981801,
            lng: 144.7433445,
        },
    });

    await prisma.store.upsert({
        where: { id: "store-costless-liguan" },
        update: {},
        create: {
            id: "store-costless-liguan",
            name: "Cost.U.Less",
            chain: "Cost.U.Less",
            village: "Liguan",
            address: "615 27, Liguan, Guam 96929",
            lat: 13.5107313,
            lng: 144.8193684,
        },
    });

    await prisma.store.upsert({
        where: { id: "store-kmart-harmon" },
        update: {},
        create: {
            id: "store-kmart-harmon",
            name: "Kmart",
            chain: "Kmart",
            village: "Harmon",
            address: "404 North Marine Drive, Harmon Industrial Park, Guam 96913",
            lat: 13.5001581,
            lng: 144.7975195,
        },
    });

    console.log("✅ Stores seeded");

    // ─── PRODUCTS ─────────────────────────────────────────────────────────────

    const products = await Promise.all([
        prisma.product.upsert({ where: { id: "prod-eggs-12" }, update: {}, create: { id: "prod-eggs-12", name: "Large Eggs", brand: "Generic", category: "Dairy & Eggs", size: 12, unit: "each" } }),
        prisma.product.upsert({ where: { id: "prod-rice-20lb" }, update: {}, create: { id: "prod-rice-20lb", name: "Calrose White Rice", brand: "Hinode", category: "Grains", size: 20, unit: "lb" } }),
        prisma.product.upsert({ where: { id: "prod-rice-5lb" }, update: {}, create: { id: "prod-rice-5lb", name: "Calrose White Rice", brand: "Hinode", category: "Grains", size: 5, unit: "lb" } }),
        prisma.product.upsert({ where: { id: "prod-spam-classic" }, update: {}, create: { id: "prod-spam-classic", name: "Spam Classic", brand: "Spam", category: "Canned Meat", size: 12, unit: "oz" } }),
        prisma.product.upsert({ where: { id: "prod-spam-lite" }, update: {}, create: { id: "prod-spam-lite", name: "Spam Lite", brand: "Spam", category: "Canned Meat", size: 12, unit: "oz" } }),
        prisma.product.upsert({ where: { id: "prod-milk-whole-gallon" }, update: {}, create: { id: "prod-milk-whole-gallon", name: "Whole Milk", brand: "Meadow Gold", category: "Dairy & Eggs", size: 1, unit: "gallon" } }),
        prisma.product.upsert({ where: { id: "prod-bread-white" }, update: {}, create: { id: "prod-bread-white", name: "White Sandwich Bread", brand: "Holsum", category: "Bread & Bakery", size: 20, unit: "oz" } }),
        prisma.product.upsert({ where: { id: "prod-chicken-breast" }, update: {}, create: { id: "prod-chicken-breast", name: "Chicken Breast", brand: "Generic", category: "Meat & Seafood", size: 1, unit: "lb" } }),
        prisma.product.upsert({ where: { id: "prod-chicken-legs" }, update: {}, create: { id: "prod-chicken-legs", name: "Chicken Leg Quarters", brand: "Generic", category: "Meat & Seafood", size: 1, unit: "lb" } }),
        prisma.product.upsert({ where: { id: "prod-tuna-albacore" }, update: {}, create: { id: "prod-tuna-albacore", name: "Albacore Tuna", brand: "Starkist", category: "Canned Goods", size: 5, unit: "oz" } }),
        prisma.product.upsert({ where: { id: "prod-corned-beef" }, update: {}, create: { id: "prod-corned-beef", name: "Corned Beef", brand: "Libby's", category: "Canned Meat", size: 12, unit: "oz" } }),
        prisma.product.upsert({ where: { id: "prod-ramen-maruchan" }, update: {}, create: { id: "prod-ramen-maruchan", name: "Instant Ramen Chicken", brand: "Maruchan", category: "Instant Food", size: 3, unit: "oz" } }),
        prisma.product.upsert({ where: { id: "prod-water-1gal" }, update: {}, create: { id: "prod-water-1gal", name: "Purified Water", brand: "Generic", category: "Beverages", size: 1, unit: "gallon" } }),
        prisma.product.upsert({ where: { id: "prod-oil-veg-48oz" }, update: {}, create: { id: "prod-oil-veg-48oz", name: "Vegetable Oil", brand: "Generic", category: "Cooking", size: 48, unit: "oz" } }),
        prisma.product.upsert({ where: { id: "prod-sugar-5lb" }, update: {}, create: { id: "prod-sugar-5lb", name: "Granulated White Sugar", brand: "Generic", category: "Baking", size: 5, unit: "lb" } }),
    ]);

    console.log(`✅ ${products.length} products seeded`);

    // ─── PRICES ───────────────────────────────────────────────────────────────

    const priceData = [
        { productId: "prod-eggs-12", storeId: "store-payless-oka", price: 4.29, unitPrice: 4.29 / 12 },
        { productId: "prod-eggs-12", storeId: "store-costless-liguan", price: 3.99, unitPrice: 3.99 / 12 },
        { productId: "prod-eggs-12", storeId: "store-kmart-harmon", price: 4.49, unitPrice: 4.49 / 12 },
        { productId: "prod-rice-20lb", storeId: "store-payless-oka", price: 24.99, unitPrice: 24.99 / 20 },
        { productId: "prod-rice-20lb", storeId: "store-costless-liguan", price: 21.99, unitPrice: 21.99 / 20 },
        { productId: "prod-rice-20lb", storeId: "store-kmart-harmon", price: 23.49, unitPrice: 23.49 / 20 },
        { productId: "prod-rice-5lb", storeId: "store-payless-oka", price: 7.99, unitPrice: 7.99 / 5 },
        { productId: "prod-rice-5lb", storeId: "store-costless-liguan", price: 6.99, unitPrice: 6.99 / 5 },
        { productId: "prod-rice-5lb", storeId: "store-kmart-harmon", price: 7.49, unitPrice: 7.49 / 5 },
        { productId: "prod-spam-classic", storeId: "store-payless-oka", price: 4.79, unitPrice: 4.79 / 12 },
        { productId: "prod-spam-classic", storeId: "store-costless-liguan", price: 3.99, unitPrice: 3.99 / 12 },
        { productId: "prod-spam-classic", storeId: "store-kmart-harmon", price: 4.49, unitPrice: 4.49 / 12 },
        { productId: "prod-spam-lite", storeId: "store-payless-oka", price: 4.99, unitPrice: 4.99 / 12 },
        { productId: "prod-spam-lite", storeId: "store-costless-liguan", price: 4.29, unitPrice: 4.29 / 12 },
        { productId: "prod-spam-lite", storeId: "store-kmart-harmon", price: 4.69, unitPrice: 4.69 / 12 },
        { productId: "prod-milk-whole-gallon", storeId: "store-payless-oka", price: 8.99, unitPrice: 8.99 },
        { productId: "prod-milk-whole-gallon", storeId: "store-costless-liguan", price: 7.49, unitPrice: 7.49 },
        { productId: "prod-milk-whole-gallon", storeId: "store-kmart-harmon", price: 8.49, unitPrice: 8.49 },
        { productId: "prod-bread-white", storeId: "store-payless-oka", price: 3.49, unitPrice: 3.49 / 20 },
        { productId: "prod-bread-white", storeId: "store-costless-liguan", price: 2.99, unitPrice: 2.99 / 20 },
        { productId: "prod-bread-white", storeId: "store-kmart-harmon", price: 3.29, unitPrice: 3.29 / 20 },
        { productId: "prod-chicken-breast", storeId: "store-payless-oka", price: 5.99, unitPrice: 5.99 },
        { productId: "prod-chicken-breast", storeId: "store-costless-liguan", price: 4.99, unitPrice: 4.99 },
        { productId: "prod-chicken-breast", storeId: "store-kmart-harmon", price: 5.49, unitPrice: 5.49 },
        { productId: "prod-chicken-legs", storeId: "store-payless-oka", price: 2.99, unitPrice: 2.99 },
        { productId: "prod-chicken-legs", storeId: "store-costless-liguan", price: 2.49, unitPrice: 2.49 },
        { productId: "prod-chicken-legs", storeId: "store-kmart-harmon", price: 2.79, unitPrice: 2.79 },
        { productId: "prod-tuna-albacore", storeId: "store-payless-oka", price: 2.49, unitPrice: 2.49 / 5 },
        { productId: "prod-tuna-albacore", storeId: "store-costless-liguan", price: 1.99, unitPrice: 1.99 / 5 },
        { productId: "prod-tuna-albacore", storeId: "store-kmart-harmon", price: 2.29, unitPrice: 2.29 / 5 },
        { productId: "prod-corned-beef", storeId: "store-payless-oka", price: 4.29, unitPrice: 4.29 / 12 },
        { productId: "prod-corned-beef", storeId: "store-costless-liguan", price: 3.79, unitPrice: 3.79 / 12 },
        { productId: "prod-corned-beef", storeId: "store-kmart-harmon", price: 3.99, unitPrice: 3.99 / 12 },
        { productId: "prod-ramen-maruchan", storeId: "store-payless-oka", price: 0.49, unitPrice: 0.49 / 3 },
        { productId: "prod-ramen-maruchan", storeId: "store-costless-liguan", price: 0.39, unitPrice: 0.39 / 3 },
        { productId: "prod-ramen-maruchan", storeId: "store-kmart-harmon", price: 0.45, unitPrice: 0.45 / 3 },
        { productId: "prod-water-1gal", storeId: "store-payless-oka", price: 1.99, unitPrice: 1.99 },
        { productId: "prod-water-1gal", storeId: "store-costless-liguan", price: 1.49, unitPrice: 1.49 },
        { productId: "prod-water-1gal", storeId: "store-kmart-harmon", price: 1.79, unitPrice: 1.79 },
        { productId: "prod-oil-veg-48oz", storeId: "store-payless-oka", price: 6.99, unitPrice: 6.99 / 48 },
        { productId: "prod-oil-veg-48oz", storeId: "store-costless-liguan", price: 5.99, unitPrice: 5.99 / 48 },
        { productId: "prod-oil-veg-48oz", storeId: "store-kmart-harmon", price: 6.49, unitPrice: 6.49 / 48 },
        { productId: "prod-sugar-5lb", storeId: "store-payless-oka", price: 4.49, unitPrice: 4.49 / 5 },
        { productId: "prod-sugar-5lb", storeId: "store-costless-liguan", price: 3.99, unitPrice: 3.99 / 5 },
        { productId: "prod-sugar-5lb", storeId: "store-kmart-harmon", price: 4.19, unitPrice: 4.19 / 5 },
    ];

    for (const p of priceData) {
        await prisma.price.create({ data: { ...p, source: "MANUAL" } });
    }

    console.log(`✅ ${priceData.length} prices seeded`);
    console.log("🎉 Done!");
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });