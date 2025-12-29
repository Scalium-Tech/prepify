export default function AboutLoading() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header skeleton */}
            <div className="border-b border-gray-200 bg-white px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="flex gap-4">
                        <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
                        <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Hero skeleton */}
            <div className="py-20 px-6 bg-gradient-to-b from-violet-50/50 to-white">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="h-12 w-80 bg-gray-200 rounded mx-auto mb-6 animate-pulse" />
                    <div className="h-6 w-full max-w-2xl bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
                    <div className="h-6 w-3/4 bg-gray-200 rounded mx-auto animate-pulse" />
                </div>
            </div>

            {/* Content skeleton */}
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-gray-100 rounded-2xl p-8 animate-pulse">
                            <div className="h-14 w-14 bg-gray-200 rounded-xl mb-4" />
                            <div className="h-6 w-32 bg-gray-200 rounded mb-3" />
                            <div className="h-4 w-full bg-gray-200 rounded mb-2" />
                            <div className="h-4 w-3/4 bg-gray-200 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
