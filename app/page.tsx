import Image from 'next/image';
import Link from 'next/link';

// 每60秒自动增量更新，Sanity后台改完自动同步
export const revalidate = 60;

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* 1. 全屏首屏 Banner */}
      <section className="relative w-full h-[85vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <Image
          src="/banner-main.jpg" 
          alt="Li Bien Handcrafted Glass Ornaments"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-20 left-16 z-20 max-w-2xl">
          <p className="text-white text-lg tracking-widest mb-4">
            LI BIEN ORNAMENTS
          </p>
          <h1 className="text-white text-5xl md:text-6xl font-light mb-6">
            Exquisite Handcrafted<br />Glass Art
          </h1>
          <p className="text-gray-100 text-xl font-light mb-8">
            Inheriting classic craftsmanship · Art collection ornament
          </p>
          <Link href="#" className="btn-white">
            View Collection
          </Link>
        </div>
      </section>

      {/* 2. 品牌简介区块 */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-light mb-6">
              The Art of Li Bien Craft
            </h2>
            <p className="text-lg mb-6">
              For years, we focus on the design and production of high-end hand-blown glass ornaments. 
              Every piece is handmade with exquisite craftsmanship, combining traditional aesthetics 
              with modern minimalist design.
            </p>
            <p className="text-lg">
              Suitable for home decoration, business gifts, art collection and custom corporate gifts.
            </p>
          </div>
          <div className="relative h-80 w-full">
            <Image
              src="/about-art.jpg"
              alt="Handcrafted Glass Art Process"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. 精选产品区块 */}
      <section className="bg-gray-50 dark:bg-gray-900 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light mb-4">Selected Collections</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Each ornament is a unique work of art
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 产品卡片1 */}
            <div className="product-card">
              <div className="relative h-60 overflow-hidden">
                <Image
                  src="/product-1.jpg"
                  alt="Classic Glass Ornament Series"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-light mb-2">Classic Series</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Hand-blown glass decoration</p>
              </div>
            </div>

            {/* 产品卡片2 */}
            <div className="product-card">
              <div className="relative h-60 overflow-hidden">
                <Image
                  src="/product-2.jpg"
                  alt="Luxury Gift Glass Series"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-light mb-2">Luxury Gift Series</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Corporate custom gift</p>
              </div>
            </div>

            {/* 产品卡片3 */}
            <div className="product-card">
              <div className="relative h-60 overflow-hidden">
                <Image
                  src="/product-3.jpg"
                  alt="Limited Art Edition Glass"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-light mb-2">Limited Art Edition</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Art collection level</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="#" className="btn-primary">
              All Products
            </Link>
          </div>
        </div>
      </section>

      {/* 4. 定制服务区块 */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-light mb-6">Custom Corporate Gifts</h2>
          <p className="text-lg mb-8">
            We provide exclusive customized services for enterprises, brands and institutions. 
            Support exclusive pattern, logo, packaging customization, perfect for business gifts and annual gifts.
          </p>
          <Link href="#" className="btn-primary">
            Contact For Custom
          </Link>
        </div>
      </section>
    </main>
  );
}