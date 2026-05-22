import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL! });
const prisma = new PrismaClient({ adapter });

export async function GET(req: NextRequest) {
    const q = req.nextUrl.searchParams.get('q')?.trim();
    if (!q) return NextResponse.json([]);

    const products = await prisma.product.findMany({
        where: {
            OR: [
                { name: { contains: q, mode: 'insensitive' } },
                { brand: { contains: q, mode: 'insensitive' } },
            ],
        },
        include: {
            prices: {
                include: { store: true },
                orderBy: { observedAt: 'desc' },
            },
        },
    });

    const results = products.map((product) => ({
        productId: product.id,
        productName: product.name,
        brand: product.brand,
        size: product.size,
        unit: product.unit,
        prices: product.prices.map((price) => ({
            storeId: price.storeId,
            storeName: price.store.name,
            village: price.store.village,
            price: price.price,
            unitPrice: price.unitPrice,
            unit: product.unit,
            observedAt: price.observedAt,
        })),
    }));

    return NextResponse.json(results);
}