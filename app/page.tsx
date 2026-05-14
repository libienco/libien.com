import Image from 'next/image';
import Link from 'next/link';
import { createClient } from "@sanity/client";

// 60秒自动增量更新，后台改完产品1分钟内自动同步
export const revalidate = 60;

// ======================
// 只需要改这里！替换成你的 Sanity 项目ID
// ======================
const client = createClient({
  projectId: "xmpsw0cv", // 比如 abc123xyz
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

// 产品查询语句
const getProductsQuery = `*[_type == "product"] | order(_createdAt desc) {
  _id,
  title,
  description,
  price,
  "imageUrl": image.asset->url,
  category
}`;

// 产品类型定义
interface Product {
  _id: string;
  title: string;
  description: any;
  price: number;
  imageUrl: string;
  category: string;
}

// ✅ 新增：Sanity富文本转纯文本函数（不需要任何额外包）
function portableTextToPlainText(blocks: any[]): string {
  if (!blocks) return "";
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) return "";
      return block.children.map((child: any) => child.text).join("");
    })
    .join("\n");
}

export default async function HomePage() {
  // 从 Sanity 获取所有产品
  const products: Product[] = await client.fetch(getProductsQuery);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* 1. 全屏首屏 Banner 对标梵高博物馆 */}
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
          <Link href="/products" className="btn-white">
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

      {/* 3. 精选产品区块 - 自动从 Sanity 读取！ */}
      <section className="bg-gray-50 dark:bg-gray-900 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light mb-4">Selected Collections</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Each ornament is a unique work of art
            </p>
          </div>

          {/* 动态渲染产品 - 后台加几个，这里就显示几个 */}
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-light mb-2">{product.title}</h3>
                  {/* ✅ 这里用了转换函数，错误消失 */}
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                    {portableTextToPlainText(product.description)}
                  </p>
                  <p className="text-lg font-medium">${product.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 如果后台还没有产品，显示提示 */}
          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No products yet. Add some in your Sanity Studio!</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/products" className="btn-primary">
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
          <Link href="/contact" className="btn-primary">
            Contact For Custom
          </Link>
        </div>
      </section>
    </main>
  );
}