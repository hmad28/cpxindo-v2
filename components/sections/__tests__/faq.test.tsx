/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FaqSection } from '../faq';

// Mock icons
jest.mock('../../icons', () => ({
  ChevronDown: (props: any) => <svg data-testid="chevron-down" {...props} />,
}));

// Mock db to return controlled data (async — component calls .then())
jest.mock('@/lib/db', () => ({
  getStoredFAQs: () => Promise.resolve([
    { id: 'faq-1', q: 'Apakah bisa pesan satuan?', a: 'Bisa, CPX melayani pemesanan satuan.' },
    { id: 'faq-2', q: 'Berapa lama proses?', a: '7-10 hari kerja setelah desain disetujui.' },
    { id: 'faq-3', q: 'Bahan apa yang digunakan?', a: 'Dryfit Milano dengan pola zig-zag.' },
  ]),
  getStoredCMS: () => Promise.resolve({ shopName: 'CPX JERSEY' }),
}));

// Helper: wait for FAQ items to render after async load
async function renderAndWait() {
  render(<FaqSection />);
  await waitFor(() => {
    expect(screen.getByText('Apakah bisa pesan satuan?')).toBeTruthy();
  });
}

describe('FaqSection', () => {
  it('renders all FAQ questions', async () => {
    await renderAndWait();
    expect(screen.getByText('Apakah bisa pesan satuan?')).toBeTruthy();
    expect(screen.getByText('Berapa lama proses?')).toBeTruthy();
    expect(screen.getByText('Bahan apa yang digunakan?')).toBeTruthy();
  });

  it('renders section heading', () => {
    render(<FaqSection />);
    expect(screen.getByText(/FREQUENTLY ASKED/)).toBeTruthy();
  });

  it('starts with all answers collapsed', async () => {
    await renderAndWait();
    const answers = screen.getAllByText(/Bisa, CPX|7-10 hari|Dryfit Milano/);
    answers.forEach((answer) => {
      const container = answer.closest('div');
      expect(container?.style.maxHeight).toBe('0');
    });
  });

  it('expands answer on question click', async () => {
    await renderAndWait();
    fireEvent.click(screen.getByText('Apakah bisa pesan satuan?'));

    const answer = screen.getByText('Bisa, CPX melayani pemesanan satuan.');
    const container = answer.closest('div');
    expect(container?.style.maxHeight).toBe('250px');
  });

  it('collapses answer on second click', async () => {
    await renderAndWait();
    const firstQuestion = screen.getByText('Apakah bisa pesan satuan?');

    fireEvent.click(firstQuestion);
    fireEvent.click(firstQuestion);

    const answer = screen.getByText('Bisa, CPX melayani pemesanan satuan.');
    const container = answer.closest('div');
    expect(container?.style.maxHeight).toBe('0');
  });

  it('only one answer open at a time', async () => {
    await renderAndWait();

    fireEvent.click(screen.getByText('Apakah bisa pesan satuan?'));
    fireEvent.click(screen.getByText('Berapa lama proses?'));

    const firstAnswer = screen.getByText('Bisa, CPX melayani pemesanan satuan.');
    expect(firstAnswer.closest('div')?.style.maxHeight).toBe('0');

    const secondAnswer = screen.getByText('7-10 hari kerja setelah desain disetujui.');
    expect(secondAnswer.closest('div')?.style.maxHeight).toBe('250px');
  });

  it('adds open class to active FAQ item', async () => {
    await renderAndWait();
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
      expect(item.className).not.toContain('open');
    });

    fireEvent.click(screen.getByText('Apakah bisa pesan satuan?'));
    expect(faqItems[0].className).toContain('open');
    expect(faqItems[1].className).not.toContain('open');
  });
});
