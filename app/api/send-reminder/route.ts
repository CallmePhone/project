// /app/api/send-reminder/route.ts (หรือใช้ใน Edge Function ได้เช่นกัน)
import { currentUser } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  const user = await currentUser()
  if (!user || !user.emailAddresses?.[0]?.emailAddress) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  const userEmail = user.emailAddresses[0].emailAddress
  const userId = user.id // ใช้ mapping กับ vehicles.user_id หรือ auth_user_id ที่คุณกำหนดไว้

  // ดึงข้อมูลอะไหล่ของรถที่ผู้ใช้นี้เป็นเจ้าของ
  const { data, error } = await supabase
    .from('parts')
    .select(`
      id,
      part_name,
      replaced_at,
      vehicles (
        id,
        user_id
      )
    `)
    .eq('vehicles.user_id', userId)

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }

  const today = new Date()
  const dueParts = data.filter(part => {
    const replacedAt = new Date(part.replaced_at)
    const diffDays = Math.floor((today.getTime() - replacedAt.getTime()) / (1000 * 60 * 60 * 24))
    return diffDays >= 180 // ถึง 6 เดือน (ประมาณ)
  })

  if (dueParts.length === 0) {
    return new Response(JSON.stringify({ message: 'No due parts' }))
  }

  // สร้างข้อความแจ้งเตือน
  const messageBody = dueParts.map(part =>
    `• ${part.part_name} (เปลี่ยนล่าสุด: ${new Date(part.replaced_at).toLocaleDateString()})`
  ).join('\n')

  const msg = {
    to: userEmail,
    from: 'noreply@yourdomain.com',
    subject: '🔧 แจ้งเตือนเปลี่ยนอะไหล่รถของคุณ',
    text: `รายการอะไหล่ที่ถึงกำหนดเปลี่ยน:\n${messageBody}`,
    html: `<p>รายการอะไหล่ที่ถึงกำหนดเปลี่ยน:</p><ul>${dueParts.map(part =>
      `<li><strong>${part.part_name}</strong> (เปลี่ยนล่าสุด: ${new Date(part.replaced_at).toLocaleDateString()})</li>`
    ).join('')}</ul>`
  }

  await sgMail.send(msg)

  return new Response(JSON.stringify({ success: true, sent: dueParts.length }))
}
