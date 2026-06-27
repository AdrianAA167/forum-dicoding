/**
 * Skenario Pengujian Komponen VoteButtons:
 *
 * - Harus merender tombol upvote dan downvote dengan jumlah vote
 * - Harus menambahkan class active pada tombol upvote jika isUpVoted=true
 * - Harus menambahkan class active pada tombol downvote jika isDownVoted=true
 * - Harus memanggil onUpVote ketika tombol upvote diklik
 * - Harus memanggil onDownVote ketika tombol downvote diklik
 * - Harus tidak memanggil handler yang salah saat klik
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VoteButtons from '../VoteButtons';

describe('VoteButtons Component', () => {
  it('harus merender jumlah upvote dan downvote', () => {
    render(
      <VoteButtons
        upVotesCount={10}
        downVotesCount={3}
        isUpVoted={false}
        isDownVoted={false}
        onUpVote={vi.fn()}
        onDownVote={vi.fn()}
      />,
    );

    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('harus memiliki class active-up jika isUpVoted true', () => {
    render(
      <VoteButtons
        upVotesCount={5}
        downVotesCount={1}
        isUpVoted
        isDownVoted={false}
        onUpVote={vi.fn()}
        onDownVote={vi.fn()}
      />,
    );

    const upvoteBtn = screen.getByLabelText('Upvote');
    expect(upvoteBtn).toHaveClass('vote-buttons__btn--active-up');
  });

  it('harus memiliki class active-down jika isDownVoted true', () => {
    render(
      <VoteButtons
        upVotesCount={5}
        downVotesCount={2}
        isUpVoted={false}
        isDownVoted
        onUpVote={vi.fn()}
        onDownVote={vi.fn()}
      />,
    );

    const downvoteBtn = screen.getByLabelText('Downvote');
    expect(downvoteBtn).toHaveClass('vote-buttons__btn--active-down');
  });

  it('harus memanggil onUpVote saat tombol upvote diklik', async () => {
    const onUpVote = vi.fn();
    const user = userEvent.setup();

    render(
      <VoteButtons
        upVotesCount={0}
        downVotesCount={0}
        isUpVoted={false}
        isDownVoted={false}
        onUpVote={onUpVote}
        onDownVote={vi.fn()}
      />,
    );

    await user.click(screen.getByLabelText('Upvote'));
    expect(onUpVote).toHaveBeenCalledTimes(1);
  });

  it('harus memanggil onDownVote saat tombol downvote diklik', async () => {
    const onDownVote = vi.fn();
    const user = userEvent.setup();

    render(
      <VoteButtons
        upVotesCount={0}
        downVotesCount={0}
        isUpVoted={false}
        isDownVoted={false}
        onUpVote={vi.fn()}
        onDownVote={onDownVote}
      />,
    );

    await user.click(screen.getByLabelText('Downvote'));
    expect(onDownVote).toHaveBeenCalledTimes(1);
  });

  it('harus tidak memanggil onDownVote saat tombol upvote diklik', async () => {
    const onDownVote = vi.fn();
    const user = userEvent.setup();

    render(
      <VoteButtons
        upVotesCount={0}
        downVotesCount={0}
        isUpVoted={false}
        isDownVoted={false}
        onUpVote={vi.fn()}
        onDownVote={onDownVote}
      />,
    );

    await user.click(screen.getByLabelText('Upvote'));
    expect(onDownVote).not.toHaveBeenCalled();
  });
});
