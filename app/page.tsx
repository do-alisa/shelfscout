'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PriceResult {
  storeId: string;
  storeName: string;
  village: string;
  price: number;
  unitPrice: number;
  unit: string;
  observedAt: string;
}

interface SearchResult {
  productId: string;
  productName: string;
  brand: string;
  size: number;
  unit: string;
  prices: PriceResult[];
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const search = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentQuery = query.trim();
    if (!currentQuery) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(currentQuery)}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getCheapestPrice = (prices: PriceResult[]) =>
    Math.min(...prices.map((p) => p.price));

  return (
    <main className="min-h-screen bg-[#FFFBF5]">
      {/* Header */}
      <header className="border-b border-stone-200 bg-[#FFFBF5] sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <span className="text-xl font-bold tracking-tight text-stone-900">🛒 ShelfScout</span>
            <span className="ml-2 text-xs text-stone-400 font-medium uppercase tracking-widest">Guam</span>
          </div>
          <nav className="flex gap-4 text-sm text-stone-500">
            <Link href="/stores" className="hover:text-stone-900 transition-colors">Stores</Link>
            <Link href="/list" className="hover:text-stone-900 transition-colors">My List</Link>
            <Link href="/submit-price" className="hover:text-stone-900 transition-colors">Submit Price</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4">
        {/* Hero */}
        {!searched && (
          <div className="py-16 text-center">
            <h1 className="text-4xl font-bold text-stone-900 mb-3 tracking-tight">
              Find the best price<br />across Guam stores.
            </h1>
            <p className="text-stone-500 mb-10 text-lg">
              Compare grocery prices across local stores, all in one place!
            </p>
          </div>
        )}

        {/* Search bar */}
        <form
          onSubmit={search}
          className={`flex gap-2 ${searched ? 'pt-6 pb-4' : 'pb-4'}`}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search for any grocery item...'
            className="flex-1 border border-stone-300 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-base shadow-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-amber-400 hover:bg-amber-500 text-stone-900 font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? '...' : 'Search'}
          </button>
        </form>

        {/* Quick searches */}
        {!searched && (
          <div className="flex flex-wrap gap-2 justify-center pb-16">
            {['eggs', 'spam', 'rice', 'milk', 'chicken', 'tuna', 'bread'].map((item) => (
              <button
                key={item}
                onClick={() => { setQuery(item); }}
                className="text-sm bg-white border border-stone-200 text-stone-600 px-3 py-1.5 rounded-full hover:border-amber-400 hover:text-stone-900 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        {loading && (
          <div className="text-center py-12 text-stone-400">Searching stores...</div>
        )}

        {!loading && searched && results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-stone-500 mb-2">No results for "{query}"</p>
            <p className="text-stone-400 text-sm">Try a different search term or <Link href="/submit-price" className="text-amber-600 underline">submit a price</Link>.</p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-4 pb-12">
            <p className="text-sm text-stone-400">{results.length} item{results.length !== 1 ? 's' : ''} found</p>
            {results.map((result) => {
              const cheapest = getCheapestPrice(result.prices);
              const sortedPrices = [...result.prices].sort((a, b) => a.price - b.price);
              return (
                <div key={result.productId} className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h2 className="font-semibold text-stone-900">{result.productName}</h2>
                      <p className="text-sm text-stone-400">{result.brand} · {result.size} {result.unit}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-stone-400">from</span>
                      <p className="text-lg font-bold text-amber-600">${cheapest.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Price comparison per store */}
                  <div className="space-y-2">
                    {sortedPrices.map((p, i) => (
                      <div
                        key={p.storeId}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl ${i === 0 ? 'bg-amber-50 border border-amber-200' : 'bg-stone-50'}`}
                      >
                        <div className="flex items-center gap-2">
                          {i === 0 && <span className="text-xs bg-amber-400 text-stone-900 font-semibold px-1.5 py-0.5 rounded-md">BEST</span>}
                          <div>
                            <p className="text-sm font-medium text-stone-800">{p.storeName}</p>
                            <p className="text-xs text-stone-400">{p.village}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-stone-900">${p.price.toFixed(2)}</p>
                          <p className="text-xs text-stone-400">${p.unitPrice.toFixed(2)}/{p.unit}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
