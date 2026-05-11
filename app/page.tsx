import {client} from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'

// 每60秒自动更新产品信息，无需重新部署
export const revalidate = 60

async function getProducts() {
  return client.fetch(`
    *[_type == "product"] | order(_createdAt desc) {
      _id,
      name,
      slug,
      price,
      image
    }
  `)
}

export default async function Home() {
  const products = await getProducts()

  return (
    <main className="container mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Libien</h1>
        <p className="text-xl text-gray-600">Premium Products for Modern Living</p>
      </div>
      
      <h2 className="text-3xl font-bold mb-8 text-center">Our Products</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product: any) => (
          <Link 
            href={`/products/${product.slug.current}`} 
            key={product._id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            {product.image && (
              <div className="aspect-square relative">
                <Image
                  src={urlFor(product.image).width(400).height(400).url()}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-700">${product.price?.toFixed(2) || '0.00'}</p>
            </div>
          </Link>
        ))}
      </div>
      
      <footer className="mt-24 pt-8 border-t text-center text-gray-600">
        <p>© 2026 Libien. All rights reserved.</p>
        <p className="mt-2">Contact us: info@libien.com</p>
      </footer>
    </main>
  )
}