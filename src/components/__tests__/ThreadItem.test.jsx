/**
 * Skenario Pengujian Komponen ThreadItem:
 *
 * - Harus merender judul thread sebagai link menuju halaman detail
 * - Harus merender nama pemilik thread
 * - Harus merender kategori thread jika ada
 * - Harus merender jumlah komentar
 * - Harus merender body thread yang terpotong jika melebihi 150 karakter
 * - Harus merender jumlah upvote dan downvote
 * - Harus tidak merender badge kategori jika category kosong
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ThreadItem from '../ThreadItem';

const fakeThread = {
  id: 'thread-1',
  title: 'Judul Thread Pertama',
  body: 'Ini adalah isi dari thread pertama yang cukup panjang untuk diuji.',
  category: 'General',
  createdAt: '2024-01-01T00:00:00.000Z',
  totalComments: 5,
  upVotesBy: ['user-1', 'user-2'],
  downVotesBy: ['user-3'],
};

function renderThreadItem(props = {}) {
  return render(
    <MemoryRouter>
      <ThreadItem
        thread={fakeThread}
        ownerName="User Pertama"
        ownerAvatar=""
        {...props}
      />
    </MemoryRouter>,
  );
}

describe('ThreadItem Component', () => {
  it('harus merender judul thread', () => {
    renderThreadItem();
    expect(screen.getByText('Judul Thread Pertama')).toBeInTheDocument();
  });

  it('harus merender link yang mengarah ke halaman detail thread', () => {
    renderThreadItem();
    const link = screen.getByRole('link', { name: /Judul Thread Pertama/i });
    expect(link).toHaveAttribute('href', '/threads/thread-1');
  });

  it('harus merender nama pemilik thread', () => {
    renderThreadItem();
    expect(screen.getByText('User Pertama')).toBeInTheDocument();
  });

  it('harus merender badge kategori jika category tersedia', () => {
    renderThreadItem();
    expect(screen.getByText('General')).toBeInTheDocument();
  });

  it('harus tidak merender badge kategori jika category kosong', () => {
    renderThreadItem({ thread: { ...fakeThread, category: '' } });
    expect(screen.queryByText('General')).not.toBeInTheDocument();
  });

  it('harus merender jumlah komentar', () => {
    renderThreadItem();
    expect(screen.getByText(/5 komentar/i)).toBeInTheDocument();
  });

  it('harus merender body thread', () => {
    renderThreadItem();
    expect(
      screen.getByText(/Ini adalah isi dari thread pertama/i),
    ).toBeInTheDocument();
  });

  it('harus memotong body thread jika lebih dari 150 karakter', () => {
    const longBody = 'A'.repeat(200);
    renderThreadItem({ thread: { ...fakeThread, body: longBody } });
    const bodyEl = screen.getByText(/A+\.\.\./);
    expect(bodyEl.textContent.length).toBeLessThanOrEqual(154); // 150 + '...'
  });

  it('harus merender jumlah upvote dengan benar (2 upvote)', () => {
    renderThreadItem();
    // upVotesBy has 2 users - cek dengan aria-label
    const upvoteEl = screen.getByLabelText('upvote count');
    expect(upvoteEl.textContent).toContain('2');
  });

  it('harus merender jumlah downvote dengan benar (1 downvote)', () => {
    renderThreadItem();
    // downVotesBy has 1 user
    const downvoteEl = screen.getByLabelText('downvote count');
    expect(downvoteEl.textContent).toContain('1');
  });
});
