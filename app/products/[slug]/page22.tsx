// 👈 就加在文件第一行
export const dynamic = 'force-dynamic'

export default async function ProductPage({ params }: { params: { slug: string } }) {
  return (
    <div className="p-12 text-center">
      <h1>测试页面成功！Slug = {params.slug}</h1>
      <p>如果看到这句话，404 已经解决！</p>
    </div>
  )
}