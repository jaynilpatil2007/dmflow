import { getCurrentUser } from '@/lib/auth/dal'
import { redirect } from 'next/navigation';
import React from 'react'

async function page() {
  const user = await getCurrentUser();
  if(!user) {
    redirect("/login");
  }

  return (
    <>
      <h2>Welcome {user.name}</h2>
      <p>Manage your Instagram DM automations.</p>
    </>
  )
}

export default page
