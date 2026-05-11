import {client, urlFor} from '@/lib/sanity'
import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import Link from 'next/link'

export const revalidate = 60

async function getProduct(slug: string) {
  return client.fetch(`
    *[_type == "product" && slug.current == $slug][0]
  `, {slug})
}

export default async function ProductPage({params}: {params: {slug: string}}) {
  const product = await getProduct(params.slug)

  if (!product) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Product not found</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          Go back to home
        </Link>
      </div>
    )
  }

  return (
    <main className="container mx-auto py-12 px-4">
      <Link href="/" className="text-blue-600 hover:underline mb-8 inline-block">
        ← Back to all products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
        {product.image && (
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <Image
              src={urlFor(product.image).width(800).height(800).url()}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-gray-700 mb-6">${product.price?.toFixed(2) || '0.00'}</p>
          
          <div className="prose max-w-none mb-8">
            {product.description && <PortableText value={product.description} />}
          </div>
          
          <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors">
            Contact Us to Buy
          </button>
        </div>
      </div>
      
      <footer className="mt-24 pt-8 border-t text-center text-gray-600">
        <p>© 2026 Libien. All rights reserved.</p>
        <p className="mt-2">Contact us: info@libien.com</p>
      </footer>
    </main>
  )
}