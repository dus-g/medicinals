'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

const ALLOWED = ['new', 'paid', 'shipped', 'cancelled'];

export async function setOrderStatus(formData: FormData) {
  const id = Number(formData.get('id'));
  const status = String(formData.get('status'));
  if (!Number.isInteger(id) || !ALLOWED.includes(status)) return;
  await prisma.order.update({ where: { id }, data: { status } });
  revalidatePath('/admin');
}
